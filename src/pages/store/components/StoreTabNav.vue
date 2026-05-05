<template>
  <scroll-view class="category-scroll" scroll-x="true" show-scrollbar="false">
    <view class="category-bar carbon-glass-card">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        :class="['category-item', { 'cat-active': activeTab === tab.key }]"
        @click="emit('change', tab.key)"
      >{{ tab.label }}</view>
    </view>
  </scroll-view>
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
.category-scroll {
  padding: 0 30rpx 24rpx;
  white-space: nowrap;
}

.category-bar {
  display: inline-flex;
  gap: 10rpx;
  padding: 10rpx;
  border-radius: 999rpx;
}

.category-item {
  padding: 15rpx 28rpx;
  font-size: 26rpx;
  color: #65746d;
  font-weight: 800;
  white-space: nowrap;
  border-radius: 999rpx;
}

.cat-active {
  color: #fff;
  background: linear-gradient(145deg, #10b981, #047857);
  box-shadow: 0 10rpx 22rpx rgba(16, 185, 129, 0.22);
}
</style>
