<template>
  <view class="page-wrapper">
    <view class="page-bg"></view>
    <view class="container">
      <view class="form-content">
        <!-- 取件码 -->
        <view class="form-item">
          <text class="label">取件码</text>
          <input class="input" v-model="form.code" placeholder="请输入取件码" />
        </view>
        <!-- 物流公司 -->
        <view class="form-item">
          <text class="label">物流公司</text>
          <input class="input" v-model="form.company" placeholder="请输入物流公司名称" />
        </view>
        <!-- 标签 -->
        <view class="form-item">
          <text class="label">标签</text>
          <view class="tag-list">
            <view
              v-for="tag in tagOptions"
              :key="tag"
              class="tag"
              :class="{ selected: form.tags.includes(tag) }"
              @click="toggleTag(tag)"
              @longpress="deleteTag(tag)"
            >
              {{ tag }}
            </view>
          </view>
          <text class="tag-tip">长按标签可删除</text>
          <view class="custom-tag-row">
            <input
              class="input tag-input"
              v-model="customTag"
              placeholder="自定义标签"
              @confirm="addCustomTag"
              :disabled="tagOptions.length >= 10"
            />
            <div class="add-tag-btn" @click="addCustomTag" :class="{ disabled: tagOptions.length >= 10 }">添加</div>
          </view>
          <view v-if="tagOptions.length >= 10" class="tag-limit-tip">最多只能设置10个标签</view>
        </view>
        <!-- 备注 -->
        <view class="form-item">
          <text class="label">备注</text>
          <textarea class="textarea" v-model="form.remark" placeholder="请输入备注（可选）" />
        </view>
        <!-- 是否标记已取 -->
        <view class="form-item picked-row">
          <text class="label">是否标记已取</text>
          <switch class="picked-switch" :checked="form.isPicked" @change="handlePickedChange" />
        </view>
      </view>
      <view class="footer">
        <button class="submit-btn" @click="submit">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        code: '',
        company: '',
        tags: [],
        remark: '',
        isPicked: false,
      },
      tagOptions: [], // 初始化为空，onLoad时从本地获取
      customTag: '',
      editIndex: null,
      deletedTags: [],
    };
  },
  onLoad(options) {
    // 先从本地缓存加载标签
    const localTags = uni.getStorageSync('globalTagOptions');
    if (localTags) {
      this.tagOptions = JSON.parse(localTags);
    } else {
      this.tagOptions = ['家', '公司', '老家', '生鲜', '私密'];
    }
    // eventChannel 初始化
    const eventChannel = this.getOpenerEventChannel && this.getOpenerEventChannel();
    if (eventChannel) {
      eventChannel.on && eventChannel.on('editCodeInit', ({ item, index }) => {
        this.form = {
          code: item.code || '',
          company: item.company || '',
          tags: item.tags || [],
          remark: item.remark || '',
          isPicked: item.isPicked || false,
        };
        this.editIndex = index;
      });
    }
    // 兼容参数方式
    if (options.item) {
      const item = JSON.parse(decodeURIComponent(options.item));
      this.form = {
        code: item.code || '',
        company: item.company || '',
        tags: item.tags || [],
        remark: item.remark || '',
        isPicked: item.isPicked || false,
      };
      this.editIndex = options.index || null;
    }
  },
  methods: {
    vibrateShort() {
      if (uni && uni.vibrateShort) {
        uni.vibrateShort();
      }
    },
    toggleTag(tag) {
      this.vibrateShort();
      const idx = this.form.tags.indexOf(tag);
      if (idx > -1) {
        this.form.tags.splice(idx, 1);
      } else {
        this.form.tags.push(tag);
      }
    },
    deleteTag(tag) {
      this.vibrateShort();
      uni.showModal({
        title: '删除标签',
        content: `确定要删除标签"${tag}"吗？`,
        confirmText: '删除',
        confirmColor: '#ff4d4f',
        success: (res) => {
          if (res.confirm) {
            this.tagOptions = this.tagOptions.filter(t => t !== tag);
            uni.setStorageSync('globalTagOptions', JSON.stringify(this.tagOptions));
            this.form.tags = this.form.tags.filter(t => t !== tag);
            if (!this.deletedTags.includes(tag)) this.deletedTags.push(tag);
          }
        }
      });
    },
    addCustomTag() {
      this.vibrateShort();
      const tag = this.customTag.trim();
      if (this.tagOptions.length >= 10) {
        uni.showToast({ title: '最多只能设置10个标签', icon: 'none' });
        return;
      }
      if (tag && !this.tagOptions.includes(tag)) {
        this.tagOptions.push(tag);
        uni.setStorageSync('globalTagOptions', JSON.stringify(this.tagOptions));
      }
      if (tag && !this.form.tags.includes(tag)) {
        this.form.tags.push(tag);
      }
      this.customTag = '';
    },
    submit() {
      this.vibrateShort();
      if (!this.form.code) {
        uni.showToast({ title: '请输入取件码', icon: 'none' });
        return;
      }
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('editCodeDone', {
        form: this.form,
        index: this.editIndex,
        deletedTags: this.deletedTags,
      });
      uni.navigateBack();
    },
    handlePickedChange(e) {
      this.vibrateShort();
      this.form.isPicked = e.detail.value;
    },
  },
};
</script>

<style lang="scss">
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
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
}
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
  .textarea {
    width: 100%;
    min-height: 100rpx;
    border: 1rpx solid #eee;
    border-radius: 12rpx;
    padding: 10rpx 20rpx;
    font-size: 28rpx;
    background: #f8f9fc;
    color: #333;
    resize: none;
    box-sizing: border-box;
  }
}
.tag-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12rpx;
  align-items: center;
  margin-top: 8rpx;
  .tag {
    background: #f0f4ff;
    color: #1673ff;
    border-radius: 8rpx;
    padding: 8rpx 20rpx;
    font-size: 30rpx;
    cursor: pointer;
    text-align: center;
    &.selected {
      background: #1673ff;
      color: #fff;
    }
  }
}
.custom-tag-row {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
  .tag-input {
    width: 240rpx;
    margin-right: 20rpx;
    height: 60rpx;
  }
  .add-tag-btn {
    font-size: 24rpx;
    background: #1673ff;
    color: #fff;
    height: 60rpx;
    width: 120rpx;
    line-height: 60rpx;
    text-align: center;
    border-radius: 12rpx;
  }
}
.footer {
  margin-top: 40rpx;
}
.submit-btn {
  height: 88rpx;
  background: #0052d9;
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
.picked-switch {
  margin-left: 20rpx;
}
.picked-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    margin-bottom: 0;
  }
}
.tag-tip {
  font-size: 22rpx;
  color: #aaa;
  margin-top: 12rpx;
  margin-left: 4rpx;
  display: block;
}
.add-tag-btn.disabled {
  background: #ccc;
  color: #fff;
  pointer-events: none;
}
.tag-limit-tip {
  color: #ff4d4f;
  font-size: 22rpx;
  margin-top: 8rpx;
  margin-left: 4rpx;
}
</style> 