<template>
  <div class="order-list-option"  >
    <el-date-picker  v-model="value"  type="date"
      placeholder="选择日期" size="small" @change="returnDataPicker">
    </el-date-picker>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        value: ''
      }
    },
    methods: {
      returnDataPicker () {
        this.$emit('get-date-picker', this.value)
      }
    }
  }
</script>
