<template>
  <view class="flash-countdown-bar">
    <view class="flash-countdown-left">
      <text class="icon-clock-fast">⏱</text>
      <text class="flash-countdown-label">限时秒杀</text>
    </view>
    <view class="flash-countdown-right">
      <text class="flash-countdown-tip">距结束</text>
      <text class="flash-countdown-num">{{ h }}</text>
      <text class="flash-countdown-sep">:</text>
      <text class="flash-countdown-num">{{ m }}</text>
      <text class="flash-countdown-sep">:</text>
      <text class="flash-countdown-num">{{ s }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  h: { type: String, default: '02' },
  m: { type: String, default: '45' },
  s: { type: String, default: '18' },
})
</script>

<style scoped>
.flash-countdown-bar { display: flex; justify-content: space-between; align-items: center; background-color: #fff7ed; border: 2rpx solid #fed7aa; border-radius: 20rpx; padding: 24rpx; margin-top: 32rpx; }
.flash-countdown-left { display: flex; align-items: center; gap: 8rpx; }
.icon-clock-fast { font-size: 36rpx; }
.flash-countdown-label { font-size: 28rpx; font-weight: bold; color: #7c2d12; }
.flash-countdown-right { display: flex; align-items: center; gap: 6rpx; }
.flash-countdown-tip { font-size: 22rpx; color: #9a3412; margin-right: 8rpx; }
.flash-countdown-num { background-color: #ea580c; color: #fff; font-size: 22rpx; font-weight: bold; font-family: monospace; padding: 6rpx 10rpx; border-radius: 8rpx; }
.flash-countdown-sep { color: #ea580c; font-weight: bold; font-size: 22rpx; }
</style>
