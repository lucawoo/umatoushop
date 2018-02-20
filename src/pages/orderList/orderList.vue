<template>
  <div class="orderList">
    <div class="orderimg" v-if="!orders.length">
      <div class="orderimg-main">
        <img src="../../assets/orderList/dingdan.png" alt="订单">
        <p>您暂无订单</p>
      </div>
    </div>
    <div class="orderMain">
      <ul>
        <li v-for="(order,index) in orders" class="orders">
          <div class="orderBox">
            <div class="ordeId">
              <span class="orderList-date">{{order.orderDate}}</span>
              <span class="orderList-orderNo">订单号：{{order.orderId}}</span>
              <span
                style="float: right;margin-right:30px;color: #f2632e;font-weight: 400;">{{order.orderType}}</span>
            </div>
            <div class="orderOne" v-for="item in order.orderDetail">
              <el-row class="orderList-main">
                <el-col :span="8">
                  <img v-bind:src="item.src" alt="图片">
                </el-col>
                <el-col :span="8">
                  <div class="orderList-main-name"><span>{{item.name}}</span></div>
                </el-col>
                <el-col :span="4">
                  <div class="orderList-main-price"><span>￥{{item.price}}</span></div>
                </el-col>
                <el-col :span="4">
                  <p class="orderList-main-buyNum">×{{item.buyNum}}</p>
                </el-col>
              </el-row>
            </div>

            <div class="orderTwo">
              <div class="_Order" @click="odefault(index)">
                <a>删除订单</a>
              </div>
              <div class="_Total">
                共<span>{{order.orderDetail.length}}</span>件商品 总计:<span>￥{{order.orderTotal}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'oerder',
    data () {
      return {}
    },
    computed: {
      orders () {
        return this.$store.state.orders
      }
    },
    methods: {
      ...mapMutations([
        'odefault'
      ])
    }

  }
</script>


<style>
  .orderList {
    margin: 20px 30px;
  }

  .orderimg {
    width: 100%;
    height: 508px;
    margin: 28px auto;
    background-color: #fff;
  }
  .orderimg-main{
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .orderimg img {
    width: 10.5rem;
    display: block;
    margin: 0 auto;
  }

  .orderimg p {
    text-align: center;
    color: #ccc;
    font-size: 2.42rem;
    padding-right: 26px;
    width: 200px;
    margin: 23px auto;
  }

  .ordeId {
    height: 2.4rem;
    line-height: 2.4rem;
    background: white;
    border-bottom: 1px solid #cccccc;
    padding-left: 21px;
  }

  .orderList-date {
    font-size: 15px;
    font-weight: bold;
    padding-right: 10px;
  }

  .orderList-orderNo {
    color: #7d7979;
  }

  .orderMain {
    margin-top: 1.34rem;
  }

  .orderOne {
    height: 4.4rem;
    width:100%;
    background: white;
    list-style: none;
    padding: 15px 0px;
  }

  .orderOne img {
    width: 6.5rem;
    float: left;
  }

  .orderList-main {
    margin: 20px 30px;
  }

  .orders {
    margin-top: 1.2rem;
  }

  .orderValue span {
    position: relative;
    top: -2rem;
    float: right;
    color: #888888;
    margin-right: 0.3rem;
  }

  .orderBox {
    margin-top: 0.35rem;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    color: #303133;
  }

  .orderList-main-name,.orderList-main-price,.orderList-main-buyNum {
    height: 80px;
    line-height: 80px;
    font-size: 17px;
  }

  .orderTwo {
    width: 100%;
    height: 3.7rem;
    line-height: 2.5rem;
    background: white;
    border-top: 1px solid #cccccc;
  }

  .orderTwo span {
    color: #ff1908;
  }

  ._Order {
    float: right;
    padding-right: 1.3rem;
    color: #888;
    font-size:17px;
    cursor: pointer;
  }

  ._Total {
    float: right;
    font-size:17px;
    padding-right: 30px;
  }

  .orderColor span {
    font-size: 0.3rem;
    padding-left: 0.1rem;
    color: #888;
  }

  .orderOne > p {
    color: #888;
  }

</style>

