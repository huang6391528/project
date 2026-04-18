<template>
  <view class="product-grid">
    <view v-for="item in items" :key="item.name" class="product-card">
      <image class="product-img" :src="item.img || '/static/placeholder.png'" mode="aspectFill"></image>
      <view class="product-info">
        <text class="product-name">{{ item.name }}</text>
        <view class="product-bottom">
          <text class="product-price">{{ item.credits }}</text>
          <view class="exchange-btn">兑换</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { name: '教学楼空调使用券', credits: 300 },
      { name: '免费打印10页券', credits: 150 },
      { name: '校园共享电单车', credits: 500 },
    ]
  }
})
</script>

<style scoped>
.product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24rpx; }
.product-card { background-color: #fff; border-radius: 32rpx; overflow: hidden; border: 2rpx solid #f9fafb; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); }
.product-img { width: 100%; height: 200rpx; background-color: #f3f4f6; }
.product-info { padding: 24rpx; }
.product-name { display: block; font-size: 28rpx; font-weight: bold; color: #374151; }
.product-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 16rpx; }
.product-price { font-size: 32rpx; font-weight: bold; color: #059669; }
.exchange-btn { background-color: #10b981; color: #fff; font-size: 22rpx; font-weight: bold; padding: 8rpx 24rpx; border-radius: 50rpx; box-shadow: 0 4rpx 8rpx rgba(16, 185, 129, 0.2); }
</style>
