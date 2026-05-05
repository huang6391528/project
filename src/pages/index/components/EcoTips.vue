<template>
  <view class="knowledge-section">
    <view class="knowledge-title">
      <view class="tip-icon">AI</view>
      <text>今日低碳洞察</text>
    </view>
    <text class="knowledge-text">
      回收一吨废纸，可再造约 850 公斤纸张，并减少木材消耗。今天完成一次旧物回收，可额外点亮“循环利用”徽章。
    </text>
  </view>
</template>

<script setup>
</script>

<style scoped>
.knowledge-section {
  background: rgba(16, 35, 27, 0.92);
  border-radius: 28rpx;
  padding: 30rpx;
  margin-bottom: 32rpx;
  color: #fff;
  border: 1rpx solid rgba(255,255,255,0.10);
}

.knowledge-title {
  font-size: 28rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.tip-icon {
  width: 46rpx;
  height: 46rpx;
  border-radius: 15rpx;
  background: linear-gradient(145deg, #38bdf8, #10b981);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 900;
}

.knowledge-text {
  font-size: 24rpx;
  color: rgba(255,255,255,0.78);
  line-height: 1.65;
}
</style>
