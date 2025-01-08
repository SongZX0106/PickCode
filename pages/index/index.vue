<template>
	<view class="page-wrapper">
		<view class="container">

			<view class="title">取件码工具</view>


			<!-- 输入区域 -->
			<view class="card">
				<view class="input-area">
					<input class="code-input" v-model="newCode" type="number" placeholder="请输入取件码" />
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
							<checkbox class="checkbox" :checked="item.isPicked" @click="togglePicked(item)" />
							<text class="code-text" :class="{ picked: item.isPicked }">
								{{ formatCode(item.code) }}
							</text>
							<view class="actions">
								<uni-icons type="compose" size="20" @click="editCode(item)" />
								<uni-icons type="trash" size="20" color="#ff5a5f" @click="deleteCode(item)" />
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>

		<button @click="readSms">读取短信</button>
	</view>
	<!-- 添加 Dialog 组件 -->
	<edit-dialog v-model:show="showEditDialog" :value="editingCode" @confirm="handleEditConfirm" />
</template>

<script>
	import EditDialog from '@/components/EditDialog.vue'
	import permision from '@/js_sdk/wa-permission/permission.js';
	import {
		parseTime
	} from "../../utils";

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
          const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
          if (!groups[formattedDate]) {
            groups[formattedDate] = [];
          }
          groups[formattedDate].push(item);
        });

        // 将对象转换为 [key, value] 数组，并按日期降序排序
        const sortedGroups = Object.entries(groups).sort((a, b) => {
          return new Date(b[0].replace(/(\d+)年(\d+)月(\d+)日/, '$1-$2-$3')) -
              new Date(a[0].replace(/(\d+)年(\d+)月(\d+)日/, '$1-$2-$3'));
        });

        // 将排序后的数组转换回对象
        const sortedGroupsObj = {};
        sortedGroups.forEach(([date, items]) => {
          sortedGroupsObj[date] = items;
        });

        return sortedGroupsObj;
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
			},
			async readSms() {
				let that = this
				var result = await permision.requestAndroidPermission('android.permission.READ_SMS');
				var msgList = [];
				if (result == 1) {
					//获得短信内容
					var main = plus.android.runtimeMainActivity();
					var Uri = plus.android.importClass('android.net.Uri');
					var ContactsContract = plus.android.importClass('android.provider.ContactsContract');
					var uri = Uri.parse('content://sms/');
					var cr = main.getContentResolver();
					plus.android.importClass(cr);
					var cur = cr.query(uri, null, null, null, null);
					plus.android.importClass(cur);
					cur.moveToFirst();

					uni.showLoading({
						title: '匹配短信記錄中..'
					});

					// 这一块设置了拿到当前时间的前五分钟，默认是获取全部的短信信息
					// 小米系统默认拿到的不是全部短信信息，需要在权限中开启"通知类短信"这个权限才能拿到全部
					let newdata = new Date().getTime();
					// 拿到当天的短信
					let fiveMinsAgo = newdata - (1 * 24 * 60 * 60 * 1000);
					var selection = 'date > ' + fiveMinsAgo;
					var cur = cr.query(uri, null, selection, null, null);

					while (cur.moveToNext()) {
						let newObj = {};
						// 发送人号码
						var index_Address = cur.getColumnIndex('address');
						var address = cur.getString(index_Address);
						newObj.telphone = address;

						//短信内容
						var index_Body = cur.getColumnIndex('body');
						var body = cur.getString(index_Body);
						newObj.content = body;
						// console.log('短信内容:' + body);

						//短信类型1接收 2发送
						var index_Type = cur.getColumnIndex('type');
						var type = cur.getString(index_Type);
						newObj.type = type == 1 ? '接收' : '發送';

						// 发送日期
						var smsDate = cur.getString(cur.getColumnIndex('date'));
						smsDate = parseTime(smsDate);
						newObj.sendDate = smsDate;

            // 匹配取件码
            let extractInfo = that.extractInfoStrict(body);
            newObj.code = extractInfo.code;

            // 内容包含 兔喜生活、递管家的短信push进来
            if (body.includes('兔喜生活') || body.includes('递管家')) {
              msgList.push(newObj);
            }
					}
					console.log('获取到的数据', JSON.stringify(msgList))
          that.dyAddCode(msgList)
					cur.close();
					uni.hideLoading();
				} else {
					uni.showToast({
						title: '请授权读取短信,仅用于匹配取件码',
						icon: 'none'
					});
					setTimeout(() => {
						uni.hideToast();
					}, 3000);
				}
			},
      extractInfoStrict(text) {
        // 定义递管家的正则表达式，支持更多快递公司名称和取件码描述方式
        const regexDiGuanjia = /(\d{8})/;
        // 定义兔喜生活的正则表达式
        const regexTuXilife = /凭([^\s]+)来取/;

        if(text.includes("递管家")){
          // 尝试匹配递管家的通知
          const matchDiGuanjia = text.match(regexDiGuanjia);
          if (matchDiGuanjia) {
            return {
              code: matchDiGuanjia[1]
            }
          }
        }

        if(text.includes("兔喜生活")){
          // 尝试匹配兔喜生活的通知
          const matchTuXilife = text.match(regexTuXilife);
          if (matchTuXilife) {
            return {
              code: matchTuXilife[1]
            }
          }
        }

        return {
          code: ''
        }
      },
      dyAddCode(msgList){
        for (let item of msgList) {
          if(this.packageCodes.some(i => i.code === item.code)){
            continue
          }
          this.packageCodes.unshift({
            code: item.code,
            date: new Date(item.sendDate).toLocaleString(),
            isPicked: false,
          });
          this.saveToStorage();
        }
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