<template>
  <view class="history-list">
    <text class="history-title">打卡历史</text>
    <view v-for="item in history" :key="item.text" class="history-item" :class="{ 'history-pass': item.pass }">
      <view class="history-dot" :class="{ 'dot-gray': item.pass }"></view>
      <view class="history-content">
        <text class="history-text">{{ item.text }}</text>
        <text class="history-time">{{ item.time }}</text>
        <view v-if="item.images" class="history-images">
          <image v-for="img in item.images" :key="img" class="history-img" :src="img" mode="aspectFill"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const history = [
  {
    text: '旧书捐赠记录',
    time: '2026-04-05 08:30 · 教学楼 3 楼回收站',
    images: ['/static/placeholder.png', '/static/placeholder.png'],
    pass: false,
  },
  {
    text: '校园跑 3.5km',
    time: '2026-04-04 19:15 · 操场',
    images: null,
    pass: true,
  },
]
</script>

<style scoped>
.history-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 64rpx;
  margin-bottom: 24rpx;
}

.history-list { padding-bottom: 40rpx; }

.history-item {
  display: flex;
  align-items: flex-start;
  padding-bottom: 32rpx;
}

.history-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #10b981;
  border-radius: 50%;
  margin-top: 8rpx;
  flex-shrink: 0;
  box-shadow: 0 0 0 8rpx rgba(16, 185, 129, 0.1);
}

.dot-gray {
  background-color: #d1d5db;
  box-shadow: 0 0 0 8rpx rgba(209, 213, 219, 0.1);
}

.history-pass { opacity: 0.7; }

.history-content { margin-left: 24rpx; flex: 1; }

.history-text {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.history-time {
  display: block;
  font-size: 22rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}

.history-images {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}

.history-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background-color: #f3f4f6;
}
</style>
