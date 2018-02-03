<template>
<div>
  <el-carousel height="380px">
    <el-carousel-item v-for="(item, index) in slides" :key="index">
      <img :src="item.src" alt="">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      slides: {
        type: Array,
        dafault: []
      },
      test: {
        type: String,
        dafault: ''
      }
    }
  }
</script>

<style scoped>
  .el-carousel {
    margin: 15px 0;
  }

  img {
    width: 100%;
  }

  .el-carousel__container {
    position: relative;
  }
</style>
