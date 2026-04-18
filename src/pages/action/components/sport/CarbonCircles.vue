<template>
  <view class="sync-badges">
    <view class="sync-badge">
      <text class="badge-label">碳资产</text>
      <text class="badge-value">{{ carbonAsset }}</text>
    </view>
    <view class="sync-badge">
      <text class="badge-label">减排</text>
      <text class="badge-value">{{ emission }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  carbonAsset: {
    type: [String, Number],
    default: '2,840'
  },
  emission: {
    type: String,
    default: '125.4 kg'
  }
})
</script>

<style scoped>
.sync-badges {
  display: flex;
  gap: 12rpx;
  margin-top: 16rpx;
}

.sync-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(16, 185, 129, 0.1);
  padding: 8rpx 16rpx;
  border-radius: 50rpx;
}

.badge-label {
  font-size: 20rpx;
  color: #059669;
  font-weight: 400;
}

.badge-value {
  font-size: 22rpx;
  color: #047857;
  font-weight: 700;
  margin-top: 2rpx;
}
</style>
