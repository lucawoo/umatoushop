<template>
  <div>
    <my-dialog :dialogshow="isShowDialog" :title="'添加新地址'" :widthDialog="'600px'"
               @cancel-dialog="closeDialog">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="姓名：">
          <el-input type="text" v-model="form.name" class="addressInput"></el-input>
        </el-form-item>

        <el-form-item label="性别：">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>

        <el-form-item label="送餐城市：">
          <el-cascader :options="allCities" v-model="form.citySelected" :props="props" expand-trigger="hover"
                       @change="cityHandleChange" class="addressInput"></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址：">
          <el-input type="textarea" v-model="form.detailAddress" class="addressInput"></el-input>
        </el-form-item>

        <el-form-item label="联系电话：">
          <el-input suffix-icon="el-icon-mobile-phone" v-model="form.mobile" class="addressInput"
                    @blur="checkMobile()"></el-input>
          <span class="g-form-error" v-if="mobileErrr">手机号码格式不正确</span>
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" class="addressBtn" @click="saveAddress">保存</el-button>
          <el-button type="primary" plain class="addressBtn" @click="closeDialog(false)">取消</el-button>
        </div>

      </el-form>
    </my-dialog>
    <!-- 提示框 -->
    <my-dialog :dialogshow="isShowResDialog" :title="resTitle" :widthDialog="'30%'"
               @cancel-dialog="closeResDialog">
      <i v-if="isSuccessRes" class="el-icon-circle-check-outline"><span>&nbsp;{{resMessage}}</span></i>
      <i v-if="!isSuccessRes" class="el-icon-circle-close-outline"><span>&nbsp;{{resMessage}}</span></i>
    </my-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyDialog from '../../components/base/dialog'

  export default {
    props: {
      showDialog: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      /* 显示保存地址的对话框 */
      isShowDialog () {
        this.myDialog = this.showDialog
        return this.myDialog
      },
      isShowResDialog () {
        return this.resDialog
      }
    },
    components: {
      MyDialog
    },
    data () {
      return {
        myDialog: false,
        allCities: [], // 城市列表
        props: {  // 城市key转换
          value: 'label',
          children: 'cities'
        },
        resDialog: false,
        resTitle: '',  // 结果对话框标题
        isSuccessRes: true, // 校验成功
        resMessage: '', // 结果对话框内容
        mobileErrr: false, // 校验手机号码格式
        form: {
          name: '', // 姓名
          sex: '', // 性别
          citySelected: [], // 被选择的城市
          cityToString: '', // 被选择的城市
          detailAddress: '',  // 送餐地址
          mobile: '' // 联系电话
        }
      }
    },
    created () {
      this.getCities()
    },
    methods: {
      /* 校验手机格式 */
      checkMobile () {
        if (!(/^1[34578]\d{9}$/.test(this.form.mobile))) {
          this.mobileErrr = true
        } else {
          this.mobileErrr = false
        }
      },
      /* 关闭保存地址的对话框 */
      closeDialog (data) {
        this.$emit('cancel-dialog', data)
      },
      /* 关闭提示对话框 */
      closeResDialog (data) {
        this.resDialog = data
      },
      /* 获取城市列表 */
      getCities () {
        this.$http.get('/api/getCities').then(
          (response) => {
            this.allCities = response.data.getCitiesRes
          },
          (errorRes) => {
            console.log(errorRes)
          })
      },
      /* 将选中的省、市、区转成字符串 */
      cityHandleChange (value) {
        this.form.citySelected = value
        var cityToString = ''
        for (var i = 0; i < value.length; i++) {
          cityToString += value[i] + '  '
        }
        this.form.cityToString = cityToString
      },
      /* 保存地址 */
      saveAddress () {
        /* 校验手机格式 */
        this.checkMobile()
        // 校验数据
        var checkSuccess = this.checkDate()
        // 存入vuex
        if (checkSuccess) {
          var data = this.form.name + ' ' + (this.form.sex === '1' ? '先生' : '女士') + ' ' + this.form.cityToString + '' +
            this.form.detailAddress + ' ' + this.form.mobile
          this.$store.commit('saveAddress', data)
          // 通知父组件保存完毕
          this.$emit('save-address-success', 'success')
          // 保存后关闭对话框
          this.closeDialog(false)
        }
      },
      /* 校验数据 */
      checkDate () {
        if (this.form.citySelected.length === 0) {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请选择城市！'
          this.resDialog = true
          return false
        } else if (this.form.detailAddress === '') {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请填写详细地址！'
          this.resDialog = true
          return false
        } else if (this.mobileErrr) {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请输入正确的手机号码！'
          this.resDialog = true
          return false
        } else if (this.form.name === '') {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请填写姓名！'
          this.resDialog = true
          return false
        } else if (this.form.sex === '') {
          this.isSuccessRes = false
          this.resTitle = '提示'
          this.resMessage = '请填写性别！'
          this.resDialog = true
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .addressInput {
    width: 300px;
  }

  .addressBtn {
    width: 70px;
  }

  .btn-group {
    margin-left: 200px;
  }

  .el-button--primary.is-plain {
    color: #c7cdd2;
    background: #ffffff;
    border-color: #dee2e7;
  }
</style>
