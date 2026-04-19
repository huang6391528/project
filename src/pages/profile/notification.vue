<template>
  <view class="page-notification">
    <!-- 导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">消息通知</text>
      <view class="nav-placeholder"></view>
    </view>
    
    <!-- 分类标签 -->
    <view class="tabs">
      <view 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab', { active: activeTab === tab.key }]"
        @tap="switchTab(tab.key)"
      >
        {{ tab.name }}
      </view>
    </view>
    
    <!-- 消息列表 -->
    <view class="message-list" v-if="displayMessages.length > 0">
      <view 
        v-for="msg in displayMessages" 
        :key="msg.id"
        class="message-item"
        @tap="markAsRead(msg.id)"
      >
        <view class="msg-icon">{{ msg.icon }}</view>
        <view class="msg-content">
          <view class="msg-header">
            <text class="msg-title">{{ msg.title }}</text>
            <view v-if="msg.unread" class="unread-dot"></view>
          </view>
          <text class="msg-desc">{{ msg.desc }}</text>
          <text class="msg-time">{{ msg.time }}</text>
        </view>
      </view>
      
      <!-- 查看更多按钮 -->
      <view class="view-more" v-if="hasMoreMessages" @tap="toggleExpand">
        <text class="view-more-text">{{ isExpanded ? '收起' : '查看更多' }}</text>
        <text class="view-more-icon" :class="{ expanded: isExpanded }">▼</text>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <text class="empty-icon">📭</text>
      <text class="empty-title">暂无通知</text>
      <text class="empty-desc">关注活动获取最新消息</text>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="footer-actions" v-if="filteredMessages.length > 0">
      <view class="action-btn read-all" @tap="markAllRead">
        <text class="btn-icon">✓</text>
        <text class="btn-text">一键已读</text>
      </view>
      <view class="action-btn clear-all" @tap="showClearConfirm">
        <text class="btn-icon">🗑️</text>
        <text class="btn-text">清空消息</text>
      </view>
    </view>
    
    <!-- 清空确认弹窗 -->
    <view class="modal-overlay" v-if="clearModalVisible" @tap="hideClearConfirm">
      <view class="modal-card" @tap.stop>
        <view class="modal-icon">🗑️</view>
        <text class="modal-title">清空确认</text>
        <text class="modal-desc">确定要清空所有通知吗？操作后将无法找回历史消息。</text>
        <view class="modal-actions">
          <view class="modal-btn cancel" @tap="hideClearConfirm">取消</view>
          <view class="modal-btn confirm" @tap="clearAllMessages">确定清空</view>
        </view>
      </view>
    </view>
    
    <!-- Toast 提示 -->
    <view class="toast-message" v-if="toastVisible">
      <text class="toast-icon">✓</text>
      <text>{{ toastMsg }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

// Toast
const toastVisible = ref(false)
const toastMsg = ref('')

// 清空确认弹窗
const clearModalVisible = ref(false)
let toastTimer = null

// 是否展开全部消息
const isExpanded = ref(false)

// 返回上一页
function goBack() {
  uni.navigateBack()
}

// 标签页
const tabs = [
  { key: 'all', name: '全部' },
  { key: 'activity', name: '活动' },
  { key: 'account', name: '账户' },
  { key: 'system', name: '系统' }
]

const activeTab = ref('all')

// 消息数据
const messages = ref([
  { 
    id: 1, 
    type: 'activity', 
    title: '【活动通知】贵州大学校园低碳跑活动开启', 
    desc: '加入校园"低碳跑"挑战赛，每日步数兑换双倍碳积分，连续7天达标可领取"环保先锋"限定勋章！', 
    time: '2026-04-15 08:30', 
    unread: true, 
    icon: '🏃' 
  },
  { 
    id: 2, 
    type: 'account', 
    title: '【账户通知】碳积分兑换订单已审核通过', 
    desc: '您申请的"环保帆布袋"兑换申请已通过审核，礼品预计在1-3个工作日内送达至宿管中心，请注意查收。', 
    time: '2026-04-14 15:45', 
    unread: true, 
    icon: '🎁' 
  },
  { 
    id: 3, 
    type: 'system', 
    title: '【系统通知】低碳校园 V2.5 版本更新公告', 
    desc: '全新"低碳社区"功能上线！支持校园动态发布及好友积分互赠，修复了已知的数据同步Bug，建议立即更新。', 
    time: '2026-04-12 10:00', 
    unread: false, 
    icon: '🔄' 
  },
  { 
    id: 4, 
    type: 'account', 
    title: '【账户通知】成功邀请好友获得奖励', 
    desc: '您的好友"李华"已通过您的分享链接完成实名认证，50碳积分已发放到您的账户，请查收。', 
    time: '2026-04-10 14:20', 
    unread: true, 
    icon: '👥' 
  },
  { 
    id: 5, 
    type: 'activity', 
    title: '【活动通知】地球一小时熄灯接力挑战', 
    desc: '本周六晚20:30，加入熄灯接力挑战，在APP内点击"参与"即视为参与成功，活动后统一发放100积分。', 
    time: '2026-04-08 18:00', 
    unread: false, 
    icon: '🌍' 
  },
  { 
    id: 6, 
    type: 'system', 
    title: '【系统通知】碳积分商城维护公告', 
    desc: '为了提升兑换体验，我们将于今日凌晨2:00-4:00进行系统维护。维护期间积分查询功能受限。', 
    time: '2026-04-05 22:30', 
    unread: false, 
    icon: '⚙️' 
  },
  { 
    id: 7, 
    type: 'activity', 
    title: '【活动通知】校园二手市集报名中', 
    desc: '拒绝浪费，循环利用！本月底举办"低碳生活"二手市集，现公开招募摊主，名额有限先到先得。', 
    time: '2026-04-01 09:00', 
    unread: false, 
    icon: '♻️' 
  },
  { 
    id: 8, 
    type: 'account', 
    title: '【账户通知】实名认证审核结果', 
    desc: '恭喜！您的校园身份认证已审核通过。现在您可以参与所有积分获取活动并使用商场兑换功能了。', 
    time: '2026-03-28 11:20', 
    unread: false, 
    icon: '✅' 
  }
])

// 过滤后的消息
const filteredMessages = computed(() => {
  if (activeTab.value === 'all') {
    return messages.value
  }
  return messages.value.filter(m => m.type === activeTab.value)
})

// 显示的消息（前3条或全部）
const displayMessages = computed(() => {
  if (isExpanded.value) {
    return filteredMessages.value
  }
  return filteredMessages.value.slice(0, 3)
})

// 是否有更多消息
const hasMoreMessages = computed(() => {
  return filteredMessages.value.length > 3
})

// 切换展开/收起
function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

// 切换标签
function switchTab(key) {
  activeTab.value = key
  isExpanded.value = false  // 切换标签时重置展开状态
}

// 标记单条已读
function markAsRead(id) {
  const msg = messages.value.find(m => m.id === id)
  if (msg && msg.unread) {
    msg.unread = false
    showToast('已标记为已读')
  }
}

// 一键已读
function markAllRead() {
  let hasUnread = false
  // 只标记当前分类的消息
  filteredMessages.value.forEach(m => {
    if (m.unread) {
      m.unread = false
      hasUnread = true
    }
  })
  if (hasUnread) {
    showToast('全部消息已读')
  } else {
    showToast('没有未读消息')
  }
}

// 显示清空确认
function showClearConfirm() {
  clearModalVisible.value = true
}

// 隐藏清空确认
function hideClearConfirm() {
  clearModalVisible.value = false
}

// 清空所有消息
function clearAllMessages() {
  // 只清空当前分类的消息
  if (activeTab.value === 'all') {
    messages.value = []
  } else {
    messages.value = messages.value.filter(m => m.type !== activeTab.value)
  }
  isExpanded.value = false  // 清空后重置展开状态
  hideClearConfirm()
  showToast('消息已清空')
}

// 显示 Toast
function showToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  toastTimer = setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
.page-notification {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

/* 导航栏 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
}

.nav-back {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 48rpx;
  color: #333333;
}

.nav-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
}

.nav-placeholder {
  width: 80rpx;
}

/* 标签页 */
.tabs {
  display: flex;
  padding: 20rpx 32rpx;
  background-color: #ffffff;
  gap: 16rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.tab {
  padding: 12rpx 32rpx;
  border-radius: 60rpx;
  font-size: 26rpx;
  color: #6b7280;
  background-color: #f3f4f6;
  transition: all 0.2s;
}

.tab.active {
  background-color: #10b981;
  color: #ffffff;
}

/* 消息列表 */
.message-list {
  flex: 1;
  padding: 24rpx 32rpx;
  padding-bottom: 180rpx;
}

.message-item {
  display: flex;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
  transition: background-color 0.15s;
}

.message-item:active {
  background-color: #f9fafb;
}

.msg-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: #e6f7ec;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.msg-content {
  flex: 1;
}

.msg-header {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.msg-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
  flex: 1;
  line-height: 1.4;
}

.unread-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #ef4444;
  border-radius: 50%;
  margin-left: 12rpx;
  flex-shrink: 0;
}

.msg-desc {
  display: block;
  font-size: 26rpx;
  color: #6b7280;
  margin-bottom: 12rpx;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.msg-time {
  font-size: 22rpx;
  color: #9ca3af;
}

/* 查看更多按钮 */
.view-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 32rpx 0;
  margin-top: 8rpx;
}

.view-more-text {
  font-size: 28rpx;
  color: #10b981;
  font-weight: 600;
}

.view-more-icon {
  font-size: 28rpx;
  color: #10b981;
  transition: transform 0.3s;
}

.view-more-icon.expanded {
  transform: rotate(180deg);
}

/* 空状态 */
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
}

.empty-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12rpx;
}

.empty-desc {
  font-size: 26rpx;
  color: #9ca3af;
}

/* 底部操作栏 */
.footer-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 24rpx;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  background-color: #ffffff;
  border-top: 1rpx solid #f0f0f0;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.04);
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 24rpx 0;
  border-radius: 60rpx;
  font-size: 28rpx;
  font-weight: 600;
  transition: all 0.15s;
}

.action-btn.read-all {
  background-color: #f0fdf4;
  color: #10b981;
  border: 1rpx solid #d1fae5;
}

.action-btn.read-all:active {
  background-color: #10b981;
  color: #ffffff;
}

.action-btn.clear-all {
  background-color: #fef2f2;
  color: #ef4444;
  border: 1rpx solid #fee2e2;
}

.action-btn.clear-all:active {
  background-color: #ef4444;
  color: #ffffff;
}

.btn-icon {
  font-size: 32rpx;
}

.btn-text {
  font-size: 28rpx;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 64rpx;
}

.modal-card {
  background-color: #ffffff;
  border-radius: 48rpx;
  width: 100%;
  max-width: 600rpx;
  overflow: hidden;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-icon {
  font-size: 64rpx;
  text-align: center;
  margin-top: 64rpx;
  margin-bottom: 24rpx;
}

.modal-title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 16rpx;
}

.modal-desc {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  text-align: center;
  padding: 0 32rpx;
  margin-bottom: 48rpx;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  border-top: 1rpx solid #f3f4f6;
}

.modal-btn {
  flex: 1;
  padding: 34rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight:500;
  transition: background-color 0.15s;
}

.modal-btn.cancel {
  color: #6b7280;
  border-right: 1rpx solid #f3f4f6;
}

.modal-btn.cancel:active {
  background-color: #f9fafb;
}

.modal-btn.confirm {
  color: #ef4444;
  font-weight: 700;
}

.modal-btn.confirm:active {
  background-color: #f9fafb;
}

/* Toast */
.toast-message {
  position: fixed;
  bottom: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f2937;
  padding: 24rpx 48rpx;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
  z-index: 1100;
  color: #ffffff;
  font-size: 28rpx;
}

.toast-icon {
  color: #4ade80;
  font-size: 32rpx;
  font-weight: 700;
}
</style>