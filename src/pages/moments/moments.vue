<template>
  <view class="page-moments">
    <view class="page-header">
      <text class="page-title">我的动态</text>
    </view>
    <view class="empty-state">
      <text class="empty-icon">📝</text>
      <text class="empty-text">暂无动态</text>
      <text class="empty-sub">快去发布你的第一条低碳动态吧</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.page-moments {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}
.page-header {
  padding: 60rpx 30rpx 30rpx;
  background-color: #fff;
}
.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}
.empty-icon {
  font-size: 96rpx;
  margin-bottom: 24rpx;
}
.empty-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #666;
  margin-bottom: 12rpx;
}
.empty-sub {
  font-size: 24rpx;
  color: #999;
}
</style>
