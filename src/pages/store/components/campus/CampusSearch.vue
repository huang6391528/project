<template>
  <view class="campus-search-bar">
    <text class="campus-search-icon">🔍</text>
    <input class="campus-search-input" type="text" placeholder="搜索校内特权服务..." />
  </view>
</template>

<script setup>
</script>

<style scoped>
.campus-search-bar { display: flex; align-items: center; gap: 12rpx; background-color: #f3f4f6; border-radius: 20rpx; padding: 16rpx 24rpx; }
.campus-search-icon { font-size: 28rpx; }
.campus-search-input { background: transparent; border: none; outline: none; font-size: 24rpx; color: #374151; width: 100%; }
</style>
