<template>
  <view class="diet-map-card">
    <map
      class="diet-map"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      scale="16"
      :show-location="true"
    ></map>
    <view class="diet-map-overlay">
      <view class="diet-map-pin">
        <text class="iconfont icon-location pin-icon"></text>
      </view>
      <view class="diet-map-info">
        <text class="diet-map-name">{{ canteenName }}</text>
        <text class="diet-map-hint">请确保您在食堂范围内打卡</text>
      </view>
      <button class="diet-map-btn" @tap="onCheckin">{{ checkinText }}</button>
    </view>
  </view>
</template>

<script setup>
defineProps({
  latitude: { type: Number, default: 26.4509 },
  longitude: { type: Number, default: 106.6579 },
  markers: {
    type: Array,
    default: () => [{
      id: 1,
      latitude: 26.4509,
      longitude: 106.6579,
      width: 40,
      height: 50,
      callout: { content: '第一学生食堂', color: '#f97316', fontSize: 12, borderRadius: 8, padding: 8, display: 'ALWAYS', bgColor: '#fff7ed' }
    }]
  },
  canteenName: { type: String, default: '第一学生食堂' },
  checkinText: { type: String, default: '一键签到' },
})

const emit = defineEmits(['checkin'])
const onCheckin = () => emit('checkin')
</script>

<style scoped>
.diet-map-card {
  border-radius: 32rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  position: relative;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
}

.diet-map {
  width: 100%;
  height: 480rpx;
  border-radius: 32rpx;
}

.diet-map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10rpx);
  padding: 24rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.diet-map-pin {
  width: 72rpx;
  height: 72rpx;
  background: #fff7ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pin-icon { font-size: 36rpx; color: #ea580c; }

.diet-map-info { flex: 1; }

.diet-map-name {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.diet-map-hint {
  display: block;
  font-size: 18rpx;
  color: #9ca3af;
}

.diet-map-btn {
  background: #f97316;
  color: #fff;
  font-size: 22rpx;
  font-weight: 700;
  padding: 16rpx 28rpx;
  border-radius: 50rpx;
  border: none;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(249,115,22,0.3);
}
</style>
