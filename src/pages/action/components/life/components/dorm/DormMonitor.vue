<template>
  <view class="dorm-monitor-list">
    <view class="dorm-monitor-item">
      <view class="dorm-monitor-left">
        <text class="iconfont dorm-monitor-icon indigo">📴</text>
        <text class="dorm-monitor-name">熄灯自律打卡</text>
      </view>
      <text class="dorm-monitor-hint">23:00 后开启</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.dorm-monitor-list {
  padding: 0 24rpx;
  margin-bottom: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.dorm-monitor-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}

.dorm-monitor-left { display: flex; align-items: center; gap: 16rpx; }
.dorm-monitor-icon { font-size: 44rpx; }
.dorm-monitor-icon.indigo { color: #6366f1; }
.dorm-monitor-name { font-size: 22rpx; font-weight: 700; color: #374151; }
.dorm-monitor-hint {
  font-size: 18rpx;
  color: #9ca3af;
  font-style: italic;
}
</style>
