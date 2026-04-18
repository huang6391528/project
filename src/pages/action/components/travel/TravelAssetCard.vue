<template>
  <view class="lc-asset-card travel-asset">
    <view class="asset-inner">
      <view class="asset-left">
        <text class="asset-label">{{ label }}</text>
        <text class="asset-value">{{ value }}</text>
      </view>
    </view>
    <text class="travel-rank-tag">{{ rank }}</text>
  </view>
</template>

<script setup>
defineProps({
  label: { type: String, default: '本月出行减碳量' },
  value: { type: String, default: '42.8 kg' },
  rank: { type: String, default: '里程超越 92% 同学' },
})
</script>

<style scoped>
.lc-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
}

.travel-asset { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); }

.asset-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}

.asset-left {
  display: flex;
  flex-direction: column;
}

.asset-label {
  font-size: 20rpx;
  opacity: 0.7;
}

.asset-value {
  font-size: 60rpx;
  font-weight: 900;
  margin-top: 4rpx;
  line-height: 1;
}

.travel-rank-tag {
  display: inline-block;
  margin-top: 24rpx;
  background: rgba(255,255,255,0.2);
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  position: relative;
  z-index: 1;
}
</style>
