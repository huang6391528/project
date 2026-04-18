<template>
  <view class="circle-action-grid">
    <view
      v-for="item in items"
      :key="item.label"
      class="circle-action-item"
      :class="{ 'circle-dimmed': item.dimmed }"
    >
      <view class="circle-icon" :class="item.iconClass">
        <text class="circle-emoji">{{ item.emoji }}</text>
      </view>
      <text class="circle-label" :class="{ 'circle-label-featured': item.featured }">
        {{ item.label }}
      </text>
    </view>
  </view>
</template>

<script setup>
const items = [
  { label: '校园跑', emoji: '⚡', iconClass: 'circle-running', dimmed: false, featured: false },
  { label: '绿色出行', emoji: '🚲', iconClass: 'circle-transport', dimmed: true, featured: false },
  { label: '低碳饮食', emoji: '🥗', iconClass: 'circle-diet', dimmed: false, featured: false },
  { label: '减外卖', emoji: '📦', iconClass: 'circle-takeout', dimmed: false, featured: false },
  { label: '旧物利用', emoji: '📸', iconClass: 'circle-reuse', dimmed: false, featured: true },
  { label: '步行计步', emoji: '🚶', iconClass: 'circle-walk', dimmed: false, featured: false },
]
</script>

<style scoped>
.circle-action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40rpx 16rpx;
  padding: 4rpx 8rpx;
}

.circle-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  cursor: pointer;
}

.circle-action-item:active .circle-icon {
  transform: scale(0.88);
}

.circle-icon {
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.circle-emoji {
  font-size: 46rpx;
  line-height: 1;
}

.circle-label {
  font-size: 24rpx;
  color: #4b5563;
  font-weight: 500;
  text-align: center;
}

.circle-label-featured {
  color: #059669;
  font-weight: 700;
}

.circle-dimmed { opacity: 0.45; }

.circle-running   { background-color: #dbeafe; }
.circle-transport { background-color: #d1fae5; }
.circle-diet      { background-color: #fef3c7; }
.circle-takeout   { background-color: #fee2e2; }
.circle-reuse     {
  background-color: #d1fae5;
  box-shadow: 0 6rpx 20rpx rgba(16, 185, 129, 0.32);
  border: 2.5rpx solid #6ee7b7;
}
.circle-walk      { background-color: #ede9fe; }
</style>
