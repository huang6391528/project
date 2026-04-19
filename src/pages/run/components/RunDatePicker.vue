<template>
  <view class="date-picker-overlay" @tap="emit('closeDatePicker')">
    <view class="date-picker-panel" @tap.stop>
      <view class="dp-header">
        <view class="dp-cancel-btn" @tap="emit('closeDatePicker')">取消</view>
        <text class="dp-title">选择年月</text>
        <view class="dp-confirm-btn" @tap="emit('confirmDatePicker')">确定</view>
      </view>
      <scroll-view class="dp-year-scroll" scroll-y :scroll-into-view="'year-' + dpScrollYearId">
        <view class="dp-year-list">
          <view
            v-for="y in dpYearList"
            :key="y"
            class="dp-year-item"
            :class="{ active: y === dpSelectedYear }"
            :id="'year-' + y"
            @tap="emit('updateDpSelectedYear', y)"
          >{{ y }}</view>
        </view>
      </scroll-view>
      <view class="dp-month-grid">
        <view
          v-for="m in 12"
          :key="m"
          class="dp-month-cell"
          :class="{ active: m === dpSelectedMonth && dpSelectedYear === (activePickerTarget === 'marathon' ? marathonCalYear : calYear) }"
          @tap="emit('updateDpSelectedMonth', m)"
        >{{ m }}月</view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  activePickerTarget: String,
  dpSelectedYear: Number,
  dpSelectedMonth: Number,
  dpYearList: Array,
  dpScrollYearId: String,
  calYear: Number,
  calMonth: Number,
  marathonCalYear: Number,
  marathonCalMonth: Number,
})

const emit = defineEmits([
  'closeDatePicker',
  'confirmDatePicker',
  'updateDpSelectedYear',
  'updateDpSelectedMonth',
  'updateDpScrollYearId',
])
</script>

<style scoped>
.date-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeInOverlay 0.2s ease;
}

@keyframes fadeInOverlay {
  from { opacity: 0; }
  to { opacity: 1; }
}

.date-picker-panel {
  width: 100%;
  max-width: 750rpx;
  background: #fff;
  border-radius: 24rpx 24rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  animation: slideUpPanel 0.28s cubic-bezier(0.32, 0.72, 0, 1);
  overflow: hidden;
}

@keyframes slideUpPanel {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.dp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 32rpx 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.dp-cancel-btn {
  font-size: 28rpx;
  color: #9ca3af;
  cursor: pointer;
  padding: 8rpx 0;
}

.dp-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

.dp-confirm-btn {
  font-size: 28rpx;
  font-weight: 600;
  color: #10b981;
  cursor: pointer;
  padding: 8rpx 0;
}

.dp-year-scroll {
  height: 320rpx;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.dp-year-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.dp-year-item {
  height: 64rpx;
  line-height: 64rpx;
  font-size: 26rpx;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s, font-size 0.2s;
  text-align: center;
  padding: 0 48rpx;
}

.dp-year-item.active {
  font-size: 34rpx;
  font-weight: 700;
  color: #10b981;
}

.dp-month-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  padding: 28rpx 32rpx 40rpx;
}

.dp-month-cell {
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #374151;
  background: #f5f5f5;
  border-radius: 16rpx;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.dp-month-cell:active {
  background: #e5e7eb;
}

.dp-month-cell.active {
  background: #10b981;
  color: #fff;
  font-weight: 600;
}
</style>
