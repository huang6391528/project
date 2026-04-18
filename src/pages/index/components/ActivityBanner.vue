<template>
  <view class="banner">
    <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/b9c8194c51e2407997135fdc0513e984.jpg" mode="aspectFill"></image>
    <view class="banner-overlay">
      <text class="banner-title">2026 校园春季马拉松</text>
      <text class="banner-sub">即刻报名，最高奖励 500 积分</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.banner {
  margin-top: 48rpx;
  margin-bottom: 32rpx;
  height: 224rpx;
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
}

.banner-img {
  width: 100%; height: 100%;
}

.banner-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32rpx;
}

.banner-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.banner-sub {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 8rpx;
}
</style>
