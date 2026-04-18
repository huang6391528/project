<template>
  <view class="travel-list">
    <view v-for="item in items" :key="item.name" class="travel-item">
      <view class="travel-icon" :class="item.iconClass">
        <text class="iconfont" :class="item.icon"></text>
      </view>
      <view class="travel-info">
        <text class="travel-name">{{ item.name }}</text>
        <text class="travel-desc">{{ item.desc }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { icon: 'icon-bus', name: '公交地铁', desc: '线路选择 · 乘车次数凭证', iconClass: 'indigo-icon' },
      { icon: 'icon-bike', name: '共享单车/私车', desc: '扫码自动记录公里数', iconClass: 'green-icon' },
      { icon: 'icon-walk', name: '步行通勤', desc: '上下学通勤路径校验', iconClass: 'orange-icon-sm' },
      { icon: 'icon-group', name: '拼车共享', desc: '多人结伴奖励积分 x1.5', iconClass: 'purple-icon-sm' },
      { icon: 'icon-scooter', name: '新能源代步', desc: '电车/滑板车合规打卡', iconClass: 'cyan-icon-sm' },
      { icon: 'icon-school-bus', name: '校车通勤', desc: '扫码记录校内校车次数', iconClass: 'rose-icon-sm' },
    ]
  }
})
</script>

<style scoped>
.travel-list { display: flex; flex-direction: column; gap: 16rpx; }

.travel-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.travel-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.travel-icon .iconfont { font-size: 48rpx; }

.indigo-icon { background: #eef2ff; }
.indigo-icon .iconfont { color: #4f46e5; }
.green-icon { background: #ecfdf5; }
.green-icon .iconfont { color: #059669; }
.orange-icon-sm { background: #fff7ed; }
.orange-icon-sm .iconfont { color: #ea580c; }
.purple-icon-sm { background: #f5f3ff; }
.purple-icon-sm .iconfont { color: #7c3aed; }
.cyan-icon-sm { background: #ecfeff; }
.cyan-icon-sm .iconfont { color: #0891b2; }
.rose-icon-sm { background: #fff1f2; }
.rose-icon-sm .iconfont { color: #e11d48; }

.travel-info { flex: 1; }

.travel-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.travel-desc {
  display: block;
  font-size: 20rpx;
  color: #9ca3af;
}
</style>
