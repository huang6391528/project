<template>
  <view class="action-grid">
    <view v-for="item in actions" :key="item.title" class="action-card" :class="{ 'card-disabled': item.disabled }">
      <text class="iconfont" :class="item.icon"></text>
      <text class="action-title">{{ item.title }}</text>
      <text class="action-points">{{ item.points }}</text>
    </view>
  </view>
</template>

<script setup>
const actions = [
  { icon: 'icon-bike', title: '单车出行', points: '+15 积分/km', disabled: false },
  { icon: 'icon-cup', title: '自带水杯', points: '+30 积分/次', disabled: false },
  { icon: 'icon-shopping', title: '环保袋购物', points: '+20 积分/次', disabled: false },
  { icon: 'icon-plug', title: '随手关灯', points: '+5 积分/次', disabled: true },
]
</script>

<style scoped>
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 32rpx;
}

.action-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #fff 100%);
  padding: 32rpx;
  border-radius: 32rpx;
  border: 2rpx solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.action-card text:first-child {
  font-size: 80rpx;
}

.action-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 16rpx;
}

.action-points {
  font-size: 22rpx;
  color: #10b981;
  font-weight: bold;
  margin-top: 8rpx;
}

.card-disabled { opacity: 0.6; }
</style>
