<template>
  <view class="personal-card carbon-flow carbon-fade-up">
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
      <view class="level-pill">Lv.6</view>
    </view>
    <view class="tree-progress">
      <view class="progress-header">
        <view class="progress-title-area">
          <text class="progress-title">碳汇树守护进度</text>
          <text class="progress-sub">已抵消 45.2kg CO₂</text>
        </view>
        <text class="progress-percent">65%</text>
      </view>
      <view class="progress-bar">
        <view class="progress-fill"></view>
      </view>
      <view class="progress-footer">
        <view class="mini-metric">
          <text class="metric-icon">树</text>
          <text class="metric-value">3.2</text>
          <text class="metric-label">棵等效树木</text>
        </view>
        <view class="mini-metric">
          <text class="metric-icon fire">燃</text>
          <text class="metric-value">12</text>
          <text class="metric-label">连续打卡</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.personal-card {
  margin-top: 28rpx;
  background:
    radial-gradient(circle at 86% 10%, rgba(251, 191, 36, 0.32), transparent 28%),
    linear-gradient(135deg, #062f25, #059669 58%, #22c55e);
  border-radius: 42rpx;
  padding: 36rpx;
  color: #fff;
  box-shadow: 0 24rpx 58rpx rgba(5, 95, 70, 0.24);
  position: relative;
  overflow: hidden;
}

.personal-card::before {
  content: "";
  position: absolute;
  right: -40rpx;
  top: -60rpx;
  width: 220rpx;
  height: 220rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,0.18);
}

.user-info {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.avatar {
  width: 112rpx;
  height: 112rpx;
  border-radius: 32rpx;
  border: 4rpx solid rgba(255,255,255,0.48);
  box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.18);
}

.user-detail {
  margin-left: 28rpx;
  flex: 1;
}

.user-name {
  font-size: 38rpx;
  font-weight: 900;
  display: block;
}

.user-school {
  font-size: 24rpx;
  color: rgba(255,255,255,0.78);
  display: block;
  margin-top: 6rpx;
}

.carbon-points {
  display: flex;
  align-items: baseline;
  margin-top: 14rpx;
}

.carbon-points-num {
  font-size: 62rpx;
  font-weight: 900;
  color: #facc15;
  line-height: 1;
}

.carbon-points-unit {
  font-size: 24rpx;
  color: rgba(255,255,255,0.86);
  margin-left: 10rpx;
  font-weight: 700;
}

.level-pill {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(255,255,255,0.16);
  border: 1rpx solid rgba(255,255,255,0.28);
  font-size: 22rpx;
  font-weight: 900;
}

.tree-progress {
  margin-top: 34rpx;
  background: rgba(255,255,255,0.16);
  border: 1rpx solid rgba(255,255,255,0.18);
  border-radius: 30rpx;
  padding: 28rpx;
  position: relative;
  z-index: 1;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18rpx;
}

.progress-title-area {
  display: flex;
  flex-direction: column;
}

.progress-title {
  font-size: 28rpx;
  font-weight: 800;
}

.progress-sub {
  font-size: 22rpx;
  color: rgba(255,255,255,0.72);
  margin-top: 4rpx;
}

.progress-percent {
  font-size: 34rpx;
  font-weight: 900;
  color: #facc15;
}

.progress-bar {
  width: 100%;
  height: 20rpx;
  background: rgba(255,255,255,0.22);
  border-radius: 999rpx;
  overflow: hidden;
}

.progress-fill {
  width: 65%;
  height: 100%;
  border-radius: 999rpx;
  background: linear-gradient(90deg, #fef3c7, #facc15, #ffffff);
  animation: progressGlow 2.2s ease-in-out infinite;
}

@keyframes progressGlow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.18); }
}

.progress-footer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18rpx;
  margin-top: 24rpx;
}

.mini-metric {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: rgba(255,255,255,0.12);
  border-radius: 20rpx;
  padding: 18rpx;
}

.metric-icon {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 900;
}

.metric-icon.fire {
  background: rgba(251, 191, 36, 0.25);
}

.metric-value {
  font-size: 34rpx;
  font-weight: 900;
}

.metric-label {
  font-size: 20rpx;
  color: rgba(255,255,255,0.76);
}
</style>
