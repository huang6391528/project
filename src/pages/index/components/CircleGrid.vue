<template>
  <view class="circle-action-grid">
    <view
      v-for="item in items"
      :key="item.label"
      class="circle-action-item carbon-lift"
      :class="{ 'circle-dimmed': item.dimmed }"
    >
      <view class="circle-icon" :class="item.iconClass">
        <text class="circle-emoji">{{ item.emoji }}</text>
        <view v-if="item.featured" class="featured-dot"></view>
      </view>
      <text class="circle-label" :class="{ 'circle-label-featured': item.featured }">
        {{ item.label }}
      </text>
    </view>
  </view>
</template>

<script setup>
const items = [
  { label: '校园跑', emoji: 'RUN', iconClass: 'circle-running', dimmed: false, featured: false },
  { label: '绿色出行', emoji: 'BIKE', iconClass: 'circle-transport', dimmed: false, featured: false },
  { label: '低碳饮食', emoji: 'MEAL', iconClass: 'circle-diet', dimmed: false, featured: false },
  { label: '减外卖', emoji: 'BOX', iconClass: 'circle-takeout', dimmed: false, featured: false },
  { label: '旧物利用', emoji: 'REUSE', iconClass: 'circle-reuse', dimmed: false, featured: true },
  { label: '步行计步', emoji: 'STEP', iconClass: 'circle-walk', dimmed: false, featured: false },
]
</script>

<style scoped>
.circle-action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34rpx 18rpx;
  padding: 4rpx 4rpx;
}

.circle-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
}

.circle-icon {
  width: 112rpx;
  height: 112rpx;
  border-radius: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 12rpx 28rpx rgba(15, 87, 62, 0.10);
  border: 1rpx solid rgba(255,255,255,0.7);
}

.circle-emoji {
  font-size: 18rpx;
  font-weight: 900;
  line-height: 1;
}

.featured-dot {
  position: absolute;
  right: 14rpx;
  top: 14rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #facc15;
  box-shadow: 0 0 0 8rpx rgba(250, 204, 21, 0.18);
}

.circle-label {
  font-size: 24rpx;
  color: #40524a;
  font-weight: 700;
  text-align: center;
}

.circle-label-featured {
  color: #047857;
  font-weight: 900;
}

.circle-dimmed { opacity: 0.62; }

.circle-running { background: linear-gradient(145deg, #dbeafe, #f8fbff); color: #1d4ed8; }
.circle-transport { background: linear-gradient(145deg, #d1fae5, #f0fdf4); color: #047857; }
.circle-diet { background: linear-gradient(145deg, #fef3c7, #fff7ed); color: #b45309; }
.circle-takeout { background: linear-gradient(145deg, #fee2e2, #fff7f7); color: #b91c1c; }
.circle-reuse {
  background: linear-gradient(145deg, #bbf7d0, #ecfeff);
  color: #047857;
  box-shadow: 0 14rpx 34rpx rgba(16, 185, 129, 0.22);
}
.circle-walk { background: linear-gradient(145deg, #ede9fe, #f8f7ff); color: #6d28d9; }
</style>
