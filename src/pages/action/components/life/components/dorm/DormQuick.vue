<template>
  <view class="dorm-quick-grid">
    <view v-for="item in items" :key="item.name" class="dorm-quick-card">
      <text class="iconfont dorm-quick-icon" :class="item.iconClass">{{ item.icon }}</text>
      <text class="dorm-quick-name">{{ item.name }}</text>
      <text class="dorm-quick-desc">{{ item.desc }}</text>
      <button class="dorm-quick-btn">{{ item.btnText }}</button>
    </view>
  </view>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { name: '节约用电', desc: '做到随手关灯', icon: '⚡', iconClass: 'yellow', btnText: '打卡' },
      { name: '节约用水', desc: '缩短淋浴时间', icon: '💧', iconClass: 'blue', btnText: '打卡' },
    ]
  }
})
</script>

<style scoped>
.dorm-quick-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding: 0 24rpx;
  margin-bottom: 16rpx;
}

.dorm-quick-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}

.dorm-quick-icon { font-size: 56rpx; margin-bottom: 8rpx; }
.dorm-quick-icon.yellow { color: #fbbf24; }
.dorm-quick-icon.blue { color: #60a5fa; }

.dorm-quick-name {
  font-size: 22rpx;
  font-weight: 700;
  color: #374151;
  margin-bottom: 4rpx;
}

.dorm-quick-desc { font-size: 18rpx; color: #9ca3af; margin-bottom: 12rpx; text-align: center; }

.dorm-quick-btn {
  width: 100%;
  padding: 12rpx;
  border-radius: 16rpx;
  font-size: 18rpx;
  font-weight: 700;
  margin-top: 8rpx;
  background: #fbbf24;
  color: #fff;
  border: none;
}
</style>
