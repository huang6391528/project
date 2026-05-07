<template>
  <view class="daily-task carbon-lift">
    <view class="task-left">
      <view class="task-icon">OK</view>
      <view class="task-info">
        <text class="task-title">今日低碳任务进行中</text>
        <text class="task-sub">已完成 3/5 项，继续认证可获得 180 碳积分</text>
        <view class="mini-progress">
          <view class="mini-progress-fill"></view>
        </view>
      </view>
    </view>
    <button class="task-btn">去完成</button>
  </view>
</template>

<script setup>
</script>

<style scoped>
.daily-task {
  margin-top: 36rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:
    radial-gradient(circle at 0% 0%, rgba(47, 211, 230, 0.16), transparent 34%),
    linear-gradient(135deg, rgba(255,255,255,0.95), rgba(238, 255, 245, 0.90));
  border: 1rpx solid rgba(14, 165, 111, 0.18);
  border-radius: 32rpx;
  padding: 28rpx;
  box-shadow: 0 16rpx 38rpx rgba(14, 165, 111, 0.12);
}

.task-left {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.task-icon {
  width: 86rpx;
  height: 86rpx;
  background: linear-gradient(145deg, #0ea56f, #2fd3e6);
  color: #fff;
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 900;
  box-shadow: 0 14rpx 30rpx rgba(14, 165, 111, 0.24);
}

.task-info {
  margin-left: 22rpx;
  flex: 1;
  min-width: 0;
}

.task-title {
  display: block;
  font-size: 30rpx;
  font-weight: 900;
  color: #17382f;
}

.task-sub {
  display: block;
  font-size: 22rpx;
  color: #60746b;
  margin-top: 4rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-progress {
  margin-top: 14rpx;
  height: 10rpx;
  background: rgba(14, 165, 111, 0.12);
  border-radius: 999rpx;
  overflow: hidden;
}

.mini-progress-fill {
  width: 60%;
  height: 100%;
  border-radius: 999rpx;
  background: linear-gradient(90deg, #0ea56f, #a7f04b, #ffb84d);
  animation: taskProgress 2.4s ease-in-out infinite;
}

@keyframes taskProgress {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.18); }
}

.task-btn {
  margin-left: 20rpx;
  background: #101a17;
  color: #fff;
  font-size: 24rpx;
  font-weight: 900;
  padding: 12rpx 26rpx;
  border-radius: 999rpx;
  box-shadow: 0 12rpx 26rpx rgba(16, 26, 23, 0.18);
}

.task-btn:active {
  transform: scale(0.96);
}
</style>
