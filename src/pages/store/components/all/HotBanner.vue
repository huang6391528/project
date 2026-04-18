<template>
  <view class="hot-banner">
    <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/ca4e172a941f4e3d89987c7cab0aef77.jpg" mode="aspectFill"></image>
    <view class="banner-overlay">
      <view class="hot-tag">HOT</view>
      <text class="banner-title">定制环保帆布包</text>
      <text class="banner-desc">限时 8.5 折抢兑</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.hot-banner {
  position: relative;
  width: 100%;
  height: 256rpx;
  border-radius: 32rpx;
  overflow: hidden;
  margin-top: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}
.banner-img { width: 100%; height: 100%; }
.banner-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.6), transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32rpx;
}
.hot-tag {
  background-color: #fbbf24;
  color: #065f46;
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  width: fit-content;
  margin-bottom: 12rpx;
}
.banner-title { display: block; font-size: 36rpx; font-weight: bold; color: #fff; }
.banner-desc { display: block; font-size: 24rpx; color: rgba(255,255,255,0.9); margin-top: 8rpx; }
</style>
