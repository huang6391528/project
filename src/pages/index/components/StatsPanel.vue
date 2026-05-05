<template>
  <view class="unified-stats-panel carbon-glass-card carbon-fade-up">
    <view class="unified-stat-cell">
      <view class="stat-ring blue"><text>步</text></view>
      <text class="unified-stat-value u-blue">9,999</text>
      <text class="unified-stat-label">今日步数</text>
    </view>
    <view class="unified-stat-sep"></view>
    <view class="unified-stat-cell">
      <view class="stat-ring orange"><text>碳</text></view>
      <text class="unified-stat-value u-orange">0.8kg</text>
      <text class="unified-stat-label">生活减碳</text>
    </view>
    <view class="unified-stat-sep"></view>
    <view class="unified-stat-cell">
      <view class="stat-ring purple"><text>榜</text></view>
      <text class="unified-stat-value u-purple">28</text>
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
  margin-top: 28rpx;
  border-radius: 34rpx;
  overflow: hidden;
  padding: 30rpx 0;
  position: relative;
  z-index: 1;
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
  width: 1rpx;
  background: linear-gradient(180deg, transparent, rgba(17, 169, 125, 0.18), transparent);
  align-self: stretch;
}

.stat-ring {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 900;
  position: relative;
}

.stat-ring::before {
  content: "";
  position: absolute;
  inset: 6rpx;
  border-radius: 50%;
  background: #fff;
}

.stat-ring text {
  position: relative;
  z-index: 1;
}

.blue { background: conic-gradient(#38bdf8 0 72%, #dbeafe 72%); color: #0369a1; }
.orange { background: conic-gradient(#f59e0b 0 62%, #ffedd5 62%); color: #b45309; }
.purple { background: conic-gradient(#8b5cf6 0 78%, #ede9fe 78%); color: #6d28d9; }

.unified-stat-value {
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.1;
}

.unified-stat-label {
  font-size: 21rpx;
  color: #6b7a72;
  font-weight: 700;
}

.u-blue { color: #0369a1; }
.u-orange { color: #b45309; }
.u-purple { color: #6d28d9; }
</style>
