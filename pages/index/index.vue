<template>
  <view class="page-wrapper" @click="handlePageClick">
    <view class="page-bg"></view>

    <view class="container">
      <view class="title-wrapper">
        <text class="title">取件列表</text>
      </view>
      
      <!-- 输入区域 -->
      <view class="card input-card">
        <view class="input-area">
          <view class="input-wrapper">
            <input
              class="code-input"
              v-model="newCode"
              type="text"
              placeholder="请输入取件码"
            />
            <view 
              class="clear-btn" 
              v-if="newCode" 
              @click="clearInput"
            >
              <uni-icons type="clear" size="14" color="#999" />
            </view>
          </view>
          <button class="add-btn" @click="addCode">
            <uni-icons type="plusempty" size="18" color="#fff" />
            <text>添加</text>
          </button>
          <button class="read-sms-btn" @click="readSms">
            <uni-icons type="refresh" size="18" color="#1673ff" />
            <text>自动匹配</text>
          </button>
        </view>
      </view>

      <!-- 日期显示 -->
      <!-- <view class="card">
        <view class="date-display">
          <text class="date-label">今天是:</text>
          <text class="date">{{ today }}</text>
        </view>
      </view> -->

      <!-- 按日期分组的取件码列表 -->
      <template v-for="(dateGroup, date) in groupedCodes" :key="date">
        <view class="card code-card">
          <view class="card-header">
            <text class="card-title">{{ date }}</text>
            <view class="header-right">
              <text class="card-extra">
                <text class="pending-count">{{ getPendingCount(dateGroup) }}</text>
                <text>个待取件</text>
              </text>
              
              <!-- 添加日期卡片的更多操作按钮 -->
              <view class="date-more-actions">
                <view class="more-btn" @click.stop="toggleDateActions(date)">
                  <view class="dots">
                    <view class="dot"></view>
                    <view class="dot"></view>
                    <view class="dot"></view>
                  </view>
                </view>
                
                <!-- 日期卡片的操作菜单 -->
                <view class="action-menu" 
                  v-if="dateShowActions[date]"
                  :class="{ 'menu-up': isLastItem(dateGroup) }"
                >
                  <view class="action-item delete" @click.stop="deleteDate(date, dateGroup)">
                    <uni-icons type="trash" size="16" />
                    <text>删除</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="code-list">
            <!-- 按地址分组显示 -->
            <view 
              v-for="(items, address) in dateGroup" 
              :key="address" 
              class="address-group"
            >
              <view class="address-header">
                <image class="address-icon" :src="yizhanIcon" mode="aspectFit" />
                <text class="address-text">{{ address }}</text>
              </view>
              
              <view 
                class="code-item" 
                v-for="(item, index) in items" 
                :key="index"
              >
                <view class="code-content" :class="{ picked: item.isPicked }">
                  <view class="code-main">
                    <view class="company-icon" :class="{ picked: item.isPicked }">
                      {{ getCompanyShortName(item.company) }}
                    </view>
                    <view class="code-info">
                      <view class="code-text">
                        {{ formatCode(item.code) }}
                      </view>
                      <view class="code-desc" :class="{ picked: item.isPicked }">
                        <text>{{ item.sendDate ? item.sendDate.split(" ")[1] : "" }} {{ item.isManual ? '添加' : '进站' }}</text>
                      </view>
                    </view>
                  </view>
                </view>

                <view class="right-actions">
                  <!-- 已取按钮 -->
                  <view
                    class="picked-btn"
                    :class="{ 'is-picked': item.isPicked }"
                    @click="togglePicked(item)"
                  >
                    <text>{{ item.isPicked ? '已取' : '取件' }}</text>
                    <text v-if="item.isPicked" class="picked-icon">✓</text>
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
                    <view class="action-menu" 
                      v-if="item.showActions"
                      :class="{ 'menu-up': isLastItem(item) }"
                    >
                      <view class="action-item" @click.stop="editCode(item)">
                        <uni-icons type="compose" size="16" />
                        <text>修改</text>
                      </view>
                      <view
                        class="action-item delete"
                        @click.stop="deleteCode(item)"
                      >
                        <uni-icons type="trash" size="16" color="#ff0000" />
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

    <!-- 添加 Dialog 组件 -->
    <edit-dialog
      v-model:show="showEditDialog"
      :value="editingCode"
      @confirm="handleEditConfirm"
    />
  </view>
</template>

<script>
import EditDialog from "@/components/EditDialog.vue";
import permision from "@/js_sdk/wa-permission/permission.js";
import { parseTime } from "../../utils";
import yizhanIcon from '@/static/yizhan.png'

export default {
  components: {
    EditDialog,
  },
  data() {
    return {
      newCode: "",
      packageCodes: [],
      showEditDialog: false,
      editingItem: null,
      editingCode: "",
      readDayCount: 4, // 默认读取当天的短信
      dateShowActions: {}, // 添加日期操作菜单的显示状态
      yizhanIcon,
      version: '1.0.0', // 默认版本号
    };
  },
  computed: {
    today() {
      const date = new Date();
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    },
    groupedCodes() {
      const groups = {};
      this.packageCodes.forEach((item) => {
        const date = new Date(item.date);
        const formattedDate = `${date.getFullYear()}年${
          date.getMonth() + 1
        }月${date.getDate()}日`;
        
        if (!groups[formattedDate]) {
          groups[formattedDate] = {};
        }
        
        // 按地址分组
        const address = item.address || '未知地址';
        if (!groups[formattedDate][address]) {
          groups[formattedDate][address] = [];
        }
        groups[formattedDate][address].push(item);
      });

      // 将对象转换为 [key, value] 数组，并按日期降序排序
      const sortedGroups = Object.entries(groups).sort((a, b) => {
        return (
          new Date(b[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3")) -
          new Date(a[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3"))
        );
      });

      // 将排序后的数组转换回对象
      const sortedGroupsObj = {};
      sortedGroups.forEach(([date, addressGroups]) => {
        sortedGroupsObj[date] = addressGroups;
      });

      return sortedGroupsObj;
    },
  },
  created() {
    try {
      const savedCodes = uni.getStorageSync("packageCodes");
      if (savedCodes) {
        const codes = JSON.parse(savedCodes);
        codes.forEach(item => {
          if (!item.hasOwnProperty('showActions')) {
            this.$set(item, 'showActions', false);
          }
        });
        this.packageCodes = codes;
      }
    } catch (e) {
      console.error("读取缓存失败:", e);
    }

    // 获取应用版本号
    this.getAppVersion();
  },
  methods: {
    saveToStorage() {
      try {
        uni.setStorageSync("packageCodes", JSON.stringify(this.packageCodes));
      } catch (e) {
        console.error("保存缓存失败:", e);
      }
    },
    vibrateShort() {
      // 判断是否在 App 环境
      if (uni.getSystemInfoSync().platform !== 'web') {
        uni.vibrateShort({
          success: function () {
            console.log('震动成功');
          },
          fail: function () {
            console.log('震动失败');
          }
        });
      }
    },
    addCode() {
      this.vibrateShort(); // 添加震动
      if (!this.newCode) return;

      const newCode = this.newCode.replace(/\s/g, "");
      const today = new Date().toLocaleDateString();

      // 检查今天的取件码是否重复
      const isDuplicate = this.packageCodes.some((item) => {
        const itemDate = new Date(item.date).toLocaleDateString();
        return itemDate === today && item.code === newCode;
      });

      if (isDuplicate) {
        uni.showToast({
          title: "今日已添加该取件码",
          icon: "none",
          duration: 2000,
        });
        return;
      }

      const now = new Date().toLocaleString();
      const newItem = {
        code: this.newCode.replace(/\s/g, ""),
        date: now,
        sendDate: parseTime(new Date().getTime()),
        company: '手动添加',
        address: '手动添加',
        isPicked: false,
        showActions: false, // 添加 showActions 属性
        isManual: true,
      };
      
      this.packageCodes.unshift(newItem);
      this.saveToStorage();
      this.newCode = "";
    },
    editCode(item) {
      this.vibrateShort(); // 添加震动
      this.editingItem = item;
      this.editingCode = item.code;
      this.showEditDialog = true;
      // 关闭操作菜单
      item.showActions = false;
    },
    handleEditConfirm(value) {
      if (!this.editingItem) return;

      const newCode = value.replace(/\s/g, "");
      const editingDate = new Date(this.editingItem.date).toLocaleDateString();

      // 如果编辑后的码与原码相同，直接保存
      if (newCode === this.editingItem.code) {
        this.editingItem = null;
        this.editingCode = "";
        return;
      }

      // 检查同一天是否有重复的取件码
      const isDuplicate = this.packageCodes.some((item) => {
        const itemDate = new Date(item.date).toLocaleDateString();
        return (
          itemDate === editingDate &&
          item.code === newCode &&
          item !== this.editingItem
        ); // 排除自身
      });

      if (isDuplicate) {
        uni.showToast({
          title: "该日期已存在相同取件码",
          icon: "none",
          duration: 2000,
        });
        return;
      }

      // 不重复则保存
      this.editingItem.code = newCode;
      this.saveToStorage();
      this.editingItem = null;
      this.editingCode = "";
    },
    deleteCode(item) {
      this.vibrateShort();
      // 创建新数组并确保响应式更新
      const newPackageCodes = this.packageCodes.filter(code => code !== item);
      this.$set(this, 'packageCodes', newPackageCodes);
      this.saveToStorage();
    },
    togglePicked(item) {
      this.vibrateShort(); // 添加震动
      item.isPicked = !item.isPicked;
      this.saveToStorage();
    },
    getPendingCount(addressGroups) {
      return Object.values(addressGroups).flat().filter(item => !item.isPicked).length;
    },
    getTextBeforeNumber(str) {
      return str.split(/\d+/)[0];
    },
    getNumber(str) {
      const match = str.match(/\d+/);
      return match ? match[0] : "";
    },
    getTextAfterNumber(str) {
      const parts = str.split(/\d+/);
      return parts.length > 1 ? parts[1] : "";
    },
    formatCode(code) {
      if (/^\d{8}$/.test(code)) {
        return code.replace(/(\d{4})(?=\d)/g, "$1 ");
      }
      return code;
    },
    // 使用匹配规则提取信息
    extractInfoByRules(content) {
      const info = {
        code: '',
        express: '',
        address: ''
      };

      // 获取启用的匹配规则
      const rulesList = JSON.parse(uni.getStorageSync('matchRulesList') || '[]');
      const enabledRule = rulesList.find(rule => rule.enabled);
      
      if (!enabledRule) {
        return info;
      }

      // 使用规则进行匹配
      Object.keys(enabledRule.rules).forEach(key => {
        const rule = enabledRule.rules[key];
        if (rule.start && rule.end) {
          const startIndex = content.indexOf(rule.start);
          const endIndex = content.indexOf(rule.end, startIndex + rule.start.length);
          
          if (startIndex !== -1 && endIndex !== -1) {
            info[key] = content.substring(startIndex + rule.start.length, endIndex).trim();
          }
        }
      });

      return info;
    },
    // 读取短信
    async readSms() {
      this.vibrateShort();
      
      // #ifdef APP-PLUS
      if (plus.os.name === 'Android') {
        let that = this;
        var result = await permision.requestAndroidPermission("android.permission.READ_SMS");
        if (result == 1) {
          var main = plus.android.runtimeMainActivity();
          var Uri = plus.android.importClass("android.net.Uri");
          var uri = Uri.parse("content://sms/");
          var cr = main.getContentResolver();
          plus.android.importClass(cr);

          uni.showLoading({
            title: "匹配短信记录中..",
          });

          try {
            // 获取4天前的凌晨时间
            const now = new Date();
            const fourDaysAgo = new Date(now);
            fourDaysAgo.setDate(now.getDate() - this.readDayCount);
            fourDaysAgo.setHours(0, 0, 1, 0); // 设置为凌晨 00:00:01

            // 转换为时间戳
            const startTime = fourDaysAgo.getTime();
            
            // 设置查询条件
            var selection = "date > " + startTime;
            var cur = cr.query(uri, null, selection, null, null);
            plus.android.importClass(cur);

            if (cur.moveToFirst()) {
              let msgList = [];
              do {
                let newObj = {};
                // 发送人号码
                var index_Address = cur.getColumnIndex("address");
                var address = cur.getString(index_Address);
                newObj.telphone = address;

                //短信内容
                var index_Body = cur.getColumnIndex("body");
                var body = cur.getString(index_Body);
                newObj.content = body;

                // 发送日期
                var smsDate = cur.getString(cur.getColumnIndex("date"));
                smsDate = parseTime(smsDate);
                newObj.sendDate = smsDate;

                // 匹配信息
                let extractInfo = this.extractInfoByRules(body);
                if (extractInfo.code) {
                  newObj.code = extractInfo.code;
                  newObj.company = extractInfo.express || '未知快递';
                  newObj.address = extractInfo.address || '未知地址';
                  msgList.push(newObj);
                }
              } while (cur.moveToNext());

              // 添加到列表
              this.dyAddCode(msgList);
            }
            cur.close();
            uni.hideLoading();
          } catch (e) {
            console.error("获取短信失败", e);
            uni.hideLoading();
            uni.showToast({
              title: "读取短信失败",
              icon: "none"
            });
          }
        } else {
          uni.showToast({
            title: "请授权读取短信权限",
            icon: "none",
          });
        }
      }
      // #endif
    },
    // 动态添加取件码
    dyAddCode(msgList) {
      for (let item of msgList) {
        if (this.packageCodes.some((i) => i.code === item.code)) {
          continue;
        }
        const newItem = {
          code: item.code,
          date: new Date(item.sendDate).toLocaleString(),
          sendDate: item.sendDate,
          company: item.company,
          address: item.address,
          isPicked: false,
          showActions: false,
        };
        this.packageCodes.unshift(newItem);
        this.saveToStorage();
      }
      
      if (msgList.length === 0) {
        uni.showToast({
          title: "暂无匹配结果",
          icon: "none"
        });
      }
    },
    toggleMoreActions(item) {
      this.vibrateShort();
      
      // 确保 item 有 showActions 属性
      if (!item.hasOwnProperty('showActions')) {
        this.$set(item, 'showActions', false);
      }
      
      // 关闭其他菜单
      this.packageCodes.forEach(code => {
        if (code !== item && code.showActions) {
          this.$set(code, 'showActions', false);
        }
      });
      
      // 切换当前菜单
      this.$set(item, 'showActions', !item.showActions);
    },
    toggleDateActions(date) {
      this.vibrateShort(); // 添加震动
      // 关闭其他打开的菜单
      Object.keys(this.dateShowActions).forEach(key => {
        if (key !== date && this.dateShowActions[key]) {
          this.$set(this.dateShowActions, key, false);
        }
      });
      
      // 切换当前菜单
      this.$set(this.dateShowActions, date, !this.dateShowActions[date]);
    },
    deleteDate(date, group) {
      this.vibrateShort(); // 添加震动
      uni.showModal({
        title: '确认删除',
        content: `是否删除 ${date} 的所有取件码？`,
        success: (res) => {
          if (res.confirm) {
            // 删除该日期的所有取件码
            this.packageCodes = this.packageCodes.filter(item => {
              const itemDate = new Date(item.date);
              const formattedDate = `${itemDate.getFullYear()}年${
                itemDate.getMonth() + 1
              }月${itemDate.getDate()}日`;
              return formattedDate !== date;
            });
            this.saveToStorage();
          }

          this.$set(this.dateShowActions, date, false);
        }
      });
    },
    getCompanyShortName(company) {
      if (!company) return '';
      
      // 判断是否为英文
      if (/^[a-zA-Z\s]+$/.test(company)) {
        // 如果是英文，取第一个单词的前两个字母大写
        return company.trim().split(/\s+/)[0].substring(0, 2).toUpperCase();
      }
      
      // 如果是中文，取前两个字
      return company.substring(0, 2);
    },
    isLastItem(item) {
      // 遍历所有日期组和地址组
      for (const [date, addressGroups] of Object.entries(this.groupedCodes)) {
        for (const [address, items] of Object.entries(addressGroups)) {
          // 如果是该地址组的最后一个项目，返回 true
          if (items.includes(item) && items.indexOf(item) === items.length - 1) {
            return true;
          }
        }
      }
      return false;
    },
    clearInput() {
      this.vibrateShort();
      this.newCode = '';
    },
    getAppVersion() {
      // #ifdef APP-PLUS
      // App 环境下获取真实版本号
      try {
        this.version = plus.runtime.version;
      } catch (e) {
        console.error('获取版本号失败:', e);
      }
      // #endif
      
      // #ifdef H5
      // H5 环境下可以设置一个固定版本号
      this.version = '1.0.0';
      // #endif
    },
    handlePageClick() {
      // 关闭所有打开的菜单
      this.packageCodes.forEach((item) => {
        if (item.showActions) {
          this.$set(item, 'showActions', false);
        }
      });
      // 关闭日期操作菜单
      Object.keys(this.dateShowActions).forEach(key => {
        if (this.dateShowActions[key]) {
          this.$set(this.dateShowActions, key, false);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.title-wrapper {
  position: relative;
  margin-bottom: 20rpx;
  margin-top: 40rpx;
  text-align: center;
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
  transform: translateY(-8rpx); // 稍微向上偏移
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
  padding-bottom: 40rpx;
}

.input-card {
  padding-bottom: 20rpx;
}

.input-area {
  display: flex;
  align-items: center;
  gap: 20rpx;
  flex-wrap: wrap;
}

.input-wrapper {
  flex: 1;
  min-width: 200rpx;
  position: relative;
  display: flex;
  align-items: center;
}

.code-input {
  flex: 1;
  padding: 0 15rpx;
  padding-right: 60rpx; // 为清除按钮留出空间
  height: 80rpx;
  border: 1rpx solid #1673ff;
  border-radius: 10rpx;
  
  &:focus {
    border-color: #0052d9;
    box-shadow: 0 0 0 2rpx rgba(22, 115, 255, 0.1);
  }
}

.clear-btn {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:active {
    opacity: 0.7;
  }
}

.add-btn {
  background-color: #1673ff;
  color: #fff;
  border-radius: 10rpx;
  padding: 0 30rpx;
  height: 80rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.read-sms-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  height: 80rpx;
  padding: 0 20rpx;
  background: #fff;
  border: 1rpx solid #1673ff;
  border-radius: 10rpx;
  color: #1673ff;
  font-size: 28rpx;

  &:active {
    background: rgba(22, 115, 255, 0.05);
  }
}

.date-display {
  text-align: center;
  font-size: 30rpx;
  color: #333;
}

.date {
  font-weight: bold;
  color: #1673ff;
}

.code-card {
  padding: 0;
  overflow: hidden; // 确保圆角效果
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
  font-weight: 600; // 加粗一点
  color: #1673ff; // 使用主题蓝色
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

.code-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  position: relative;
  
  &:first-child {
    padding-top: 10rpx;
  }
  
  &:last-child {
    padding-bottom: 10rpx;
  }
  
  & + .code-item {
    border-top: 1rpx solid #f1f1f1;
    margin-top: 6rpx;
  }
}

.code-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.code-main {
  display: flex;
  gap: 16rpx;
}

.company-icon {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #e6f0ff;
  color: #1673ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: bold;
  padding: 8rpx;
  box-sizing: content-box;
  margin-top: 4rpx; // 稍微向下偏移以对齐文本
  
  &.picked {
    background-color: #f5f5f5;
    color: #bbb;
  }
}

.code-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.code-text {
  font-weight: 700;
  font-size: 16px;
}

.code-desc {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6rpx;
  
  .uni-icons {
    flex-shrink: 0;
  }
}

.picked {
  color: #bbb !important;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding-left: 20rpx;
}

.picked-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
  gap: 4rpx;
  min-width: 80rpx;
  background-color: #1673ff;
  color: #fff;
  border: 1px solid #1673ff;
  
  &.is-picked {
    background-color: #fff;
    color: #1673ff;
    border-color: #1673ff;
  }
  
  .picked-icon {
    font-size: 24rpx;
  }
}

.more-actions {
  position: relative;
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
}

.action-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10rpx); // 默认显示在下方
  bottom: auto;
  background: #fff;
  border-radius: 8rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 99999 !important;
  min-width: 160rpx;

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

/* 自定义弹框样式 */
::v-deep .custom-modal {
  .uni-modal {
    border-radius: 16rpx;
    overflow: hidden;

    .uni-modal__hd {
      padding: 30rpx 30rpx 20rpx;
      font-size: 32rpx;
      font-weight: 500;
    }

    .uni-modal__bd {
      padding: 20rpx 30rpx 30rpx;

      .uni-modal__input {
        margin: 20rpx 0;
        padding: 20rpx;
        background: #f5f5f5;
        border-radius: 8rpx;
        font-size: 28rpx;
      }
    }

    .uni-modal__ft {
      border-top: 1rpx solid #eee;

      &:after {
        border: none;
      }

      .uni-modal__btn {
        font-size: 30rpx;
        font-weight: normal;

        &.uni-modal__btn_primary {
          color: #1673ff;
        }
      }
    }
  }
}

/* 删除弹框也使用相同样式 */
::v-deep .uni-modal {
  border-radius: 16rpx;
  overflow: hidden;
}

.date-more-actions {
  position: relative;
  
  .more-btn {
    .dot {
      width: 6rpx;
      height: 6rpx;
      background-color: #666;
    }
    
    .dots {
      gap: 6rpx;
    }
  }
}

.address-group {
  & + .address-group {
    margin-top: 40rpx;
    padding-top: 30rpx;
    border-top: 1rpx solid #eee;
  }
}

.address-header {
  display: flex;
  align-items: center;
  gap: 10rpx;
  padding: 0 0 20rpx;
  color: #333;
  font-size: 32rpx;
  font-weight: 500;
  
  .address-icon {
    width: 36rpx;
    height: 36rpx;
    flex-shrink: 0;
  }
  
  .address-text {
    flex: 1;
  }
}
</style>
