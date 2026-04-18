<template>
  <view class="tab-content">
    <DietStreakCard label="连续光盘打卡" value="12 天" badge="连续打卡奖励积分：+50" />
    <view style="padding: 0 30rpx;">
      <DietMap @checkin="onMapCheckin" />
    </view>
    <view style="padding: 0 30rpx;">
      <view class="lc-section">
        <view class="lc-section-header">
          <text class="section-title">饮食场景打卡</text>
        </view>
        <DietList />
      </view>
    </view>
  </view>
</template>

<script setup>
import DietStreakCard from './DietStreakCard.vue'
import DietMap from './DietMap.vue'
import DietList from './DietList.vue'

const onMapCheckin = () => {
  uni.showToast({ title: '签到成功', icon: 'success' })
}
</script>

<style scoped>
.tab-content { animation: fadeIn 0.3s ease; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10rpx); }
  to   { opacity: 1; transform: translateY(0); }
}

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
</style>
