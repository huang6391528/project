<template>
  <view class="dorm-tips">
    <view v-for="tip in tips" :key="tip.id" class="dorm-tip" :class="tip.type + '-tip'">
      <view class="tip-num" :class="tip.type + '-num'"><text>{{ tip.id }}</text></view>
      <text class="tip-text">{{ tip.text }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  tips: {
    type: Array,
    default: () => [
      { id: 1, text: '拔掉不常用的电器插头，减少待机功耗。', type: 'yellow' },
      { id: 2, text: '利用宿舍阳台自然采光，减少白天开灯。', type: 'green' },
    ]
  }
})
</script>

<style scoped>
.dorm-tips {
  padding: 0 24rpx;
  margin-bottom: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.dorm-tip {
  border-radius: 20rpx;
  padding: 16rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.yellow-tip { background: #fefce8; }
.green-tip { background: #f0fdf4; }

.tip-num {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tip-num.yellow-num { background: #fde68a; }
.tip-num.yellow-num text { color: #a16207; font-size: 20rpx; font-weight: 700; }
.tip-num.green-num { background: #bbf7d0; }
.tip-num.green-num text { color: #15803d; font-size: 20rpx; font-weight: 700; }

.tip-text { font-size: 20rpx; color: #374151; flex: 1; }
</style>
