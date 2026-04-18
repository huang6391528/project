<template>
  <view class="tab-virtual">
    <view class="virtual-placeholder">
      <text class="virtual-icon">🔒</text>
      <text class="virtual-title">功能暂未开放</text>
      <text class="virtual-desc">虚拟权益模块正在开发中，敬请期待</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.tab-virtual { padding-top: 80rpx; }
.virtual-placeholder { display: flex; flex-direction: column; align-items: center; padding: 60rpx 0; }
.virtual-icon { font-size: 120rpx; margin-bottom: 24rpx; }
.virtual-title { font-size: 32rpx; font-weight: bold; color: #6b7280; margin-bottom: 12rpx; }
.virtual-desc { font-size: 24rpx; color: #9ca3af; }
</style>
