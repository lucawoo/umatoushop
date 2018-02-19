<template>
  <div class="order-submit">
    <el-row>
      <el-col :span="11" class="order-submit-left">
        <order-submit-left></order-submit-left>
      </el-col>
      <el-col :span="12" class="order-submit-right">
        <order-submit-right></order-submit-right>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import OrderSubmitRight from './orderSubmitRight.vue'
  import OrderSubmitLeft from './orderSubmitLeft.vue'

  export default {
    components: {OrderSubmitLeft, OrderSubmitRight},
    data () {
      return {}
    },
    methods: {},
    mounted () {
    },
    created () {
    },
    computed: {}
  }
</script>

<style scoped>
  .order-submit {
    padding: 20px;
    margin: 25px;
  }

  /*.main{*/
  /*margin: 30px;*/
  /*}*/
  .order-submit-left{
    margin-right: 10px;
    background-color: #fff;
    padding: 0px 15px;
  }
  .order-submit-right{
    margin-left: 10px;
    background-color: #fff;
    padding: 0px 15px 20px 30px;
  }
</style>
