<template>
  <view class="flash-hero-banner">
    <image class="flash-hero-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-18/766b6334841a449091c89d0075c2fd6e.jpg" mode="aspectFill"></image>
    <view class="flash-hero-overlay">
      <text class="flash-hero-sub">2026年4月特别企划</text>
      <text class="flash-hero-title">春季环保兑换季</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.flash-hero-banner { position: relative; width: 100%; height: 256rpx; border-radius: 24rpx; overflow: hidden; }
.flash-hero-img { width: 100%; height: 100%; }
.flash-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.5), transparent); padding: 32rpx; display: flex; flex-direction: column; justify-content: center; }
.flash-hero-sub { font-size: 20rpx; color: rgba(255,255,255,0.8); margin-bottom: 8rpx; }
.flash-hero-title { font-size: 40rpx; font-weight: bold; color: #fff; }
</style>
