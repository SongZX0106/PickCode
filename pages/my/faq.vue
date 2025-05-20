<template>
  <view class="faq-container">
    <view class="faq-list">
      <!-- 问题1 -->
      <view class="faq-item">
        <view class="question">
          <text>为什么要获取短信授权？</text>
        </view>
        <view class="answer">
          <text>为了实现自动提取取件码的功能，应用需要读取您的短信内容。请放心：</text>
          <text>1. 应用仅在您主动点击"自动匹配"时才会读取短信</text>
          <text>2. 短信内容仅在本地用于提取取件码，不会上传到任何服务器</text>
          <text>3. 应用不会修改或删除您的任何短信</text>
          <text>4. 您可以随时在系统设置中关闭短信权限</text>
        </view>
      </view>

      <!-- 问题2 -->
      <view class="faq-item">
        <view class="question">
          <text>为什么点击自动匹配没有效果？</text>
        </view>
        <view class="answer">
          <text>可能有以下几个原因：</text>
          <text>1. 没有添加匹配规则：请先在"匹配设置"中添加并启用至少一条规则</text>
          <text>2. 权限问题：请确保在系统设置中允许应用访问短信</text>
          <text>3. 设备限制：iOS设备因系统限制，无法读取短信内容</text>
          <text>4. 短信权限：某些手机（如小米）需要额外开启"通知类短信"权限</text>
          <view class="faq-btn-row">
            <button class="notify-btn mini-btn" @click="openPermissionSetting">
              <uni-icons type="notification" size="20" color="#1673ff" />
              <text>开启通知类权限</text>
            </button>
            <button class="tutorial-btn mini-btn" @click="openTutorial">
              <uni-icons type="image" size="20" color="#1673ff" />
              <text>查看图文教程</text>
            </button>
          </view>
        </view>
      </view>

      <!-- 问题3 -->
      <view class="faq-item">
        <view class="question">
          <text>为什么自动匹配出来的内容不全？</text>
        </view>
        <view class="answer">
          <text>这个问题通常可以通过以下方式解决：</text>
          <text>1. 检查匹配规则是否正确：在"匹配设置"中确认起始和结束文字是否与短信内容完全一致</text>
          <text>2. 测试规则：在添加或编辑规则时，可以粘贴完整短信内容进行测试</text>
          <text>3. 权限问题：如果使用小米手机，请确保在系统设置中开启了"通知类短信"权限</text>
          <text>4. 多条规则：如果一条规则无法完全匹配，可以添加多条规则来适应不同格式的短信</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    openPermissionSetting() {
      // #ifdef APP-PLUS
      // 安卓跳转到应用权限设置
      if (uni.getSystemInfoSync().platform === 'android') {
        uni.openAppAuthorizeSetting();
      } else {
        // iOS 跳转到设置
        plus.runtime.openURL('app-settings:');
      }
      // #endif
      // #ifdef H5
      uni.showToast({ title: '请在手机系统设置中手动开启权限', icon: 'none' });
      // #endif
    },
    openTutorial() {
      // #ifdef H5
      window.open('https://gitee.com/szxio/pick-up-code-app/blob/master/OpenSMSTutorial.md');
      // #endif
      
      // #ifdef APP-PLUS
      plus.runtime.openURL('https://gitee.com/szxio/pick-up-code-app/blob/master/OpenSMSTutorial.md');
      // #endif
    }
  }
}
</script>

<style lang="scss">
.faq-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;

  .faq-list {
    .faq-item {
      background-color: #fff;
      border-radius: 12rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;

      .question {
        font-size: 32rpx;
        font-weight: 500;
        color: #333;
        margin-bottom: 16rpx;
      }

      .answer {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        text {
          font-size: 28rpx;
          color: #666;
          line-height: 1.5;
        }

        .code-ref {
          font-size: 24rpx;
          color: #999;
          margin-top: 8rpx;
        }
      }
    }
  }
}

.faq-btn-row {
  display: flex;
  gap: 20rpx;
  margin-top: 20rpx;
}

.mini-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 24rpx;
  padding: 8rpx 18rpx;
  border-radius: 6rpx;
  height: 80rpx;
  min-width: 0;
  flex: 1;
  justify-content: center;
}

.notify-btn.mini-btn {
  background: #eaf3ff;
  color: #1673ff;
  border: 1rpx solid #1673ff;
}

.tutorial-btn.mini-btn {
  background: #fff;
  color: #1673ff;
  border: 1rpx solid #1673ff;
}
</style> 