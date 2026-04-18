<template>
  <view class="tab-flash">
    <FlashHero />
    <FlashCountdown />
    <FlashProductList :products="products" @exchange="emit('exchange', $event)" />
    <FlashRecommend :products="recommendProducts" @exchange="emit('exchange', $event)" />
  </view>
</template>

<script setup>
import FlashHero from './FlashHero.vue'
import FlashCountdown from './FlashCountdown.vue'
import FlashProductList from './FlashProductList.vue'
import FlashRecommend from './FlashRecommend.vue'

defineProps({
  products: { type: Array, default: () => [] },
  recommendProducts: { type: Array, default: () => [] },
})
const emit = defineEmits(['exchange'])
</script>

<style scoped>
.tab-flash { padding-top: 24rpx; }
</style>
