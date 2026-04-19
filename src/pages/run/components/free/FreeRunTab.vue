<template>
  <view>
    <!-- Map Area -->
    <RunMap
      :schoolLat="schoolLat"
      :schoolLng="schoolLng"
      :markers="markers"
      :routePolyline="routePolyline"
    >
      <view class="weather-widget">
        <text class="iconfont icon-weather"></text>
        <text class="weather-text">2026.04.10 · 晴 22°C</text>
      </view>
    </RunMap>

    <!-- Floating Card -->
    <view class="floating-card" :class="{ 'is-expanded': isCardExpanded, 'is-running': isRunning }">
      <view v-if="isCardExpanded" class="card-top-bar" @tap="emit('collapseCard')">
        <view class="top-bar-line"></view>
        <text class="top-bar-hint">点击收起</text>
        <text class="top-bar-icon iconfont icon-chevron-up"></text>
      </view>
      <view v-if="!isCardExpanded" class="card-collapsed" @tap="emit('toggleCard')">
        <view class="collapsed-inner">
          <view class="collapsed-block">
            <text class="collapsed-label">本次距离</text>
            <text class="collapsed-value">{{ currentDistance || '--' }}<text class="collapsed-unit">KM</text></text>
          </view>
          <view class="collapsed-divider"></view>
          <view class="collapsed-block">
            <text class="collapsed-label">配速</text>
            <text class="collapsed-value">{{ currentPace || "--'--" }}<text class="collapsed-unit">"</text></text>
          </view>
        </view>
        <view class="collapsed-hint">
          <text class="hint-icon iconfont icon-chevron-down"></text>
        </view>
      </view>
      <view v-else class="card-expanded" @tap.stop>
        <view class="card-close" @tap="emit('collapseCard')">
          <text class="close-icon iconfont icon-chevron-up"></text>
        </view>
        <view class="expanded-single-row">
          <view class="row-stat">
            <text class="row-label">时长</text>
            <text class="row-value row-large">{{ displayDuration || '00:00:00' }}</text>
          </view>
          <view class="row-divider"></view>
          <view class="row-stat">
            <text class="row-label">配速</text>
            <text class="row-value row-large">{{ currentPace || "--'--\"" }}</text>
          </view>
          <view class="row-divider"></view>
          <view class="row-stat">
            <text class="row-label">本次距离(KM)</text>
            <text class="row-value row-large">{{ currentDistance || '0.00' }}</text>
          </view>
        </view>
        <view class="action-area">
          <view class="action-btn side-btn" v-if="isRunning" @tap="emit('endRun')"><text class="iconfont icon-stop"></text></view>
          <view class="action-btn main-btn" :class="{ running: isRunning }" @tap="emit('toggleRun')">
            <text class="iconfont" :class="isRunning ? 'icon-pause' : 'icon-play'"></text>
          </view>
          <view class="action-btn side-btn" v-if="isRunning" @tap="emit('toggleRun')"><text class="iconfont icon-pause"></text></view>
        </view>
      </view>
    </view>

    <!-- Quick Actions -->
    <view class="quick-actions">
      <view class="quick-action-item" @tap="emit('bindDevice')">
        <view class="qa-icon blue">
          <text class="iconfont icon-watch"></text>
        </view>
        <view class="qa-text">
          <text class="qa-title">绑定设备</text>
          <text class="qa-sub">同步Apple Watch</text>
        </view>
      </view>
      <view class="quick-action-item" @tap="emit('manualRecord')">
        <view class="qa-icon orange">
          <text class="iconfont icon-pencil"></text>
        </view>
        <view class="qa-text">
          <text class="qa-title">手动记录</text>
          <text class="qa-sub">上传跑步数据</text>
        </view>
      </view>
    </view>

    <!-- Campus Task -->
    <view class="campus-task-section">
      <view class="campus-task-card">
        <view class="campus-task-header">
          <text class="campus-task-title">体育课校园跑任务</text>
          <view class="campus-task-badge">
            <text class="campus-task-badge-text">进行中</text>
          </view>
        </view>
        <view class="campus-progress-item">
          <view class="campus-progress-label-row">
            <text class="campus-progress-label">总计跑量目标</text>
            <text class="campus-progress-count">84.5 / 130 KM</text>
          </view>
          <view class="campus-progress-bar">
            <view class="campus-progress-fill green" style="width: 65%"></view>
          </view>
        </view>
        <view class="campus-progress-item">
          <view class="campus-progress-label-row">
            <text class="campus-progress-label">晨跑次数要求</text>
            <text class="campus-progress-count">18 / 26 次</text>
          </view>
          <view class="campus-progress-bar">
            <view class="campus-progress-fill orange" style="width: 69%"></view>
          </view>
        </view>
        <view class="campus-carbon-tip">
          <text class="iconfont icon-leaf campus-tip-icon"></text>
          <text class="campus-tip-text">已累计减排 15.2kg 碳，相当于种植了 0.8 棵树</text>
        </view>
      </view>
    </view>

    <!-- My Plan -->
    <view class="campus-plan-section">
      <view class="campus-plan-card">
        <view class="campus-plan-header">
          <view class="campus-plan-tabs">
            <view class="campus-plan-tab active">待完成</view>
            <view class="campus-plan-tab">已完成</view>
          </view>
          <view class="campus-plan-add">
            <text class="iconfont icon-plus campus-add-icon"></text>
            <text class="campus-add-text">制定新计划</text>
          </view>
        </view>
        <view class="campus-plan-list">
          <view class="campus-plan-item">
            <view class="campus-plan-icon fire">
              <text class="iconfont icon-fire"></text>
            </view>
            <view class="campus-plan-info">
              <text class="campus-plan-name">燃脂 5KM 慢跑</text>
              <text class="campus-plan-desc">建议配速: 06'00'' - 07'00''</text>
            </view>
            <text class="iconfont icon-chevron-right campus-plan-arrow"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- Data Chart -->
    <view class="campus-data-section">
      <view class="campus-data-card">
        <view class="campus-data-header">
          <text class="campus-data-title">跑步数据明细</text>
          <text class="campus-data-sub">本周跑量趋势</text>
        </view>
        <view class="campus-chart-area">
          <view class="chart-bar-container">
            <view class="chart-bar-row">
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 40rpx;"></view>
                <text class="chart-label">周一</text>
              </view>
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 65rpx;"></view>
                <text class="chart-label">周二</text>
              </view>
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 25rpx;"></view>
                <text class="chart-label">周三</text>
              </view>
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 55rpx;"></view>
                <text class="chart-label">周四</text>
              </view>
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 75rpx;"></view>
                <text class="chart-label">周五</text>
              </view>
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 100rpx;"></view>
                <text class="chart-label">周六</text>
              </view>
              <view class="chart-bar-wrap">
                <view class="chart-bar" style="height: 50rpx;"></view>
                <text class="chart-label">周日</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Calendar + Achievements -->
    <view class="content-wrapper">
      <view class="morning-column">
        <view class="section-card calendar-card">
          <view class="card-header">
            <text class="card-title">运动轨迹日历</text>
            <view class="calendar-controls">
              <text class="iconfont icon-chevron-left" @tap="emit('prevMonth')"></text>
              <view class="picker-trigger-btn" @tap="emit('openDatePicker', 'main')">
                <text class="calendar-month">{{ calYear }}年{{ calMonth }}月</text>
              </view>
              <text class="iconfont icon-chevron-right" @tap="emit('nextMonth')"></text>
            </view>
          </view>
          <view class="calendar-weekdays">
            <text class="weekday">一</text><text class="weekday">二</text><text class="weekday">三</text>
            <text class="weekday">四</text><text class="weekday">五</text><text class="weekday">六</text><text class="weekday">日</text>
          </view>
          <view class="calendar-grid">
            <view v-for="n in prevMonthPadding" :key="'prev-' + n" class="day-cell empty">
              <text class="day-num">{{ getPrevMonthDay(n) }}</text>
            </view>
            <view
              v-for="day in daysInMonth"
              :key="'cur-' + day"
              class="day-cell"
              :class="getDayState(day).cls"
              :style="getDayCellStyle(day)"
              @tap="emit('dayTap', day)"
            >
              <text class="day-num" :class="{ 'day-num-bold': isPastDay(day) }">{{ day }}</text>
              <view v-if="getDayBadges(day).includes('morning')" class="morning-day-rect"></view>
              <view v-if="getDayBadges(day).includes('marathon')" class="day-dot marathon-badge"></view>
            </view>
          </view>
          <view class="calendar-legend">
            <view class="legend-item">
              <view class="legend-dot green"></view>
              <text class="legend-text">自由跑</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot morning-legend"></view>
              <text class="legend-text">晨跑</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot orange"></view>
              <text class="legend-text">马拉松</text>
            </view>
          </view>
        </view>

        <view class="section-card achievement-card">
          <view class="card-header">
            <text class="card-title">我的成就</text>
            <text class="view-all" @tap="emit('viewAchievements')">查看全部</text>
          </view>
          <view class="achievements-grid">
            <view v-for="a in achievements" :key="a.name" class="achievement-item" :class="{ 'achievement-locked': a.locked }">
              <view class="achievement-icon" :class="a.iconClass">
                <text class="iconfont" :class="a.icon"></text>
              </view>
              <text class="achievement-name">{{ a.name }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import RunMap from '../RunMap.vue'

const props = defineProps({
  isCardExpanded: Boolean,
  isRunning: Boolean,
  currentDistance: String,
  currentPace: String,
  displayDuration: String,
  calYear: Number,
  calMonth: Number,
  daysInMonth: Number,
  prevMonthPadding: Number,
  routePolyline: Array,
  markers: Array,
  schoolLat: Number,
  schoolLng: Number,
})

const emit = defineEmits([
  'toggleCard', 'collapseCard', 'toggleRun', 'endRun',
  'bindDevice', 'manualRecord', 'viewAchievements',
  'prevMonth', 'nextMonth', 'openDatePicker', 'dayTap'
])

const achievements = ref([
  { name: '早起鸟', icon: 'icon-medal', iconClass: 'ach-orange', locked: false },
  { name: '低碳达人', icon: 'icon-tree', iconClass: 'ach-green', locked: false },
  { name: '极速跑者', icon: 'icon-lightning', iconClass: 'ach-blue', locked: false },
  { name: '100KM 达成', icon: 'icon-target', iconClass: 'ach-gray', locked: true },
  { name: '马拉松之星', icon: 'icon-star', iconClass: 'ach-gray', locked: true },
])

const TODAY_YEAR = new Date().getFullYear()
const TODAY_MONTH = new Date().getMonth() + 1
const TODAY_DAY = new Date().getDate()

const DAY_STYLES = {
  empty: { cls: 'empty', bg: '' },
  future: { cls: 'future', bg: '' },
  today: { cls: 'today', bg: '' },
  checked: { cls: 'checked', bg: '' }
}

function getDayState(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)
  if (future) return DAY_STYLES.future
  if (!status) return DAY_STYLES.empty
  return DAY_STYLES.checked
}

function getDayBadges(day) {
  const status = getDayStatus(day)
  if (!status) return []
  return Array.isArray(status) ? status : [status]
}

function getDayStatus(day) {
  const key = `${props.calYear}-${props.calMonth}`
  const val = props.runRecords?.[key]?.[day]
  if (!val) return null
  if (Array.isArray(val)) return val
  return val
}

function isFutureDay(day) {
  if (props.calYear > TODAY_YEAR) return true
  if (props.calYear === TODAY_YEAR && props.calMonth > TODAY_MONTH) return true
  if (props.calYear === TODAY_YEAR && props.calMonth === TODAY_MONTH && day > TODAY_DAY) return true
  return false
}

function isPastDay(day) {
  if (props.calYear > TODAY_YEAR) return false
  if (props.calYear < TODAY_YEAR) return true
  if (props.calMonth < TODAY_MONTH) return true
  if (props.calMonth > TODAY_MONTH) return false
  return day < TODAY_DAY
}

function getPrevMonthDay(n) {
  const prevM = props.calMonth === 1 ? 12 : props.calMonth - 1
  const prevY = props.calMonth === 1 ? props.calYear - 1 : props.calYear
  const prevDays = new Date(prevY, prevM, 0).getDate()
  return prevDays - props.prevMonthPadding + n
}

function getDayCellStyle(day) {
  const badges = getDayBadges(day)
  const future = isFutureDay(day)
  if (future) return ''
  if (badges.length > 0) return 'border: 4rpx solid #065f46; color: #065f46; box-shadow: 0 0 16rpx rgba(5, 150, 105, 0.7), 0 0 32rpx rgba(5, 150, 105, 0.4);'
  return ''
}
</script>

<style scoped>
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

/* Floating Card */
.floating-card {
  position: relative;
  z-index: 10;
  margin: -40rpx 30rpx 0;
  border-radius: 40rpx;
  overflow: hidden;
  background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
  box-shadow: 0 12rpx 40rpx rgba(5, 150, 105, 0.35), 0 4rpx 16rpx rgba(5, 150, 105, 0.20);
  touch-action: manipulation;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.floating-card.is-expanded {
  box-shadow: 0 20rpx 60rpx rgba(5, 150, 105, 0.45), 0 8rpx 24rpx rgba(5, 150, 105, 0.25);
}

.floating-card.is-running {
  background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%);
  box-shadow: 0 20rpx 60rpx rgba(5, 150, 105, 0.55), 0 8rpx 24rpx rgba(5, 150, 105, 0.30);
}

.card-top-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 0 8rpx;
  gap: 6rpx;
}

.top-bar-line {
  width: 72rpx;
  height: 8rpx;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 8rpx;
}

.top-bar-hint {
  font-size: 18rpx;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
  letter-spacing: 2rpx;
}

.top-bar-icon {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.70);
}

.card-collapsed {
  padding: 28rpx 40rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.collapsed-inner {
  display: flex;
  align-items: center;
  flex: 1;
}

.collapsed-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
}

.collapsed-divider {
  width: 2rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
}

.collapsed-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 8rpx;
  font-weight: 500;
}

.collapsed-value {
  font-size: 42rpx;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -1rpx;
  line-height: 1;
}

.collapsed-unit {
  font-size: 22rpx;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.80);
  margin-left: 2rpx;
}

.collapsed-hint {
  width: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hint-icon {
  font-size: 36rpx;
  color: rgba(255, 255, 255, 0.60);
  animation: breatheDown 2s ease-in-out infinite;
}

@keyframes breatheDown {
  0%, 100% { opacity: 0.40; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(6rpx); }
}

.card-expanded {
  padding: 12rpx 40rpx 48rpx;
  position: relative;
}

.card-close {
  display: flex;
  justify-content: center;
  margin-bottom: 20rpx;
}

.close-icon {
  font-size: 36rpx;
  color: rgba(255, 255, 255, 0.65);
  transition: transform 0.3s ease;
}

.expanded-single-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 16rpx 0;
}

.row-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 8rpx;
  font-weight: 500;
}

.row-value {
  font-size: 44rpx;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -1rpx;
  line-height: 1;
}

.row-large {
  font-size: 52rpx;
}

.row-divider {
  width: 2rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.25);
  flex-shrink: 0;
  margin: 0 8rpx;
}

.action-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40rpx;
  margin-top: 8rpx;
}

.action-btn {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.action-btn:active { transform: scale(0.90); }

.main-btn {
  width: 188rpx;
  height: 188rpx;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 0 0 8rpx rgba(255,255,255,0.20), 0 16rpx 48rpx rgba(0, 0, 0, 0.22), 0 0 60rpx rgba(255, 255, 255, 0.30);
  animation: pulseBtn 2.5s ease-in-out infinite;
}

.main-btn.running {
  background: rgba(255, 255, 255, 0.95);
}

@keyframes pulseBtn {
  0%, 100% { box-shadow: 0 0 0 8rpx rgba(255,255,255,0.20), 0 16rpx 48rpx rgba(0, 0, 0, 0.20), 0 0 40rpx rgba(255, 255, 255, 0.25); }
  50% { box-shadow: 0 0 0 12rpx rgba(255,255,255,0.30), 0 20rpx 60rpx rgba(0, 0, 0, 0.25), 0 0 80rpx rgba(255, 255, 255, 0.45); }
}

.main-btn .iconfont {
  font-size: 72rpx;
  color: #059669;
  text-shadow: 0 2rpx 8rpx rgba(5, 150, 105, 0.20);
}

.side-btn {
  width: 100rpx;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(8rpx);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.12);
}

.side-btn .iconfont {
  font-size: 44rpx;
  color: #ffffff;
  text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.15);
}

/* Quick Actions */
.quick-actions {
  display: flex;
  gap: 24rpx;
  margin: 20rpx 30rpx 0;
  position: relative;
  z-index: 5;
}

.quick-action-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 24rpx;
  background: rgba(255, 255, 255, 0.80);
  backdrop-filter: blur(10px);
  padding: 24rpx;
  border-radius: 24rpx;
  border: 1px solid rgba(255, 255, 255, 0.30);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.qa-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.qa-icon.blue { background: #dbeafe; }
.qa-icon.blue .iconfont { color: #3b82f6; font-size: 40rpx; }
.qa-icon.orange { background: #ffedd5; }
.qa-icon.orange .iconfont { color: #f97316; font-size: 40rpx; }

.qa-title { font-size: 24rpx; font-weight: bold; color: #374151; display: block; }
.qa-sub { font-size: 20rpx; color: #9ca3af; }

/* Campus Task */
.campus-task-section {
  margin: 20rpx 30rpx 0;
  position: relative;
  z-index: 5;
}

.campus-task-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f3f4f6;
}

.campus-task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.campus-task-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.campus-task-badge {
  background: #fef3c7;
  border-radius: 8rpx;
  padding: 4rpx 12rpx;
}

.campus-task-badge-text {
  font-size: 18rpx;
  color: #d97706;
  font-weight: 600;
}

.campus-progress-item {
  margin-bottom: 16rpx;
}

.campus-progress-label-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.campus-progress-label {
  font-size: 22rpx;
  color: #6b7280;
}

.campus-progress-count {
  font-size: 22rpx;
  font-weight: 600;
  color: #374151;
}

.campus-progress-bar {
  height: 16rpx;
  background: #f3f4f6;
  border-radius: 8rpx;
  overflow: hidden;
}

.campus-progress-fill {
  height: 100%;
  border-radius: 8rpx;
  transition: width 0.3s ease;
}

.campus-progress-fill.green { background: linear-gradient(90deg, #10b981, #34d399); }
.campus-progress-fill.orange { background: linear-gradient(90deg, #f97316, #fb923c); }

.campus-carbon-tip {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 16rpx;
  padding: 12rpx 16rpx;
  background: #f0fdf4;
  border-radius: 12rpx;
}

.campus-tip-icon {
  font-size: 28rpx;
  color: #10b981;
}

.campus-tip-text {
  font-size: 20rpx;
  color: #059669;
}

/* Campus Plan */
.campus-plan-section {
  margin: 20rpx 30rpx 0;
}

.campus-plan-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f3f4f6;
}

.campus-plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.campus-plan-tabs {
  display: flex;
  gap: 24rpx;
}

.campus-plan-tab {
  font-size: 26rpx;
  color: #9ca3af;
  padding-bottom: 4rpx;
}

.campus-plan-tab.active {
  color: #10b981;
  font-weight: bold;
  border-bottom: 4rpx solid #10b981;
}

.campus-plan-add {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.campus-add-icon {
  font-size: 24rpx;
  color: #10b981;
}

.campus-add-text {
  font-size: 22rpx;
  color: #10b981;
}

.campus-plan-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 16rpx;
  background: #f9fafb;
  border-radius: 16rpx;
}

.campus-plan-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.campus-plan-icon.fire {
  background: #fff7ed;
}

.campus-plan-icon.fire .iconfont {
  font-size: 36rpx;
  color: #f97316;
}

.campus-plan-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.campus-plan-name {
  font-size: 26rpx;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4rpx;
}

.campus-plan-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

.campus-plan-arrow {
  font-size: 28rpx;
  color: #d1d5db;
}

/* Data Chart */
.campus-data-section {
  padding: 20rpx 30rpx 0;
}

.campus-data-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f3f4f6;
}

.campus-data-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.campus-data-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.campus-data-sub {
  font-size: 18rpx;
  color: #9ca3af;
}

.campus-chart-area {
  height: 160rpx;
  position: relative;
}

.chart-bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.chart-bar-row {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 120rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.chart-bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  flex: 1;
}

.chart-bar {
  width: 32rpx;
  background: linear-gradient(180deg, #22c55e 0%, #86efac 100%);
  border-radius: 6rpx 6rpx 0 0;
  min-height: 20rpx;
}

.chart-val {
  font-size: 18rpx;
  font-weight: bold;
  color: #059669;
  position: absolute;
  top: -28rpx;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.chart-label {
  font-size: 18rpx;
  color: #9ca3af;
}

/* Calendar */
.content-wrapper {
  padding: 20rpx 0 40rpx;
}

.morning-column {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 0 30rpx;
}

.section-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  flex-wrap: wrap;
  gap: 12rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.view-all {
  font-size: 20rpx;
  color: #3b82f6;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.calendar-controls .iconfont {
  font-size: 24rpx;
  color: #9ca3af;
}

.calendar-month {
  font-size: 24rpx;
  font-weight: bold;
  color: #374151;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 12rpx;
}

.weekday {
  text-align: center;
  font-size: 20rpx;
  color: #d1d5db;
  font-weight: 600;
  padding: 8rpx 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12rpx;
}

.day-cell {
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  position: relative;
  font-weight: 700;
  transition: transform 0.15s ease;
  overflow: hidden;
}

.day-cell:active { transform: scale(0.90); }

.day-num {
  font-size: 24rpx;
  color: inherit;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.day-num-bold { font-weight: bold; }

.day-cell.empty { color: #e5e7eb; }
.day-cell.future { color: #e5e7eb; }

.day-cell.checked {
  background-color: transparent;
  color: #065f46;
  border: 4rpx solid #065f46;
  box-shadow: 0 0 16rpx rgba(5, 150, 105, 0.7), 0 0 32rpx rgba(5, 150, 105, 0.4);
}

.day-dot {
  position: absolute;
  top: 4rpx;
  width: 14rpx;
  height: 14rpx;
  background-color: #f97316;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

.day-dot.marathon-badge {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
  width: 16rpx;
  height: 16rpx;
  background-color: #f97316;
  border-radius: 50%;
  border: 2rpx solid #fff;
  box-shadow: 0 2rpx 6rpx rgba(249, 115, 22, 0.40);
  z-index: 2;
}

.morning-day-rect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #d1fae5;
  border-radius: 16rpx;
  z-index: 0;
}

.calendar-legend {
  display: flex;
  gap: 24rpx;
  margin-top: 24rpx;
  padding-top: 16rpx;
  border-top: 2rpx solid #f3f4f6;
  flex-wrap: wrap;
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
  flex-shrink: 0;
}

.legend-dot.green {
  background-color: transparent;
  border: 3rpx solid #065f46;
  border-radius: 6rpx;
  box-shadow: 0 0 12rpx rgba(5, 150, 105, 0.7), 0 0 24rpx rgba(5, 150, 105, 0.4);
}

.legend-dot.morning-legend {
  background: #D0F9E4;
  border: 2rpx solid #D0F9E4;
  border-radius: 4rpx;
}

.legend-dot.orange {
  background-color: #f97316;
  border-radius: 50%;
  width: 16rpx;
  height: 16rpx;
}

.legend-text {
  font-size: 22rpx;
  color: #9ca3af;
}

.picker-trigger-btn {
  cursor: pointer;
  user-select: none;
  padding: 6rpx 4rpx;
  border-radius: 8rpx;
  transition: background-color 0.2s;
}

.picker-trigger-btn:active {
  background-color: rgba(16, 185, 129, 0.08);
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.achievement-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-icon .iconfont {
  font-size: 32rpx;
  color: #f59e0b;
}

.ach-orange { background: #ffedd5; }
.ach-orange .iconfont { color: #f97316; }
.ach-green { background: #dcfce7; }
.ach-green .iconfont { color: #22c55e; }
.ach-blue { background: #dbeafe; }
.ach-blue .iconfont { color: #3b82f6; }
.ach-gray { background: #f3f4f6; opacity: 0.5; }
.ach-gray .iconfont { color: #9ca3af; }

.achievement-name {
  font-size: 18rpx;
  color: #374151;
  text-align: center;
}

.achievement-locked .achievement-icon {
  background: #f3f4f6;
}

.achievement-locked .achievement-icon .iconfont {
  color: #d1d5db;
}

.achievement-locked .achievement-name {
  color: #9ca3af;
}
</style>
