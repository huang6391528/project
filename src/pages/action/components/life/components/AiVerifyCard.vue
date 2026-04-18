<template>
  <!-- 垃圾分类 AI 核验 -->
  <view class="life-ai-card">
    <view class="life-ai-left">
      <view class="life-ai-icon">
        <text class="iconfont icon-camera"></text>
      </view>
      <view class="life-ai-content">
        <text class="life-ai-title">垃圾分类 AI 核验</text>
        <text class="life-ai-desc">拍照识别并记录碳吸附</text>
      </view>
    </view>
    <button class="life-ai-btn">去拍摄</button>
  </view>
</template>

<script setup>
</script>

<style scoped>
.life-ai-card {
  margin: 32rpx 30rpx;
  padding: 24rpx;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border-radius: 32rpx;
  border: 4rpx solid #e9d5ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.life-ai-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.life-ai-icon {
  width: 80rpx;
  height: 80rpx;
  background: #7c3aed;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.life-ai-icon .iconfont { font-size: 40rpx; color: #fff; }

.life-ai-content {
  display: flex;
  flex-direction: column;
}

.life-ai-title { font-size: 24rpx; font-weight: bold; color: #6b21a8; }
.life-ai-desc { font-size: 18rpx; color: #9333ea; margin-top: 4rpx; }

.life-ai-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 16rpx 32rpx;
  border-radius: 20rpx;
  border: none;
}
</style>
