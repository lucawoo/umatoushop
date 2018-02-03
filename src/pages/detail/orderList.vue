<template>
  <div class="container">
    <el-row>
      <el-col :span="24">
        <el-table :data="pageData" style="width: 100%">
          <el-table-column prop="orderDate" label="订单日期" sortable align="center"></el-table-column>
          <el-table-column prop="orderName" label="订单名称" align="center"></el-table-column>
          <el-table-column prop="orderNumber" label="购买数量" align="center"></el-table-column>
          <el-table-column prop="orderPrice" label="订单总金额" :formatter="orderPriceFormatter"
                           align="center"></el-table-column>
          <el-table-column prop="orderStatus" label="订单状态"
                           :filters="[{ text: '待支付', value: '待支付' },
                           { text: '已支付', value: '已支付' }, { text: '已取消', value: '已取消' }]"
                           :filter-method="filterTag" filter-placement="bottom-end" align="center">
            <template slot-scope="scope">
              <el-tag :type="tagClass(scope.row.orderStatus)"
                      close-transition>{{scope.row.orderStatus}}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <el-pagination style="margin-top: 10px"
                       background layout="prev, pager, next" :total="total" @current-change="currentChange">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    created () {
      this.$http.get('/api/getTableData').then(
        (response) => {
          this.tableData = response.data.tableDataRes
          for (var i = 0; i <= 9; i++) {
            if (typeof this.tableData[i] === 'undefined') {
              break
            }
            this.pageData.push(this.tableData[i])
          }
        },
        (errmsg) => {
          console.log(errmsg)
        }
      )
      this.currentChange(1)
    },
    data () {
      return {
        tableData: [],
        pageData: []
      }
    },
    computed: {
      total () {
        return this.tableData.length
      }
    },
    methods: {
      currentChange (value) {
        this.pageData = []
        var startPage = (value - 1) * 10
        var EndPage = (value) * 10 - 1
        for (var i = startPage; i <= EndPage; i++) {
          if (typeof this.tableData[i] === 'undefined') {
            break
          }
          this.pageData.push(this.tableData[i])
        }
      },
      filterTag (value, row) {
        return row.orderStatus === value
      },
      tagClass (status) {
        if (status === '待支付') {
          return 'warning'
        } else if (status === '已支付') {
          return 'success'
        } else {
          return 'info'
        }
      },
      orderPriceFormatter (row, column) {
        return '¥' + row.orderPrice + '元'
      }
    }
  }
</script>

<style scoped>
  .container {
    margin: 30px auto;
    width: 90%;
  }
</style>
