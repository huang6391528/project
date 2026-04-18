<template>
  <view class="energy-chart-card">
    <text class="energy-chart-title">宿舍周能耗趋势</text>
    <view class="energy-bar-group">
      <view v-for="(item, i) in data" :key="i" class="energy-bar-item">
        <view class="energy-bar" :style="{ height: item.h + 'rpx', background: item.color || '#FACC15' }"></view>
        <text class="energy-bar-label">{{ item.d }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    default: () => [
      { d: 'M', h: 120, color: '#FACC15' },
      { d: 'T', h: 200, color: '#FACC15' },
      { d: 'W', h: 150, color: '#FACC15' },
      { d: 'T', h: 80,  color: '#FACC15' },
      { d: 'F', h: 70,  color: '#FACC15' },
      { d: 'S', h: 110, color: '#FACC15' },
      { d: 'S', h: 130, color: '#FACC15' },
    ]
  }
})
</script>

<style scoped>
.energy-chart-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
  margin-bottom: 20rpx;
}

.energy-chart-title {
  display: block;
  font-size: 22rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16rpx;
}

.energy-bar-group {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 160rpx;
  padding: 0 8rpx;
}

.energy-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8rpx;
  flex: 1;
}

.energy-bar {
  width: 36rpx;
  border-radius: 10rpx;
  min-height: 10rpx;
}

.energy-bar-label {
  font-size: 20rpx;
  color: #9ca3af;
}
</style>
