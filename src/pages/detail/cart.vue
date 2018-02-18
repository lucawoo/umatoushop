<template>
  <div class="cart">
      <!--<router-link to="/">-->
        <!--<i class="iconfont icon-552cc14536532"></i>-->
      <!--</router-link>-->
    <p class="cartheader">购物车</p>
    <div class="cartMain" v-if="carts.length">
      <ul>
        <li v-for="(cart,index) in carts" >
          <el-row>
            <el-col :span="10"><img v-bind:src="cart.src"></el-col>
            <el-col :span="12">
              <div class="cartName">{{cart.name}}</div>
              <el-row class="cartDetail">
                <el-col :span="6"><p class="cartPrice">￥{{cart.price}}</p></el-col>
                <el-col :span="18">
                  <div class="cartNumber">
                    <a href="javascript:;" @click="reduce(index)" class="add">-</a>
                    <input type="text"  v-model="cart.buyNum" readonly="readonly"/>
                    <a href="javascript:;" @click="add(index)" class="reduce">+</a>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="delete">
              <a href="javascript:;" class="el-icon-delete" @click="shanchu(index)"></a>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>

    <div class="cartImg" v-if="!carts.length">
      <img src="../../assets/cart/gouwuche.png" alt="购物车图片">
      <h1>购物车是空的哦，快去购物吧</h1>
    </div>
    <div class="cartFooter" v-if="carts.length">
      <div class="Total">合计：<span style="color:#E3211E">￥{{sum}}</span></div>
      <div class="_box">
        <div class="Settlement">
          <a href="javascript:void(0);" @click="settlement">清空购物车</a>
        </div>
        <div class="Settlementtwo">
          <router-link :to="{name:'Home'}">提交订单</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'cart',
    data () {
      return {}
    },
    computed: {
      ...mapGetters(
        ['sum']
      ),
      carts () {
        return this.$store.state.carts
      }
    },
    methods: {
      ...mapMutations([
        'shanchu', 'add', 'reduce', 'settlement'
      ])
    }
  }
</script>

<style>

  .cart {
    position: absolute;
    width: 50%;
  }

  .cartheader {
    height: 1.3rem;
    line-height: 1.3rem;
    padding-left: 0.3rem;
    background: white;
    top: 0;
    font-size:25px;
    color: orangered;
  }

  .cartList {
    width: 100%;
    height: 4rem;
    background: white;
    margin-top: 0.04rem;
  }

  .cartMain {
    margin-top: 1.3rem;
    margin-bottom: 1.24rem;
    height:283px;
    width:500px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .cartMain ul li {
    list-style: none;
    padding: 4px 0;
  }

  .cartImage img {
    width: 6.6rem;
    height: 4.8rem;
  }

  .cartImage {
    float: left;
    padding: 0.5rem;
  }

  .cartInformation {
    width: 7.7rem;
    font-size: 0.35rem;
    padding-left: 0.3rem;
    padding-top: 0.6rem;
  }

  .cartPrice {
    color: red;
    margin-top: 0.2rem;
    font-size: 1rem;
  }

  .cartNumber {
    float: left;
    margin-top: 0.3rem;
  }

  .cartNumber .add, .cartNumber .reduce {
    display: block;
    font-size: 18px;
    width: 27px;
    height: 27px;
    line-height: 27px;
    border: 1px solid #dedede;
    float: left;
    color: #b2b2b2;
    text-align: center;
  }

  .cartNumber input {
    width: 40px;
    height: 25px;
    float: left;
    text-align: center;
    border: 1px solid #dedede;
  }

  .cartNumber .add {
    border-right: none;

  }

  .cartNumber .reduce {
    border-left: none;
  }

  .cartFooter {
    position: absolute;
    width: 100%;
    bottom: -23%;
    right: 3%;
  }

  .cartImg img {
    width: 224px;
    height: 232px;
    display: block;
    margin: auto;
    padding-top: 2rem;
  }

  .cartImg a {
    display: block;
    text-align: center;
    margin: 0.8rem auto;
    width: 110px;
    height: 37px;
    line-height: 37px;
    border-radius: 4px;
    text-align: center;
    background: #e0524b;
    color: white;
    font-weight: 800;
    font-size: 0.5rem;
  }

  .cartName {
    width: 21.3rem;
    font-size: 1.2rem;
  }

  .cartName a {
    color: black;
    font-size: 1.27rem;
    float: right;
  }

  .cartImg h1 {
    margin-top: 0.5rem;
    text-align: center;
    color: #959595;
    font-size: 1rem;
  }

  ._box {
    width: 63%;
    height: 100%;
    float: left;
    margin-bottom: 30px;
  }

  .Total {
    float: left;
    width: 37%;
    text-align: center;
    line-height: 30px;
    font-size: 1.2rem;
  }
  .Settlement,.Settlementtwo{
    width: 50%;
    height: 37px;
    float: right;
  }
  .Settlement {
    background: #FF9800;
    border-radius: 0 4px 4px 0;
  }

  .Settlementtwo {
    background: #E3211E;
    border-radius: 4px 0 0 4px;
  }

  .Settlement a, .Settlementtwo a {
    color: white;
    text-align: center;
    height:2.18rem;
    line-height:37px;
    display: block;
    font-size: 0.35rem;
  }
  .cartDetail{
    margin: 10px 0;
    height: 30px;
    line-height: 30px;
  }
  .cartNum{
    width:100px;
  }
  .delete .el-icon-delete{
    font-size:20px;
  }
  .delete a{
    display: inline-block;
    height:87px;
    line-height:87px;
  }
</style>
