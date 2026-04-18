<template>
  <view class="goods-grid">
    <view v-for="item in items" :key="item.id" class="goods-card" @click="emit('exchange', item)">
      <view class="goods-img-wrap">
        <image class="goods-img" :src="item.img" mode="aspectFill"></image>
        <view v-if="item.tag" class="goods-tag" :class="'goods-tag-' + item.tagType">{{ item.tag }}</view>
      </view>
      <text class="goods-name">{{ item.name }}</text>
      <text class="goods-meta">{{ item.meta }}</text>
      <view class="goods-bottom">
        <view class="goods-price-wrap">
          <text class="goods-price">{{ item.credits }} 积分</text>
          <text v-if="item.originalCredits" class="goods-price-original">{{ item.originalCredits }} 积分</text>
        </view>
        <view class="goods-add-btn">+</view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { id: 1, name: '定制环保帆布包-自然款', meta: '校内自提 | 100%有机棉', credits: 1800, originalCredits: null, tag: 'HOT', tagType: 'orange', img: '/static/placeholder.png' },
      { id: 2, name: '可降解餐具三件套', meta: '快递配送 | 麦秆材质', credits: 650, originalCredits: null, tag: '低碳', tagType: 'green', img: '/static/placeholder.png' },
      { id: 3, name: '再生纸A5笔记本', meta: '校内自提 | 80张/本', credits: 300, originalCredits: null, tag: '', tagType: '', img: '/static/placeholder.png' },
      { id: 4, name: '竹纤维可折叠水杯', meta: '快递配送 | 350ml', credits: 1200, originalCredits: 1500, tag: '限时折扣', tagType: 'red', img: '/static/placeholder.png' },
    ]
  }
})
const emit = defineEmits(['exchange'])
</script>

<style scoped>
.goods-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20rpx; margin-top: 40rpx; }
.goods-card { display: flex; flex-direction: column; }
.goods-img-wrap { position: relative; aspect-ratio: 1; background-color: #f3f4f6; border-radius: 24rpx; overflow: hidden; margin-bottom: 12rpx; }
.goods-img { width: 100%; height: 100%; }
.goods-tag { position: absolute; top: 12rpx; right: 12rpx; font-size: 16rpx; font-weight: bold; padding: 4rpx 10rpx; border-radius: 8rpx; color: #fff; }
.goods-tag-orange { background-color: #f97316; }
.goods-tag-green { background-color: #10b981; }
.goods-tag-red { background-color: #ef4444; }
.goods-name { display: block; font-size: 24rpx; font-weight: bold; color: #374151; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.goods-meta { display: block; font-size: 18rpx; color: #9ca3af; margin-top: 4rpx; }
.goods-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 12rpx; }
.goods-price-wrap { display: flex; flex-direction: column; }
.goods-price { font-size: 26rpx; font-weight: bold; color: #059669; }
.goods-price-original { font-size: 18rpx; color: #9ca3af; text-decoration: line-through; }
.goods-add-btn { background-color: #f3f4f6; width: 48rpx; height: 48rpx; border-radius: 12rpx; display: flex; align-items: center; justify-content: center; font-size: 28rpx; color: #6b7280; }
</style>
