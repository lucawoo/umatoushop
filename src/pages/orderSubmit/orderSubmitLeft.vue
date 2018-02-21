<template>
  <div class="leftModel">
    <h1 class="order-title">订单详情</h1>
    <hr>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="商品" width="250"></el-table-column>
      <el-table-column prop="buyNum" label="份数" width="100"></el-table-column>
      <el-table-column prop="price" label="小计(元)"></el-table-column>
    </el-table>
    <div class="price">
      <span class="priceOne">{{sumPrice}}.00</span><span class="priceTwo">¥</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    data () {
      return {
        tableData: []
      }
    },
    computed: {
      sumPrice () {
        return this.$store.getters.sum
      }
    },
    mounted () {
      this.getCarts()
    },
    methods: {
      getCarts () {
        this.tableData = this.$store.state.carts
      }
    }
  }
</script>

<style scoped>
  .order-title {
    margin: 30px 10px 10px 10px;
    font-size: 20px;
  }
  .price{
    width:100%;
  }
  .priceOne,.priceTwo{
    color: #f74342;
    font-size: 36px;
    font-weight: bold;
    text-align: right;
    float: right;
    height: 100px;
    line-height: 100px;
  }
  .priceTwo{
    font-size: 26px;
  }
  .priceOne{
    margin-right: 20px;
  }
</style>
