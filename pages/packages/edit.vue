<template>
  <view class="page-wrapper">
    <view class="page-bg"></view>
    
    <view class="container">
      <view class="form-content">
        <!-- 平台选择 -->
        <view class="platform-select">
          <text class="label">选择平台</text>
          <view class="platform-cards">
            <view
              v-for="platform in platforms"
              :key="platform"
              class="platform-card"
              :class="{ active: formData.platform === platform }"
              @click="selectPlatform(platform)"
            >
              <image
                class="platform-icon"
                :src="getPlatformIcon(platform)"
                mode="aspectFit"
              />
              <text class="platform-name">{{ platform }}</text>
            </view>
          </view>
        </view>

        <!-- 表单输入 -->
        <view class="form-item">
          <text class="label">商品名称</text>
          <input
            class="input"
            v-model="formData.name"
            placeholder="请输入商品名称"
            :focus="true"
          />
        </view>

        <view class="form-item">
          <text class="label">价格（选填）</text>
          <input
            class="input"
            v-model="formData.price"
            type="digit"
            placeholder="请输入价格"
          />
        </view>

        <!-- 添加日期选择 -->
        <view class="form-item">
          <text class="label">日期</text>
          <uni-datetime-picker
            type="date"
            v-model="formData.date"
            :border="false"
            @change="handleDateChange"
          >
            <view class="date-picker">
              <text class="date-text">{{ formatDate(formData.date) }}</text>
              <uni-icons type="calendar" size="16" color="#666" />
            </view>
          </uni-datetime-picker>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="footer">
        <button class="submit-btn" @click="submitForm">确定</button>
      </view>
    </view>
  </view>
</template>

<script>
import taobao from "@/static/images/taobao.png";
import jingdong from "@/static/images/jd.png";
import pinduoduo from "@/static/images/pinduoduo.png";
import douyin from "@/static/images/douyin.png";
import other from "@/static/images/other.png";

export default {
  data() {
    return {
      isEdit: false,
      editDate: '',
      editIndex: -1,
      formData: {
        platform: "淘宝",
        name: "",
        price: "",
        time: "",
        checked: false,
        date: new Date().toISOString().split('T')[0],
      },
      platforms: ["淘宝", "京东", "拼多多", "抖音", "其他"],
      taobao,
      jingdong,
      pinduoduo,
      douyin,
      other,
    };
  },
  onLoad(options) {
    // 判断是否是编辑模式
    if (options.type === 'edit') {
      this.isEdit = true;
      const editData = uni.getStorageSync('editData');
      if (editData) {
        const data = JSON.parse(editData);
        this.formData = { ...data.item };
        this.editDate = data.date;
        this.editIndex = data.index;
        // 清除临时存储
        uni.removeStorageSync('editData');
      }
    } else {
      // 添加模式，设置当前时间
      this.formData.time = this.getCurrentTime();
    }
  },
  methods: {
    vibrateShort() {
      uni.vibrateShort({
        success: function () {
          console.log('振动成功');
        }
      });
    },
    selectPlatform(platform) {
      this.formData.platform = platform;
      this.vibrateShort();
    },
    getCurrentTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    getPlatformIcon(platform) {
      const icons = {
        淘宝: this.taobao,
        京东: this.jingdong,
        拼多多: this.pinduoduo,
        抖音: this.douyin,
        其他: this.other,
      };
      return icons[platform] || this.other;
    },
    formatDate(dateStr) {
      const [year, month, day] = dateStr.split('-');
      return `${year}年${parseInt(month)}月${parseInt(day)}日`;
    },
    handleDateChange(value) {
      this.formData.date = value;
      this.vibrateShort();
    },
    submitForm() {
      if (!this.formData.name) {
        uni.showToast({
          title: '请输入商品名称',
          icon: 'none'
        });
        return;
      }

      // 返回上一页并传递数据
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      
      if (prevPage) {
        prevPage.$vm.handlePackageSubmit({
          data: {
            platform: this.formData.platform,
            name: this.formData.name,
            price: this.formData.price,
            time: this.formData.time,
            checked: this.formData.checked,
            date: this.formData.date,
          },
          isEdit: this.isEdit,
          editDate: this.editDate,
          editIndex: this.editIndex
        });
      }
      
      // 修改返回逻辑
      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
          success: () => {
            console.log('返回成功');
          },
          fail: (err) => {
            console.error('返回失败:', err);
            // 如果返回失败，尝试重定向到包裹页
            uni.redirectTo({
              url: '/pages/packages/index'
            });
          }
        });
      }, 50);
    }
  }
};
</script>

<style lang="scss">
// 使用与主页相同的样式变量
$theme-color: #0052d9;
$theme-light: rgba(0, 82, 217, 0.1);

.page-wrapper {
  min-height: 100vh;
  position: relative;
}

.page-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #0052d9 0%, #eef4fb 40%);
  z-index: -1;
}

.container {
  padding: 40rpx 30rpx;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.form-content {
  flex: 1;
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
}

// 平台选择样式
.platform-select {
  margin-bottom: 30rpx;

  .platform-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16rpx;
    margin-top: 16rpx;
  }

  .platform-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;
    padding: 16rpx;
    border: 1rpx solid #eee;
    border-radius: 12rpx;

    &.active {
      background: $theme-light;
      border-color: $theme-color;

      .platform-name {
        color: $theme-color;
      }
    }

    .platform-icon {
      width: 48rpx;
      height: 48rpx;
    }

    .platform-name {
      font-size: 24rpx;
      color: #666;
    }
  }
}

// 表单样式
.form-item {
  margin-bottom: 24rpx;

  .label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 12rpx;
    display: block;
    font-weight: 500;
  }

  .input {
    height: 80rpx;
    border: 1rpx solid #eee;
    border-radius: 12rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    background: #f8f9fc;
    color: #333;

    &::placeholder {
      color: #999;
    }
  }
}

// 提交按钮
.submit-btn {
  height: 88rpx;
  background: $theme-color;
  color: #fff;
  border-radius: 12rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background: #0049c6;
  }
}

// 添加日期选择器样式
.date-picker {
  height: 80rpx;
  border: 1rpx solid #eee;
  border-radius: 12rpx;
  padding: 0 20rpx;
  background: #f8f9fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .date-text {
    font-size: 28rpx;
    color: #333;
  }
  
  &:active {
    background: #f0f0f0;
  }
}

// 覆盖 uni-datetime-picker 默认样式
::v-deep .uni-date {
  width: 100%;
  
  .uni-date-editor {
    width: 100%;
  }
  
  .uni-date__x-input {
    display: none;
  }
}
</style> 