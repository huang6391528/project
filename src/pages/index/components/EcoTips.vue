<template>
  <view class="knowledge-section">
    <view class="knowledge-title">
      <view class="tip-icon">AI</view>
      <text>今日低碳洞察</text>
    </view>
    <text class="knowledge-text">
      如果本周全校 850 名学生把一次短途打车换成步行或骑行，预计可减少约 120kg CO2e。系统会结合定位、步数与校园场景，自动生成可信的低碳证明。
    </text>
  </view>
</template>

<script setup>
</script>

<style scoped>
.knowledge-section {
  background:
    radial-gradient(circle at 100% 0%, rgba(47, 211, 230, 0.20), transparent 34%),
    linear-gradient(135deg, rgba(16, 26, 23, 0.96), rgba(4, 47, 36, 0.94));
  border-radius: 30rpx;
  padding: 30rpx;
  margin-bottom: 32rpx;
  color: #fff;
  border: 1rpx solid rgba(255,255,255,0.12);
  box-shadow: 0 18rpx 42rpx rgba(16, 26, 23, 0.16);
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
  background: linear-gradient(145deg, #2fd3e6, #a7f04b);
  color: #082f26;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 900;
}

.knowledge-text {
  font-size: 24rpx;
  color: rgba(255,255,255,0.78);
  line-height: 1.68;
}
</style>
