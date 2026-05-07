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
  { label: '晨跑打卡', emoji: 'RUN', iconClass: 'circle-running', dimmed: false, featured: false },
  { label: '绿色出行', emoji: 'BIKE', iconClass: 'circle-transport', dimmed: false, featured: false },
  { label: '低碳饮食', emoji: 'MEAL', iconClass: 'circle-diet', dimmed: false, featured: false },
  { label: '外卖减塑', emoji: 'BOX', iconClass: 'circle-takeout', dimmed: false, featured: false },
  { label: '循环回收', emoji: 'REUSE', iconClass: 'circle-reuse', dimmed: false, featured: true },
  { label: '步数同步', emoji: 'STEP', iconClass: 'circle-walk', dimmed: false, featured: false },
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
  width: 116rpx;
  height: 116rpx;
  border-radius: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 14rpx 30rpx rgba(15, 87, 62, 0.12);
  border: 1rpx solid rgba(255,255,255,0.78);
  overflow: hidden;
}

.circle-icon::after {
  content: "";
  position: absolute;
  inset: 10rpx;
  border-radius: 26rpx;
  border: 1rpx solid rgba(255,255,255,0.46);
}

.circle-emoji {
  font-size: 18rpx;
  font-weight: 900;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.featured-dot {
  position: absolute;
  right: 14rpx;
  top: 14rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #ffd166;
  box-shadow: 0 0 0 8rpx rgba(255, 209, 102, 0.22), 0 0 18rpx rgba(255, 209, 102, 0.9);
}

.circle-label {
  font-size: 24rpx;
  color: #40524a;
  font-weight: 800;
  text-align: center;
}

.circle-label-featured {
  color: #047857;
  font-weight: 900;
}

.circle-dimmed { opacity: 0.62; }

.circle-running { background: linear-gradient(145deg, #d8f7fb, #f8fbff); color: #047080; }
.circle-transport { background: linear-gradient(145deg, #d7f8df, #f0fdf4); color: #047857; }
.circle-diet { background: linear-gradient(145deg, #fff0c7, #fff8ed); color: #a95c00; }
.circle-takeout { background: linear-gradient(145deg, #ffe1e8, #fff7f9); color: #b91c45; }
.circle-reuse {
  background: linear-gradient(145deg, #bdf76e, #e9feff);
  color: #047857;
  box-shadow: 0 16rpx 38rpx rgba(14, 165, 111, 0.24);
}
.circle-walk { background: linear-gradient(145deg, #e4e8ff, #f8f7ff); color: #273b9f; }
</style>
