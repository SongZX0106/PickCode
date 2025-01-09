<template>
  <view class="dialog-mask" v-if="show" @click="handleMaskClick">
    <view class="dialog-content" @click.stop>
      <view class="dialog-header">
        <text class="dialog-title">修改取件码</text>
      </view>
      <view class="dialog-body">
        <input 
          class="dialog-input"
          type="number"
          v-model="inputValue"
          placeholder="请输入新的取件码"
        />
      </view>
      <view class="dialog-footer">
        <text class="dialog-btn cancel" @click="handleCancel">取消</text>
        <text class="dialog-btn confirm" @click="handleConfirm">确定</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: ''
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.inputValue = this.value
      }
    }
  },
  methods: {
    handleMaskClick() {
      this.$emit('update:show', false)
    },
    handleCancel() {
      this.$emit('update:show', false)
    },
    handleConfirm() {
      if (this.inputValue.trim()) {
        this.$emit('confirm', this.inputValue)
        this.$emit('update:show', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dialog-content {
  width: 560rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.dialog-header {
  padding: 30rpx;
  text-align: center;
  border-bottom: 1rpx solid #eee;
}

.dialog-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.dialog-body {
  padding: 30rpx;
  box-sizing: border-box;
}

.dialog-input {
  width: 100%;
  height: 80rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.dialog-footer {
  display: flex;
  border-top: 1rpx solid #eee;
}

.dialog-btn {
  flex: 1;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  
  &.cancel {
    color: #999;
    border-right: 1rpx solid #eee;
  }
  
  &.confirm {
    color: #4facfe;
    font-weight: 500;
  }
  
  &:active {
    background-color: #f5f5f5;
  }
}
</style> 