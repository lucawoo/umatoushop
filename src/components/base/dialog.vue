<template>
  <div>
    <el-dialog :title="title" :visible.sync="getDialogVisible" :width="widthDialog">
      <slot>empty</slot>
      <span slot="footer" class="dialog-footer" v-if="showConfirm">
        <el-button type="primary" @click="confirm()">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      dialogshow: {
        type: Boolean,
        dafault: false
      },
      title: {
        type: String,
        dafault: ''
      },
      widthDialog: {
        type: String,
        dafault: ''
      },
      showConfirm: {
        type: Boolean,
        dafault: false
      }
    },
    data () {
      return {
        dialogVisible: false
      }
    },
    computed: {
      getDialogVisible: {
        get: function () {
          this.dialogVisible = this.dialogshow
          return this.dialogVisible
        },
        set: function (newValue) {
          this.dialogVisible = newValue
          this.$emit('cancel-dialog', this.dialogVisible)
        }
      }
    },
    methods: {
      confirm () {
        this.dialogVisible = false
        this.$emit('confirm-dialog', this.dialogVisible)
      }
    }
  }
</script>

<style scoped>
  .drop-enter-active {
    transition: all .5s ease;
  }

  .drop-leave-active {
    transition: all .3s ease;
  }

  .drop-enter {
    transform: translateY(-500px);
  }

  .drop-leave-active {
    transform: translateY(-500px);
  }
</style>
