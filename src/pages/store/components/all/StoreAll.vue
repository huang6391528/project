<template>
  <view>
    <HotBanner />
    <FlashSale />
    <text class="section-title">校园专区</text>
    <ProductGrid />
    <CertCard />
    <view class="record-link">
      <text class="record-icon">📜</text>
      <text class="record-text">查看我的兑换记录</text>
    </view>
  </view>
</template>

<script setup>
import HotBanner from './HotBanner.vue'
import FlashSale from './FlashSale.vue'
import ProductGrid from './ProductGrid.vue'
import CertCard from './CertCard.vue'
</script>

<style scoped>
.section-title { display: block; font-size: 32rpx; font-weight: bold; color: #374151; margin-top: 48rpx; margin-bottom: 24rpx; padding-left: 8rpx; }
.record-link { display: flex; justify-content: center; align-items: center; margin-top: 64rpx; padding-bottom: 40rpx; gap: 8rpx; }
.record-icon { font-size: 24rpx; }
.record-text { font-size: 24rpx; color: #9ca3af; }
</style>
