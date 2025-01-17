<template>
  <view class="about-container">
    <view class="about-content">
      <text class="title">快递取件助手</text>
      <text class="desc">快递取件助手是一款专注于快递取件场景的实用工具。它能够自动识别并提取快递短信中的取件码，让您不再需要手动复制粘贴或记忆繁琐的取件码。</text>
      
      <text class="subtitle">主要特点：</text>
      <view class="features">
        <text>1. 智能提取：一键从短信中提取取件码、快递公司和取件地点等信息</text>
        <text>2. 自定义规则：支持添加和编辑匹配规则，适应不同快递公司的短信格式</text>
        <text>3. 历史记录：自动记录所有取件码，并标记已取和未取状态</text>
        <text>4. 隐私保护：所有数据存储在本地，不会上传服务器，充分保护您的隐私</text>
        <text>5. 简洁界面：采用清新简约的设计风格，操作直观便捷</text>
      </view>
      
      <text class="desc">无论是在快递柜、自提点，还是快递驿站取件，这款应用都能帮您快速找到取件码。它特别适合经常网购的用户，能够有效节省找码时间，让取件过程更加轻松愉快。</text>
      
      <text class="desc">开源免费，无广告，无需注册，安装即用。让每一次取件都变得简单高效。</text>
      
      <button class="github-btn" @click="handleGithub">
        <uni-icons type="github" size="20" color="#333"></uni-icons>
        <text>查看源码</text>
      </button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleGithub() {
      // #ifdef H5
      window.open('https://gitee.com/szxio/pick-up-code-app');
      // #endif
      
      // #ifdef APP-PLUS
      plus.runtime.openURL('https://gitee.com/szxio/pick-up-code-app');
      // #endif
    }
  }
}
</script>

<style lang="scss">
.about-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx;
  box-sizing: border-box;
  
  .about-content {
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    
    .title {
      font-size: 40rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 30rpx;
      display: block;
    }
    
    .subtitle {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin: 30rpx 0 20rpx;
      display: block;
    }
    
    .desc {
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .features {
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      margin-bottom: 30rpx;
      
      text {
        font-size: 28rpx;
        color: #666;
        line-height: 1.5;
      }
    }
    
    .github-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12rpx;
      margin-top: 40rpx;
      background: #f5f5f5;
      border: none;
      height: 88rpx;
      border-radius: 44rpx;
      
      text {
        font-size: 30rpx;
        color: #333;
      }
      
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