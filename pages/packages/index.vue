<template>
  <view class="page-wrapper" @click="handlePageClick">
    <view class="page-bg"></view>

    <!-- 添加插画装饰 -->
    <!-- <view class="header-illustration">
      <image
        class="illustration"
        src="/static/images/package-illustration.png"
        mode="aspectFit"
      />
    </view> -->

    <view class="container">
      <view class="title-wrapper">
        <text class="title">包裹记录</text>
        <!-- <view class="header-right">
          <text class="clear-btn" @click.stop="clearData">清空</text>
        </view> -->
      </view>

      <!-- 日期时间轴 -->
      <view class="timeline" v-for="item in tableData" :key="item.date">
        <view class="timeline-date">
          <text>{{ formatDate(item.date) }}</text>
        </view>
        <!-- 添加统计信息 -->
        <view class="date-stats">
          <text
            >记录了{{ item.list.length }}个包裹，{{
              getCheckedCount(item.list)
            }}个已签收</text
          >
        </view>

        <!-- 平台卡片组 -->
        <view class="platform-cards">
          <view
            class="platform-card"
            v-for="(platformItems, platform) in groupByPlatform(item.list)"
            :key="platform"
          >
            <view class="platform-header" @click="goToApp(platform)">
              <image
                class="platform-icon"
                :src="getPlatformIcon(platform)"
                mode="aspectFit"
              />
              <text class="platform-name">{{ platform }}</text>
              <text class="platform-amount">
                ¥{{ getPlatformAmount(platformItems) }}
              </text>
            </view>

            <view class="goods-list">
              <view
                class="goods-item"
                v-for="(list, index) in platformItems"
                :key="index"
              >
                <view class="goods-content">
                  <checkbox
                    :value="list.id"
                    :checked="list.checked"
                    @click="toggleCheck(list)"
                    color="#1673ff"
                  />
                  <view class="goods-info">
                    <text class="goods-name text-ellipsis">{{
                      list.name
                    }}</text>
                  </view>
                  <text class="goods-price">{{ list.price }}</text>
                </view>

                <view class="goods-actions">
                  <view
                    class="more-btn"
                    @click.stop="toggleMoreActions(list, item.date)"
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
                    v-if="list.showActions"
                    :class="{ 'menu-up': isLastItem(list) }"
                  >
                    <view
                      class="action-item"
                      @click.stop="showEditPackage(list, item.date)"
                    >
                      <uni-icons type="compose" size="16" color="#666" />
                      <text>修改</text>
                    </view>
                    <view
                      class="action-item delete"
                      @click.stop="deletePackage(list, item.date)"
                    >
                      <uni-icons type="trash" size="16" color="#ff0000" />
                      <text style="color: #ff0000">删除</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 删除按钮移到这里 -->
        <view
          class="date-delete-wrapper"
          @click="confirmDeleteDateGroup(item.date)"
        >
          <uni-icons type="trash" size="16" />
          <view>删除</view>
        </view>
      </view>
    </view>

    <!-- 添加按钮 -->
    <view class="add-package-btn" @click="showAddPackage">
      <uni-icons type="plusempty" size="24" color="#fff" />
    </view>

    <!-- 添加底部占位区域 -->
    <view class="bottom-safe-area"></view>
  </view>
</template>

<script>
import taobao from "@/static/images/taobao.png";
import jingdong from "@/static/images/jd.png";
import pinduoduo from "@/static/images/pinduoduo.png";
import douyin from "@/static/images/douyin.png";
import weipinhui from "@/static/images/weipinhui.png";
import xiaohongshu from "@/static/images/xiaohongshu.png";
import alibaba from "@/static/images/1688.png";
import other from "@/static/images/other.png";

export default {
  data() {
    return {
      version: "1.0.0",
      taobao,
      jingdong,
      pinduoduo,
      douyin,
      weipinhui,
      xiaohongshu,
      alibaba,
      other,
      tableData: [],
      platforms: [
        "淘宝",
        "京东",
        "拼多多",
        "抖音",
        "唯品会",
        "小红书",
        "1688",
        "其他",
      ],
      menuStyle: {
        top: "0px",
        right: "25px",
      },
      autoFocus: false,
    };
  },
  methods: {
    formatDate(date) {
      const [year, month, day] = date.split("-");
      return `${year}年${parseInt(month)}月${parseInt(day)}日`;
    },
    getPlatformAmount(items) {
      return items
        .reduce((sum, item) => {
          const price = parseFloat(item.price || "0");
          return sum + (isNaN(price) ? 0 : price);
        }, 0)
        .toFixed(2);
    },
    toggleMoreActions(item, date) {
      this.vibrateShort();
      // 先关闭所有其他打开的菜单
      this.tableData.forEach((group) => {
        group.list.forEach((goods) => {
          if (goods !== item) {
            this.$set(goods, "showActions", false);
          }
        });
      });

      // 切换当前菜单
      this.$set(item, "showActions", !item.showActions);
    },
    showAddPackage() {
      this.vibrateShort();
      uni.navigateTo({
        url: "/pages/packages/edit",
        animationType: "slide-in-right",
        animationDuration: 300,
      });
    },
    showEditPackage(item, date) {
      this.vibrateShort();
      uni.setStorageSync(
        "editData",
        JSON.stringify({
          item,
          date,
          index: this.tableData
            .find((group) => group.date === date)
            .list.findIndex((i) => i === item),
        })
      );
      // 关闭操作菜单
      this.$set(item, "showActions", false);
      uni.navigateTo({
        url: "/pages/packages/edit?type=edit",
      });
    },
    handlePageClick() {
      this.tableData.forEach((group) => {
        group.list.forEach((item) => {
          if (item.showActions) {
            this.$set(item, "showActions", false);
          }
        });
      });
    },
    clearData() {
      // 清空数据
      this.tableData = [];
      // 清除缓存
      try {
        uni.removeStorageSync("packageData");
      } catch (e) {
        console.error("清除缓存失败:", e);
      }
    },
    confirmDeleteDateGroup(date) {
      this.vibrateShort();
      uni.showModal({
        title: "确认删除",
        content: "是否删除该日期下的所有包裹？",
        confirmColor: "#ff5a5f",
        success: (res) => {
          if (res.confirm) {
            this.deleteDateGroup(date);
          }
        },
      });
    },
    deleteDateGroup(date) {
      this.vibrateShort();
      const dateIndex = this.tableData.findIndex(
        (group) => group.date === date
      );
      if (dateIndex !== -1) {
        this.tableData.splice(dateIndex, 1);
        this.saveData();
      }
    },
    getCheckedCount(list) {
      return list.filter((item) => item.checked).length;
    },
    handlePackageSubmit({ data, isEdit, editDate, editIndex }) {
      // 先获取平台图标
      const platformIcon = this.getPlatformIcon(data.platform);

      const packageData = {
        ...data,
        price: data.price || "0.00",
        platformIcon,
        showActions: false,
      };

      if (isEdit) {
        // 编辑模式
        if (editDate === data.date) {
          // 如果日期没变，直接修改原位置的数据
          const dateGroup = this.tableData.find(
            (group) => group.date === editDate
          );
          if (dateGroup && editIndex !== -1) {
            this.$set(dateGroup.list, editIndex, packageData);
          }
        } else {
          // 如果日期变了，需要删除原数据并在新日期添加
          // 1. 删除原数据
          const oldDateGroup = this.tableData.find(
            (group) => group.date === editDate
          );
          if (oldDateGroup && editIndex !== -1) {
            oldDateGroup.list.splice(editIndex, 1);
            // 如果该日期没有数据了，删除整个日期组
            if (oldDateGroup.list.length === 0) {
              const index = this.tableData.findIndex(
                (group) => group.date === editDate
              );
              if (index !== -1) {
                this.tableData.splice(index, 1);
              }
            }
          }

          // 2. 在新日期添加数据
          let newDateGroup = this.tableData.find(
            (group) => group.date === data.date
          );
          if (!newDateGroup) {
            newDateGroup = {
              date: data.date,
              list: [],
            };
            // 按日期顺序插入
            const index = this.tableData.findIndex(
              (group) => group.date < data.date
            );
            if (index === -1) {
              this.tableData.push(newDateGroup);
            } else {
              this.tableData.splice(index, 0, newDateGroup);
            }
          }
          newDateGroup.list.unshift(packageData);
        }
      } else {
        // 添加模式
        let dateGroup = this.tableData.find(
          (group) => group.date === data.date
        );

        if (!dateGroup) {
          dateGroup = {
            date: data.date,
            list: [],
          };
          // 按日期顺序插入
          const index = this.tableData.findIndex(
            (group) => group.date < data.date
          );
          if (index === -1) {
            this.tableData.push(dateGroup);
          } else {
            this.tableData.splice(index, 0, dateGroup);
          }
        }

        dateGroup.list.unshift(packageData);
      }

      this.saveData();
    },
    getPlatformIcon(platform) {
      const icons = {
        淘宝: this.taobao,
        京东: this.jingdong,
        拼多多: this.pinduoduo,
        抖音: this.douyin,
        唯品会: this.weipinhui,
        小红书: this.xiaohongshu,
        1688: this.alibaba,
        其他: this.other,
      };
      return icons[platform] || this.other;
    },
    groupByPlatform(list) {
      const groups = {};
      list.forEach((item) => {
        if (!groups[item.platform]) {
          groups[item.platform] = [];
        }
        groups[item.platform].push(item);
      });
      return groups;
    },
    saveData() {
      try {
        uni.setStorageSync("packageData", JSON.stringify(this.tableData));
      } catch (e) {
        console.error("保存数据失败:", e);
      }
    },
    loadData() {
      try {
        const data = uni.getStorageSync("packageData");
        if (data) {
          this.tableData = JSON.parse(data);
        }
      } catch (e) {
        console.error("读取数据失败:", e);
      }
    },
    toggleCheck(item) {
      this.vibrateShort();
      this.$set(item, "checked", !item.checked);
      this.saveData();
    },
    deletePackage(item, date) {
      this.vibrateShort();
      // 关闭操作菜单
      this.$set(item, "showActions", false);
      // 找到对应日期组
      const dateGroup = this.tableData.find((group) => group.date === date);
      if (dateGroup) {
        // 找到并删除包裹
        const index = dateGroup.list.findIndex((i) => i === item);
        if (index !== -1) {
          dateGroup.list.splice(index, 1);

          // 如果该日期没有包裹了，删除整个日期组
          if (dateGroup.list.length === 0) {
            const groupIndex = this.tableData.findIndex(
              (group) => group.date === date
            );
            if (groupIndex !== -1) {
              this.tableData.splice(groupIndex, 1);
            }
          }

          // 保存数据
          this.saveData();
        }
      }
    },
    vibrateShort() {
      uni.vibrateShort({
        success: function () {
          console.log("振动成功");
        },
      });
    },
    isLastItem(item) {
      // 获取当前元素的位置信息
      const query = uni.createSelectorQuery();
      let isUp = false;

      query
        .select(".goods-actions")
        .boundingClientRect((data) => {
          if (data) {
            // 如果按钮距离底部小于300rpx，菜单向上显示
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            isUp = windowHeight - data.bottom < 300;
          }
        })
        .exec();

      return isUp;
    },
    goToApp(platform) {      
      const appampaigns = {
        淘宝: "taobao://taobao.com",
        京东: "openApp.jdMobile://",
        拼多多: "pinduoduo://",
        抖音: "snssdk1128://",
        唯品会: "vipshop://",
        小红书: "https://xiaohongshu.com/",
        1688: "https://m.1688.com/",
      };
      plus.runtime.openURL(appampaigns[platform]);
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss">
// 定义主题色变量
$theme-color: #0052d9;
$theme-light: rgba(0, 82, 217, 0.1);
$theme-gradient: linear-gradient(135deg, #0052d9, #003ca3);

// 基础样式复用
.title-wrapper {
  position: relative;
  margin-bottom: 20rpx;
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.title {
  font-size: 50rpx;
  color: #ffffff;
  font-weight: 700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.clear-btn {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  padding: 4rpx 12rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6rpx;

  &:active {
    opacity: 0.8;
  }
}

.version-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.page-wrapper {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
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
  padding: 40rpx 20rpx calc(120rpx + env(safe-area-inset-bottom));
  position: relative;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.add-package-btn {
  position: fixed;
  right: 40rpx;
  bottom: calc(40rpx + env(safe-area-inset-bottom));
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #1673ff, #0052d9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(22, 115, 255, 0.3);
  z-index: 99;

  &:active {
    transform: scale(0.95);
    background: linear-gradient(135deg, #1668ff, #0049d9);
  }
}

// 工具类
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-wrapper {
  margin-bottom: 20rpx;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 20rpx;

  .date-text {
    font-size: 30rpx;
    font-weight: 700;
    color: #000000;
  }
}

.platform-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.platform-icon {
  width: 40rpx;
  height: 40rpx;
}

.platform-name {
  font-size: 30rpx;
  color: #ffffff;
}

.platform-price {
  font-size: 30rpx;
  color: #ffffff;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.card-extra {
  font-size: 26rpx;
  color: #666;

  .total-amount {
    color: #1673ff;
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 4rpx;
  }
}

.package-list {
  padding: 16rpx 20rpx;
}

.platform-group {
  & + .platform-group {
    margin-top: 24rpx;
    padding-top: 24rpx;
    border-top: 1rpx solid #eee;
  }
}

.package-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;

  & + .package-item {
    border-top: 1rpx solid #f5f5f5;
  }
}

.package-content {
  flex: 1;
  margin-right: 20rpx;
}

.package-detail {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.package-name {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  font-weight: 500;
}

.package-price {
  font-size: 32rpx;
  color: $theme-color;
  font-weight: 500;
}

.package-actions {
  display: flex;
  align-items: center;
}

.more-btn {
  padding: 20rpx 16rpx;
  margin: -10rpx;

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

// 添加按钮样式优化
.add-package-btn {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #1673ff, #0052d9);
  box-shadow: 0 4rpx 16rpx rgba(22, 115, 255, 0.3);

  &:active {
    transform: scale(0.95);
    background: linear-gradient(135deg, #1668ff, #0049d9);
  }
}

// 时间轴样式
.timeline {
  margin-bottom: 40rpx;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 22rpx;
    top: 60rpx;
    bottom: -20rpx;
    width: 0;
    border-left: 4rpx dashed rgba(0, 82, 217, 0.5);
  }
}

.timeline-date {
  font-size: 32rpx;
  color: #000000;
  font-weight: 700;
  margin: 30rpx 0 24rpx;
  padding-left: 48rpx;
  position: relative;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    left: 16rpx;
    top: 50%;
    width: 14rpx;
    height: 14rpx;
    background: $theme-color;
    transform: translateY(-50%);
    border-radius: 50%;
    box-shadow: 0 0 0 6rpx rgba(0, 82, 217, 0.15);
  }
}

// 平台卡片样式
.platform-cards {
  padding-left: 48rpx;
  padding-right: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  width: 100%;
  box-sizing: border-box;
}

.platform-card {
  background: #fff;
  border-radius: 12rpx;
}

.platform-header {
  padding: 16rpx 20rpx;
  background: linear-gradient(to right, #dce8ff, #cde0ff);
  border-bottom: 1rpx solid rgba(0, 82, 217, 0.08);
  display: flex;
  align-items: center;
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;

  .platform-icon {
    width: 36rpx;
    height: 36rpx;
    margin-right: 12rpx;
  }

  .platform-name {
    font-size: 28rpx;
    color: #666;
    font-weight: normal;
    flex: 1;
  }

  .platform-amount {
    font-size: 28rpx;
    color: #fc5e25;
    font-weight: 500;
  }
}

// 商品列表样式
.goods-list {
  padding: 0 20rpx;
  width: 100%;
  box-sizing: border-box;
}

.goods-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;

  & + .goods-item {
    border-top: 1rpx solid #f5f5f5;
  }
}

.goods-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-right: 20rpx;
  min-height: 64rpx;
  min-width: 0;
}

.goods-info {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
}

.goods-name {
  font-size: 28rpx;
  color: #444;
  font-weight: normal;
  line-height: 1.4;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.goods-price {
  font-size: 28rpx;
  color: #666;
  font-weight: normal;
  margin-left: 16rpx;
  flex-shrink: 0;
  white-space: nowrap;
}

// 操作按钮样式
.goods-actions {
  position: relative;
  flex-shrink: 0;
  margin-left: auto;

  // 修改操作菜单样式
  .action-menu {
    position: absolute;
    top: calc(100% + 10rpx); // 默认显示在下方
    bottom: auto;
    right: 0;
    width: 160rpx;
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
    z-index: 100;
    overflow: hidden;

    &.menu-up {
      top: auto;
      bottom: calc(100% + 10rpx); // 向上显示

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
      bottom: auto;
      right: 10rpx;
      width: 12rpx;
      height: 12rpx;
      background: #fff;
      transform: rotate(45deg);
      box-shadow: -2rpx -2rpx 5rpx rgba(0, 0, 0, 0.05);
    }

    .action-item {
      display: flex;
      align-items: center;
      justify-content: center;
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
  }
}

// 添加按钮样式
.add-package-btn {
  position: fixed;
  right: 40rpx;
  bottom: calc(40rpx + env(safe-area-inset-bottom));
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #1673ff, #0052d9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(22, 115, 255, 0.3);
  z-index: 99;

  &:active {
    transform: scale(0.95);
    background: linear-gradient(135deg, #1668ff, #0049d9);
  }
}

// 修改删除按钮样式
.date-delete-wrapper {
  padding-left: 48rpx;
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4rpx;
  font-size: 28rpx;
  padding-right: 18px;
}

.date-delete {
  width: 45rpx;
  height: 45rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
}

// 修改uni-popup默认样式
::v-deep .uni-popup-bottom {
  bottom: 0 !important;

  .uni-popup__wrapper {
    padding-bottom: 0 !important;
  }
}

// 添加日期统计信息样式
.date-stats {
  padding-left: 48rpx;
  margin: -16rpx 0 20rpx;
  font-size: 24rpx;
  display: flex;
  align-items: center;
  gap: 4rpx;
}

// 添加插画样式
.header-illustration {
  position: absolute;
  top: 60rpx;
  right: -15rpx;
  width: 290rpx;
  height: 230rpx;
  z-index: 1;
  pointer-events: none;

  .illustration {
    width: 100%;
    height: 100%;
  }
}

// 添加底部安全区域样式
.bottom-safe-area {
  height: calc(120rpx + env(safe-area-inset-bottom));
  width: 100%;
}
</style>
