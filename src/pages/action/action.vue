<template>
  <view class="page-action carbon-page-shell">
    <view class="action-hero carbon-fade-up">
      <view class="hero-left">
        <text class="hero-kicker">AI LOW-CARBON ENGINE</text>
        <text class="page-title">低碳行动中心</text>
        <text class="page-sub">智能识别校园场景，把低碳行为沉淀为可信积分与碳资产</text>
      </view>
      <view class="hero-meter">
        <text class="meter-label">今日减碳</text>
        <text class="meter-value">1.85</text>
        <text class="meter-unit">kg CO₂</text>
      </view>
    </view>

    <view class="hero-insights carbon-glass-card">
      <view class="insight-item">
        <text class="insight-value">12</text>
        <text class="insight-label">可完成任务</text>
      </view>
      <view class="insight-item">
        <text class="insight-value">96%</text>
        <text class="insight-label">核验可信度</text>
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

.action-hero {
  margin: 0 30rpx;
  padding: 36rpx;
  border-radius: 42rpx;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background:
    radial-gradient(circle at 90% 12%, rgba(250, 204, 21, 0.34), transparent 28%),
    linear-gradient(135deg, #10231b, #047857 66%, #38bdf8);
  box-shadow: 0 24rpx 58rpx rgba(5, 95, 70, 0.24);
  position: relative;
  overflow: hidden;
}

.action-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.32;
  background-image: linear-gradient(120deg, rgba(255,255,255,0.18) 1rpx, transparent 1rpx);
  background-size: 34rpx 34rpx;
}

.hero-left {
  position: relative;
  z-index: 1;
  width: 420rpx;
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
  width: 170rpx;
  height: 170rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,0.28);
  background: rgba(255,255,255,0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12rpx);
}

.meter-label {
  font-size: 20rpx;
  color: rgba(255,255,255,0.70);
}

.meter-value {
  font-size: 46rpx;
  font-weight: 900;
  color: #facc15;
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
  border-radius: 28rpx;
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
  color: #6b7a72;
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
  background: linear-gradient(145deg, #10231b, #10b981);
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
