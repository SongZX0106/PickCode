<template>
  <view class="page-wrapper" @click="handlePageClick">
    <view class="page-bg"></view>

    <view class="container">
      <view class="title-wrapper">
        <text class="title">包裹记录</text>
        <text class="version-text">V{{ version }}</text>
      </view>

      <!-- 包裹列表 -->
      <template v-for="(dateGroup, date) in groupedPackages" :key="date">
        <view class="card code-card">
          <view class="card-header">
            <text class="card-title">{{ date }}</text>
            <view class="header-right">
              <text class="card-extra">
                <text class="pending-count">{{
                  getTotalAmount(dateGroup)
                }}</text>
                <text>元</text>
              </text>
            </view>
          </view>

          <view class="code-list">
            <!-- 按平台分组显示 -->
            <view
              v-for="(items, platform) in dateGroup"
              :key="platform"
              class="platform-group"
            >
              <view class="platform-header">
                <image
                  class="platform-icon"
                  :src="getPlatformIcon(platform)"
                  mode="aspectFit"
                />
                <text class="platform-name">{{ platform }}</text>
              </view>

              <view
                class="package-item"
                v-for="(item, index) in items"
                :key="index"
              >
                <view class="package-content">
                  <view class="package-name text-ellipsis">{{
                    item.name
                  }}</view>
                  <view class="package-meta">
                    <text class="package-time">{{
                      formatTime(item.date)
                    }}</text>
                  </view>
                </view>

                <view class="package-actions">
                  <view class="package-price">
                    {{ formatPrice(item.price) }}
                  </view>
                  <!-- 更多操作按钮 -->
                  <view class="more-actions">
                    <view
                      class="more-btn"
                      @click.stop="toggleMoreActions(item)"
                    >
                      <view class="dots">
                        <view class="dot"></view>
                        <view class="dot"></view>
                        <view class="dot"></view>
                      </view>
                    </view>

                    <!-- 操作菜单 -->
                    <view
                      class="action-menu"
                      v-if="item.showActions"
                      :class="{ 'menu-up': isLastItem(item) }"
                    >
                      <view class="action-item" @click.stop="editPackage(item)">
                        <uni-icons type="compose" size="16" />
                        <text>修改</text>
                      </view>
                      <view
                        class="action-item delete"
                        @click.stop="deletePackage(item)"
                      >
                        <uni-icons type="trash" size="16" />
                        <text>删除</text>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </view>

    <!-- 添加按钮 -->
    <view class="add-package-btn" @click="showAddPackage">
      <uni-icons type="plusempty" size="24" color="#fff" />
    </view>

    <!-- 添加包裹弹出层 -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">添加包裹</text>
          <view class="close-btn" @click="hideAddPackage">
            <uni-icons type="close" size="20" color="#999" />
          </view>
        </view>

        <view class="popup-body">
          <!-- 平台选择卡片 -->
          <view class="platform-select">
            <text class="label">选择平台</text>
            <view class="platform-cards">
              <view 
                v-for="(platform, index) in platforms" 
                :key="platform"
                class="platform-card"
                :class="{ active: platformIndex === index }"
                @click="selectPlatform(index)"
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

          <!-- 表单输入区域 -->
          <view class="form-inputs">
            <view class="form-item">
              <text class="label">商品名称</text>
              <input
                class="input"
                v-model="newPackage.name"
                placeholder="请输入商品名称"
                confirm-type="next"
                @confirm="focusPriceInput"
              />
            </view>

            <view class="form-item">
              <text class="label">价格</text>
              <input
                class="input"
                v-model="newPackage.price"
                type="digit"
                placeholder="请输入价格"
                ref="priceInput"
              />
            </view>
          </view>
        </view>

        <view class="popup-footer">
          <button class="submit-btn" @click="addPackage">确定</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      packages: [],
      platforms: ["淘宝", "京东", "拼多多", "其他"],
      platformIndex: 0,
      newPackage: {
        platform: "",
        name: "",
        price: "",
      },
      version: "1.0.0",
    };
  },
  computed: {
    groupedPackages() {
      const groups = {};
      this.packages.forEach((item) => {
        const date = new Date(item.date);
        const formattedDate = `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日`;

        if (!groups[formattedDate]) {
          groups[formattedDate] = {};
        }

        // 按平台分组
        const platform = item.platform;
        if (!groups[formattedDate][platform]) {
          groups[formattedDate][platform] = [];
        }
        groups[formattedDate][platform].push(item);
      });

      // 日期降序排序
      return this.sortGroupsByDate(groups);
    },
  },
  methods: {
    showAddPackage() {
      this.vibrateShort();
      this.resetForm();
      this.$refs.popup.open();
    },
    hideAddPackage() {
      this.$refs.popup.close();
      this.resetForm();
    },
    resetForm() {
      this.platformIndex = 0;
      this.newPackage = {
        platform: this.platforms[0],
        name: "",
        price: "",
      };
    },
    onPlatformChange(e) {
      this.platformIndex = e.detail.value;
      this.newPackage.platform = this.platforms[this.platformIndex];
    },
    addPackage() {
      if (
        !this.newPackage.platform ||
        !this.newPackage.name ||
        !this.newPackage.price
      ) {
        uni.showToast({
          title: "请填写完整信息",
          icon: "none",
        });
        return;
      }

      const packageItem = {
        ...this.newPackage,
        date: new Date().toLocaleString(),
        showActions: false,
      };

      this.packages.unshift(packageItem);
      this.saveToStorage();
      this.hideAddPackage();
      this.vibrateShort();
    },
    getPlatformIcon(platform) {
      // 根据平台返回对应图标
      const icons = {
        淘宝: "/static/images/taobao.png",
        京东: "/static/images/jd.png",
        拼多多: "/static/images/pinduoduo.png",
        其他: "/static/images/other.png",
      };
      return icons[platform] || icons["其他"];
    },
    getTotalAmount(dateGroup) {
      let total = 0;
      Object.values(dateGroup).forEach((items) => {
        items.forEach((item) => {
          total += parseFloat(item.price) || 0;
        });
      });
      return total.toFixed(2);
    },
    handlePageClick() {
      // 关闭所有打开的菜单
      this.packages.forEach((item) => {
        if (item.showActions) {
          this.$set(item, "showActions", false);
        }
      });
    },
    sortGroupsByDate(groups) {
      // 将对象转换为 [key, value] 数组，并按日期降序排序
      const sortedGroups = Object.entries(groups).sort((a, b) => {
        return (
          new Date(b[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3")) -
          new Date(a[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3"))
        );
      });

      // 将排序后的数组转换回对象
      const sortedGroupsObj = {};
      sortedGroups.forEach(([date, platformGroups]) => {
        sortedGroupsObj[date] = platformGroups;
      });

      return sortedGroupsObj;
    },
    vibrateShort() {
      if (uni.getSystemInfoSync().platform !== "web") {
        uni.vibrateShort({
          success: function () {
            console.log("震动成功");
          },
          fail: function () {
            console.log("震动失败");
          },
        });
      }
    },
    saveToStorage() {
      try {
        uni.setStorageSync("packages", JSON.stringify(this.packages));
      } catch (e) {
        console.error("保存缓存失败:", e);
      }
    },
    getAppVersion() {
      // #ifdef APP-PLUS
      try {
        this.version = plus.runtime.version;
      } catch (e) {
        console.error("获取版本号失败:", e);
      }
      // #endif

      // #ifdef H5
      this.version = "1.0.0";
      // #endif
    },
    isLastItem(item) {
      for (const [date, platformGroups] of Object.entries(
        this.groupedPackages
      )) {
        for (const [platform, items] of Object.entries(platformGroups)) {
          if (
            items.includes(item) &&
            items.indexOf(item) === items.length - 1
          ) {
            return true;
          }
        }
      }
      return false;
    },
    toggleMoreActions(item) {
      this.vibrateShort();

      if (!item.hasOwnProperty("showActions")) {
        this.$set(item, "showActions", false);
      }

      this.packages.forEach((pkg) => {
        if (pkg !== item && pkg.showActions) {
          this.$set(pkg, "showActions", false);
        }
      });

      this.$set(item, "showActions", !item.showActions);
    },
    editPackage(item) {
      this.vibrateShort();
      // TODO: 实现编辑功能
      uni.showToast({
        title: "编辑功能开发中",
        icon: "none",
      });
    },
    deletePackage(item) {
      this.vibrateShort();
      uni.showModal({
        title: "确认删除",
        content: "是否删除该包裹记录？",
        success: (res) => {
          if (res.confirm) {
            this.packages = this.packages.filter((pkg) => pkg !== item);
            this.saveToStorage();
          }
        },
      });
    },
    formatPrice(price) {
      return parseFloat(price).toFixed(2);
    },
    formatTime(date) {
      const d = new Date(date);
      const hours = d.getHours().toString().padStart(2, "0");
      const minutes = d.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    selectPlatform(index) {
      this.platformIndex = index;
      this.newPackage.platform = this.platforms[index];
      this.vibrateShort();
    },
    focusPriceInput() {
      this.$nextTick(() => {
        const priceInput = this.$refs.priceInput;
        if (priceInput) {
          priceInput.focus();
        }
      });
    },
  },
  created() {
    try {
      const savedPackages = uni.getStorageSync("packages");
      if (savedPackages) {
        this.packages = JSON.parse(savedPackages);
      }
    } catch (e) {
      console.error("读取缓存失败:", e);
    }

    // 获取应用版本号
    this.getAppVersion();
  },
};
</script>

<style lang="scss">
// 基础样式复用
.title-wrapper {
  position: relative;
  margin-bottom: 20rpx;
  margin-top: 40rpx;
}

.title {
  font-size: 50rpx;
  color: #ffffff;
  font-weight: 700;
}

.version-text {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  transform: translateY(-8rpx);
}

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
  background: linear-gradient(180deg, #0052d9 0%, #dce2ed 40%);
  z-index: -1;
}

.container {
  padding: 40rpx 20rpx 20rpx;
  position: relative;
  z-index: 1;
  min-height: 100vh;
  box-sizing: border-box;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.code-card {
  padding: 0;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(to right, #dce8ff, #cde0ff);
  padding: 24rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid rgba(0, 82, 217, 0.15);

  .header-right {
    display: flex;
    align-items: center;
    gap: 20rpx;
  }
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1673ff;
}

.card-extra {
  font-size: 26rpx;
  color: #666;

  .pending-count {
    color: #1673ff;
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 4rpx;
  }
}

.code-list {
  padding: 20rpx;
}

.package-list {
  padding: 20rpx;
}

.package-item {
  display: flex;
  align-items: center;

  & + .package-item {
    border-top: 1rpx solid #f5f5f5;
  }
}

.package-content {
  min-width: 0; // 防止文本溢出
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.package-name {
  font-weight: 700;
  font-size: 16px;
}

.package-meta {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.package-actions {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.package-price {
  font-size: 32rpx;
  color: #ff5a5f;
  font-weight: 600;
}

.add-package-btn {
  position: fixed;
  right: 40rpx;
  bottom: 120rpx;
  width: 100rpx;
  height: 100rpx;
  background: #1673ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(22, 115, 255, 0.3);
  z-index: 99;

  &:active {
    transform: scale(0.95);
  }

  .uni-icons {
    font-size: 48rpx;
  }
}

// 操作菜单样式
.more-actions {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.more-btn {
  padding: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  .dots {
    display: flex;
    flex-direction: column;
    gap: 6rpx;
  }

  .dot {
    width: 6rpx;
    height: 6rpx;
    border-radius: 50%;
    background-color: #666;
  }

  &:active {
    opacity: 0.7;
  }
}

.action-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10rpx);
  background: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 99999 !important;
  min-width: 160rpx;

  &.menu-up {
    top: auto;
    bottom: calc(100% + 10rpx);

    &::before {
      top: auto;
      bottom: -6rpx;
      box-shadow: 2rpx 2rpx 5rpx rgba(0, 0, 0, 0.05);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: -6rpx;
    right: 10rpx;
    width: 12rpx;
    height: 12rpx;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: -2rpx -2rpx 5rpx rgba(0, 0, 0, 0.05);
  }

  .action-item {
    padding: 20rpx;
    font-size: 28rpx;

    .uni-icons {
      font-size: 32rpx;
    }
  }
}

.action-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;

  &:active {
    background-color: #f5f5f5;
  }

  &.delete {
    color: #ff5a5f;
  }
}

// 工具类
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 底部弹出层样式
.popup-content {
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
  max-height: 90vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.popup-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.close-btn {
  padding: 10rpx;

  &:active {
    opacity: 0.7;
  }
}

.form-item {
  margin-bottom: 24rpx;

  .label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 12rpx;
    display: block;
  }

  .input,
  .picker-value {
    height: 80rpx;
    border: 1rpx solid #1673ff;
    border-radius: 10rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }

  .picker-value {
    color: #333;
  }
}

.submit-btn {
  background: #1673ff;
  color: #fff;
  height: 80rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40rpx;

  &:active {
    opacity: 0.9;
  }
}

// 平台分组样式
.platform-group {
  & + .platform-group {
    margin-top: 30rpx;
    padding-top: 30rpx;
    border-top: 1rpx solid #eee;
  }
}

.platform-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 0 0 20rpx;

  .platform-icon {
    width: 40rpx;
    height: 40rpx;
    flex-shrink: 0;
    border-radius: 8rpx;
  }

  .platform-name {
    font-size: 28rpx;
    color: #666;
    font-weight: 500;
  }
}

// 平台选择样式
.platform-select {
  margin-bottom: 30rpx;

  .label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 16rpx;
    display: block;
  }
}

.platform-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}

.platform-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 16rpx;
  border-radius: 12rpx;
  border: 1rpx solid #eee;
  transition: all 0.2s;

  &.active {
    background: #f0f7ff;
    border-color: #1673ff;

    .platform-name {
      color: #1673ff;
    }
  }

  &:active {
    opacity: 0.8;
  }

  .platform-icon {
    width: 48rpx;
    height: 48rpx;
    border-radius: 8rpx;
  }

  .platform-name {
    font-size: 24rpx;
    color: #666;
  }
}

// 表单输入区域样式
.form-inputs {
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 24rpx;

  .label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 12rpx;
    display: block;
  }

  .input {
    height: 80rpx;
    border: 1rpx solid #1673ff;
    border-radius: 10rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    background: #fff;
  }
}

// 提交按钮样式
.submit-btn {
  width: 100%;
  height: 88rpx;
  background: #1673ff;
  color: #fff;
  border-radius: 10rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    opacity: 0.9;
  }
}
</style>
