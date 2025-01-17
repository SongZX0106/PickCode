<template>
  <view class="changelog-container">
    <view class="version-list">
      <!-- 1.0.1 -->
      <view class="version-item">
        <view class="version-header">
          <text class="version-name">v1.0.1</text>
          <text class="version-date">2024-03-21</text>
        </view>
        <view class="update-list">
          <view class="update-item">
            <text class="tag feature">新增</text>
            <text class="content">添加预制匹配规则功能</text>
          </view>
          <view class="update-item">
            <text class="tag feature">新增</text>
            <text class="content">添加软件介绍和更新记录</text>
          </view>
          <view class="update-item">
            <text class="tag optimize">优化</text>
            <text class="content">优化取件码列表显示效果</text>
          </view>
          <view class="update-item">
            <text class="tag fix">修复</text>
            <text class="content">修复部分机型无法正确读取短信的问题</text>
          </view>
        </view>
      </view>

      <!-- 1.0.0 -->
      <view class="version-item">
        <view class="version-header">
          <text class="version-name">v1.0.0</text>
          <text class="version-date">2024-03-20</text>
        </view>
        <view class="update-list">
          <view class="update-item">
            <text class="tag feature">新增</text>
            <text class="content">首次发布</text>
          </view>
          <view class="update-item">
            <text class="tag feature">新增</text>
            <text class="content">支持自定义匹配规则</text>
          </view>
          <view class="update-item">
            <text class="tag feature">新增</text>
            <text class="content">支持自动读取短信提取取件码</text>
          </view>
          <view class="update-item">
            <text class="tag feature">新增</text>
            <text class="content">支持取件码历史记录管理</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.changelog-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx;
  box-sizing: border-box;

  .version-list {
    .version-item {
      background: #fff;
      border-radius: 20rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;

      .version-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .version-name {
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
        }

        .version-date {
          font-size: 24rpx;
          color: #999;
        }
      }

      .update-list {
        .update-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16rpx;

          &:last-child {
            margin-bottom: 0;
          }

          .tag {
            flex-shrink: 0;
            padding: 4rpx 12rpx;
            border-radius: 6rpx;
            font-size: 24rpx;
            margin-right: 12rpx;
            
            &.feature {
              background: #e6f4ff;
              color: #0052d9;
            }
            
            &.optimize {
              background: #f0f7ff;
              color: #1677ff;
            }
            
            &.fix {
              background: #fff2e8;
              color: #fa8c16;
            }
          }

          .content {
            flex: 1;
            font-size: 28rpx;
            color: #666;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style> 