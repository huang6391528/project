<template>
  <view class="page-records">
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">反馈记录</text>
      <view class="nav-placeholder"></view>
    </view>
    <view class="content">
      <view class="empty-state">
        <text class="empty-icon">📋</text>
        <text class="empty-text">暂无反馈记录</text>
        <text class="empty-sub">您提交的反馈将在这里显示</text>
      </view>
    </view>
  </view>
</template>

<script setup>
function goBack() {
  uni.navigateBack()
}
</script>

<style scoped>
.page-records {
  min-height: 100vh;
  background-color: #f9fafb;
}
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f3f4f6;
}
.nav-back {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-icon {
  font-size: 48rpx;
  color: #1f2937;
}
.nav-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
}
.nav-placeholder {
  width: 80rpx;
}
.content {
  padding: 32rpx;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 160rpx;
}
.empty-icon {
  font-size: 120rpx;
  margin-bottom: 24rpx;
}
.empty-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #666;
  margin-bottom: 12rpx;
}
.empty-sub {
  font-size: 26rpx;
  color: #999;
}
</style>
