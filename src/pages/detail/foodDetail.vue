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
                <el-input-number v-model="buyNum" size="mini" :min="1" :max="10"
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
          <!--<div class="sales-board-line">
            <el-row :gutter="20">
              <el-col :span="12">
                <span class="sales-board-line-left total">合计：</span>
              </el-col>
              <el-col :span="12">
                <span class="sales-board-line-right toralPrice">¥{{ form.orderCount }}元</span>
              </el-col>
            </el-row>
          </div>-->
          <div class="bottom ">
            <div class="sales-board-line">
              <el-row :gutter="20">
                <el-col :span="12">&nbsp;
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-goods" class="addToCart" @click="add()">加入购物车</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9" style="margin: 20px">
        <cart></cart>
        <!--<el-form ref="form" :model="form" label-width="120px">
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
        </el-form>-->
      </el-col>
    </el-row>

    <!--<my-dialog :dialogshow="isShowPayDialog" :title="buyDetailTitle" :widthDialog="'60%'"
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
    </my-dialog>-->
    <!--    <my-dialog :dialogshow="isShowResDialog" :title="resTitle" :widthDialog="'30%'"
                   @cancel-dialog="closeResDialog">
          <i v-if="isSuccessRes" class="el-icon-circle-check-outline"><span>&nbsp;{{resMessage}}</span></i>
          <i v-if="!isSuccessRes" class="el-icon-circle-close-outline"><span>&nbsp;{{resMessage}}</span></i>
        </my-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import VSelection from '../../components/base/selection'
  import MyDialog from '../../components/base/dialog'
  //  import BankChooser from '../../components/bankChooser'
  //  import OrderSubmit from './orderSubmit.vue'
  import Cart from './cart.vue'
  import { Toast, MessageBox } from 'mint-ui'

  export default {
    components: {
      VSelection,
      MyDialog,
      Cart
//      BankChooser,
//      OrderSubmit
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
        isShowResDialog: false,
        isShowPayDialog: false,
        orderSubmitDialog: false,
        bankId: null,
        orderId: null,
        isShowCheckOrder: false,
        tableData: [],
        buyNum: 1  // 购买数量
      }
    },
    watch: {
      $route () {
        var path = this.$route.path
        if (path !== '/orderList') {
          this.getFoodList()
        }
        this.initBuyNum()
      }
    },
    methods: {
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
      getFoodList () {
        this.$http.get('/api/productList').then(
          (response) => {
            this.foodList = response.data.getProductListRes[this.$route.params.category].list
            for (var i = 0; i < this.foodList.length; i++) {
              if (this.foodList[i].path === this.$route.params.foodName) {
                this.foodDetail = this.foodList[i]
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
          this.buyNum = 1
        } else {
          this.buyNum = value
        }
      },
      initBuyNum () {
        this.buyNum = 1
      },
      // 点击按钮时，首先判断该商品是否在购物车已存在，如果存在则不再加入
      add () {
        var idExist = this.$store.state.carts.find((todo) => {
          return todo.name === this.foodDetail.name
        })

        if (!idExist) {
          var data = {
            name: this.foodDetail.name,
            price: this.foodDetail.price,
            path: this.foodDetail.path,
            src: this.foodDetail.src,
            buyNum: this.buyNum
          }
          this.$store.commit('addcarts', data)
          Toast({
            message: '加入购物车成功！', iconClass: 'iconfont el-icon-success', duration: 950
          })
        } else {
          MessageBox('提示', '商品已存在购物车')
        }
      }
    },
    created () {
      this.getFoodList()
    },
    computed: {
      foodImg () {
//        return this.imgMap[this.$route.path]
        return this.foodDetail.bigSrc
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

  .goToBuy {
    margin-left: 30px;
  }

  .addToCart {
    background-color: #ff5722;
    color: #faffdf
  }
</style>
