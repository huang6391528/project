<template>
  <scroll-view class="category-scroll" scroll-x="true" show-scrollbar="false">
    <view class="category-tags carbon-glass-card">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="category-tag"
        :class="{ 'tag-active': activeTab === tab.key }"
        @tap="emit('change', tab.key)"
      >{{ tab.label }}</view>
    </view>
  </scroll-view>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    default: 'recommend'
  }
})

const emit = defineEmits(['change'])

const tabs = [
  { key: 'recommend', label: '推荐' },
  { key: 'travel', label: '出行' },
  { key: 'diet', label: '饮食' },
  { key: 'life', label: '生活' },
]
</script>

<style scoped>
.category-scroll {
  padding: 0 30rpx 24rpx;
  white-space: nowrap;
}

.category-tags {
  display: inline-flex;
  gap: 10rpx;
  padding: 10rpx;
  border-radius: 999rpx;
}

.category-tag {
  padding: 15rpx 36rpx;
  color: #5f7068;
  border-radius: 999rpx;
  font-size: 27rpx;
  font-weight: 800;
  white-space: nowrap;
  transition: all 0.18s ease;
}

.tag-active {
  background: linear-gradient(145deg, #10b981, #047857);
  color: #fff;
  box-shadow: 0 10rpx 22rpx rgba(16, 185, 129, 0.24);
}
</style>
