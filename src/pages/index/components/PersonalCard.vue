<template>
  <view class="personal-card">
    <view class="user-info">
      <image class="avatar" src="@/static/tabbar/profile_photo.jpg" mode="aspectFill"></image>
      <view class="user-detail">
        <text class="user-name">陈同学</text>
        <text class="user-school">贵州大学 · 经济学院</text>
        <view class="carbon-points">
          <text class="carbon-points-num">2,480</text>
          <text class="carbon-points-unit">碳积分</text>
        </view>
      </view>
    </view>
    <view class="tree-progress">
      <view class="progress-header">
        <view class="progress-title-area">
          <text class="progress-points-big"></text>
          <text class="progress-title">树木守护进度</text>
        </view>
        <text class="progress-sub">已抵消 45.2kg CO₂</text>
      </view>
      <view class="progress-bar">
        <view class="progress-fill" style="width: 65%"></view>
      </view>
      <view class="progress-footer">
        <view class="tree-count">
          <view class="tree-anim"><text>🌳</text></view>
          <text class="count-num">3.2 <text class="count-unit">棵</text></text>
        </view>
        <view class="fire-streak">
          <view class="fire-anim"><text>🔥</text></view>
          <text class="streak-text">连续打卡 <text class="streak-num">12</text> 天</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.personal-card {
  margin-top: 48rpx;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 48rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(16, 185, 129, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 112rpx; height: 112rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255,255,255,0.5);
}

.user-detail {
  margin-left: 32rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  display: block;
}

.user-school {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  display: block;
  margin-top: 4rpx;
}

.carbon-points {
  display: flex;
  align-items: baseline;
  margin-top: 12rpx;
}

.carbon-points-num {
  font-size: 56rpx;
  font-weight: 900;
  color: #fbbf24;
  line-height: 1;
  text-shadow: 0 4rpx 12rpx rgba(0,0,0,0.15);
}

.carbon-points-unit {
  font-size: 28rpx;
  color: rgba(255,255,255,0.9);
  margin-left: 10rpx;
  font-weight: 600;
}

.tree-progress {
  margin-top: 48rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 32rpx;
  padding: 32rpx;
  backdrop-filter: blur(10px);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.progress-title-area {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
}

.progress-points-big {
  font-size: 40rpx;
  font-weight: 800;
  color: #fbbf24;
}

.progress-title {
  font-size: 28rpx;
  color: #fff;
}

.progress-sub {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
}

.progress-bar {
  width: 100%;
  height: 24rpx;
  background-color: rgba(255,255,255,0.3);
  border-radius: 12rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #fff;
  border-radius: 12rpx;
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 32rpx;
}

.tree-count {
  display: flex;
  align-items: center;
}

.tree-anim {
  animation: tree-sway 3s ease-in-out infinite;
  font-size: 40rpx;
}

@keyframes tree-sway {
  0%, 100% { transform: rotate(-5deg); }
  50%       { transform: rotate(5deg); }
}

.count-num {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
  margin-left: 8rpx;
}

.count-unit {
  font-size: 28rpx;
  font-weight: normal;
}

.fire-streak {
  display: flex;
  align-items: center;
}

.fire-anim {
  animation: fire-flicker 1s ease-in-out infinite;
  font-size: 40rpx;
}

@keyframes fire-flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.1); }
}

.streak-text {
  font-size: 28rpx;
  color: #fff;
  margin-left: 8rpx;
}

.streak-num { font-weight: bold; }
</style>
