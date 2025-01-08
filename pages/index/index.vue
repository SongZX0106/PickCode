<template>
  <view class="page-wrapper">
    <view class="container">

      <view class="title">取件码工具</view>


      <!-- 输入区域 -->
      <view class="card">
        <view class="input-area">
          <input
            class="code-input"
            v-model="newCode"
            type="number"
            placeholder="请输入取件码"
          />
          <button class="add-btn" @click="addCode">添加</button>
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
      <template v-for="(group, date) in groupedCodes" :key="date">
        <view class="card code-card">
          <view class="card-header">
            <text class="card-title">{{ date }}</text>
            <text class="card-extra">
              <text class="pending-count">{{ getPendingCount(group) }}</text>
              <text>个待取件</text>
            </text>
          </view>
          <view class="code-list">
            <view class="code-item" v-for="(item, index) in group" :key="index">
              <checkbox
                class="checkbox"
                :checked="item.isPicked"
                @click="togglePicked(item)"
              />
              <text class="code-text" :class="{ picked: item.isPicked }">
                {{ formatCode(item.code) }}
              </text>
              <view class="actions">
                <uni-icons type="compose" size="20" @click="editCode(item)" />
                <uni-icons
                  type="trash"
                  size="20"
                  color="#ff5a5f"
                  @click="deleteCode(item)"
                />
              </view>
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
  <!-- 添加 Dialog 组件 -->
  <edit-dialog 
    v-model:show="showEditDialog"
    :value="editingCode"
    @confirm="handleEditConfirm"
  />
</template>

<script>
import EditDialog from '@/components/EditDialog.vue'

export default {
  components: {
    EditDialog
  },
  data() {
    return {
      newCode: "",
      packageCodes: [],
      showEditDialog: false,
      editingItem: null,
      editingCode: ''
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
          groups[formattedDate] = [];
        }
        groups[formattedDate].push(item);
      });
      return groups;
    },
  },
  created() {
    try {
      const savedCodes = uni.getStorageSync("packageCodes");
      if (savedCodes) {
        this.packageCodes = JSON.parse(savedCodes);
      }
    } catch (e) {
      console.error("读取缓存失败:", e);
    }
  },
  methods: {
    saveToStorage() {
      try {
        uni.setStorageSync("packageCodes", JSON.stringify(this.packageCodes));
      } catch (e) {
        console.error("保存缓存失败:", e);
      }
    },
    addCode() {
      if (!this.newCode) return;
      
      const newCode = this.newCode.replace(/\s/g, '');
      const today = new Date().toLocaleDateString();
      
      // 检查今天的取件码是否重复
      const isDuplicate = this.packageCodes.some(item => {
        const itemDate = new Date(item.date).toLocaleDateString();
        return itemDate === today && item.code === newCode;
      });

      if (isDuplicate) {
        // 如果重复，显示提示
        uni.showToast({
          title: '今日已添加该取件码',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // 不重复则添加
      this.packageCodes.unshift({
        code: newCode,
        date: new Date().toLocaleString(),
        isPicked: false,
      });
      this.saveToStorage();
      this.newCode = "";
    },
    editCode(item) {
      this.editingItem = item;
      this.editingCode = item.code;
      this.showEditDialog = true;
    },
    handleEditConfirm(value) {
      if (!this.editingItem) return;
      
      const newCode = value.replace(/\s/g, '');
      const editingDate = new Date(this.editingItem.date).toLocaleDateString();
      
      // 如果编辑后的码与原码相同，直接保存
      if (newCode === this.editingItem.code) {
        this.editingItem = null;
        this.editingCode = '';
        return;
      }

      // 检查同一天是否有重复的取件码
      const isDuplicate = this.packageCodes.some(item => {
        const itemDate = new Date(item.date).toLocaleDateString();
        return itemDate === editingDate && 
               item.code === newCode && 
               item !== this.editingItem; // 排除自身
      });

      if (isDuplicate) {
        uni.showToast({
          title: '该日期已存在相同取件码',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // 不重复则保存
      this.editingItem.code = newCode;
      this.saveToStorage();
      this.editingItem = null;
      this.editingCode = '';
    },
    deleteCode(item) {
      uni.showModal({
        title: "确认删除",
        content: "是否删除该取件码?",
        success: (res) => {
          if (res.confirm) {
            const index = this.packageCodes.indexOf(item);
            this.packageCodes.splice(index, 1);
            this.saveToStorage();
          }
        },
      });
    },
    togglePicked(item) {
      item.isPicked = !item.isPicked;
      this.saveToStorage();
    },
    getPendingCount(group) {
      return group.filter(item => !item.isPicked).length;
    },
    getTextBeforeNumber(str) {
      return str.split(/\d+/)[0];
    },
    getNumber(str) {
      const match = str.match(/\d+/);
      return match ? match[0] : '';
    },
    getTextAfterNumber(str) {
      const parts = str.split(/\d+/);
      return parts.length > 1 ? parts[1] : '';
    },
    formatCode(code) {
      if (/^\d{8}$/.test(code)) {
        return code.replace(/(\d{4})(?=\d)/g, '$1 ');
      }
      return code;
    }
  },
};
</script>

<style lang="scss">
.title {
  font-size: 50rpx;
  color: #333;
  font-family: monospace;
  font-weight: 500;
  margin-bottom: 20rpx;
  margin-top: 40rpx;
}


.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(180deg, #92c3ff 0%, #ffffff 40%);
}

.container {
  padding: 40rpx 20rpx 20rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.input-area {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.code-input {
  flex: 1;
  padding: 0 15rpx;
  height: 80rpx;
  border: 1rpx solid #ddd;
  border-radius: 10rpx;
}

.add-btn {
  background-color: #4facfe;
  color: #fff;
  border-radius: 10rpx;
  padding: 0 30rpx;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 30rpx;
}

.date-display {
  text-align: center;
  font-size: 30rpx;
  color: #333;
}

.date {
  font-weight: bold;
  color: #4facfe;
}

.code-card {
  padding: 0;
}

.card-header {
  background-color: #f9f9f9;
  padding: 20rpx;
  border-bottom: 1rpx solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.card-extra {
  font-size: 26rpx;
  color: #666;
  
  .pending-count {
    color: #4facfe;
    font-size: 32rpx;
    font-weight: bold;
    margin-right: 4rpx;
  }
}

.code-list {
  padding: 20rpx;

  .code-item:not(:last-child) {
    margin-bottom: 30rpx;
  }
}

.code-item {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #4facfe;
  border-radius: 8rpx;
  margin-right: 20rpx;
  background: #fff;
  position: relative;

  ::v-deep .uni-checkbox-input {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -57%);
      color: #4facfe;
    }
  }
}

.code-text {
  flex: 1;
}

.code-text.picked {
  text-decoration: line-through;
  color: #bbb;
}

.actions {
  display: flex;
  gap: 20rpx;
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
          color: #4facfe;
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
</style>
