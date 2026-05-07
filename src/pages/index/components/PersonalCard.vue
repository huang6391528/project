<template>
  <view class="personal-card carbon-flow carbon-fade-up">
    <view class="card-grid"></view>
    <view class="user-info">
      <image class="avatar" src="@/static/tabbar/profile_photo.jpg" mode="aspectFill"></image>
      <view class="user-detail">
        <text class="user-name">低碳领航者</text>
        <text class="user-school">创新创业团队 · 绿色校园实验室</text>
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
          <text class="progress-title">本周校园减排目标</text>
          <text class="progress-sub">已减少 45.2kg CO2e，接近一棵树半年的吸收量</text>
        </view>
        <text class="progress-percent">65%</text>
      </view>
      <view class="progress-bar">
        <view class="progress-fill"></view>
      </view>
      <view class="progress-footer">
        <view class="mini-metric">
          <text class="metric-icon">CO2</text>
          <text class="metric-value">3.2</text>
          <text class="metric-label">今日减排 kg</text>
        </view>
        <view class="mini-metric">
          <text class="metric-icon fire">TOP</text>
          <text class="metric-value">12</text>
          <text class="metric-label">学院排名</text>
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
    radial-gradient(circle at 88% 10%, rgba(255, 184, 77, 0.36), transparent 28%),
    radial-gradient(circle at 8% 100%, rgba(47, 211, 230, 0.22), transparent 30%),
    linear-gradient(135deg, #06251f, #047857 58%, #10b981);
  border-radius: 44rpx;
  padding: 36rpx;
  color: #fff;
  box-shadow: var(--carbon-shadow-strong);
  position: relative;
  overflow: hidden;
}

.personal-card::before {
  content: "";
  position: absolute;
  right: -42rpx;
  top: -68rpx;
  width: 230rpx;
  height: 230rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,0.18);
}

.card-grid {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255,255,255,0.16) 1rpx, transparent 1rpx),
    linear-gradient(90deg, rgba(255,255,255,0.14) 1rpx, transparent 1rpx);
  background-size: 42rpx 42rpx;
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
  border-radius: 34rpx;
  border: 4rpx solid rgba(255,255,255,0.54);
  box-shadow: 0 14rpx 32rpx rgba(0, 0, 0, 0.20);
}

.user-detail {
  margin-left: 28rpx;
  flex: 1;
  min-width: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carbon-points {
  display: flex;
  align-items: baseline;
  margin-top: 14rpx;
}

.carbon-points-num {
  font-size: 62rpx;
  font-weight: 900;
  color: #ffd166;
  line-height: 1;
  text-shadow: 0 8rpx 22rpx rgba(0,0,0,0.16);
}

.carbon-points-unit {
  font-size: 24rpx;
  color: rgba(255,255,255,0.86);
  margin-left: 10rpx;
  font-weight: 800;
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
  border: 1rpx solid rgba(255,255,255,0.20);
  border-radius: 32rpx;
  padding: 28rpx;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(14rpx);
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
  flex: 1;
  min-width: 0;
}

.progress-title {
  font-size: 28rpx;
  font-weight: 900;
}

.progress-sub {
  font-size: 22rpx;
  color: rgba(255,255,255,0.72);
  margin-top: 4rpx;
  line-height: 1.42;
}

.progress-percent {
  margin-left: 18rpx;
  font-size: 34rpx;
  font-weight: 900;
  color: #ffd166;
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
  background: linear-gradient(90deg, #a7f04b, #ffd166, #ffffff);
  animation: progressGlow 2.2s ease-in-out infinite;
}

@keyframes progressGlow {
  0%, 100% { filter: brightness(1); transform: translateX(0); }
  50% { filter: brightness(1.18); transform: translateX(6rpx); }
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
  border-radius: 22rpx;
  padding: 18rpx;
}

.metric-icon {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16rpx;
  font-weight: 900;
}

.metric-icon.fire {
  background: rgba(255, 184, 77, 0.28);
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
