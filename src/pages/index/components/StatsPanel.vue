<template>
  <view class="unified-stats-panel">
    <view class="unified-stat-cell">
      <text class="unified-stat-emoji">🏃</text>
      <text class="unified-stat-value u-blue">+9999步</text>
      <text class="unified-stat-label">今日步数</text>
    </view>
    <view class="unified-stat-sep"></view>
    <view class="unified-stat-cell">
      <text class="unified-stat-emoji">🏠</text>
      <text class="unified-stat-value u-orange">+0.8kg</text>
      <text class="unified-stat-label">生活减碳</text>
    </view>
    <view class="unified-stat-sep"></view>
    <view class="unified-stat-cell">
      <text class="unified-stat-emoji">🏆</text>
      <text class="unified-stat-value u-purple">第28名</text>
      <text class="unified-stat-label">全校排名</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.unified-stats-panel {
  display: flex;
  align-items: stretch;
  margin-top: 32rpx;
  background-color: #ffffff;
  border-radius: 36rpx;
  box-shadow: 0 6rpx 28rpx rgba(0, 0, 0, 0.08),
              0 1rpx 6rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
  padding: 36rpx 0;
}

.unified-stat-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 0 8rpx;
}

.unified-stat-sep {
  width: 1.5rpx;
  background-color: #f0f0f0;
  align-self: stretch;
  margin: 4rpx 0;
}

.unified-stat-emoji {
  font-size: 30rpx;
  line-height: 1;
  opacity: 0.7;
}

.unified-stat-value {
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1rpx;
}

.unified-stat-label {
  font-size: 20rpx;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: 0.5rpx;
}

.u-blue   { color: #1d4ed8; }
.u-orange { color: #c2410c; }
.u-purple { color: #7c3aed; }
</style>
