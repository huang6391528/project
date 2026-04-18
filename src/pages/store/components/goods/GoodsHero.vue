<template>
  <view class="goods-hero-banner">
    <image class="goods-hero-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-18/206c25109e6a4d61ab018c54f765d716.jpg" mode="aspectFill"></image>
    <view class="goods-hero-overlay">
      <text class="goods-hero-title">把绿色带回家</text>
      <text class="goods-hero-sub">每一件商品都记录着您的减碳贡献</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.goods-hero-banner { position: relative; width: 100%; height: 320rpx; border-radius: 32rpx; overflow: hidden; box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); }
.goods-hero-img { width: 100%; height: 100%; }
.goods-hero-overlay { position: absolute; inset: 0; background: rgba(6, 78, 59, 0.4); padding: 40rpx; display: flex; flex-direction: column; justify-content: flex-end; }
.goods-hero-title { font-size: 40rpx; font-weight: bold; color: #fff; }
.goods-hero-sub { font-size: 20rpx; color: rgba(255,255,255,0.8); margin-top: 8rpx; }
</style>
