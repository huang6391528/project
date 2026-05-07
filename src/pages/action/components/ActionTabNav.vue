<template>
  <scroll-view class="category-scroll" scroll-x="true" show-scrollbar="false">
    <view class="category-tags carbon-glass-card">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="category-tag"
        :class="{ 'tag-active': activeTab === tab.key }"
        @tap="emit('change', tab.key)"
      >
        <text class="tag-dot"></text>
        <text>{{ tab.label }}</text>
      </view>
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
  { key: 'recommend', label: 'AI 推荐' },
  { key: 'travel', label: '绿色出行' },
  { key: 'diet', label: '低碳饮食' },
  { key: 'life', label: '校园生活' },
]
</script>

<style scoped>
.category-scroll {
  padding: 0 30rpx 24rpx;
  white-space: nowrap;
}

.category-tags {
  display: inline-flex;
  gap: 8rpx;
  padding: 10rpx;
  border-radius: 999rpx;
}

.category-tag {
  padding: 14rpx 24rpx;
  color: #60746b;
  border-radius: 999rpx;
  font-size: 24rpx;
  font-weight: 900;
  white-space: nowrap;
  transition: all 0.18s ease;
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  flex-wrap: nowrap;
}

.tag-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: rgba(96, 116, 107, 0.36);
}

.tag-active {
  background: linear-gradient(145deg, #101a17, #0ea56f);
  color: #fff;
  box-shadow: 0 12rpx 26rpx rgba(14, 165, 111, 0.26);
}

.tag-active .tag-dot {
  background: #a7f04b;
  box-shadow: 0 0 14rpx rgba(167, 240, 75, 0.86);
}
</style>
