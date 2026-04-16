<template>
  <view class="page-records">
    <!-- 状态栏 -->
    <view class="status-bar">
      <text class="time">09:43</text>
      <view class="status-icons">
        <text>📶</text>
        <text>📶</text>
        <text>🔋</text>
      </view>
    </view>

    <!-- 导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">我的反馈</text>
      <view class="nav-placeholder"></view>
    </view>

    <view class="content">
      <!-- 筛选标签 -->
      <view class="filter-tabs">
        <view 
          v-for="tab in filterTabs" 
          :key="tab.key"
          :class="['filter-tab', { active: activeFilter === tab.key }]"
          @tap="switchFilter(tab.key)"
        >
          {{ tab.name }} ({{ getCount(tab.key) }})
        </view>
      </view>

      <!-- 反馈记录列表 -->
      <view class="records-list" v-if="filteredRecords.length > 0">
        <view 
          v-for="record in filteredRecords" 
          :key="record.id"
          :class="['record-item', { 'has-reply': record.status === 'replied' }]"
        >
          <view class="record-header">
            <view class="record-meta">
              <text :class="['type-badge', record.typeClass]">{{ record.type }}</text>
              <text class="record-time">{{ record.time }}</text>
            </view>
            <view :class="['status-badge', record.statusClass]">
              <text class="status-icon">{{ record.statusIcon }}</text>
              <text>{{ record.statusText }}</text>
            </view>
          </view>
          <text class="record-title">{{ record.title }}</text>
          <text class="record-desc">{{ record.desc }}</text>
          
          <!-- 官方回复 -->
          <view class="reply-box" v-if="record.reply">
            <view class="reply-header">
              <text class="reply-icon">🤖</text>
              <text class="reply-label">官方回复：</text>
            </view>
            <text class="reply-content">{{ record.reply }}</text>
            <text class="reply-time">回复时间：{{ record.replyTime }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-else>
        <text class="empty-icon">📋</text>
        <text class="empty-title">暂无反馈记录</text>
        <text class="empty-desc">您的反馈会在这里显示</text>
      </view>

      <!-- 无更多记录 -->
      <view class="no-more" v-if="filteredRecords.length > 0">
        <text>没有更多反馈记录了</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const filterTabs = [
  { key: 'all', name: '全部记录' },
  { key: 'processing', name: '处理中' },
  { key: 'replied', name: '已回复' }
]

const activeFilter = ref('all')

const records = ref([
  {
    id: 1,
    type: '功能建议',
    typeClass: 'type-suggest',
    time: '2026-04-14 15:30',
    status: 'processing',
    statusText: '处理中',
    statusClass: 'status-processing',
    statusIcon: '⏳',
    title: '建议增加碳积分排行榜功能',
    desc: '目前的积分体系缺乏社交互动，希望能看到同学院、同班级的积分排名，增加趣味性和竞争意识。',
    reply: null
  },
  {
    id: 2,
    type: 'BUG反馈',
    typeClass: 'type-bug',
    time: '2026-04-10 10:22',
    status: 'replied',
    statusText: '已回复',
    statusClass: 'status-replied',
    statusIcon: '✓',
    title: '校园跑数据同步延迟',
    desc: '昨天下午跑了3公里，但是APP一直没有显示，重启手机后依然没有同步数据。',
    reply: '您好，经核实由于服务器维护导致部分安卓机型数据同步延迟，目前已修复。您的积分已补发至账户，请查收。',
    replyTime: '2026-04-11 09:15'
  },
  {
    id: 3,
    type: '其他问题',
    typeClass: 'type-other',
    time: '2026-04-01 19:45',
    status: 'processing',
    statusText: '处理中',
    statusClass: 'status-processing',
    statusIcon: '⏳',
    title: '咨询积分商城补货时间',
    desc: '看中的共享单车月卡没货了，请问什么时候能补货？',
    reply: null
  }
])

const filteredRecords = computed(() => {
  if (activeFilter.value === 'all') {
    return records.value
  }
  return records.value.filter(r => r.status === activeFilter.value)
})

function getCount(key) {
  if (key === 'all') return records.value.length
  return records.value.filter(r => r.status === key).length
}

function goBack() {
  uni.navigateBack()
}

function switchFilter(key) {
  activeFilter.value = key
}
</script>

<style scoped>
.page-records {
  min-height: 100vh;
  background-color: #f8fafc;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 40rpx;
  background-color: #ffffff;
}

.time {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.status-icons {
  display: flex;
  gap: 12rpx;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #f3f4f6;
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
  color: #1f2937;
}

.nav-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
}

.nav-placeholder {
  width: 80rpx;
}

.content {
  padding: 24rpx 24rpx 60rpx;
}

.filter-tabs {
  display: flex;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.filter-tab {
  padding: 12rpx 24rpx;
  background-color: #f3f4f6;
  border-radius: 60rpx;
  font-size: 24rpx;
  color: #6b7280;
  transition: all 0.15s;
}

.filter-tab.active {
  background-color: #1f2937;
  color: #ffffff;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.record-item {
  background-color: #ffffff;
  border: 1rpx solid #f3f4f6;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
}

.record-item.has-reply {
  border-left: 6rpx solid #10b981;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.record-meta {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.type-badge {
  padding: 6rpx 16rpx;
  border-radius: 60rpx;
  font-size: 22rpx;
  font-weight: 700;
}

.type-badge.type-suggest {
  background-color: #dbeafe;
  color: #2563eb;
}

.type-badge.type-bug {
  background-color: #fee2e2;
  color: #dc2626;
}

.type-badge.type-other {
  background-color: #f3f4f6;
  color: #6b7280;
}

.record-time {
  font-size: 22rpx;
  color: #9ca3af;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6rpx;
  font-size: 24rpx;
  font-weight: 700;
}

.status-badge.status-processing {
  color: #f59e0b;
}

.status-badge.status-replied {
  color: #10b981;
}

.status-icon {
  font-size: 28rpx;
}

.record-title {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12rpx;
}

.record-desc {
  display: block;
  font-size: 26rpx;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 24rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.reply-box {
  background-color: #f0fdf4;
  border-radius: 20rpx;
  padding: 24rpx;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.reply-icon {
  font-size: 28rpx;
}

.reply-label {
  font-size: 24rpx;
  font-weight: 700;
  color: #059669;
}

.reply-content {
  display: block;
  font-size: 26rpx;
  color: #047857;
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.reply-time {
  display: block;
  font-size: 22rpx;
  color: #34d399;
  text-align: right;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}

.empty-icon {
  font-size: 100rpx;
  margin-bottom: 32rpx;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 12rpx;
}

.empty-desc {
  font-size: 26rpx;
  color: #9ca3af;
}

.no-more {
  text-align: center;
  margin-top: 64rpx;
  font-size: 24rpx;
  color: #d1d5db;
}
</style>