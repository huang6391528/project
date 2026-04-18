<template>
  <view class="page-action">
    <!-- Header -->
    <view class="page-header">
      <view class="header-left">
        <text class="page-title">行为打卡</text>
        <text class="page-sub">记录你的低碳足迹，赚取积分</text>
      </view>
      <view class="header-right">
        <text class="header-sub-label">今日已减排</text>
        <text class="header-value">1.85 kg</text>
      </view>
    </view>

    <!-- Tab 导航 -->
    <ActionTabNav :activeTab="activeTab" @change="switchTab" />

    <!-- Content -->
    <view class="content">
      <ActionRecommend v-if="activeTab === 'recommend'" />
      <ActionTravel v-else-if="activeTab === 'travel'" />
      <ActionDiet v-else-if="activeTab === 'diet'" />
      <ActionLife v-else-if="activeTab === 'life'" />
    </view>

    <!-- Floating Action Button -->
    <view class="fab">
      <text class="iconfont icon-plus"></text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ActionTabNav from './components/ActionTabNav.vue'
import ActionRecommend from './components/recommend/ActionRecommend.vue'
import ActionTravel from './components/travel/ActionTravel.vue'
import ActionDiet from './components/diet/ActionDiet.vue'
import ActionLife from './components/life/ActionLife.vue'

const activeTab = ref('recommend')

const switchTab = (tab) => {
  activeTab.value = tab
}
</script>

<style scoped>
.page-action {
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 32rpx 30rpx 24rpx;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 44rpx;
  font-weight: 800;
  color: #1f2937;
}

.page-sub {
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

.header-right {
  text-align: right;
}

.header-sub-label {
  display: block;
  font-size: 20rpx;
  color: #d1d5db;
}

.header-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #059669;
}

/* Content */
.content {
  padding: 0 30rpx;
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 200rpx;
  right: 64rpx;
  width: 112rpx;
  height: 112rpx;
  background-color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56rpx;
  color: #fff;
  box-shadow: 0 16rpx 32rpx rgba(16, 185, 129, 0.4);
  z-index: 100;
}

.fab:active {
  transform: scale(0.9);
  transition: transform 0.1s;
}
</style>
