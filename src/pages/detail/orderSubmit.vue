<template>
  <div class="sales-board">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="送餐城市">
        <el-cascader :options="allCities" v-model="form.citySelected" :props="props"
                     expand-trigger="hover" @change="cityHandleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input type="textarea" v-model="form.detailAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input suffix-icon="el-icon-mobile-phone" v-model="form.mobile"></el-input>
        <span class="g-form-error">{{ mobileErr.errorText }}</span>
      </el-form-item>
      <el-form-item label="给买家留言：">
        <el-input v-model="form.detailNote" placeholder="不要放辣，多放点盐等口味要求"></el-input>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery" active-color="#FFB970"></el-switch>
      </el-form-item>
      <el-form-item label="送餐时间" v-if="!form.delivery" class="food-delivery-time">
        <el-col>
          <el-date-picker v-model="form.date1" type="date" placeholder="选择日期"
                          value-format="yyyy年MM月dd日" style="width: 100%;">
          </el-date-picker>
        </el-col>
        <el-col style="width: 1%;">-</el-col>
        <el-col style="width: 44%;">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"
                          style="width: 100%;" value-format="hh时mm分ss秒"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-radio-group v-model="form.payWaySelected" size="medium" fill="#FFB970">
          <el-radio-button v-for="item in payWayList" :label="item.label" :key="item.label"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button v-if="form.payWaySelected == '在线付款'" class="online-pay-btn"
                   @click="showPayDialog('payOrder')">立即付款
        </el-button>
        <el-button v-if="form.payWaySelected == '餐到付款'" class="delivery-pay-btn"
                   @click="showPayDialog('submitOrder')">提交订单
        </el-button>
      </el-form-item>
    </el-form>
    <my-dialog :dialogshow="isShowResDialog" :title="resTitle" :widthDialog="'30%'"
               @cancel-dialog="closeResDialog">
      <i v-if="isSuccessRes" class="el-icon-circle-check-outline"><span>&nbsp;{{resMessage}}</span></i>
      <i v-if="!isSuccessRes" class="el-icon-circle-close-outline"><span>&nbsp;{{resMessage}}</span></i>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyDialog from '../../components/base/dialog'

  export default {
    components: {MyDialog},
    data () {
      return {
        allCities: [], // 城市列表
        props: {  // 城市key转换
          value: 'label',
          children: 'cities'
        },
        payWayList: [  // 支付方式列表
          {
            label: '在线付款',
            value: 0
          },
          {
            label: '餐到付款',
            value: 1
          }
        ],
        form: {
          foodName: '', // 食品名称
          foodPrice: 0, // 食品价格
          deliveryCost: 3, // 配送费
          buyNum: 1,  // 购买的数量
          orderCount: 0, // 订单总金额
          citySelected: [], // 被选择的城市
          cityToString: '', // 被选择的城市
          detailAddress: '',  // 送餐地址
          mobile: '', // 联系电话
          detailNote: '',  // 买家留言
          payWaySelected: '',  // 选中的支付方式
          date1: '',  // 选择日期
          date2: '',  // 选择时间
          delivery: false  // 是否及时配送
        },
        isSuccessRes: true,
        resTitle: '',
        resMessage: '',
        isShowResDialog: false
      }
    },
    methods: {
      init () {
        this.form.citySelected = []
        this.form.detailAddress = ''
        this.form.mobile = ''
        this.form.detailNote = ''
        this.form.date1 = ''
        this.form.date2 = ''
      },
      showPayDialog (type) {
        if (this.form.citySelected.length === 0) {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请选择城市！'
          this.isShowResDialog = true
          return false
        } else if (this.form.detailAddress === '') {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请填写详细地址！'
          this.isShowResDialog = true
          return false
        } else if (this.mobileErr.status === false) {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请输入正确的手机号码！'
          this.isShowResDialog = true
          return false
        } else if (this.form.delivery === false && (this.form.date1 === '' || this.form.date2 === '')) {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请选择送餐时间！'
          this.isShowResDialog = true
          return false
        }
        if (this.user == null) {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请登录后再操作！'
          this.isShowResDialog = true
          return false
        }
        this.tableData = []
        this.tableData.push(this.form)
        this.isShowPayDialog = true
      },
      /* 获取城市列表 */
      getCities () {
        this.$http.get('/api/getCities').then(
          (response) => {
            this.allCities = response.data.getCitiesRes
          },
          (errorRes) => {
            console.log(errorRes)
          })
      },
      /* 将选中的省、市、区转成字符串 */
      cityHandleChange (value) {
        this.form.citySelected = value
        var cityToString = ''
        for (var i = 0; i < value.length; i++) {
          cityToString += value[i] + '  '
        }
        this.form.cityToString = cityToString
      },
      closeResDialog (data) {
        this.isShowResDialog = data
        if (this.tableData.length > 0) {
          this.$router.push('/orderList')
        }
      }
    },
    mounted () {
      this.form.payWaySelected = this.payWayList[0].label
    },
    created () {
      this.getCities()
    },
    computed: {
      mobileErr () {
        let errorText, status
        if (!(/^1[34578]\d{9}$/.test(this.form.mobile))) {
          status = false
          errorText = '手机号码格式不正确'
        } else {
          status = true
          errorText = ''
        }
        if (!this.mobileFlag) {
          errorText = ''
          this.mobileFlag = true
        }
        return {
          status,
          errorText
        }
      }
    }
  }
</script>

<style scoped>
  .online-pay-btn {
    float: right;
    padding-right: 25px;
    background-color: #ff5722;
    color: #faffdf
  }

  .delivery-pay-btn {
    float: right;
    padding-right: 25px;
    background-color: #ff5722;
    color: #faffdf
  }

  /*.food-delivery-time {*/
    /*width: 49%;*/
  /*}*/
</style>
