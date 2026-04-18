<template>
  <view class="life-sub-tabs">
    <view
      v-for="tab in tabs"
      :key="tab.key"
      class="life-sub-tab"
      :class="{ 'life-sub-tab-active': activeTab === tab.key }"
      @tap="emit('change', tab.key)"
    >
      {{ tab.label }}
      <view v-if="activeTab === tab.key" class="life-tab-line"></view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  activeTab: { type: String, default: 'home' }
})

const emit = defineEmits(['change'])

const tabs = [
  { key: 'home', label: '推荐' },
  { key: 'dorm', label: '宿舍节能' },
  { key: 'study', label: '低碳学习' },
]
</script>

<style scoped>
.life-sub-tabs {
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  margin-top: 32rpx;
  gap: 0;
}

.life-sub-tab {
  font-size: 26rpx;
  font-weight: 400;
  color: #9CA3AF;
  padding: 12rpx 20rpx;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.life-tab-line {
  display: block;
  width: 60rpx;
  height: 6rpx;
  margin-top: 6rpx;
  background: linear-gradient(135deg, #7c3aed, #a855f7, #c084fc);
  border-radius: 3rpx;
  box-shadow: 0 0 12rpx rgba(124, 58, 237, 0.5);
}

.life-sub-tab-active {
  font-size: 30rpx;
  font-weight: 700;
  color: #7c3aed;
}

/* 分隔线 */
.life-sub-tab:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -1rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 2rpx;
  height: 28rpx;
  background: #E5E7EB;
}
</style>
