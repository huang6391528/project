<template>
  <view class="lc-section">
    <view class="lc-section-header">
      <text class="section-title">运动场景打卡</text>
      <text class="section-hint">滑动查看更多</text>
    </view>
    <view class="sport-grid">
      <view v-for="sport in sports" :key="sport.name" class="sport-card" :class="sport.cardClass">
        <view v-if="sport.badge" class="sport-badge-wrap"><text class="sport-badge">{{ sport.badge }}</text></view>
        <view class="sport-icon" :class="sport.iconClass">
          <text class="iconfont" :class="sport.icon"></text>
        </view>
        <text class="sport-name">{{ sport.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const sports = [
  { icon: 'icon-run', name: '户外跑步', cardClass: 'blue-card', iconClass: 'blue-icon', badge: null },
  { icon: 'icon-school', name: '体育课运动', cardClass: 'orange-card', iconClass: 'orange-icon', badge: '专属审核' },
  { icon: 'icon-dumbbell', name: '健身塑形', cardClass: 'purple-card', iconClass: 'purple-icon', badge: null },
  { icon: 'icon-basketball', name: '球类运动', cardClass: 'amber-card', iconClass: 'amber-icon', badge: null },
  { icon: 'icon-swim', name: '水上运动', cardClass: 'cyan-card', iconClass: 'cyan-icon', badge: null },
  { icon: 'icon-bike', name: '骑行运动', cardClass: 'green-card', iconClass: 'green-icon', badge: null },
]
</script>

<style scoped>
.lc-section { margin-top: 8rpx; }

.lc-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #1f2937;
}

.section-hint {
  font-size: 20rpx;
  color: #10b981;
  font-weight: bold;
}

.sport-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.sport-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  position: relative;
  transition: all 0.2s;
}

.sport-card:active { transform: scale(0.96); background: #f9f9f9; }

.sport-badge-wrap {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
}

.sport-badge {
  font-size: 16rpx;
  background: #f97316;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-weight: bold;
}

.sport-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.sport-icon .iconfont { font-size: 40rpx; color: #fff; }

.blue-icon { background: #3b82f6; }
.orange-icon { background: #f97316; }
.purple-icon { background: #8b5cf6; }
.amber-icon { background: #f59e0b; }
.cyan-icon { background: #06b6d4; }
.green-icon { background: #10b981; }

.sport-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 6rpx;
}
</style>
