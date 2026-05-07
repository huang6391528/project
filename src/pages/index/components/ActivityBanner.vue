<template>
  <view class="banner carbon-lift">
    <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/b9c8194c51e2407997135fdc0513e984.jpg" mode="aspectFill"></image>
    <view class="banner-overlay">
      <view class="banner-chip">HOT EVENT</view>
      <text class="banner-title">2026 校园零碳挑战赛</text>
      <text class="banner-sub">组队完成绿色行动，冲刺 500 碳积分与学院荣誉榜</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.banner {
  margin-top: 4rpx;
  margin-bottom: 32rpx;
  height: 236rpx;
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20rpx 46rpx rgba(5, 95, 70, 0.18);
}

.banner::after {
  content: "";
  position: absolute;
  inset: 12rpx;
  border-radius: 24rpx;
  border: 1rpx solid rgba(255,255,255,0.26);
  pointer-events: none;
}

.banner-img {
  width: 100%;
  height: 100%;
  transform: scale(1.04);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 88% 18%, rgba(167, 240, 75, 0.26), transparent 34%),
    linear-gradient(90deg, rgba(4, 35, 29, 0.90), rgba(4, 47, 36, 0.28)),
    linear-gradient(180deg, transparent, rgba(0,0,0,0.18));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 34rpx;
}

.banner-chip {
  width: fit-content;
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: rgba(255, 184, 77, 0.22);
  color: #fff1d6;
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
  color: rgba(255,255,255,0.84);
  margin-top: 8rpx;
  max-width: 560rpx;
  line-height: 1.42;
}
</style>
