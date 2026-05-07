<template>
  <view class="page-action carbon-page-shell">
    <view class="action-light action-light-a"></view>
    <view class="action-light action-light-b"></view>

    <view class="action-hero carbon-fade-up carbon-scanline">
      <view class="hero-left">
        <text class="hero-kicker">AI LOW-CARBON ENGINE</text>
        <text class="page-title">低碳行为智能认证</text>
        <text class="page-sub">把出行、饮食、生活与学习行为转化为可信碳资产，形成可展示、可追踪、可激励的校园减排闭环。</text>
      </view>
      <view class="hero-meter">
        <view class="meter-ring"></view>
        <text class="meter-label">今日减排</text>
        <text class="meter-value">1.85</text>
        <text class="meter-unit">kg CO2e</text>
      </view>
    </view>

    <view class="hero-insights carbon-glass-card">
      <view class="insight-item">
        <text class="insight-value">12</text>
        <text class="insight-label">待认证行为</text>
      </view>
      <view class="insight-item">
        <text class="insight-value">96%</text>
        <text class="insight-label">数据可信度</text>
      </view>
      <view class="insight-item">
        <text class="insight-value">A+</text>
        <text class="insight-label">低碳等级</text>
      </view>
    </view>

    <ActionTabNav :activeTab="activeTab" @change="switchTab" />

    <view class="content carbon-fade-up">
      <ActionRecommend v-if="activeTab === 'recommend'" />
      <ActionTravel v-else-if="activeTab === 'travel'" />
      <ActionDiet v-else-if="activeTab === 'diet'" />
      <ActionLife v-else-if="activeTab === 'life'" />
    </view>

    <view class="fab carbon-pulse">
      <text class="fab-plus">+</text>
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
  min-height: 100vh;
  padding: 26rpx 0 120rpx;
  box-sizing: border-box;
}

.action-light {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(14rpx);
  animation: drift 8s ease-in-out infinite;
}

.action-light-a {
  width: 280rpx;
  height: 280rpx;
  top: 70rpx;
  left: -90rpx;
  background: rgba(47, 211, 230, 0.18);
}

.action-light-b {
  width: 240rpx;
  height: 240rpx;
  top: 360rpx;
  right: -70rpx;
  background: rgba(167, 240, 75, 0.18);
  animation-delay: -3s;
}

@keyframes drift {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20rpx) scale(1.05); }
}

.action-hero {
  margin: 0 30rpx;
  padding: 38rpx 34rpx;
  border-radius: 44rpx;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background:
    radial-gradient(circle at 88% 12%, rgba(255, 184, 77, 0.38), transparent 28%),
    radial-gradient(circle at 8% 0%, rgba(47, 211, 230, 0.26), transparent 30%),
    linear-gradient(135deg, #101a17, #045f46 62%, #0ea56f);
  box-shadow: var(--carbon-shadow-strong);
  position: relative;
  overflow: hidden;
}

.action-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.30;
  background-image: linear-gradient(120deg, rgba(255,255,255,0.18) 1rpx, transparent 1rpx);
  background-size: 34rpx 34rpx;
}

.hero-left {
  position: relative;
  z-index: 1;
  width: 424rpx;
  display: flex;
  flex-direction: column;
}

.hero-kicker {
  font-size: 18rpx;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.66);
}

.page-title {
  margin-top: 10rpx;
  font-size: 46rpx;
  line-height: 1.16;
  font-weight: 900;
}

.page-sub {
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.5;
  color: rgba(255,255,255,0.76);
}

.hero-meter {
  position: relative;
  z-index: 1;
  width: 176rpx;
  height: 176rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,0.30);
  background: rgba(255,255,255,0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(14rpx);
}

.meter-ring {
  position: absolute;
  inset: -8rpx;
  border-radius: 50%;
  border: 4rpx solid transparent;
  border-top-color: #a7f04b;
  border-right-color: rgba(47, 211, 230, 0.72);
  animation: spinMeter 3.8s linear infinite;
}

@keyframes spinMeter {
  to { transform: rotate(360deg); }
}

.meter-label {
  font-size: 20rpx;
  color: rgba(255,255,255,0.70);
}

.meter-value {
  font-size: 46rpx;
  font-weight: 900;
  color: #ffd166;
  line-height: 1;
  margin-top: 8rpx;
}

.meter-unit {
  font-size: 18rpx;
  color: rgba(255,255,255,0.76);
  margin-top: 6rpx;
}

.hero-insights {
  margin: -18rpx 52rpx 24rpx;
  border-radius: 30rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 24rpx 10rpx;
  position: relative;
  z-index: 2;
}

.insight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.insight-value {
  font-size: 34rpx;
  font-weight: 900;
  color: #047857;
}

.insight-label {
  font-size: 20rpx;
  color: #60746b;
}

.content {
  padding: 0 30rpx;
  position: relative;
  z-index: 1;
}

.fab {
  position: fixed;
  bottom: 200rpx;
  right: 52rpx;
  width: 104rpx;
  height: 104rpx;
  background: linear-gradient(145deg, #101a17, #0ea56f);
  border-radius: 34rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 100;
}

.fab-plus {
  font-size: 60rpx;
  font-weight: 300;
  line-height: 1;
}
</style>
