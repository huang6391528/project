<template>
  <view class="campus-service-list">
    <view v-for="item in visibleItems" :key="item.name" class="campus-service-card">
      <view class="campus-service-icon-wrap" :style="{ backgroundColor: item.bgColor }">
        <text class="campus-icon-text" :style="{ color: item.iconColor }">{{ item.iconText }}</text>
      </view>
      <view class="campus-service-info">
        <view class="campus-service-name-row">
          <text class="campus-service-name">{{ item.name }}</text>
          <view v-if="item.badge" class="campus-service-badge">{{ item.badge }}</view>
        </view>
        <view class="campus-service-location">
          <text class="location-icon">📍</text>
          <text class="campus-service-location-text">{{ item.location }}</text>
        </view>
        <view class="campus-service-bottom">
          <text class="campus-service-price">{{ item.credits }} 积分</text>
          <view class="campus-exchange-btn" @click="emit('exchange', item)">立即领用</view>
        </view>
      </view>
    </view>

    <!-- 底部折叠/展开按钮（仅超过3项时显示） -->
    <view v-if="items.length > 3" class="campus-collapse-bar" @tap="toggleAll">
      <text class="collapse-text">{{ showAll ? '收起 ↑' : '展开全部 ↓' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { name: '黑白打印3折券', location: '校内各大文印室', credits: 50, bgColor: '#ecfdf5', iconColor: '#10b981', iconText: '🖨', badge: '' },
      { name: '图书馆座次优先权', location: '考试周专用，限领1次', credits: 300, bgColor: '#eff6ff', iconColor: '#3b82f6', iconText: '🪑', badge: '需核销' },
      { name: '校园歌手大赛决赛门票', location: '学校大礼堂', credits: 1500, bgColor: '#fff7ed', iconColor: '#f97316', iconText: '🎫', badge: '' },
      { name: '健身房单次体验券', location: '体育活动中心2楼', credits: 450, bgColor: '#f5f3ff', iconColor: '#8b5cf6', iconText: '🏋', badge: '' },
    ]
  }
})

const emit = defineEmits(['exchange'])

const showAll = ref(false)

const visibleItems = computed(() => {
  return showAll.value ? props.items : props.items.slice(0, 3)
})

function toggleAll() {
  showAll.value = !showAll.value
}

defineExpose({ showAll, toggleAll })
</script>

<style scoped>
.campus-service-list { display: flex; flex-direction: column; gap: 24rpx; }
.campus-service-card { display: flex; align-items: stretch; background-color: #fff; border-radius: 24rpx; overflow: hidden; border: 2rpx solid #f3f4f6; box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05); }
.campus-service-icon-wrap { width: 160rpx; display: flex; align-items: center; justify-content: center; padding: 32rpx; flex-shrink: 0; }
.campus-icon-text { font-size: 60rpx; }
.campus-service-info { flex: 1; padding: 24rpx; display: flex; flex-direction: column; justify-content: center; }
.campus-service-name-row { display: flex; align-items: center; gap: 10rpx; }
.campus-service-name { font-size: 26rpx; font-weight: bold; color: #374151; }
.campus-service-badge { background-color: #dbeafe; color: #2563eb; font-size: 16rpx; font-weight: bold; padding: 2rpx 10rpx; border-radius: 8rpx; }
.campus-service-location { display: flex; align-items: center; gap: 4rpx; margin-top: 8rpx; }
.location-icon { font-size: 16rpx; }
.campus-service-location-text { font-size: 18rpx; color: #9ca3af; }
.campus-service-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 20rpx; }
.campus-service-price { font-size: 26rpx; font-weight: bold; color: #059669; }
.campus-exchange-btn { background-color: #10b981; color: #fff; font-size: 20rpx; font-weight: bold; padding: 10rpx 20rpx; border-radius: 12rpx; }

/* 底部折叠栏 */
.campus-collapse-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0 8rpx;
}

.collapse-text {
  font-size: 24rpx;
  color: #9ca3af;
  font-weight: 500;
}
</style>
