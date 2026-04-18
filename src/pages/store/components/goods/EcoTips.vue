<template>
  <view class="eco-tips-card">
    <view class="eco-tips-header">
      <text class="eco-tips-icon">💡</text>
      <text class="eco-tips-title">减碳小知识</text>
    </view>
    <text class="eco-tips-desc">兑换并使用一件环保帆布包，预计每年可减少使用约 150 个一次性塑料袋。您的每一次积分兑换，都在为地球减负。</text>
    <view class="eco-tips-footer">
      <text class="eco-tips-link">如何获取更多积分？</text>
      <text class="eco-tips-arrow">›</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.eco-tips-card { background-color: #ecfdf5; border-radius: 24rpx; padding: 32rpx; margin-top: 60rpx; border: 2rpx solid #a7f3f3; }
.eco-tips-header { display: flex; align-items: center; gap: 8rpx; margin-bottom: 16rpx; }
.eco-tips-icon { font-size: 28rpx; }
.eco-tips-title { font-size: 26rpx; font-weight: bold; color: #064e3b; }
.eco-tips-desc { display: block; font-size: 20rpx; color: rgba(6, 78, 59, 0.8); line-height: 1.7; }
.eco-tips-footer { display: flex; justify-content: flex-end; align-items: center; margin-top: 20rpx; }
.eco-tips-link { font-size: 18rpx; font-weight: bold; color: #059669; }
.eco-tips-arrow { font-size: 18rpx; color: #059669; margin-left: 4rpx; }
</style>
