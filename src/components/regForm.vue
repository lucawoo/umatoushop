<template>
  <div class="login-form">
    <div id="errorMessage" v-if="responseRes.showErrormsg">
      <i class="el-icon-remove" style="font-size: 22px;"/>
      <p class="error" v-html="errorMsg"></p>
    </div>
    <el-form ref="form" :model="form" label-width="120px">
      <div id="username"><span>用户名:</span>
        <div :class="{'div-focus':showBorder,'div-blur': hideBorder}">
          <input v-model="form.usernameModel" placeholder="请输入用户名" @focus="getfocus()" @blur="userNameBlur"
                 style="width: 145px;">
          <span>@umatou.com</span>
        </div>
      </div>
    </el-form>
    <el-form ref="form" :model="form" label-width="120px">
      <div id="password"><span>密码：</span>
        <input type="password" v-model="form.passwordModel" placeholder="请输入密码" @blur="passWordBlur">
      </div>
    </el-form>
    <el-form ref="form" :model="form" label-width="120px">
      <div id="checkPassword"><span>确认密码：</span>
        <input type="password" v-model="form.checkPasswordModel" placeholder="确认密码" @blur="comfirmPassWordBlur"
               style="margin-right: 28px">
      </div>
    </el-form>
    <el-form ref="form" :model="form" label-width="40%">
      <el-form-item>
        <el-button style="background-color: #ff5722;color:#faffdf" @click="onRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    created () {
      this.userNameBlur()
    },
    props: {},
    data () {
      return {
//        checkPasswordErrorText: '',
        responseRes: {
          dialogVisible: false,
          alertDialogVisible: false,
          resMessage: '',
          showErrormsg: false,
          isSuccessRes: false
        },
        form: {
          usernameModel: '',
          passwordModel: '',
          checkPasswordModel: ''
        },
        showBorder: false,
        hideBorder: false,
        errorMsg: ''
      }
    },
    methods: {
      getfocus () {
        this.showBorder = true
        this.hideBorder = false
      },
      checkUsername () {
        if (!this.form.usernameModel.match(/^[a-zA-Z]\w{5,17}$/) && this.registering === true && this.form.usernameModel !== '') {
          this.errorMsg = '用户名必须<span style="color: red">6~18个字符</span>，可使用字母、数字、下划线，需以<span style="color: red">字母开头</span>'
          this.responseRes.showErrormsg = true
          return false
        } else {
          this.errorMsg = ''
          this.responseRes.showErrormsg = false
          this.registering = true
          return true
        }
      },
      userNameBlur () {
        this.showBorder = false
        this.hideBorder = true
        this.checkUsername()
      },
      passWordBlur () {
        var flag = this.checkUsername()
        if (flag) {
          if (!this.form.passwordModel.match(/^\w{5,15}$/) && this.registering === true && this.form.passwordModel !== '') {
            this.errorMsg = '密码长度应为<span style="color: red">6~16个字符</span>'
            this.responseRes.showErrormsg = true
            return false
          } else {
            this.errorMsg = ''
            this.responseRes.showErrormsg = false
            this.registering = true
            return true
          }
        }
      },
      comfirmPassWordBlur () {
        var flag = this.passWordBlur()
        if (flag) {
          if (this.form.passwordModel !== this.form.checkPasswordModel && this.registering === true) {
            this.errorMsg = '两次填写的密码不一致'
            this.responseRes.showErrormsg = true
          } else {
            this.errorMsg = ''
            this.responseRes.showErrormsg = false
            this.registering = true
          }
        }
      },
      onRegister () {
        this.comfirmPassWordBlur()
        if (this.errorMsg !== '') {
          return false
        }
        this.form.usernameModel = ''
        this.form.passwordModel = ''
        this.form.checkPasswordModel = ''
        this.responseRes.dialogVisible = false
        Toast({message: '注册成功！', iconClass: 'el-icon-success', duration: 1200})
        this.$emit('reg-response-res', this.responseRes)
      }
    }
  }
</script>

<style scoped>
  #password input, #username div, #checkPassword input {
    background-color: #fff;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 22px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 60%;
  }

  #password input, #checkPassword input {
    border: 1px solid #dcdfe6;
  }

  #username input {
    border: none;
    height: 36px;
    line-height: 33px;
    vertical-align: middle;
  }

  #password input:focus {
    border-color: #409EFF;
    outline: 0
  }

  #username input:focus {
    border: none;
    outline: none;
  }

  .div-focus {
    border: 1px solid #409EFF;
  }

  .div-blur {
    border: 1px solid #dcdfe6;
  }

  #checkPassword input:focus {
    border-color: #409EFF;
    outline: 0
  }

  #username, #password, #checkPassword {
    text-align: center;
    margin: 20px 10px
  }

  #username span, #password span, #checkPassword span {
    padding-right: 10px
  }

  #errorMessage {
    overflow: hidden;
    width: 325px;
    margin: 0px auto;
    background-color: rgba(255, 0, 0, 0.11);
    padding: 11px;
  }

  .el-icon-remove {
    color: #f40;
    float: left;
    font-size: 22px;
    padding: 0px 12px 0px 14px;
  }

  .error {
    float: left;
    white-space: normal;
    word-wrap: break-word;
    width: 80%;
    text-align: left;
  }

  .error span {
    color: red;
  }

  .errorSpan {
    color: red;
  }

  .el-form-item__content {
    margin-left: 45%;
  }
</style>
