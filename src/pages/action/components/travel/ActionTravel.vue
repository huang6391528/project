<template>
  <view class="tab-content">
    <StepSyncCard :steps="8432" carbonKg="0.84" carbonAsset="2,840" emission="125.4 kg" />
    <LbsMonitor />
    <view class="lc-section">
      <view class="lc-section-header">
        <text class="section-title">出行打卡选项</text>
        <text class="iconfont icon-info"></text>
      </view>
      <TravelOptions />
    </view>
  </view>
</template>

<script setup>
import StepSyncCard from '../sport/StepSyncCard.vue'
import LbsMonitor from './LbsMonitor.vue'
import TravelOptions from './TravelOptions.vue'
</script>

<style scoped>
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10rpx); }
  to   { opacity: 1; transform: translateY(0); }
}

.lc-section { margin-top: 24rpx; }

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
</style>
