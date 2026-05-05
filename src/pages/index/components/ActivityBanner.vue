<template>
  <view class="banner carbon-lift">
    <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/b9c8194c51e2407997135fdc0513e984.jpg" mode="aspectFill"></image>
    <view class="banner-overlay">
      <view class="banner-chip">HOT EVENT</view>
      <text class="banner-title">2026 校园春季马拉松</text>
      <text class="banner-sub">即刻报名，最高奖励 500 碳积分</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.banner {
  margin-top: 4rpx;
  margin-bottom: 32rpx;
  height: 230rpx;
  border-radius: 30rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0 18rpx 42rpx rgba(5, 95, 70, 0.16);
}

.banner-img {
  width: 100%;
  height: 100%;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(4, 47, 36, 0.86), rgba(4, 47, 36, 0.22)),
    linear-gradient(180deg, transparent, rgba(0,0,0,0.18));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32rpx;
}

.banner-chip {
  width: fit-content;
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: rgba(250, 204, 21, 0.22);
  color: #fef3c7;
  font-size: 18rpx;
  font-weight: 900;
  margin-bottom: 14rpx;
}

.banner-title {
  font-size: 36rpx;
  font-weight: 900;
  color: #fff;
}

.banner-sub {
  font-size: 24rpx;
  color: rgba(255,255,255,0.82);
  margin-top: 8rpx;
}
</style>
