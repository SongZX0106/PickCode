<template>
  <view class="my-container">
    <!-- 顶部区域 -->
    <view class="header">
      <view class="user-info">
        <image
          class="avatar"
          src="/static/images/avatar.png"
          mode="aspectFill"
        ></image>
        <text class="nickname">取件码</text>
      </view>
      <view class="scan-btn" @click="handleScan">
        <uni-icons type="scan" size="24" color="#fff"></uni-icons>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="content-wrapper">
      <view class="menu-list">
        <view class="menu-item" @click="navigateTo('/pages/my/match-rules')">
          <view class="menu-left">
            <uni-icons type="settings" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">匹配设置</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/my/data-export')">
          <view class="menu-left">
            <uni-icons type="download" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">数据导出</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/my/faq')">
          <view class="menu-left">
            <uni-icons type="help" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">常见问题</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/my/contact')">
          <view class="menu-left">
            <uni-icons type="chat" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">联系作者</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>

      <view class="version">
        <text>v{{version}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      version: "1.0.0",
    };
  },
  onLoad(options) {
    this.getAppVersion();
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url,
      });
    },
    handleScan() {
      uni.scanCode({
        success: (res) => {
          console.log("扫码结果：", res);
          // 处理扫码结果
        },
      });
    },
    getAppVersion() {
      // #ifdef APP-PLUS
      // App 环境下获取真实版本号
      try {
        this.version = plus.runtime.version;
      } catch (e) {
        console.error("获取版本号失败:", e);
      }
      // #endif

      // #ifdef H5
      // H5 环境下可以设置一个固定版本号
      this.version = "1.0.0";
      // #endif
    },
  },
};
</script>

<style lang="scss">
.my-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #0052d9 0%, #eef4fb 40%);
  position: relative;
  padding-bottom: 100rpx;
  box-sizing: border-box;

  .header {
    position: relative;
    height: 320rpx;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    padding-top: 50px;
    color: #fff;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 60rpx;
        margin-right: 24rpx;
      }

      .nickname {
        font-size: 36rpx;
        font-weight: 500;
      }
    }
  }

  .content-wrapper {
    position: relative;
    margin: -0 20px 0;
    z-index: 1;

    .menu-list {
      background-color: #fff;
      border-radius: 12rpx;
      overflow: hidden;

      .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32rpx 24rpx;
        border-bottom: 1px solid rgba(238, 238, 238, 0.8);

        .menu-left {
          display: flex;
          align-items: center;

          .menu-text {
            margin-left: 16rpx;
            font-size: 28rpx;
            color: #333;
          }
        }

        &:last-child {
          border-bottom: none;
        }

        &:active {
          background-color: rgba(245, 245, 245, 0.8);
        }
      }
    }

    .version {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 40rpx;
      text-align: center;
      color: #666;
      font-size: 24rpx;
    }
  }
}
</style>
