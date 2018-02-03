<template>
  <div class="sales-board">
    <el-row :gutter="20">
      <el-col :span="10" style="padding: 10px 20px">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="foodImg" class="image">
          <div class="sales-board-line">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="sales-board-line-left">购买数量</span>
              </el-col>
              <el-col :span="12" class="sales-board-line-right ">
                <el-input-number v-model="form.buyNum" size="mini" :min="1" :max="10"
                                 label="购买数量" @change="handleChange"></el-input-number>
              </el-col>
            </el-row>
          </div>
          <div class="sales-board-line">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="sales-board-line-left">{{foodDetail.name}}</span>
              </el-col>
              <el-col :span="12">
                <span class="sales-board-line-right">¥{{foodDetail.price}}元</span>
              </el-col>
            </el-row>
          </div>
          <div class="sales-board-line">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="sales-board-line-left">配送费</span>
              </el-col>
              <el-col :span="12">
                <span class="sales-board-line-right">¥{{form.deliveryCost}}元</span>
              </el-col>
            </el-row>
          </div>
          <div class="sales-board-line">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="sales-board-line-left total">合计：</span>
              </el-col>
              <el-col :span="12">
                <span class="sales-board-line-right toralPrice">¥{{ form.orderCount }}元</span>
              </el-col>
            </el-row>
          </div>
          <div class="bottom ">
            <div class="sales-board-line">
              <el-row :gutter="20">
                <el-col :span="8">&nbsp
                </el-col>
                <el-col :span="16">
                  优惠券：
                  <v-selection :selections="bounceList" :selectedValue="form.bounceListSelected"
                               @get-selected-data="getbounceListData"></v-selection>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" style="margin: 20px">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="送餐城市">
            <el-cascader :options="allCities" v-model="form.citySelected" :props="props"
                         expand-trigger="hover" @change="cityHandleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input type="textarea" v-model="form.detailAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input style="width: 150px;" suffix-icon="el-icon-mobile-phone" v-model="form.mobile"></el-input>
            <span class="g-form-error">{{ mobileErr.errorText }}</span>
          </el-form-item>
          <el-form-item label="给买家留言：">
            <el-input v-model="form.detailNote" placeholder="不要放辣，多放点盐等口味要求"></el-input>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery" active-color="#FFB970"></el-switch>
          </el-form-item>
          <el-form-item label="送餐时间" v-if="!form.delivery">
            <el-col style="width: 49%;">
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
            <el-button v-if="form.payWaySelected == '在线付款'"
                       style="float: right;padding-right: 25px;background-color: #ff5722;color:#faffdf"
                       @click="showPayDialog('payOrder')">立即付款
            </el-button>
            <el-button v-if="form.payWaySelected == '餐到付款'"
                       style="float: right;padding-right: 25px;background-color: #ff5722;color:#faffdf"
                       @click="showPayDialog('submitOrder')">提交订单
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <my-dialog :dialogshow="isShowPayDialog" :title="buyDetailTitle" :widthDialog="'60%'"
               @cancel-dialog="closePayDialog">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称:">
                <span>{{ props.row.foodName }}</span>
              </el-form-item>
              <el-form-item label="食品价格:">
                <span>¥{{ props.row.foodPrice }}元</span>
              </el-form-item>
              <el-form-item label="配送费:">
                <span>¥{{ props.row.deliveryCost }}元</span>
              </el-form-item>
              <el-form-item label="购买的数量:">
                <span>{{ props.row.buyNum }}</span>
              </el-form-item>
              <el-form-item label="优惠额度:">
                <span>¥{{ props.row.bounceCount }}元</span>
              </el-form-item>
              <el-form-item label="订单总金额:">
                <span>¥{{ props.row.orderCount }}元</span>
              </el-form-item>
              <el-form-item label="送餐地址:">
                <span>{{ props.row.cityToString }}{{ props.row.detailAddress }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.mobile }}</span>
              </el-form-item>
              <el-form-item label="卖家留言">
                <span>{{ props.row.detailNote }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.delivery" label="是否及时配送">
                <span>是</span>
              </el-form-item>
              <el-form-item v-if="!props.row.delivery" label="送餐时间">
                <span>{{ props.row.date1 }}&nbsp;{{ props.row.date2 }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="foodName"></el-table-column>
        <el-table-column label="购买数量" prop="buyNum"></el-table-column>
        <el-table-column label="订单总金额" prop="orderCount"></el-table-column>
      </el-table>
      <h3 class="buy-dialog-title" v-if="form.payWaySelected == '在线付款'">请选择银行</h3>
      <bank-chooser @bank-select-change="onChangeBanks" v-if="form.payWaySelected == '在线付款'"></bank-chooser>
      <el-button v-if="form.payWaySelected == '在线付款'"
                 style="background-color: #ff5722;color:#faffdf;position: relative;right: -85%;margin-top: 10px"
                 @click="confirmBuy('payOrder')">确认购买
      </el-button>
      <el-button v-if="form.payWaySelected == '餐到付款'"
                 style="background-color: #ff5722;color:#faffdf;position: relative;right: -85%;margin-top: 10px"
                 @click="confirmBuy('submitOrder')">确认提交订单
      </el-button>
    </my-dialog>
    <my-dialog :dialogshow="isShowResDialog" :title="resTitle" :widthDialog="'30%'"
               @cancel-dialog="closeResDialog">
      <i v-if="isSuccessRes" class="el-icon-circle-check-outline"><span>&nbsp;{{resMessage}}</span></i>
      <i v-if="!isSuccessRes" class="el-icon-circle-close-outline"><span>&nbsp;{{resMessage}}</span></i>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import VSelection from '../../components/base/selection'
  import MyDialog from '../../components/base/dialog'
  import BankChooser from '../../components/bankChooser'

  export default {
    components: {
      VSelection,
      MyDialog,
      BankChooser
    },
    data () {
      return {
        resMessage: '', // 结果对话框内容
        isSuccessRes: true,
        foodList: [],
        foodDetail: {},
        resTitle: '',  // 结果对话框标题
        orderSubmitTitle: '订单提交',
        buyDetailTitle: '购物车详情',
        price: 0,
        bounceList: [
          {
            label: '请选择',
            value: 0,
            disabled: false
          },
          {
            label: '全场8.8折',
            value: 1,
            disabled: false
          },
          {
            label: '满30减5元',
            value: 2,
            disabled: false
          },
          {
            label: '满88元减20元',
            value: 3,
            disabled: false
          }
        ],
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
          bounceListSelected: 0, // 优惠券
          bounceCount: 0, // 优惠金额
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
        imgMap: {
          '/detail/zou/zou1': require('../../assets/images/zou1.jpg'),
          '/detail/zou/zou2': require('../../assets/images/zou2.jpg'),
          '/detail/zou/zou3': require('../../assets/images/zou3.jpg'),
          '/detail/zou/zou4': require('../../assets/images/zou4.jpg'),
          '/detail/zhengdian/zd1': require('../../assets/images/zd1.jpg'),
          '/detail/zhengdian/zd2': require('../../assets/images/zd2.jpg'),
          '/detail/zhengdian/zd3': require('../../assets/images/zd3.jpg'),
          '/detail/miantiao/mt1': require('../../assets/images/mt1.jpg'),
          '/detail/miantiao/mt2': require('../../assets/images/mt2.jpg'),
          '/detail/miantiao/mt3': require('../../assets/images/mt3.jpg'),
          '/detail/miantiao/mt4': require('../../assets/images/mt4.jpg'),
          '/detail/miantiao/mt5': require('../../assets/images/mt5.jpg'),
          '/detail/miantiao/mt6': require('../../assets/images/mt6.jpg'),
          '/detail/miantiao/mt7': require('../../assets/images/mt7.jpg'),
          '/detail/fanshi/fan1': require('../../assets/images/fan1.jpg'),
          '/detail/fanshi/fan2': require('../../assets/images/fan2.jpg'),
          '/detail/fanshi/fan3': require('../../assets/images/fan3.jpg'),
          '/detail/fanshi/fan4': require('../../assets/images/fan4.jpg'),
          '/detail/xiaocai/xc1': require('../../assets/images/xcc1.jpg'),
          '/detail/xiaocai/xc2': require('../../assets/images/xcc2.jpg'),
          '/detail/xiaocai/xc3': require('../../assets/images/xcc3.jpg'),
          '/detail/xiaocai/xc4': require('../../assets/images/xcc4.jpg'),
          '/detail/tang/tang1': require('../../assets/images/tang1.jpg'),
          '/detail/tang/tang2': require('../../assets/images/tang2.jpg'),
          '/detail/xiaochi/xc1': require('../../assets/images/xc1.jpg'),
          '/detail/xiaochi/xc2': require('../../assets/images/xc2.jpg'),
          '/detail/xiaochi/xc3': require('../../assets/images/xc3.jpg'),
          '/detail/xiaochi/xc4': require('../../assets/images/xc4.jpg'),
          '/detail/xiaochi/xc5': require('../../assets/images/xc5.jpg'),
          '/detail/xiaochi/xc6': require('../../assets/images/xc6.jpg'),
          '/detail/xiaochi/xc7': require('../../assets/images/xc7.jpg'),
          '/detail/xiaochi/xc8': require('../../assets/images/xc8.jpg'),
          '/detail/xiaochi/xc9': require('../../assets/images/xc9.jpg'),
          '/detail/xiaochi/xc10': require('../../assets/images/xc10.jpg'),
          '/detail/yinpin/yp1': require('../../assets/images/yp1.jpg'),
          '/detail/yinpin/yp2': require('../../assets/images/yp2.jpg'),
          '/detail/yinpin/yp3': require('../../assets/images/yp3.jpg'),
          '/detail/yinpin/yp4': require('../../assets/images/yp4.jpg'),
          '/detail/yinpin/yp5': require('../../assets/images/yp5.jpg'),
          '/detail/yinpin/yp6': require('../../assets/images/yp6.jpg'),
          '/detail/yinpin/yp7': require('../../assets/images/yp7.jpg')
        },
        isShowResDialog: false,
        isShowPayDialog: false,
        orderSubmitDialog: false,
        bankId: null,
        orderId: null,
        isShowCheckOrder: false,
        tableData: []
      }
    },
    watch: {
      $route () {
        var path = this.$route.path
        if (path !== '/orderList') {
          this.getFoodList()
        }
        this.initBuyNum()
        this.init()
      }
    },
    methods: {
      init () {
        this.foodName.citySelected = []
        this.foodName.detailAddress = ''
        this.foodName.mobile = ''
        this.foodName.detailNote = ''
        this.foodName.date1 = ''
        this.foodName.date2 = ''
      },
      closePayDialog (data) {
        this.isShowPayDialog = data
      },
      closeResDialog (data) {
        this.isShowResDialog = data
        if (this.tableData.length > 0) {
          this.$router.push('/orderList')
        }
      },
      closeOrderSubmitDialog (data) {
        this.orderSubmitDialog = data
      },
      getbounceListData (data) {
        this.form.bounceListSelected = data
        if (data === 1) {
          this.form.orderCount = parseInt((this.form.foodPrice * this.form.buyNum * 0.88 + 3) * 100) / 100
        } else if (data === 2) {
          this.form.orderCount = this.form.foodPrice * this.form.buyNum - 5 + 3
        } else if (data === 3) {
          this.form.orderCount = this.form.foodPrice * this.form.buyNum - 20 + 3
        } else {
          this.form.orderCount = this.form.foodPrice * this.form.buyNum + 3
        }
        this.form.bounceCount = Math.floor((this.form.foodPrice * this.form.buyNum + 3 - this.form.orderCount) * 10) / 10
      },
      onParamChange (attr, val) {
        this[attr] = val
        this.getPrice()
      },
      getPrice () {
        this.$http.get('/api/getPrice', this.form)
          .then((res) => {
            this.price = res.data.getPriceRes.amount
          })
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
      hideCheckOrder () {
        this.isShowCheckOrder = false
      },
      onChangeBanks (bankObj) {
        this.bankId = bankObj.id
      },
      confirmBuy (type) {
        this.$http.get('/api/createOrder', this.form)
          .then((res) => {
            this.orderId = res.data.orderId
            this.isSuccessRes = true
            if (type === 'payOrder') {
              this.resTitle = '订单支付结果'
              this.resMessage = '订单支付成功'
            }
            if (type === 'submitOrder') {
              this.resTitle = '订单提交结果'
              this.resMessage = '订单提交成功'
            }
            this.isShowPayDialog = false
            this.isShowResDialog = true
          }, (errorRes) => {
            console.log(errorRes)
          })
      },
      getCities () {
        this.$http.get('/api/getCities').then(
          (response) => {
            this.allCities = response.data.getCitiesRes
          },
          (errorRes) => {
            console.log(errorRes)
          })
      },
      getFoodList () {
        this.$http.get('/api/productList').then(
          (response) => {
            this.foodList = response.data.getProductListRes[this.$route.params.category].list
            for (var i = 0; i < this.foodList.length; i++) {
              if (this.foodList[i].path === this.$route.params.foodName) {
                this.foodDetail = this.foodList[i]
                this.form.foodName = this.foodList[i].name
                this.form.foodPrice = this.foodList[i].price
                this.form.orderCount = this.foodList[i].price + 3
              }
            }
          },
          (errorRes) => {
            console.log(errorRes)
          })
      },
      // 购买数量改变时
      handleChange (value) {
        if (typeof value === 'undefined') {
          this.form.buyNum = 1
        } else {
          this.form.buyNum = value
        }
        this.form.orderCount = parseInt(this.form.deliveryCost) + this.form.buyNum * parseInt(this.form.foodPrice)
        this.checkCanUseBounce()
      },
      initBuyNum () {
        this.form.buyNum = 1
      },
      cityHandleChange (value) {
        this.form.citySelected = value
        var cityToString = ''
        for (var i = 0; i < value.length; i++) {
          cityToString += value[i] + '  '
        }
        this.form.cityToString = cityToString
      },
      // 校验是否可以使用优惠券
      checkCanUseBounce () {
        var actPrice = 0
        if (this.form.foodPrice === 0) {
          actPrice = 0
        } else {
          actPrice = this.form.buyNum * this.form.foodPrice
        }
        if (actPrice < 30) {
          this.form.bounceListSelected = 0
          this.bounceList[2].disabled = true
          this.bounceList[3].disabled = true
        } else if (actPrice >= 30 && actPrice < 88) {
          this.form.bounceListSelected = 0
          this.bounceList[3].disabled = true
          this.bounceList[2].disabled = false
        } else {
          this.bounceList[3].disabled = false
          this.bounceList[2].disabled = false
        }
      },
      cascaderHandleChange (value) {
        console.log(value)
      }
    },
    mounted () {
      this.form.payWaySelected = this.payWayList[0].label
    },
    created () {
      this.getCities()
      this.getFoodList()
      this.checkCanUseBounce()
    },
    computed: {
      foodImg () {
        return this.imgMap[this.$route.path]
      },
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
      },
      user () {
        return this.$store.state.user
      }
    }
  }
</script>

<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 10px;
  }

  .buy-dialog-btn {
    margin-top: 20px;
  }

  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }

  .buy-dialog-table td,
  .buy-dialog-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }

  .buy-dialog-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
  }

  img.image {
    width: 100%;
    padding-bottom: 24px;
  }

  .total, .toralPrice {
    font-size: 24px;
  }

  .sales-board-line-right.el-col.el-col-12 {
    padding: 0px;
  }

  .el-dialog__body {
    padding: 23px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
