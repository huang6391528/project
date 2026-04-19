<template>
  <view class="sport-sync-card">
    <view class="sync-left">
      <view class="sync-dot-wrap">
        <view class="sync-dot"></view>
        <text class="sync-label">STEP SYNC ACTIVE</text>
      </view>
      <text class="sync-value">{{ steps.toLocaleString() }}<text class="sync-unit">/10000</text></text>
      <text class="sync-desc">今日步数已同步 · 产出碳汇 +{{ carbonKg }} kg</text>
      <CarbonCircles :carbonAsset="carbonAsset" :emission="emission" />
    </view>
    <view class="sync-icon-wrap">
      <text class="iconfont icon-footprint"></text>
    </view>
  </view>
</template>

<script setup>
import CarbonCircles from './CarbonCircles.vue'

defineProps({
  steps: { type: Number, default: 8432 },
  carbonKg: { type: String, default: '0.84' },
  carbonAsset: { type: [String, Number], default: '2,840' },
  emission: { type: String, default: '125.4 kg' },
})
</script>

<style scoped>
.sport-sync-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid #f0fdf4;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.sync-left {
  display: flex;
  flex-direction: column;
}

.sync-dot-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 8rpx;
}

.sync-dot {
  width: 16rpx;
  height: 16rpx;
  background: #10b981;
  border-radius: 50%;
}

.sync-label {
  font-size: 18rpx;
  font-weight: bold;
  color: #10b981;
}

.sync-value {
  font-size: 60rpx;
  font-weight: 900;
  color: #1f2937;
  line-height: 1;
  display: block;
  margin-bottom: 8rpx;
}

.sync-unit {
  font-size: 28rpx;
  font-weight: normal;
  color: #9ca3af;
}

.sync-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

.sync-icon-wrap {
  width: 112rpx;
  height: 112rpx;
  border: 8rpx solid #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sync-icon-wrap .iconfont { font-size: 56rpx; color: #10b981; }
</style>
