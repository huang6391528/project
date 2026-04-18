<template>
  <view>
    <text class="dorm-sub-title">即时打卡</text>
    <DormQuick />
    <DormMonitor />
    <DormPk />
    <text class="dorm-sub-title">宿舍节能小妙招</text>
    <DormTips />
    <DormCalc />
  </view>
</template>

<script setup>
import EnergyChart from './EnergyChart.vue'
import DormQuick from './DormQuick.vue'
import DormMonitor from './DormMonitor.vue'
import DormPk from './DormPk.vue'
import DormTips from './DormTips.vue'
import DormCalc from './DormCalc.vue'
</script>

<style scoped>
.dorm-sub-title {
  display: block;
  padding: 8rpx 24rpx;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  font-weight: 700;
  color: #1f2937;
}
</style>
