<template>
  <view class="travel-lbs-card">
    <view class="lbs-icon-wrap">
      <view class="lbs-dot"></view>
      <text class="iconfont icon-location"></text>
    </view>
    <view class="lbs-content">
      <text class="lbs-title">{{ title }}</text>
      <text class="lbs-desc">{{ desc }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, default: '校园 LBS 自动监测中' },
  desc: { type: String, default: '正在核验：学生活动中心 -> 实验楼' },
})
</script>

<style scoped>
.travel-lbs-card {
  background: #eff6ff;
  border-radius: 32rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  border: 2rpx solid #dbeafe;
  margin-bottom: 24rpx;
}

.lbs-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: #3b82f6;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.lbs-dot {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  width: 20rpx;
  height: 20rpx;
  background: #3b82f6;
  border-radius: 50%;
}

.lbs-icon-wrap .iconfont { font-size: 48rpx; color: #fff; }

.lbs-content { flex: 1; }

.lbs-title {
  display: block;
  font-size: 22rpx;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 4rpx;
}

.lbs-desc {
  display: block;
  font-size: 18rpx;
  color: #60a5fa;
}
</style>
