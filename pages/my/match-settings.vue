<template>
  <view class="match-settings">
    <!-- 规则名称输入区 -->
    <view class="input-section">
      <text class="section-title">规则名称</text>
      <input
        class="rule-name-input"
        v-model="ruleName"
        placeholder="请输入规则名称"
        type="text"
      />
    </view>

    <!-- 短信内容输入区 -->
    <view class="input-section">
      <text class="section-title">短信内容</text>
      <text class="section-desc">请输入完整的短信内容，然后设置匹配规则</text>
      <textarea
        class="sms-input"
        v-model="smsContent"
        placeholder="请输入完整的短信内容"
        :maxlength="-1"
        @input="handleSmsInput"
      />
    </view>

    <!-- 匹配规则设置区 -->
    <view class="rules-section">
      <view class="rules-desc">
        <text>设置规则说明：</text>
        <text>1. 输入要匹配内容的前后文字</text>
        <text>2. 系统将自动提取这两段文字之间的内容</text>
        <text>3. 例如：取件码123456领取，可以输入 取件码 和 领取</text>
      </view>
      <!-- 取件码设置 -->
      <view class="rule-item">
        <view class="rule-header">
          <text class="rule-title">取件码</text>
        </view>
        <view class="rule-content">
          <view class="rule-inputs">
            <input
              type="text"
              v-model="rules.code.start"
              placeholder="起始文字"
              @input="handleRuleChange"
            />
            <text>至</text>
            <input
              type="text"
              v-model="rules.code.end"
              placeholder="结束文字"
              @input="handleRuleChange"
            />
          </view>
          <view class="match-result" v-if="rules.code.start && rules.code.end">
            <template v-if="matchResults.code">
              匹配结果：<text class="result-text success">{{
                matchResults.code
              }}</text>
            </template>
            <template v-else>
              <text class="result-text error">匹配失败，请检查规则设置</text>
            </template>
          </view>
        </view>
      </view>

      <!-- 快递名称设置 -->
      <view class="rule-item">
        <view class="rule-header">
          <text class="rule-title">快递名称</text>
        </view>
        <view class="rule-content">
          <view class="rule-inputs">
            <input
              type="text"
              v-model="rules.express.start"
              placeholder="起始文字"
              @input="handleRuleChange"
            />
            <text>至</text>
            <input
              type="text"
              v-model="rules.express.end"
              placeholder="结束文字"
              @input="handleRuleChange"
            />
          </view>
          <view
            class="match-result"
            v-if="rules.express.start && rules.express.end"
          >
            <template v-if="matchResults.express">
              匹配结果：<text class="result-text success">{{
                matchResults.express
              }}</text>
            </template>
            <template v-else>
              <text class="result-text error">匹配失败，请检查规则设置</text>
            </template>
          </view>
        </view>
      </view>

      <!-- 地址设置 -->
      <view class="rule-item">
        <view class="rule-header">
          <text class="rule-title">地址</text>
        </view>
        <view class="rule-content">
          <view class="rule-inputs">
            <input
              type="text"
              v-model="rules.address.start"
              placeholder="起始文字"
              @input="handleRuleChange"
            />
            <text>至</text>
            <input
              type="text"
              v-model="rules.address.end"
              placeholder="结束文字"
              @input="handleRuleChange"
            />
          </view>
          <view
            class="match-result"
            v-if="rules.address.start && rules.address.end"
          >
            <template v-if="matchResults.address">
              匹配结果：<text class="result-text success">{{
                matchResults.address
              }}</text>
            </template>
            <template v-else>
              <text class="result-text error">匹配失败，请检查规则设置</text>
            </template>
          </view>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="btn-section">
      <button class="save-btn" @click="handleSave">保存设置</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mode: "add", // add 或 edit
      ruleId: "", // 编辑时的规则ID
      ruleName: "", // 规则名称
      smsContent: "",
      rules: {
        code: {
          start: "",
          end: "",
        },
        express: {
          start: "",
          end: "",
        },
        address: {
          start: "",
          end: "",
        },
      },
      matchResults: {
        code: "",
        express: "",
        address: "",
      },
    };
  },
  onLoad(options) {
    this.mode = options.mode || "add";
    if (this.mode === "edit" && options.id) {
      this.ruleId = options.id;
      this.loadRule(options.id);
    }
    // 加载保存的规则
    this.loadRules();
  },
  methods: {
    // 加载单个规则
    loadRule(id) {
      const rulesList = JSON.parse(
        uni.getStorageSync("matchRulesList") || "[]"
      );
      const rule = rulesList.find((item) => item.id === id);
      if (rule) {
        this.ruleName = rule.name;
        this.rules = rule.rules;
        this.smsContent = rule.smsContent || '';
        // 加载后立即更新匹配结果
        this.$nextTick(() => {
          this.updateMatchResults();
        });
      }
    },
    // 处理短信输入
    handleSmsInput() {
      this.updateMatchResults();
    },

    // 处理规则输入变化
    handleRuleChange() {
      this.updateMatchResults();
    },

    // 更新匹配结果
    updateMatchResults() {
      if (!this.smsContent) {
        this.matchResults = { code: "", express: "", address: "" };
        return;
      }

      // 更新各项匹配结果
      Object.keys(this.rules).forEach((key) => {
        const rule = this.rules[key];
        if (rule.start && rule.end) {
          // 查找起始文字和结束文字的位置
          const startIndex = this.smsContent.indexOf(rule.start);
          const endIndex = this.smsContent.indexOf(
            rule.end,
            startIndex + rule.start.length
          );

          if (startIndex !== -1 && endIndex !== -1) {
            // 提取起始文字之后到结束文字之前的内容
            this.matchResults[key] = this.smsContent
              .substring(startIndex + rule.start.length, endIndex)
              .trim();
          } else {
            this.matchResults[key] = "";
          }
        } else {
          this.matchResults[key] = "";
        }
      });
    },

    // 保存设置
    handleSave() {
      if (!this.ruleName.trim()) {
        uni.showToast({
          title: "请输入规则名称",
          icon: "none",
        });
        return;
      }

      // 验证规则有效性
      const enabledRules = Object.entries(this.rules).filter(
        ([_, rule]) => rule.start && rule.end
      );

      if (enabledRules.length === 0) {
        uni.showToast({
          title: "请至少设置一个有效的匹配规则",
          icon: "none",
        });
        return;
      }

      // 检查所有启用的规则是否都能成功匹配
      const hasMatchError = enabledRules.some(([key, _]) => !this.matchResults[key]);

      if (hasMatchError) {
        uni.showToast({
          title: "存在匹配失败的规则，请检查",
          icon: "none",
        });
        return;
      }

      // 获取现有规则列表
      const rulesList = JSON.parse(
        uni.getStorageSync("matchRulesList") || "[]"
      );

      const ruleData = {
        id: this.mode === "edit" ? this.ruleId : Date.now().toString(),
        name: this.ruleName,
        rules: this.rules,
        smsContent: this.smsContent,
        enabled: true,
        createTime: new Date().toLocaleString(),
      };

      if (this.mode === "edit") {
        const index = rulesList.findIndex((item) => item.id === this.ruleId);
        if (index !== -1) {
          rulesList[index] = ruleData;
        }
      } else {
        rulesList.push(ruleData);
      }

      // 保存规则列表
      uni.setStorageSync("matchRulesList", JSON.stringify(rulesList));

      uni.showToast({
        title: "保存成功",
        icon: "success",
        complete: () => {
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.match-settings {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
  box-sizing: border-box;

  .input-section {
    background-color: #fff;
    padding: 20rpx;
    border-radius: 12rpx;
    margin-bottom: 20rpx;

    .section-title {
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      margin-bottom: 16rpx;
      display: block;
    }

    .rule-name-input {
      width: 100%;
      height: 80rpx;
      border: 1px solid #0052d9;
      border-radius: 8rpx;
      padding: 0 16rpx;
      font-size: 28rpx;
      box-sizing: border-box;
    }

    .section-desc {
      font-size: 24rpx;
      color: #999;
      margin-bottom: 16rpx;
      display: block;
    }

    .sms-input {
      width: 100%;
      height: 200rpx;
      border: 1px solid #0052d9;
      border-radius: 8rpx;
      padding: 16rpx;
      font-size: 28rpx;
      box-sizing: border-box;
    }
  }

  .rules-section {
    background-color: #fff;
    border-radius: 12rpx;
    overflow: hidden;

    .rules-desc {
      padding: 20rpx;
      border-bottom: 1px solid #eee;

      text {
        display: block;
        font-size: 24rpx;
        color: #666;
        line-height: 1.6;

        &:first-child {
          color: #333;
          margin-bottom: 8rpx;
        }
      }
    }

    .rule-item {
      padding: 20rpx;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      .rule-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16rpx;

        .rule-title {
          font-size: 28rpx;
          color: #333;
          font-weight: 600;
        }
      }

      .rule-content {
        .rule-inputs {
          display: flex;
          align-items: center;
          gap: 16rpx;

          input {
            flex: 1;
            height: 70rpx;
            border: 1px solid #0052d9;
            border-radius: 8rpx;
            padding: 0 16rpx;
            font-size: 28rpx;
          }

          text {
            color: #666;
            font-size: 28rpx;
          }
        }

        .match-result {
          margin-top: 16rpx;
          font-size: 26rpx;
          color: #666;

          .result-text {
            margin-left: 8rpx;

            &.success {
              color: #0052d9;
            }

            &.error {
              color: #ff4d4f;
            }
          }
        }
      }
    }
  }

  .btn-section {
    margin-top: 40rpx;
    padding: 0 20rpx;

    .save-btn {
      background-color: #0052d9;
      color: #fff;
      border-radius: 8rpx;
      font-size: 32rpx;
      height: 88rpx;
      line-height: 88rpx;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
