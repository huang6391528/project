<template>
  <view>
    <view class="flash-section-header">
      <text class="flash-section-title">火爆抢购中</text>
      <text class="flash-section-tip">滑动查看更多</text>
    </view>
    <scroll-view class="flash-product-scroll" scroll-x="true">
      <view class="flash-product-list">
        <view v-for="item in products" :key="item.id" class="flash-product-card" @click="emit('exchange', item)">
          <view class="flash-product-img-wrap">
            <image class="flash-product-img" :src="item.img" mode="aspectFill"></image>
            <view class="flash-product-tag">{{ item.tag }}</view>
          </view>
          <view class="flash-product-info">
            <text class="flash-product-name">{{ item.name }}</text>
            <view class="flash-product-bottom">
              <view class="flash-product-price">
                <text class="flash-price-num">{{ item.credits }}</text>
                <text class="flash-price-unit">积分</text>
              </view>
              <view class="flash-exchange-btn">抢兑</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    default: () => [
      { id: 1, name: '食堂5元全场抵用券', credits: 100, tag: '限量50份', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/2c76498322c947e29dc317cf8418ccfc.jpg' },
      { id: 2, name: '图书馆咖啡屋单品券', credits: 250, tag: '限量100份', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/a5f990fdc25e4ace92bfa20845beefff.jpg' },
      { id: 3, name: '校园网畅快包月卡', credits: 500, tag: '限量30份', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/4175e7c4bb0b466ab29dd7d348118202.jpg' },
    ]
  }
})
const emit = defineEmits(['exchange'])
</script>

<style scoped>
.flash-section-header { display: flex; justify-content: space-between; align-items: center; margin-top: 40rpx; margin-bottom: 20rpx; }
.flash-section-title { font-size: 30rpx; font-weight: bold; color: #1f2937; }
.flash-section-tip { font-size: 20rpx; color: #9ca3af; }
.flash-product-scroll { white-space: nowrap; }
.flash-product-list { display: flex; gap: 20rpx; padding-bottom: 16rpx; }
.flash-product-card { min-width: 240rpx; background-color: #fff; border-radius: 24rpx; overflow: hidden; border: 2rpx solid #f3f4f6; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); }
.flash-product-img-wrap { position: relative; height: 200rpx; background-color: #f9fafb; }
.flash-product-img { width: 100%; height: 100%; }
.flash-product-tag { position: absolute; top: 12rpx; left: 12rpx; background-color: #ef4444; color: #fff; font-size: 18rpx; font-weight: bold; padding: 4rpx 12rpx; border-radius: 20rpx; }
.flash-product-info { padding: 20rpx; }
.flash-product-name { display: block; font-size: 26rpx; font-weight: bold; color: #374151; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.flash-product-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 16rpx; }
.flash-product-price { display: flex; align-items: baseline; gap: 4rpx; color: #059669; }
.flash-price-num { font-size: 32rpx; font-weight: bold; }
.flash-price-unit { font-size: 18rpx; }
.flash-exchange-btn { background-color: #10b981; color: #fff; font-size: 22rpx; font-weight: bold; padding: 8rpx 20rpx; border-radius: 12rpx; }
</style>
