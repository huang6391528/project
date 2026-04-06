<template>
  <view class="page-run">
    <!-- Top Tabs -->
    <view class="tab-bar">
      <view class="tab-item tab-active">自由跑</view>
      <view class="tab-item">晨跑计划</view>
      <view class="tab-item">马拉松训练</view>
    </view>

    <!-- Map Area -->
    <view class="map-container">
      <image class="map-bg" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/ab1eb3c70b8e4ffaa37d7fb530a38010.jpg" mode="aspectFill"></image>
      <!-- SVG Route Animation -->
      <svg class="route-svg" viewBox="0 0 375 320">
        <path class="route-line" d="M50,150 Q100,50 180,160 T320,150" fill="none" stroke="#10b981" stroke-linecap="round" stroke-width="4"></path>
        <circle class="route-dot" cx="320" cy="150" fill="#10b981" r="6"></circle>
      </svg>
      <!-- Weather Widget -->
      <view class="weather-widget">
        <text class="iconfont icon-weather"></text>
        <text class="weather-text">22°C · 空气优</text>
      </view>
    </view>

    <!-- Stats Board (collapsed by default, tap to expand) -->
    <view class="stats-board" :class="{ expanded: isCardExpanded }" @tap="toggleCard">
      <view v-if="!isCardExpanded" class="stats-preview">
        <view class="preview-item">
          <text class="preview-label">本次距离</text>
          <text class="preview-value">-- KM</text>
        </view>
        <view class="preview-item">
          <text class="preview-label">配速</text>
          <text class="preview-value">-- '</text>
        </view>
        <view class="preview-item">
          <text class="preview-label">时长</text>
          <text class="preview-value">--:--:--</text>
        </view>
        <view class="preview-arrow">
          <text class="iconfont icon-chevron-right"></text>
        </view>
      </view>
      <view v-else class="stats-full">
        <view class="stats-grid">
          <view class="stat-cell">
            <text class="stat-label">本次距离 (KM)</text>
            <text class="stat-value stat-large">4.25</text>
          </view>
          <view class="stat-cell">
            <text class="stat-label">当前配速</text>
            <text class="stat-value stat-large">5'12"</text>
          </view>
          <view class="stat-cell">
            <text class="stat-label">时长</text>
            <text class="stat-value">00:24:18</text>
          </view>
          <view class="stat-cell">
            <text class="stat-label">预计减排 (g)</text>
            <text class="stat-value stat-green">628</text>
          </view>
        </view>
        <view class="controls">
          <view class="play-btn" @tap.stop="toggleRun">
            <text class="iconfont" :class="isRunning ? 'icon-pause' : 'icon-play'"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- Total Run Bar -->
    <view class="total-run-bar" @tap="goToTotalRun">
      <view class="total-run-left">
        <text class="iconfont icon-run"></text>
        <text class="total-run-text">总运动</text>
      </view>
      <view class="total-run-right">
        <text class="total-run-km">152.4 KM</text>
        <text class="iconfont icon-chevron-right"></text>
      </view>
    </view>

    <!-- Run Calendar -->
    <view class="calendar-section">
      <view class="calendar-card">
        <view class="calendar-header">
          <text class="calendar-title">4月 运动轨迹</text>
          <text class="calendar-sub">已跑 8 天</text>
        </view>
        <view class="calendar-grid">
          <text class="weekday">一</text>
          <text class="weekday">二</text>
          <text class="weekday">三</text>
          <text class="weekday">四</text>
          <text class="weekday">五</text>
          <text class="weekday">六</text>
          <text class="weekday">日</text>
          <!-- 上月占位 -->
          <view class="day empty">30</view>
          <view class="day empty">31</view>
          <!-- 当月日期 -->
          <view class="day completed">
            1
            <view class="day-dot"></view>
          </view>
          <view class="day completed">2</view>
          <view class="day active">3</view>
          <view class="day empty">4</view>
          <view class="day today">5</view>
          <view class="day empty">6</view>
          <view class="day empty">7</view>
          <view class="day active">8</view>
          <view class="day empty">9</view>
          <view class="day completed">10</view>
          <view class="day empty">11</view>
          <view class="day empty">13</view>
          <view class="day empty">14</view>
          <view class="day active">15</view>
          <view class="day empty">16</view>
          <view class="day empty">17</view>
          <view class="day empty">18</view>
          <view class="day empty">19</view>
          <view class="day empty">20</view>
          <view class="day empty">21</view>
          <view class="day empty">22</view>
          <view class="day empty">23</view>
          <view class="day empty">24</view>
          <view class="day empty">25</view>
          <view class="day empty">26</view>
          <view class="day empty">27</view>
          <view class="day empty">28</view>
          <view class="day empty">29</view>
          <view class="day empty">30</view>
        </view>
        <view class="calendar-legend">
          <view class="legend-item">
            <view class="legend-dot green"></view>
            <text class="legend-text">晨跑</text>
          </view>
          <view class="legend-item">
            <view class="legend-dot dark-green"></view>
            <text class="legend-text">自由跑/马拉松</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
let isRunning = ref(false)
let isCardExpanded = ref(false)

function toggleRun() {
  isRunning.value = !isRunning.value
}

function toggleCard() {
  isCardExpanded.value = !isCardExpanded.value
}

function goToTotalRun() {
  uni.showToast({ title: '总运动详情页开发中', icon: 'none' })
}
</script>

<style scoped>
.page-run {
  background-color: #f8fafc;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* Tab Bar */
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 32rpx 0;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab-item {
  padding-bottom: 8rpx;
  font-size: 28rpx;
  color: #9ca3af;
  font-weight: 500;
}

.tab-active {
  color: #10b981;
  font-weight: bold;
  border-bottom: 4rpx solid #10b981;
}

/* Map Container */
.map-container {
  position: relative;
  width: 100%;
  height: 512rpx;
  background-color: #f1f5f9;
  overflow: hidden;
}

.map-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.route-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.route-line {
  stroke-dasharray: 1000;
  animation: dash 5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.route-dot {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.weather-widget {
  position: absolute;
  top: 32rpx;
  left: 32rpx;
  background-color: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  padding: 12rpx 24rpx;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
}

.weather-text {
  font-size: 20rpx;
  color: #374151;
  font-weight: 500;
}

.total-distance {
  position: absolute;
  bottom: 32rpx;
  right: 32rpx;
  background-color: #10b981;
  color: #fff;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  font-weight: bold;
  box-shadow: 0 8rpx 16rpx rgba(16, 185, 129, 0.3);
}

/* Stats Board */
.stats-board {
  padding: 64rpx 48rpx;
  background-color: #fff;
  margin: -40rpx 0 0 0;
  border-radius: 40rpx 40rpx 0 0;
  position: relative;
  z-index: 5;
}

.stats-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.preview-label {
  font-size: 24rpx;
  color: #9ca3af;
  margin-bottom: 8rpx;
}

.preview-value {
  font-size: 36rpx;
  font-weight: 800;
  color: #374151;
}

.preview-arrow {
  font-size: 40rpx;
  color: #d1d5db;
}

.stats-full {
  /* 展开后的完整内容 */
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.stat-cell {
  width: 50%;
  margin-bottom: 48rpx;
}

.stat-label {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
  margin-bottom: 8rpx;
}

.stat-value {
  font-size: 40rpx;
  font-weight: 800;
  color: #1f2937;
}

.stat-large {
  font-size: 64rpx;
}

.stat-green {
  color: #10b981;
}

/* Controls */
.controls {
  margin-top: 64rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64rpx;
}

.control-btn {
  width: 112rpx;
  height: 112rpx;
  background-color: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  color: #6b7280;
}

.play-btn {
  width: 192rpx;
  height: 192rpx;
  background-color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80rpx;
  color: #fff;
  box-shadow: 0 20rpx 40rpx rgba(16, 185, 129, 0.3);
}

.play-btn:active {
  transform: scale(0.95);
  transition: transform 0.1s;
}

.total-run-bar {
  margin: 0 30rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.total-run-left {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.total-run-left .iconfont {
  font-size: 40rpx;
  color: #10b981;
}

.total-run-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #374151;
}

.total-run-right {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.total-run-km {
  font-size: 32rpx;
  font-weight: 800;
  color: #10b981;
}

.total-run-right .iconfont {
  font-size: 36rpx;
  color: #d1d5db;
}

/* Calendar Section */
.calendar-section {
  padding: 24rpx 30rpx 40rpx;
}

.calendar-card {
  background-color: #f9fafb;
  border-radius: 32rpx;
  padding: 32rpx;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.calendar-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.calendar-sub {
  font-size: 20rpx;
  color: #10b981;
  font-weight: 500;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16rpx;
  text-align: center;
}

.weekday {
  font-size: 20rpx;
  color: #d1d5db;
}

.day {
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  border-radius: 16rpx;
  position: relative;
  font-weight: bold;
}

.day.empty {
  color: #d1d5db;
}

.day.active {
  background-color: #d1fae5;
  color: #059669;
}

.day.completed {
  background-color: #10b981;
  color: #fff;
  box-shadow: 0 8rpx 16rpx rgba(16, 185, 129, 0.3);
}

.day.today {
  background-color: #10b981;
  color: #fff;
  box-shadow: 0 8rpx 16rpx rgba(16, 185, 129, 0.3);
  border: 4rpx solid #a7f3d0;
}

.day-dot {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  width: 16rpx;
  height: 16rpx;
  background-color: #f97316;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

.calendar-legend {
  display: flex;
  gap: 32rpx;
  margin-top: 24rpx;
  padding-top: 16rpx;
  border-top: 2rpx solid #f3f4f6;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 4rpx;
}

.legend-dot.green { background-color: #d1fae5; }
.legend-dot.dark-green { background-color: #10b981; }

.legend-text {
  font-size: 22rpx;
  color: #9ca3af;
}
</style>
