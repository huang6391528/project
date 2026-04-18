<template>
  <view class="dorm-calc-btn-wrap">
    <button class="dorm-calc-btn">
      <text class="iconfont icon-calculator"></text>
      <text>开启减碳量计算器</text>
    </button>
  </view>
</template>

<script setup>
</script>

<style scoped>
.dorm-calc-btn-wrap { padding: 0 24rpx 32rpx; }

.dorm-calc-btn {
  width: 100%;
  background: #fff;
  border: 4rpx dashed #d1d5db;
  padding: 28rpx;
  border-radius: 32rpx;
  font-size: 22rpx;
  font-weight: 700;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.dorm-calc-btn .iconfont { font-size: 36rpx; }
</style>
