<template>
  <view class="unified-stats-panel carbon-glass-card carbon-fade-up">
    <view class="unified-stat-cell">
      <view class="stat-ring blue"><text>步</text></view>
      <text class="unified-stat-value u-blue">9,999</text>
      <text class="unified-stat-label">今日绿色步数</text>
    </view>
    <view class="unified-stat-sep"></view>
    <view class="unified-stat-cell">
      <view class="stat-ring orange"><text>碳</text></view>
      <text class="unified-stat-value u-orange">0.8kg</text>
      <text class="unified-stat-label">预计减排</text>
    </view>
    <view class="unified-stat-sep"></view>
    <view class="unified-stat-cell">
      <view class="stat-ring purple"><text>队</text></view>
      <text class="unified-stat-value u-purple">28</text>
      <text class="unified-stat-label">团队贡献</text>
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
  border-radius: 36rpx;
  overflow: hidden;
  padding: 30rpx 0;
  position: relative;
  z-index: 1;
}

.unified-stats-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent, rgba(167, 240, 75, 0.16), transparent);
  transform: translateX(-100%);
  animation: statSweep 4.8s ease-in-out infinite;
}

@keyframes statSweep {
  0%, 48% { transform: translateX(-100%); }
  82%, 100% { transform: translateX(100%); }
}

.unified-stat-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 0 8rpx;
  position: relative;
  z-index: 1;
}

.unified-stat-sep {
  width: 1rpx;
  background: linear-gradient(180deg, transparent, rgba(14, 165, 111, 0.20), transparent);
  align-self: stretch;
}

.stat-ring {
  width: 66rpx;
  height: 66rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 900;
  position: relative;
}

.stat-ring::before {
  content: "";
  position: absolute;
  inset: 7rpx;
  border-radius: 50%;
  background: rgba(255,255,255,0.92);
}

.stat-ring text {
  position: relative;
  z-index: 1;
}

.blue { background: conic-gradient(#2fd3e6 0 76%, #d7f8fb 76%); color: #047080; }
.orange { background: conic-gradient(#ffb84d 0 64%, #fff0d8 64%); color: #a95c00; }
.purple { background: conic-gradient(#3454d1 0 78%, #e4e8ff 78%); color: #273b9f; }

.unified-stat-value {
  font-size: 42rpx;
  font-weight: 900;
  line-height: 1.1;
}

.unified-stat-label {
  font-size: 21rpx;
  color: #60746b;
  font-weight: 800;
}

.u-blue { color: #047080; }
.u-orange { color: #a95c00; }
.u-purple { color: #273b9f; }
</style>
