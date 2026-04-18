<template>
  <view>
    <!-- Map Area -->
    <view class="map-container map-morning">
      <map
        id="runMap"
        class="map-bg"
        :latitude="schoolLat"
        :longitude="schoolLng"
        :scale="16"
        :markers="markers"
        :polyline="routePolyline"
        :show-location="true"
        :enable-satellite="false"
      ></map>
      <view class="morning-weather-card">
        <view class="morning-weather-left">
          <text class="iconfont icon-sun morning-weather-icon"></text>
        </view>
        <view class="morning-weather-info">
          <text class="morning-weather-label">今日晨跑环境</text>
          <text class="morning-weather-value">晴 18°C · 优 AQI 32</text>
        </view>
      </view>
      <view v-if="isMorningCardExpanded" class="morning-modal-backdrop" @tap="emit('collapseMorningCard')"></view>

      <!-- Run Control Panel -->
      <view class="morning-floating-card" :class="{ 'is-expanded': isMorningCardExpanded, 'is-running': isRunning }">
        <view v-if="!isMorningCardExpanded" class="morning-card-collapsed-simple" @tap="emit('toggleMorningCard')">
          <text class="morning-btn-icon-simple iconfont icon-map-pin"></text>
          <text class="morning-btn-text-simple">{{ isRunning ? '晨跑进行中' : '确认晨跑打卡' }}</text>
          <text class="morning-chevron iconfont icon-chevron-down"></text>
        </view>

        <view v-if="isMorningCardExpanded" class="morning-card-expanded-full" @tap.stop>
          <view class="expanded-stats-row">
            <view class="exp-stat-row-item">
              <text class="exp-label-row">本次距离</text>
              <text class="exp-value-row">{{ currentDistance || '0.00' }} <text class="exp-unit-row">km</text></text>
            </view>
            <view class="exp-divider-row"></view>
            <view class="exp-stat-row-item">
              <text class="exp-label-row">实时配速</text>
              <text class="exp-value-row">{{ currentPace || "05'00\"" }}</text>
            </view>
            <view class="exp-divider-row"></view>
            <view class="exp-stat-row-item">
              <text class="exp-label-row">累计用时</text>
              <text class="exp-value-row">{{ displayDuration || '00:00:00' }}</text>
            </view>
          </view>
          <view class="action-area-morning-simple">
            <view class="action-btn-morning-simple main-btn-morning-simple orange-btn" :class="{ running: isRunning }" @tap.stop="emit('toggleRun')">
              <text class="iconfont" :class="isRunning ? 'icon-pause' : 'icon-play'"></text>
              <text class="btn-text-simple">{{ isRunning ? '暂停' : '开始' }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Morning Goal -->
    <view class="morning-goal-section" :style="{ marginTop: isMorningCardExpanded ? '280rpx' : '0rpx' }">
      <view class="morning-goal-card">
        <view class="morning-goal-header">
          <text class="morning-goal-title">本阶段晨跑目标</text>
          <text class="morning-goal-count">18/26 次</text>
        </view>
        <view class="morning-goal-bar-bg">
          <view class="morning-segments">
            <view class="segment active" v-for="i in 18" :key="'a' + i" style="width: 3.85%"></view>
            <view class="segment" v-for="i in 8" :key="'i' + i" style="width: 3.85%"></view>
          </view>
        </view>
        <view class="morning-goal-stats">
          <view class="morning-goal-stat">
            <text class="morning-goal-stat-label">累计晨跑里程</text>
            <text class="morning-goal-stat-value">39.41 KM</text>
          </view>
          <view class="morning-goal-stat">
            <text class="morning-goal-stat-label">晨跑低碳积分</text>
            <text class="morning-goal-stat-value green">+ 450 pts</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Calendar + History -->
    <view class="content-wrapper">
      <view class="morning-column">
        <view class="section-card calendar-card">
          <view class="card-header">
            <text class="card-title">晨跑打卡</text>
            <view class="calendar-controls">
              <text class="iconfont icon-chevron-left" @tap="emit('prevMonth')"></text>
              <view class="picker-trigger-btn" @tap="emit('openDatePicker', 'morning')">
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
              :class="getDayCellClassMorning(day)"
              :style="getDayCellStyleMorning(day)"
              @tap="emit('dayTapMorning', day)"
            >
              <text class="day-num" :class="{ 'day-num-bold': isMorningPastDay(day) }">{{ day }}</text>
              <view v-if="getDayBadges(day).includes('morning')" class="morning-day-rect"></view>
            </view>
          </view>
          <view class="calendar-legend">
            <view class="legend-item">
              <view class="legend-dot dark-green"></view>
              <text class="legend-text">晨跑已打卡</text>
            </view>
          </view>
        </view>

        <view class="section-card morning-history-card">
          <view class="card-header">
            <text class="card-title">晨跑历史</text>
          </view>
          <view class="morning-history-list">
            <view
              class="history-item"
              v-for="item in morningHistory"
              :key="item.date"
              :class="{ 'history-item-faded': item.faded }"
            >
              <view class="history-map-img">
                <image class="history-map-real-img" :src="item.img" mode="aspectFill"></image>
              </view>
              <view class="history-info">
                <text class="history-date">{{ item.date }}</text>
                <text class="history-detail">{{ item.km }}KM · {{ item.time }} · {{ item.pace }}</text>
              </view>
              <view class="history-status">
                <text class="history-status-text green">打卡成功</text>
                <text class="iconfont icon-leaf history-leaf"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  isMorningCardExpanded: Boolean,
  isRunning: Boolean,
  currentDistance: String,
  currentPace: String,
  displayDuration: String,
  calYear: Number,
  calMonth: Number,
  daysInMonth: Number,
  prevMonthPadding: Number,
  runRecords: Object,
  morningHistory: Array,
})

const emit = defineEmits([
  'toggleMorningCard', 'collapseMorningCard', 'toggleRun',
  'prevMonth', 'nextMonth', 'openDatePicker', 'dayTapMorning'
])

const schoolLat = 26.4451
const schoolLng = 106.6589

const markers = [
  { id: 1, latitude: 26.4398, longitude: 106.6632, title: '体育馆A', iconPath: '/static/marker.png', width: 30, height: 30, callout: { content: '体育馆A', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' } },
  { id: 2, latitude: 26.4518, longitude: 106.6594, title: '体育馆B', iconPath: '/static/marker.png', width: 30, height: 30, callout: { content: '体育馆B', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' } }
]

const routePolyline = [{ points: [], color: '#10b981', width: 6, dottedLine: false, arrowLine: false }]

const TODAY_YEAR = new Date().getFullYear()
const TODAY_MONTH = new Date().getMonth() + 1
const TODAY_DAY = new Date().getDate()

function getDayStatus(day) {
  const key = `${props.calYear}-${props.calMonth}`
  const val = props.runRecords?.[key]?.[day]
  if (!val) return null
  if (Array.isArray(val)) return val
  return val
}

function getDayBadges(day) {
  const status = getDayStatus(day)
  if (!status) return []
  return Array.isArray(status) ? status : [status]
}

function isFutureDay(day) {
  if (props.calYear > TODAY_YEAR) return true
  if (props.calYear === TODAY_YEAR && props.calMonth > TODAY_MONTH) return true
  if (props.calYear === TODAY_YEAR && props.calMonth === TODAY_MONTH && day > TODAY_DAY) return true
  return false
}

function isMorningPastDay(day) {
  if (props.calYear > TODAY_YEAR) return false
  if (props.calYear < TODAY_YEAR) return true
  if (props.calMonth < TODAY_MONTH) return true
  if (props.calMonth > TODAY_MONTH) return false
  return day < TODAY_DAY
}

function getDayCellClassMorning(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)
  if (future) return 'future'
  const types = Array.isArray(status) ? status : (status ? [status] : [])
  if (types.includes('morning')) return 'morning-day-cell'
  return ''
}

function getDayCellStyleMorning(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)
  if (future) return ''
  const types = Array.isArray(status) ? status : (status ? [status] : [])
  const hasMorning = types.includes('morning') || types.includes('free')
  if (hasMorning) {
    return 'background-color: #dcfce7; color: #16a34a; border: 2rpx solid #86efac;'
  }
  return ''
}

function getPrevMonthDay(n) {
  const prevM = props.calMonth === 1 ? 12 : props.calMonth - 1
  const prevY = props.calMonth === 1 ? props.calYear - 1 : props.calYear
  const prevDays = new Date(prevY, prevM, 0).getDate()
  return prevDays - props.prevMonthPadding + n
}
</script>

<style scoped>
/* Map */
.map-container {
  position: relative;
  width: 100%;
  height: 320px;
  background-color: #f1f5f9;
  overflow: visible;
}

.map-bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0;
}

.morning-weather-card {
  position: absolute;
  top: 24rpx;
  left: 24rpx;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20rpx;
  padding: 16rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.60);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  width: auto;
}

.morning-weather-left { flex-shrink: 0; }

.morning-weather-icon {
  font-size: 36rpx;
  color: #f97316;
}

.morning-weather-info {
  display: flex;
  flex-direction: column;
}

.morning-weather-label {
  font-size: 18rpx;
  color: #9ca3af;
  font-weight: bold;
  text-transform: uppercase;
}

.morning-weather-value {
  font-size: 20rpx;
  font-weight: bold;
  color: #374151;
}

/* Modal Backdrop */
.morning-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.35);
  animation: fadeInBackdrop 0.3s ease forwards;
  backdrop-filter: blur(2rpx);
}

@keyframes fadeInBackdrop {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Floating Card */
.morning-floating-card {
  position: relative;
  z-index: 10;
  margin: -40rpx 30rpx 150rpx;
  border-radius: 40rpx;
  overflow: visible;
  background: linear-gradient(135deg, #f97316 0%, #f25f1c 50%, #d97706 100%);
  box-shadow: 0 12rpx 40rpx rgba(249, 115, 22, 0.35), 0 4rpx 16rpx rgba(249, 115, 22, 0.20);
  touch-action: manipulation;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.morning-floating-card.is-expanded {
  box-shadow: 0 20rpx 60rpx rgba(249, 115, 22, 0.45), 0 8rpx 24rpx rgba(249, 115, 22, 0.25);
}

.morning-floating-card.is-running {
  background: linear-gradient(135deg, #f25f1c 0%, #d97706 50%, #b45309 100%);
  box-shadow: 0 20rpx 60rpx rgba(249, 115, 22, 0.55), 0 8rpx 24rpx rgba(249, 115, 22, 0.30);
}

.morning-card-collapsed-simple {
  padding: 32rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  min-height: 100rpx;
  border-radius: 40rpx;
  overflow: hidden;
  animation: collapseMorningCard 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes collapseMorningCard {
  from { opacity: 0; transform: translateY(10rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.morning-btn-icon-simple {
  font-size: 36rpx;
  color: #fff;
}

.morning-btn-text-simple {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
  flex: 1;
  text-align: center;
}

.morning-chevron {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.70);
  animation: breatheDownMorning 2s ease-in-out infinite;
}

@keyframes breatheDownMorning {
  0%, 100% { opacity: 0.40; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(6rpx); }
}

.morning-card-expanded-full {
  padding: 28rpx 40rpx 32rpx;
  position: relative;
  animation: expandMorningCard 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes expandMorningCard {
  from { opacity: 0; transform: translateY(-10rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.expanded-stats-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 28rpx;
}

.exp-stat-row-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  flex: 1;
}

.exp-label-row {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

.exp-value-row {
  font-size: 40rpx;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -1rpx;
  line-height: 1;
}

.exp-unit-row {
  font-size: 20rpx;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.80);
  margin-left: 2rpx;
}

.exp-divider-row {
  width: 2rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.30);
  flex-shrink: 0;
}

.action-area-morning-simple {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.action-btn-morning-simple {
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 16rpx 32rpx;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.action-btn-morning-simple:active { transform: scale(0.95); }

.main-btn-morning-simple {
  width: auto;
  height: auto;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.20), 0 0 40rpx rgba(255, 255, 255, 0.25);
}

.main-btn-morning-simple .iconfont {
  font-size: 36rpx;
  color: #f97316;
}

.btn-text-simple {
  font-size: 24rpx;
  font-weight: bold;
  color: #f97316;
}

/* Goal Section */
.morning-goal-section {
  padding: 20rpx 30rpx 0;
  transition: margin-top 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.morning-goal-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f3f4f6;
  margin-bottom: 20rpx;
}

.morning-goal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.morning-goal-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.morning-goal-count {
  font-size: 28rpx;
  font-weight: 600;
  color: #f97316;
}

.morning-goal-bar-bg {
  background: #f3f4f6;
  border-radius: 16rpx;
  padding: 8rpx;
  margin-bottom: 20rpx;
}

.morning-segments {
  display: flex;
  gap: 4rpx;
  flex-wrap: wrap;
}

.segment {
  height: 24rpx;
  border-radius: 6rpx;
  background: #e5e7eb;
  transition: background 0.3s ease;
}

.segment.active {
  background: linear-gradient(90deg, #f97316, #fb923c);
}

.segment.inactive {
  background: #e5e7eb;
}

.morning-goal-stats {
  display: flex;
  justify-content: space-between;
}

.morning-goal-stat {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.morning-goal-stat-label {
  font-size: 20rpx;
  color: #9ca3af;
}

.morning-goal-stat-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
}

.morning-goal-stat-value.green {
  color: #10b981;
}

/* Calendar + History Layout */
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

.morning-history-card {
  padding: 28rpx !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
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
.day-cell.morning-day-cell {
  background-color: #dcfce7;
  border: 2rpx solid #86efac;
}

.day-cell.morning-day-cell .day-num {
  color: #16a34a;
  font-weight: bold;
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

.legend-dot.dark-green {
  background: #dcfce7;
  border: 2rpx solid #86efac;
  border-radius: 4rpx;
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

/* History */
.morning-history-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx;
  background: #f9fafb;
  border-radius: 16rpx;
  transition: all 0.2s ease;
}

.history-item:active {
  transform: scale(0.98);
  background: #f3f4f6;
}

.history-item-faded { opacity: 0.6; }

.history-map-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  overflow: hidden;
  flex-shrink: 0;
}

.history-map-real-img {
  width: 100%;
  height: 100%;
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.history-date {
  font-size: 24rpx;
  font-weight: 600;
  color: #374151;
}

.history-detail {
  font-size: 20rpx;
  color: #9ca3af;
}

.history-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
}

.history-status-text {
  font-size: 20rpx;
  font-weight: bold;
}

.history-status-text.green {
  color: #22c55e;
}

.history-leaf {
  font-size: 20rpx;
  color: #22c55e;
}
</style>
