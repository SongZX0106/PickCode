<template>
  <view class="my-container">
    <!-- 顶部区域 -->
    <view class="header">
      <view class="user-info">
        <image
          class="avatar"
          src="/static/config-icons/mipmap-xxhdpi/ic_launcher.png"
          mode="aspectFill"
        ></image>
        <text class="nickname">快递取件助手</text>
        <text class="slogan">让取件更简单</text>
      </view>
    </view>

    <!-- 统计卡片 -->
    <view class="stats-card">
      <view class="stat-item">
        <text class="stat-value">{{stats.total}}</text>
        <text class="stat-label">累计收到</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item">
        <text class="stat-value">{{stats.picked}}</text>
        <text class="stat-label">累计取走</text>
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
        <view class="menu-item" @click="navigateTo('/pages/my/about')">
          <view class="menu-left">
            <uni-icons type="info" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">软件介绍</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
        <view class="menu-item" @click="handleAbout">
          <view class="menu-left">
            <uni-icons type="upload" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">更新记录</text>
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
        <view class="menu-item" @click="showSharePopup">
          <view class="menu-left">
            <uni-icons type="redo" size="20" color="#1673ff"></uni-icons>
            <text class="menu-text">分享软件</text>
          </view>
          <uni-icons type="right" size="16" color="#999"></uni-icons>
        </view>
      </view>

      <view class="version">
        <text>v{{version}}</text>
      </view>
    </view>

    <!-- 分享弹窗 -->
    <uni-popup ref="sharePopup" type="center">
      <view class="share-popup">
        <image 
          class="qrcode" 
          src="/static/images/searchCode.png" 
          mode="aspectFit"
        ></image>
        <text class="share-tip">扫码下载最新版本</text>
        <button class="close-btn" @click="closeSharePopup">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      version: "1.0.0",
      stats: {
        total: 0,
        picked: 0
      }
    };
  },
  onLoad(options) {
    this.getAppVersion();
  },
  onShow() {
    this.loadStats();
  },
  methods: {
    navigateTo(url) {
      uni.navigateTo({
        url,
      });
    },
    showSharePopup() {
      this.$refs.sharePopup.open();
    },
    closeSharePopup() {
      this.$refs.sharePopup.close();
    },
    handleAbout() {
      // #ifdef H5
      window.open('https://gitee.com/szxio/pick-up-code-app');
      // #endif
      
      // #ifdef APP-PLUS
      plus.runtime.openURL('https://gitee.com/szxio/pick-up-code-app');
      // #endif
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
    loadStats() {
      try {
        // 从本地存储获取所有取件码记录
        const packageCodes = JSON.parse(uni.getStorageSync('packageCodes') || '[]');
        
        // 计算统计数据
        this.stats.total = packageCodes.length;
        this.stats.picked = packageCodes.filter(item => item.isPicked).length;
      } catch (e) {
        console.error('加载统计数据失败:', e);
      }
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
    height: 300rpx;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    padding-top: 100px;
    color: #fff;

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        margin-bottom: 24rpx;
      }

      .nickname {
        font-size: 36rpx;
        font-weight: 500;
        line-height: 1;
        margin-bottom: 12rpx;
      }

      .slogan {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1;
        margin-top: 10rpx;
      }
    }
  }

  .stats-card {
    margin: 20rpx 40rpx 0;
    margin-top: 52px;
    background: #fff;
    border-radius: 20rpx;
    padding: 32rpx 40rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    z-index: 2;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;

      .stat-value {
        font-size: 48rpx;
        font-weight: 600;
        color: #0052d9;
        margin-bottom: 12rpx;
      }

      .stat-label {
        font-size: 26rpx;
        color: #666;
      }
    }

    .stat-divider {
      width: 2rpx;
      height: 50rpx;
      background: #eee;
      margin: 0 20rpx;
    }
  }

  .content-wrapper {
    position: relative;
    margin: 48rpx 20px 0;
    z-index: 1;

    .menu-list {
      background-color: #fff;
      border-radius: 20rpx;
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

  .share-popup {
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    width: 600rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .qrcode {
      width: 400rpx;
      height: 400rpx;
      margin-bottom: 20rpx;
    }
    
    .share-tip {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 30rpx;
    }
    
    .close-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      background: #f5f5f5;
      border-radius: 44rpx;
      font-size: 30rpx;
      color: #333;
      border: none;
      
      &:active {
        opacity: 0.8;
      }
      
      &::after {
        border: 1px solid #ddd;
        border-radius: 44rpx;
      }
    }
  }
}
</style>
