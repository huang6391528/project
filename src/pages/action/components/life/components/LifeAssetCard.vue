<template>
  <view class="life-asset-card">
    <view class="asset-inner">
      <view class="asset-left">
        <text class="asset-label">{{ label }}</text>
        <text class="asset-value">{{ value }}</text>
        <text class="life-recycle-tag">{{ subLabel }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  label: { type: String, default: '学习生活低碳等级' },
  value: { type: String, default: 'LV.5' },
  subLabel: { type: String, default: '已回收旧物约 24.5kg' },
})
</script>

<style scoped>
.life-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
  margin-top: 24rpx;
}

.asset-inner { position: relative; z-index: 1; }

.asset-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.asset-label {
  font-size: 24rpx;
  opacity: 0.9;
}

.asset-value {
  font-size: 48rpx;
  font-weight: 900;
}

.life-recycle-tag {
  font-size: 20rpx;
  opacity: 0.85;
  display: inline-block;
  margin-top: 8rpx;
  background: rgba(255,255,255,0.2);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
}
</style>
