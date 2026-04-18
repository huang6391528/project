<template>
  <view class="knowledge-section">
    <view class="knowledge-title">
      <text class="icon-emoji">💡</text>
      <text>环保小贴士</text>
    </view>
    <text class="knowledge-text">
      "回收一吨废纸，可造好纸850公斤，节省木材3立方米，同时减少污染排放。"
    </text>
  </view>
</template>

<script setup>
</script>

<style scoped>
.knowledge-section {
  background-color: #f9fafb;
  border-radius: 32rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.knowledge-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.icon-emoji {
  font-size: 48rpx;
  display: inline-block;
  line-height: 1;
}

.knowledge-text {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.6;
  font-style: italic;
}
</style>
