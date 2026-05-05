<template>
  <view class="daily-task carbon-lift">
    <view class="task-left">
      <view class="task-icon">OK</view>
      <view class="task-info">
        <text class="task-title">今日任务进度</text>
        <text class="task-sub">已完成 3/5 个任务，预计可得 180 积分</text>
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
  background: linear-gradient(135deg, rgba(255,255,255,0.94), rgba(236, 253, 245, 0.92));
  border: 1rpx solid rgba(16, 185, 129, 0.18);
  border-radius: 30rpx;
  padding: 28rpx;
  box-shadow: 0 14rpx 34rpx rgba(16, 185, 129, 0.10);
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
  background: linear-gradient(145deg, #10b981, #38bdf8);
  color: #fff;
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 900;
  box-shadow: 0 14rpx 30rpx rgba(16, 185, 129, 0.24);
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
  color: #6b7a72;
  margin-top: 4rpx;
}

.mini-progress {
  margin-top: 14rpx;
  height: 10rpx;
  background: rgba(16, 185, 129, 0.12);
  border-radius: 999rpx;
  overflow: hidden;
}

.mini-progress-fill {
  width: 60%;
  height: 100%;
  border-radius: 999rpx;
  background: linear-gradient(90deg, #10b981, #facc15);
}

.task-btn {
  margin-left: 20rpx;
  background: #10231b;
  color: #fff;
  font-size: 24rpx;
  font-weight: 900;
  padding: 12rpx 26rpx;
  border-radius: 999rpx;
  box-shadow: 0 12rpx 26rpx rgba(16, 35, 27, 0.18);
}
</style>
