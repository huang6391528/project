<template>
  <view class="tab-goods">
    <GoodsHero />
    <GoodsGrid :items="goods" @exchange="emit('exchange', $event)" />
    <EcoTips />
  </view>
</template>

<script setup>
import GoodsHero from './GoodsHero.vue'
import GoodsGrid from './GoodsGrid.vue'
import EcoTips from './EcoTips.vue'

defineProps({
  goods: { type: Array, default: () => [] }
})
const emit = defineEmits(['exchange'])
</script>

<style scoped>
.tab-goods { padding-top: 24rpx; }
</style>
