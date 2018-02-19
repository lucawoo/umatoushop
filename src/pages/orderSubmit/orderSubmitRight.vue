<template>
  <div>
    <h1 class="address-title">收货地址</h1>
    <div>
      <el-button type="text" @click="addAddress" class="address-addAddress" >
        +添加新地址
      </el-button>
      <order-address :showDialog="isShowResDialog" @cancel-dialog="closeResDialog" @save-address-success="saveAddressSuccess"></order-address>
      <div class="addressMain" v-if="addresses.length">
        <ul>
          <li v-for="(address,index) in addresses">
            <el-radio v-model="form.addressSelected" :label="address" border class="address-radio">{{address}}
              <a href="javascript:;" @click="delAddress(index)">X</a>
            </el-radio>
          </li>
        </ul>
      </div>
    </div>
    <h1 class="payway-title">付款方式</h1>
    <p class="payway-subTitle">推荐使用在线支付，不用找零，优惠更多</p>
    <div>
      <el-radio-group v-model="form.payWaySelected">
        <el-radio-button label="在线支付"></el-radio-button>
        <el-radio-button label="货到付款"></el-radio-button>
      </el-radio-group>
    </div>
    <h1 class="otherInfo-title">其他信息</h1>
    <el-row :gutter="10">
      <el-col style="width: 100px"><p class="otherInfo-main-title">给买家留言：</p></el-col>
      <el-col :span="10">
        <el-input v-model="form.detailNote" placeholder="不要放辣，多放点盐等口味要求"></el-input>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col style="width: 100px"><p class="otherInfo-main-title">即时配送：</p></el-col>
      <el-col :span="10">
        <el-switch v-model="form.delivery" active-color="#FFB970"></el-switch>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
    <el-row :gutter="10" v-if="!form.delivery">
      <el-col style="width: 100px"><p class="otherInfo-main-title">送餐时间：</p></el-col>
      <el-col :span="10">
        <el-time-select
          placeholder="请选择时间" v-model="form.deliveryTime"
          :picker-options="{
            start: getTime,
            step: '00:15',
            end: '22:30'
          }">
        </el-time-select>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>
    <el-button v-if="form.payWaySelected == '在线支付'" class="online-pay-btn" @click="pay(1)">在线支付</el-button>
    <el-button v-if="form.payWaySelected == '货到付款'" class="delivery-pay-btn" @click="pay(2)">货到付款</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderAddress from './orderAddress.vue'
  import { Toast } from 'mint-ui'
  import { mapGetters } from 'vuex'

  export default {
    components: {OrderAddress},
    data () {
      return {
        payWayList: [  // 支付方式列表
          {
            label: '在线支付',
            value: 0
          },
          {
            label: '货到付款',
            value: 1
          }
        ],
        addressList: [],
        form: {
          detailNote: '',  // 买家留言
          payWaySelected: '',  // 选中的支付方式
          addressSelected: '',
          deliveryTime: '',  // 选择时间
          delivery: false  // 是否及时配送
        },
        isSuccessRes: true,
        resTitle: '',
        resMessage: '',
        isShowResDialog: false
      }
    },
    computed: {
      addresses () {
        this.addressList = this.$store.state.address
        return this.addressList
      },
      getTime () {
        var date = new Date()
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var dateStr = hour + ':' + minute
        return dateStr
      },
      ...mapGetters(
        ['sum']
      )
    },
    methods: {
      checkDate () {
        var flag = true
        if (this.addressList.length === 0) {
          this.resMessage = '请添加送餐地址！'
          flag = false
        } else if (this.form.payWaySelected === '') {
          this.resMessage = '请选择支付方式！'
          flag = false
        } else if (!this.form.delivery && this.form.deliveryTime === '') {
          this.resMessage = '请选择送餐时间！'
          flag = false
        } else if (this.$store.state.user == null) {
          this.resMessage = '请登录后再操作！'
          flag = false
        }
        if (!flag) {
          Toast({message: this.resMessage, iconClass: 'el-icon-error', duration: 1000})
        }
        return flag
      },
      closeResDialog (data) {
        this.isShowResDialog = data
      },
      addAddress () {
        this.isShowResDialog = true
      },
      delAddress (index) {
        this.$store.commit('delAddress', index)
      },
      pay (type) {
        var flag = this.checkDate()
        if (!flag) {
          return false
        }
        var total = this.$store.getters.sum
        var carts = this.$store.state.carts
        var message = ''
        var orderType = ''
        if (type === 1) {
          message = '成功支付了' + total + '元！'
          orderType = '交易完成'
        } else {
          message = '订单已提交！'
          orderType = '货到付款'
        }
        console.log(flag)
        Toast({message: message, iconClass: 'el-icon-success', duration: 1200})
        var data = {
          orderId: 'UMT' + new Date().getTime(),
          orderTail: carts,
          orderType: orderType
        }
        this.$store.commit('addorder', data)
      },
      // 地址保存成功后默认勾选第一个地址
      saveAddressSuccess () {
        alert(111)
        if (this.addressList.length > 0) {
          this.form.addressSelected = this.addressList[0]
        }
      }
    },
    mounted () {
      this.form.payWaySelected = this.payWayList[0].label
    }
  }
</script>

<style scoped>
  .online-pay-btn, .delivery-pay-btn {
    margin-right: 200px;
    padding-right: 25px;
    background-color: #ff5722;
    color: #faffdf
  }

  .address-title, .payway-title, .otherInfo-title {
    margin: 30px 10px 10px 0px;
    font-size: 20px;
  }

  .address-addAddress {
    color: #f26e25;
  }

  .addressMain li {
    margin-bottom: 7px;
  }

  .address-radio {
    width: 100%;
    display: block;
    font-size: 20px;
    height: 60px;
    line-height: 30px;
  }

  .address-radio a {
    float: right;
  }

  .address-radio a:hover {
    color: orangered;
  }

  .payway-title {
    display: inline-block;
  }

  .payway-subTitle {
    display: inline-block;
    padding-left: 20px;
    color: #ff9c00;
  }

  .el-form-item__label {
    text-align: left;
  }

  .el-row {
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
  }
</style>
