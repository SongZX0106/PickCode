<template>
  <view class="match-rules">
    <!-- 规则列表 -->
    <view class="rules-list" v-if="rulesList.length > 0">
      <view class="rule-card" v-for="(rule, index) in rulesList" :key="index">
        <view class="rule-info">
          <view class="rule-header">
            <view class="rule-name">{{rule.name}}</view>
            <switch 
              :checked="rule.enabled" 
              @change="(e) => handleStatusChange(index, e)"
              color="#0052d9"
            />
          </view>
          <view class="rule-time">添加时间 {{rule.createTime}}</view>
        </view>
        <view class="rule-actions">
          <view class="action-btn edit" @click="handleEdit(rule)">
            <uni-icons type="compose" size="18" color="#0052d9"></uni-icons>
            <text>编辑</text>
          </view>
          <view class="action-btn delete" @click="handleDelete(index)">
            <uni-icons type="trash" size="18" color="#ff4d4f"></uni-icons>
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <image src="/static/images/empty.png" mode="aspectFit"></image>
      <text>暂无匹配规则</text>
    </view>
    
    <!-- 添加按钮 -->
    <view class="add-btn" @click="handleAdd">
      <uni-icons type="plusempty" size="24" color="#fff"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rulesList: []
    }
  },
  
  onShow() {
    this.loadRulesList()
  },
  
  methods: {
    // 格式化日期
    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}年${month}月${day}日`
    },
    
    // 处理规则启用状态变化
    handleStatusChange(index, event) {
      const enabled = event.detail.value
      this.rulesList[index].enabled = enabled
      uni.setStorageSync('matchRulesList', JSON.stringify(this.rulesList))
      
      uni.showToast({
        title: enabled ? '规则已启用' : '规则已禁用',
        icon: 'none'
      })
    },
    
    // 加载规则列表
    loadRulesList() {
      const savedRules = uni.getStorageSync('matchRulesList') || '[]'
      const rules = JSON.parse(savedRules)
      // 格式化时间并确保有enabled属性
      this.rulesList = rules.map(rule => ({
        ...rule,
        enabled: rule.enabled !== undefined ? rule.enabled : true,
        createTime: this.formatDate(rule.createTime)
      }))
    },
    
    // 添加规则
    handleAdd() {
      uni.navigateTo({
        url: '/pages/my/match-settings?mode=add'
      })
    },
    
    // 编辑规则
    handleEdit(rule) {
      if (!rule.enabled) {
        uni.showToast({
          title: '请先启用该规则',
          icon: 'none'
        })
        return
      }
      uni.navigateTo({
        url: `/pages/my/match-settings?mode=edit&id=${rule.id}`
      })
    },
    
    // 删除规则
    handleDelete(index) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这条规则吗？',
        success: (res) => {
          if (res.confirm) {
            this.rulesList.splice(index, 1)
            uni.setStorageSync('matchRulesList', JSON.stringify(this.rulesList))
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.match-rules {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;
  
  .rules-list {
    .rule-card {
      background-color: #fff;
      border-radius: 12rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;
      
      .rule-info {
        margin-bottom: 16rpx;
        
        .rule-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8rpx;
        }
        
        .rule-name {
          font-size: 32rpx;
          color: #333;
          font-weight: 500;
        }
        
        .rule-time {
          font-size: 24rpx;
          color: #666;
        }
      }
      
      .rule-actions {
        display: flex;
        justify-content: flex-end;
        gap: 20rpx;
        
        .action-btn {
          display: flex;
          align-items: center;
          padding: 12rpx 20rpx;
          border-radius: 6rpx;
          
          text {
            font-size: 26rpx;
            margin-left: 6rpx;
          }
          
          &.edit {
            background-color: #e6f4ff;
            color: #0052d9;
          }
          
          &.delete {
            background-color: #fff1f0;
            color: #ff4d4f;
          }
        }
      }
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 200rpx;
    
    image {
      width: 200rpx;
      height: 200rpx;
      margin-bottom: 20rpx;
    }
    
    text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .add-btn {
    position: fixed;
    right: 40rpx;
    bottom: 40rpx;
    width: 100rpx;
    height: 100rpx;
    background-color: #0052d9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4rpx 16rpx rgba(0, 82, 217, 0.4);
    
    &:active {
      transform: scale(0.95);
    }
  }
}
</style> 