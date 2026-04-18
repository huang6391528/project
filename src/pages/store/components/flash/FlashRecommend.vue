<template>
  <view class="flash-recommend-section">
    <text class="flash-section-title">为你推荐</text>
    <view class="flash-recommend-list">
      <view v-for="item in products" :key="item.id" class="flash-recommend-card" @click="emit('exchange', item)">
        <image class="flash-recommend-img" :src="item.img" mode="aspectFill"></image>
        <view class="flash-recommend-info">
          <text class="flash-recommend-name">{{ item.name }}</text>
          <text class="flash-recommend-expire">{{ item.expire }}</text>
          <view class="flash-recommend-bottom">
            <text class="flash-recommend-price">{{ item.credits }} 积分</text>
            <view class="flash-recommend-btn">立即兑换</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    default: () => [
      { id: 1, name: '校内超市3元代金券', expire: '有效期至 2026-05-30', credits: 60, img: '/static/placeholder.png' },
      { id: 2, name: '体育馆羽毛球场租抵扣', expire: '全时段通用，仅限本周', credits: 300, img: '/static/placeholder.png' },
    ]
  }
})
const emit = defineEmits(['exchange'])
</script>

<style scoped>
.flash-recommend-section { margin-top: 32rpx; padding-bottom: 24rpx; }
.flash-section-title { font-size: 30rpx; font-weight: bold; color: #1f2937; display: block; margin-bottom: 20rpx; }
.flash-recommend-list { display: flex; flex-direction: column; gap: 20rpx; }
.flash-recommend-card { display: flex; align-items: center; gap: 20rpx; background-color: #f9fafb; border-radius: 20rpx; padding: 20rpx; border: 2rpx solid #f3f4f6; }
.flash-recommend-img { width: 128rpx; height: 128rpx; border-radius: 16rpx; background-color: #e5e7eb; flex-shrink: 0; }
.flash-recommend-info { flex: 1; }
.flash-recommend-name { display: block; font-size: 26rpx; font-weight: bold; color: #374151; }
.flash-recommend-expire { display: block; font-size: 18rpx; color: #9ca3af; margin-top: 6rpx; }
.flash-recommend-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 16rpx; }
.flash-recommend-price { font-size: 26rpx; font-weight: bold; color: #059669; }
.flash-recommend-btn { background-color: #fff; border: 2rpx solid #10b981; color: #10b981; font-size: 18rpx; font-weight: bold; padding: 8rpx 16rpx; border-radius: 8rpx; }
</style>
