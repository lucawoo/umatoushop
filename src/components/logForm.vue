<template>
  <div class="login-form">
    <div id="errorMessage" v-if="responseRes.showErrormsg">
      <i class="el-icon-remove" style="font-size: 22px;"/>
      <p class="error">你输入的密码和账户名不匹配，是否<span>忘记密码</span>或<span>忘记会员名</span></p>
    </div>
    <el-form ref="form" :model="form" label-width="120px">
      <div id="username"><span>用户名:</span>
        <div :class="{'div-focus':showBorder,'div-blur': hideBorder}">
          <input v-model="form.usernameModel" placeholder="请输入用户名" @focus="getfocus()" @blur="blur"
                 style="width: 145px;">
          <span>@umatou.com</span>
        </div>
      </div>
    </el-form>
    <el-form ref="form" :model="form" label-width="120px">
      <div id="password"><span>密码：</span>
        <input type="password" v-model="form.passwordModel" placeholder="请输入密码">
      </div>
    </el-form>
    <el-form ref="form" :model="form" label-width="40%">
      <el-form-item>
        <el-button style="background-color: #ff5722;color:#faffdf" @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'

  export default {
    created () {
      this.blur()
    },
    data () {
      return {
        responseRes: {
          dialogVisible: false,
          alertDialogVisible: false,
          showErrormsg: false
        },
        form: {
          usernameModel: '',
          passwordModel: ''
        },
        showBorder: false,
        hideBorder: false
      }
    },
    computed: {
    },
    methods: {
      getfocus () {
        this.showBorder = true
        this.hideBorder = false
      },
      blur () {
        this.showBorder = false
        this.hideBorder = true
      },
      onLogin () {
        let params = {
          username: this.form.usernameModel + '@umatou.com',
          password: this.form.passwordModel
        }
        this.$http.get('/api/login', params)
          .then(
            (response) => {
              var usersDataRes = response.data.usersDataRes
              // 模拟后台数据的处理
              var i = 0
              var flag = false
              for (i = 0; i < usersDataRes.length; i++) {
                if (usersDataRes[i].username === (this.form.usernameModel + '@umatou.com') && usersDataRes[i].password === this.form.passwordModel) {
                  flag = true
                  this.dialogVisible = false
                  this.$emit('cancel-dialog', this.dialogVisible)
                  break
                }
              }
              this.responseRes.dialogVisible = false
              this.responseRes.alertDialogVisible = true
              if (flag) {
                this.$store.commit('isLogin', usersDataRes[i])
                Toast({message: '登录成功！', iconClass: 'el-icon-success', duration: 1200})
                this.$emit('reg-response-res', this.responseRes)
                this.$router.push({path: ''})
              } else {
                this.responseRes.showErrormsg = true
              }
            },
            (errorMsg) => {
              console.log(errorMsg)
            }
          )
      }
    }
  }
</script>

<style scoped>
  #password input, #username div {
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

  #password input {
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

  #username, #password {
    text-align: center;
    margin: 20px 10px
  }

  #errorMessage {
    overflow: hidden;
    width: 317px;
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
    width: 63%;
    text-align: left;
  }

  .error span {
    color: red;
  }

  .el-form-item__content {
    margin-left: 45%;
  }
</style>
