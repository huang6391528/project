<template>
  <!-- 绑定智能设备 -->
  <view class="device-card">
    <view class="device-icon">
      <text class="iconfont icon-watch"></text>
    </view>
    <view class="device-content">
      <text class="device-title">绑定智能设备</text>
      <text class="device-desc">授权步数同步，持续赚取积分</text>
    </view>
    <view v-if="!isDeviceBound" class="device-btn" @tap="handleBind">
      <text class="btn-text">去绑定 +50</text>
    </view>
    <view v-else class="device-bound">
      <text class="iconfont icon-check-circle"></text>
      <text class="bound-text">已绑定</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const isDeviceBound = ref(false)

const handleBind = () => {
  isDeviceBound.value = true
  uni.showToast({ title: '绑定成功，获得 +50 积分', icon: 'success' })
}
</script>

<style scoped>
.device-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0d9488, #0f766e);
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(13, 148, 136, 0.2);
}

.device-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
}

.device-content {
  flex: 1;
  margin-left: 24rpx;
}

.device-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.device-desc {
  display: block;
  font-size: 22rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 4rpx;
}

.device-btn {
  background-color: #fff;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.btn-text {
  font-size: 24rpx;
  font-weight: bold;
  color: #0d9488;
}

.device-bound {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.device-bound .iconfont {
  font-size: 36rpx;
  color: #6ee7b7;
}

.bound-text {
  font-size: 26rpx;
  font-weight: bold;
  color: #6ee7b7;
}
</style>
