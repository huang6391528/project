<template>
  <view class="study-achievement-card">
    <view class="achievement-header">
      <text class="iconfont icon-file-text achievement-icon"></text>
      <text class="achievement-label">无纸化学习本学期省下</text>
    </view>
    <view class="achievement-num">
      <text class="achievement-big">{{ num }}</text>
      <text class="achievement-unit">{{ unit }}</text>
    </view>
    <text class="achievement-sub">{{ subText }}</text>
  </view>
</template>

<script setup>
defineProps({
  num: { type: [String, Number], default: '425' },
  unit: { type: String, default: '张 A4 纸' },
  subText: { type: String, default: '相当于保护了 0.05 棵成年树木' },
})
</script>

<style scoped>
.study-achievement-card {
  margin: 24rpx;
  background: linear-gradient(135deg, #fb923c, #f97316);
  border-radius: 32rpx;
  padding: 32rpx;
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(249, 115, 22, 0.2);
}

.achievement-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.achievement-icon { font-size: 32rpx; }
.achievement-label { font-size: 26rpx; font-weight: 500; opacity: 0.9; }

.achievement-num {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.achievement-big { font-size: 80rpx; font-weight: 900; }
.achievement-unit { font-size: 26rpx; opacity: 0.9; }
.achievement-sub { font-size: 22rpx; opacity: 0.75; display: block; }
</style>
