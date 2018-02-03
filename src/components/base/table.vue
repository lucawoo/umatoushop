<template>
  <div>
    <el-table :data="sendTableData" style="width: 100%" :default-sort="{prop: 'orderId', order: 'descending'}">
      <el-table-column v-for="item in tableHeads" :key="item.prop"
                       :prop="item.prop"
                       :label="item.label"
                       :sortable="item.sortable"
                       :min-width="item.width" style="text-align: center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tableHeads: {
        type: Array,
        dafault: []
      },
      sendTableData: {
        type: Array,
        dafault: []
      }
    },
    data () {
      return {}
    },
    methods: {
      formatter (row, column) {
        return row.address
      }
    }
  }
</script>

<style scoped>
</style>
