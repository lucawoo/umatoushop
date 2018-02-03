<template>
  <div>
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path:'/'}">
          <img src="../assets/logo.png" style="height: 70px;width: auto;">
        </router-link>
        <div class="head-nav">
          <ul>
            <li style="cursor: default">欢迎访问优鲜码头</li>
            <li class="nav-pile">&nbsp;</li>
            <li v-if="user != null" @click="quitLogin">退出</li>
            <li v-if="user != null" class="nav-pile">|</li>
            <li @click="logDialogVisible = true,getDialogWidth('543px')" v-if="user == null">登录</li>
            <li style="cursor: default" v-if="user != null">欢迎您：{{user.username}}</li>
            <li class="nav-pile">|</li>
            <router-link :to="{path:'/orderList'}">
              <li v-if="user != null">我的订单</li>
            </router-link>
            <li class="nav-pile" v-if="user != null">|</li>
            <li v-if="user == null" @click="regDialogVisible = true,getDialogWidth('543px')">注册</li>
            <li v-if="user == null" class="nav-pile">|</li>
            <router-link :to="{path:'/aboutOur'}">
              <li>品牌故事</li>
            </router-link>
            <li class="nav-pile">|</li>
            <li>加入我们</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <div class="app-foot-right">
        <span>版权所有 优鲜码头餐饮集团有限公司</span>
      </div>
    </div>
    <!-- 登录 -->
    <my-dialog :dialogshow="logDialogVisible" :title="logTite" :widthDialog="width" @cancel-dialog="cancelDialog">
      <log-form @reg-response-res="getRegResponseRes"></log-form>
    </my-dialog>

    <!-- 注册 -->
    <my-dialog :dialogshow="regDialogVisible" :title="regTitle" :widthDialog="width"
               @confirm-dialog="confirmDialog" @cancel-dialog="cancelDialog">
      <!--<reg-form @show-alertDialog="showAlertDoalog" @cancel-dialog="cancelDialog"></reg-form>-->
      <reg-form @reg-response-res="getRegResponseRes"></reg-form>
    </my-dialog>
    <!-- alert对话框 -->
    <my-dialog :dialogshow="alertDialogVisible" title="提示" :widthDialog="'30%'"
               @cancel-dialog="cancelDialog">
      <i v-if="isSuccessRes" class="el-icon-circle-check-outline"><span>&nbsp;{{resMessage}}</span></i>
      <i v-if="!isSuccessRes" class="el-icon-circle-close-outline"><span>&nbsp;{{resMessage}}</span></i>
    </my-dialog>
  </div>

</template>

<script type="text/ecmascript-6">
  import MyDialog from './base/dialog.vue'
  import LogForm from './logForm.vue'
  import RegForm from './regForm.vue'

  export default {
    components: {
      MyDialog,
      LogForm,
      RegForm
    },
    data () {
      return {
        logDialogVisible: false,
        regDialogVisible: false,
        aboutDialogVisible: false,
        alertDialogVisible: false,
        logTite: '登录',
        regTitle: '注册',
        aboutTite: '关于',
        name: '',
        width: '50%',
        isSuccessRes: false,
        resMessage: ''
      }
    },
    methods: {
      confirmDialog (obj) {
        this.logDialogVisible = obj
        this.regDialogVisible = obj
        this.aboutDialogVisible = obj
        this.alertDialogVisible = obj
      },
      cancelDialog (obj) {
        this.logDialogVisible = obj
        this.regDialogVisible = obj
        this.aboutDialogVisible = obj
        this.alertDialogVisible = obj
      },
      // hasLogin (obj) {
      //   this.name = obj.data.username
      //   this.loginSuccess = true
      // },
      quitLogin () {
        this.$store.commit('isLogin', null)
        this.$router.push('/')
      },
      getDialogWidth (newValue) {
        this.width = newValue
      },
      // showAlertDoalog (obj) {
      //   this.alertDialogVisible = obj
      // }
      getRegResponseRes (obj) {
        this.alertDialogVisible = obj.alertDialogVisible
        this.regDialogVisible = obj.dialogVisible
        this.logDialogVisible = obj.dialogVisible
        this.resMessage = obj.resMessage
        this.isSuccessRes = obj.isSuccessRes
      }
    },
    computed: {
      user () {
        // 因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
        return this.$store.state.user
      }
    }
  }
</script>

<style>
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    background: #fffcdb;
    font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 14px;
    color: #444;
  }

  .app-head {
    background: #fff;
    color: #1484c5;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }

  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .head-logo {
    float: left;
  }

  .app-head-inner img {
    width: 50px;
    margin-top: 20px;
  }

  .head-nav {
    float: right;
    background-color: #fea100;
    border-radius: 20px;
    height: 30px;
    line-height: 30px;
    padding: 2px 20px;
    margin-top: 55px;
  }

  .head-nav ul {
    overflow: hidden;
  }

  .head-nav li {
    cursor: pointer;
    float: left;
    vertical-align: middle;
    color: #fff;
  }

  .app-foot-right {
    height: 25px;
    color: #fea100;
    margin-right: 6%;
    text-align: center;
    vertical-align: middle;
  }

  .nav-pile {
    padding: 0 10px;
  }

  .app-foot {
    text-align: center;
    height: 80px;
    width: 100%;
    background: #fffcdb;
    clear: both;
    line-height: 80px;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
  }

  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }

  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }

  .button:hover {
    background: #4fc08d;
  }

  .g-form {

  }

  .g-form-line {
    padding: 15px 0;
  }

  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }

  .g-form-input {
    display: inline-block;
  }

  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }

  .g-form-btn {
    padding-left: 100px;
  }

  .g-form-error {
    color: red;
    padding-left: 15px;
  }

  .el-dialog__body p {
    text-align: center;
  }

  .el-icon-circle-check-outline, .el-icon-circle-close-outline {
    width: 100%;
    text-align: center;
    margin-top: -5%;
    font-size: 41px;
    height: 50px;
    line-height: 50px;
    padding-right: 10px;
  }

  .el-icon-circle-check-outline {
    color: #64cc4d;
  }

  .el-icon-circle-close-outline {
    color: #cc2e11;
  }

  .el-icon-circle-check-outline span, .el-icon-circle-close-outline span {
    font-size: 20px;
    color: #1E3414;
    vertical-align: middle;
  }

  .content p {
    text-align: left;
    text-indent: 2em
  }
</style>
