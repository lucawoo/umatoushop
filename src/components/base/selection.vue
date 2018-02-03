<template>
  <div class="select">
    <el-select v-model="selected" size="small" filterable placeholder="请选择" @change="returnSelectedData">
      <el-option
        v-for="item in selections"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    props: {
      selections: {
        type: Array,
        default: function () {
          return [
            {
              label: '请选择',
              value: 0
            }
          ]
        }
      },
      selectedValue: {
        type: Number,
        default: 0
      }
    },
    computed: {
      selected: {
        get: function () {
          this.value = this.selectedValue
          return this.value
        },
        set: function (newValue) {
          this.value = newValue
        }
      }
    },
    data () {
      return {
        value: []
      }
    },
    methods: {
      returnSelectedData () {
        this.$emit('get-selected-data', this.value)
      }
    }
  }
</script>

<style scoped>
  .select {
    width: 140px;
    display: inline-block;
  }
</style>
