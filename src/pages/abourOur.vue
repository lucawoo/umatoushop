<template>
  <div style="margin: 0 100px">
    <el-row>
      <el-col :span="24">
        <p id="head">优鲜码头品牌介绍</p>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="background-color: #fff;margin: 5px 1px;padding: 20px 10px;" >
      <el-col :span="11">
        <p>优鲜码头自2013年诞生至今坚持使用真材实料,快捷服务模式和舒适卫生的用餐环境。优鲜码头正在努力成为喜爱的中式餐饮连锁品牌。</p>
        <p>
          优鲜码头致力于满足消费者的不同需求,提供丰富美味的中式早餐、午餐、下午茶和晚餐。同时,在传承中国美食文化的基础上不断研发创新,推出大饱口福系列主食(秘制照烧鸡腿饭、黄金咖猪扒饭等招牌产品)、黑椒小牛排饭、一打鲜虾浓汤面、招牌奶茶、鲜虾迷你脆云吞等,广受消费者欢迎</p>
        <p>
          优鲜码头目前已在上海、北京、深圳、南京、苏州等城市开设了多家连锁餐厅,今后会走向更多城市,为更多消费者提供安全营养、美味、便捷的中式餐饮选择，拓印为蓝本的“优鲜码头”四个字,象征着对于中国美食文化的推崇与探索,而背景的橙色令人感觉充满朝气发展,更希望能与广大中国消费者共享美好的时代。</p>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24" style="margin-bottom: 15px"><span >优鲜码头大事记:</span></el-col>
          <el-col :span="6"><span>2013年4月27日</span></el-col>
          <el-col :span="18"><span>首家优鲜码头餐厅——上海徐家汇美罗城店开业</span></el-col>
          <el-col :span="6"><span>2013年7月</span></el-col>
          <el-col :span="18"><span>广州首家优鲜码头餐厅—天河城店开业</span></el-col>
          <el-col :span="6"><span>2015年7月</span></el-col>
          <el-col :span="18"><span>主餐“大饱口福”系列上市主打产品秘制照烧鸡腿饭、黄金咖喱猪排饭等成为备受消费者推荐的超值选择</span></el-col>
          <el-col :span="6"><span>2015年12月</span></el-col>
          <el-col :span="18"><span>优鲜码头进驻杭州,加快布局全国的步伐</span></el-col>
          <el-col :span="6"><span>2016年12月</span></el-col>
          <el-col :span="18"><span>南京首家优鲜码头餐厅——鼓楼店开业</span></el-col>
          <el-col :span="6"><span>2017年8月</span></el-col>
          <el-col :span="18"><span>河北省首家优鲜码头餐厅——涿州店开业</span></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <img src="../assets/about/about.jpg" alt="" style="width: 100%;">
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeName: '1'
      }
    },
    methods: {}
  }
</script>

<style scoped>
  #head{
    padding:20px 0;
    font: 25px/30px 'Microsoft Yahei',STHeiti,"sans-serif";
    color: #eb1f19;
    text-indent: 0em;
  }
  p,span{
    font: 18px/25px "宋体";
    color: #d73330;
    padding-bottom: 10px;
  }
  p{
    text-indent: 2em;
  }
</style>
