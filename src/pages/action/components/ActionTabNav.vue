<template>
  <scroll-view class="category-scroll" scroll-x="true">
    <view class="category-tags">
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
  padding: 0 30rpx;
  white-space: nowrap;
}

.category-tags {
  display: flex;
  gap: 24rpx;
  padding-bottom: 16rpx;
}

.category-tag {
  padding: 12rpx 32rpx;
  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 50rpx;
  font-size: 28rpx;
  white-space: nowrap;
}

.tag-active {
  background-color: #10b981;
  color: #fff;
  font-weight: 600;
}
</style>
