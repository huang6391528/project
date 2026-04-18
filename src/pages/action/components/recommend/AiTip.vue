<template>
  <!-- AI 视觉识别打卡 -->
  <view class="ai-tip">
    <view class="ai-icon">
      <text class="iconfont icon-camera"></text>
    </view>
    <view class="ai-content">
      <text class="ai-title">AI 视觉识别打卡</text>
      <text class="ai-desc">拍照识别垃圾分类、空盘等</text>
    </view>
    <text class="iconfont icon-chevron-right"></text>
  </view>
</template>

<script setup>
</script>

<style scoped>
.ai-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #3b82f6, #4f46e5);
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.2);
}

.ai-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
}

.ai-content {
  flex: 1;
  margin-left: 24rpx;
}

.ai-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.ai-desc {
  display: block;
  font-size: 22rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 4rpx;
}

.ai-tip .iconfont:last-child {
  font-size: 40rpx;
  color: #fff;
}
</style>
