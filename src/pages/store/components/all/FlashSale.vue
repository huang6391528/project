<template>
  <view class="flash-sale">
    <view class="flash-header">
      <view class="flash-title">
        <text class="iconfont icon-clock"></text>
        <text class="flash-text">限时秒杀</text>
      </view>
      <view class="countdown">
        <text class="countdown-num">{{ hours }}</text>
        <text class="countdown-sep">:</text>
        <text class="countdown-num">{{ minutes }}</text>
        <text class="countdown-sep">:</text>
        <text class="countdown-num">{{ seconds }}</text>
      </view>
    </view>
    <scroll-view class="flash-scroll" scroll-x="true">
      <view class="flash-list">
        <view v-for="item in items" :key="item.name" class="flash-item">
          <image class="flash-img" :src="item.img" mode="aspectFill"></image>
          <text class="flash-name">{{ item.name }}</text>
          <text class="flash-price">{{ item.credits }} <text class="price-unit">积分</text></text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
defineProps({
  hours: { type: String, default: '04' },
  minutes: { type: String, default: '12' },
  seconds: { type: String, default: '45' },
  items: {
    type: Array,
    default: () => [
      { name: '食堂5元抵用券', credits: 200, img: '/static/placeholder.png' },
      { name: '图书馆咖啡券', credits: 450, img: '/static/placeholder.png' },
      { name: '校园网包月包', credits: 1200, img: '/static/placeholder.png' },
    ]
  }
})
</script>

<style scoped>
.flash-sale { background-color: #fef2f2; border-radius: 32rpx; padding: 32rpx; margin-top: 32rpx; }
.flash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx; }
.flash-title { display: flex; align-items: center; gap: 8rpx; }
.flash-text { font-size: 28rpx; font-weight: bold; color: #991b1b; }
.countdown { display: flex; align-items: center; gap: 4rpx; }
.countdown-num { background-color: #ef4444; color: #fff; font-size: 20rpx; font-weight: bold; width: 40rpx; height: 40rpx; display: flex; align-items: center; justify-content: center; border-radius: 8rpx; }
.countdown-sep { color: #ef4444; font-weight: bold; margin: 0 4rpx; }
.flash-scroll { white-space: nowrap; }
.flash-list { display: flex; gap: 24rpx; }
.flash-item { min-width: 200rpx; background-color: #fff; border-radius: 24rpx; padding: 16rpx; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); }
.flash-img { width: 100%; height: 160rpx; border-radius: 16rpx; background-color: #f3f4f6; }
.flash-name { display: block; font-size: 22rpx; font-weight: bold; color: #374151; margin-top: 12rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.flash-price { display: block; font-size: 28rpx; font-weight: bold; color: #ef4444; margin-top: 8rpx; }
.price-unit { font-size: 16rpx; }
</style>
