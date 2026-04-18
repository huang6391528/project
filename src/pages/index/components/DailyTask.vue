<template>
  <view class="daily-task">
    <view class="task-left">
      <view class="task-icon">
        <text class="icon-emoji task-check">✅</text>
      </view>
      <view class="task-info">
        <text class="task-title">今日任务进度</text>
        <text class="task-sub">已完成 3/5 个任务</text>
      </view>
    </view>
    <button class="task-btn">去完成</button>
  </view>
</template>

<script setup>
</script>

<style scoped>
.daily-task {
  margin-top: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 3rpx solid #d1fae5;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.task-left {
  display: flex;
  align-items: center;
}

.task-icon {
  width: 96rpx; height: 96rpx;
  background-color: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-emoji {
  font-size: 48rpx;
  display: inline-block;
  line-height: 1;
}

.task-icon .icon-emoji {
  font-size: 56rpx;
}

.task-info {
  margin-left: 24rpx;
}

.task-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.task-sub {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}

.task-btn {
  background-color: #10b981;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 12rpx 28rpx;
  border-radius: 50rpx;
  box-shadow: 0 8rpx 16rpx rgba(16, 185, 129, 0.3);
}
</style>
