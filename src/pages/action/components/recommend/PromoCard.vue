<template>
  <view class="promo-card">
    <view class="promo-icon">
      <text class="iconfont icon-bento"></text>
    </view>
    <view class="promo-content">
      <text class="promo-title">低碳光盘行动</text>
      <text class="promo-desc">今日打卡奖励翻倍</text>
    </view>
    <view class="promo-badge">+100</view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.promo-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff7ed;
  border: 4rpx solid #fed7aa;
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 32rpx;
}

.promo-icon { font-size: 80rpx; }

.promo-content { flex: 1; margin-left: 24rpx; }

.promo-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #9a3412;
}

.promo-desc {
  display: block;
  font-size: 22rpx;
  color: #c2410c;
  margin-top: 4rpx;
}

.promo-badge {
  background-color: #fed7aa;
  color: #9a3412;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}
</style>
