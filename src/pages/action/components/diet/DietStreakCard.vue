<template>
  <view class="diet-streak-card">
    <view class="streak-inner">
      <view class="streak-left">
        <text class="streak-label">{{ label }}</text>
        <text class="streak-value">{{ value }}</text>
        <view class="streak-badge">
          <text class="streak-badge-text">{{ badge }}</text>
        </view>
      </view>
      <view class="streak-icon-bg">
        <text class="iconfont icon-bowl"></text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  label: { type: String, default: '连续光盘打卡' },
  value: { type: String, default: '12 天' },
  badge: { type: String, default: '坚持打卡，本周额外奖励 +50' },
})
</script>

<style scoped>
.diet-streak-card {
  background:
    radial-gradient(circle at 88% 8%, rgba(255,255,255,0.24), transparent 24%),
    linear-gradient(135deg, #f97316 0%, #ffb84d 100%);
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16rpx 38rpx rgba(249, 115, 22, 0.26);
  margin-bottom: 24rpx;
}

.streak-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.streak-left {
  display: flex;
  flex-direction: column;
}

.streak-label {
  font-size: 20rpx;
  opacity: 0.86;
}

.streak-value {
  font-size: 60rpx;
  font-weight: 900;
  margin-top: 4rpx;
  line-height: 1;
}

.streak-badge {
  display: inline-block;
  margin-top: 16rpx;
  background: rgba(255, 255, 255, 0.20);
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  font-size: 18rpx;
}

.streak-badge-text { font-weight: 800; }

.streak-icon-bg {
  opacity: 0.24;
  display: flex;
  align-items: center;
  justify-content: center;
}

.streak-icon-bg .iconfont {
  font-size: 56rpx;
  color: #fff;
}
</style>
