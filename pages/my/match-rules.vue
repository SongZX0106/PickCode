<template>
  <view class="match-rules">
    <!-- 顶部操作区 -->
    <view class="action-header">
      <button class="preset-btn" @click="showPresetRules">
        <uni-icons type="download" size="16" color="#0052d9"></uni-icons>
        <text>使用预制规则</text>
      </button>
    </view>

    <!-- 规则列表 -->
    <view class="rules-list" v-if="rulesList.length > 0">
      <view class="rule-card" v-for="(rule, index) in rulesList" :key="index">
        <view class="rule-info">
          <view class="rule-header">
            <view class="rule-name">{{ rule.name }}</view>
            <switch
              :checked="rule.enabled"
              @change="(e) => handleStatusChange(index, e)"
              color="#0052d9"
            />
          </view>
          <view class="rule-time">添加时间 {{ rule.createTime }}</view>
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
    <button class="add-btn" @click="handleAdd">
      <uni-icons type="plusempty" size="18" color="#fff"></uni-icons>
      <text>添加规则</text>
    </button>

    <!-- 预制规则弹窗 -->
    <uni-popup ref="presetPopup" type="bottom">
      <view class="preset-popup">
        <view class="popup-header">
          <text class="popup-title">选择预制规则</text>
          <text class="popup-desc">选择常用快递公司的匹配规则</text>
        </view>
        <scroll-view class="preset-list" scroll-y>
          <view 
            class="preset-item" 
            v-for="(rule, index) in presetRules" 
            :key="index"
            @click="handleSelectPreset(rule)"
          >
            <view class="preset-info">
              <text class="preset-name">{{rule.name}}</text>
              <text class="preset-desc">{{rule.desc}}</text>
            </view>
            <uni-icons type="right" size="16" color="#999"></uni-icons>
          </view>
        </scroll-view>
        <view class="popup-footer">
          <button class="close-btn" @click="closePresetPopup">关闭</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rulesList: [],
      presetRules: [
        {
          name: '兔喜生活',
          desc: '适用于兔喜快递驿站的取件码匹配',
          smsContent: '【兔喜生活】您的中通快递包裹已到xx村xx学校往东200米路北兔喜生活，凭Y17-123来取，有问题联系159xxxx6637',
          rules: {
            code: {
              start: '凭',
              end: '来'
            },
            express: {
              start: '的',
              end: '包裹'
            },
            address: {
              start: '到',
              end: '，'
            }
          }
        },
        {
          name: '递管家模板1',
          desc: '适用于由递管家提供的快递柜取件码匹配',
          smsContent: '【递管家】您的邮政包裹已到xx小区18号楼超市旁，请凭取件码25363454到1号快递柜取件，咨询135xxxx347',
          rules: {
            code: {
              start: '取件码',
              end: '到'
            },
            express: {
              start: '的',
              end: '已到'
            },
            address: {
              start: '已到',
              end: '，'
            }
          }
        },
        {
          name: '递管家模板2',
          desc: '适用于由递管家提供的快递柜取件码匹配',
          smsContent: '【递管家】您的圆通速递已到xx小区18号楼超市旁，凭取件码60116553取，有问题联系135xxxx9347',
          rules: {
            code: {
              start: '取件码',
              end: '取'
            },
            express: {
              start: '的',
              end: '已到'
            },
            address: {
              start: '已到',
              end: '，'
            }
          }
        },
      ]
    };
  },

  onShow() {
    this.loadRulesList();
  },

  methods: {
    // 格式化日期
    formatDate(date) {
      if (!date) return "";

      // 如果是时间戳或日期字符串，转换为Date对象
      const d = new Date(date);

      // 检查是否是有效的日期
      if (isNaN(d.getTime())) {
        return date; // 如果转换失败，返回原始字符串
      }

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}年${month}月${day}日`;
    },

    // 处理规则启用状态变化
    handleStatusChange(index, event) {
      const enabled = event.detail.value;
      this.rulesList[index].enabled = enabled;
      uni.setStorageSync("matchRulesList", JSON.stringify(this.rulesList));

      uni.showToast({
        title: enabled ? "规则已启用" : "规则已禁用",
        icon: "none",
      });
    },

    // 加载规则列表
    loadRulesList() {
      const savedRules = uni.getStorageSync("matchRulesList") || "[]";
      const rules = JSON.parse(savedRules);
      // 格式化时间并确保有enabled属性
      this.rulesList = rules.map((rule) => ({
        ...rule,
        enabled: rule.enabled !== undefined ? rule.enabled : true,
        createTime: this.formatDate(rule.createTime),
      }));
    },

    // 添加规则
    handleAdd() {
      uni.navigateTo({
        url: "/pages/my/match-settings?mode=add",
      });
    },

    // 编辑规则
    handleEdit(rule) {
      if (!rule.enabled) {
        uni.showToast({
          title: "请先启用该规则",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: `/pages/my/match-settings?mode=edit&id=${rule.id}`,
      });
    },

    // 删除规则
    handleDelete(index) {
      uni.showModal({
        title: "提示",
        content: "确定要删除这条规则吗？",
        success: (res) => {
          if (res.confirm) {
            this.rulesList.splice(index, 1);
            uni.setStorageSync(
              "matchRulesList",
              JSON.stringify(this.rulesList)
            );
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
          }
        },
      });
    },

    // 显示预制规则弹窗
    showPresetRules() {
      this.$refs.presetPopup.open();
    },

    // 关闭预制规则弹窗
    closePresetPopup() {
      this.$refs.presetPopup.close();
    },

    // 选择预制规则
    handleSelectPreset(preset) {
      // name 不能重复
      if (this.rulesList.some(rule => rule.name === preset.name)) {
        uni.showToast({
          title: `${preset.name} 已存在`,
          icon: "none",
        });
        return;
      }

      // 创建新规则
      const newRule = {
        id: Date.now().toString(),
        name: preset.name,
        rules: preset.rules,
        enabled: true,
        smsContent: preset.smsContent,
        createTime: this.formatDate(new Date())
      };

      // 添加到规则列表
      this.rulesList.push(newRule);
      
      // 保存到本地存储
      uni.setStorageSync('matchRulesList', JSON.stringify(this.rulesList));
      
      // 关闭弹窗
      this.closePresetPopup();
      
      // 提示添加成功
      uni.showToast({
        title: '添加成功',
        icon: 'success'
      });
    }
  },
};
</script>

<style lang="scss">
.match-rules {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;
  padding-bottom: 120rpx;

  .action-header {
    margin-bottom: 20rpx;
    
    .preset-btn {
      width: 100%;
      background: #fff;
      border: none;
      padding: 30rpx;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8rpx;
      
      text {
        color: #0052d9;
        font-size: 28rpx;
      }
      
      &:active {
        opacity: 0.8;
      }
    }
  }

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
    background-color: #0052d9;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 82, 217, 0.4);
    border: none;
    padding: 0;
    margin-top: 40rpx;

    text {
      color: #fff;
      font-size: 32rpx;
    }

    &:active {
      transform: scale(0.95);
    }

    &::after {
      border: none;
    }
  }

  .preset-popup {
    background: #fff;
    border-radius: 24rpx 24rpx 0 0;
    padding-bottom: env(safe-area-inset-bottom);
    
    .popup-header {
      padding: 40rpx;
      text-align: center;
      
      .popup-title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .popup-desc {
        font-size: 26rpx;
        color: #999;
      }
    }
    
    .preset-list {
      max-height: 60vh;
      padding: 0 20rpx;
      box-sizing: border-box;
      
      .preset-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        background: #f8f8f8;
        border-radius: 12rpx;
        margin-bottom: 20rpx;
        
        &:active {
          opacity: 0.8;
        }
        
        .preset-info {
          flex: 1;
          margin-right: 20rpx;
          
          .preset-name {
            font-size: 30rpx;
            color: #333;
            font-weight: 500;
            margin-bottom: 8rpx;
            display: block;
          }
          
          .preset-desc {
            font-size: 26rpx;
            color: #666;
          }
        }
      }
    }
    
    .popup-footer {
      padding: 20rpx 40rpx 40rpx;
      box-sizing: border-box;
      
      .close-btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        background: #f5f5f5;
        font-size: 30rpx;
        color: #333;
      }
    }
  }
}
</style>
