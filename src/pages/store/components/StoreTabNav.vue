<template>
  <view class="category-bar">
    <view
      v-for="tab in tabs"
      :key="tab.key"
      :class="['category-item', { 'cat-active': activeTab === tab.key }]"
      @click="emit('change', tab.key)"
    >{{ tab.label }}</view>
  </view>
</template>

<script setup>
defineProps({ activeTab: { type: String, default: 'all' } })
const emit = defineEmits(['change'])

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'flash', label: '限时抢购' },
  { key: 'virtual', label: '虚拟权益' },
  { key: 'campus', label: '校园服务' },
  { key: 'goods', label: '环保好物' },
]
</script>

<style scoped>
.category-bar {
  display: flex;
  gap: 48rpx;
  padding: 0 30rpx 24rpx;
  border-bottom: 2rpx solid #f3f4f6;
  overflow-x: auto;
}
.category-item {
  padding-bottom: 16rpx;
  font-size: 28rpx;
  color: #9ca3af;
  font-weight: 500;
  white-space: nowrap;
  border-bottom: 4rpx solid transparent;
}
.cat-active {
  color: #059669;
  font-weight: bold;
  border-bottom-color: #10b981;
}
</style>
