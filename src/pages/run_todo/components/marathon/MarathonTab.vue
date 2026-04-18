<template>
  <view>
    <!-- Map Area -->
    <view class="map-container map-marathon">
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
      <view class="marathon-climate-card">
        <view class="climate-left">
          <text class="iconfont icon-wind climate-icon"></text>
          <view class="climate-info">
            <text class="climate-label">实时气候</text>
            <text class="climate-value">22°C · 湿度 45% · 西北风 2级</text>
          </view>
        </view>
        <view class="climate-right">
          <text class="climate-label">训练强度</text>
          <text class="climate-intensity">适宜 LSD</text>
        </view>
      </view>
      <view class="marathon-control-card">
        <view class="marathon-stat">
          <text class="marathon-stat-label">训练里程</text>
          <text class="marathon-stat-value">0.00 <text class="marathon-stat-unit">KM</text></text>
        </view>
        <view class="marathon-stat-divider"></view>
        <view class="marathon-stat">
          <text class="marathon-stat-label">目标配速</text>
          <text class="marathon-stat-value">05'15''</text>
        </view>
        <view class="marathon-start-btn" @tap="emit('toggleRun')">
          <text class="marathon-start-text">{{ isRunning ? '结束训练' : '开始训练' }}</text>
        </view>
      </view>
    </view>

    <!-- Grid Menu -->
    <view class="marathon-grid-section">
      <view class="marathon-grid">
        <view class="marathon-grid-item" v-for="item in marathonMenu" :key="item.name">
          <view class="marathon-grid-icon" :class="item.bgClass">
            <text class="iconfont" :class="item.icon"></text>
          </view>
          <text class="marathon-grid-name">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- Events -->
    <view class="marathon-event-section">
      <view class="marathon-event-header">
        <text class="section-title">最新赛事活动</text>
        <view class="section-more">
          <text>更多</text>
          <text class="iconfont icon-chevron-right section-more-icon"></text>
        </view>
      </view>
      <view class="marathon-event-scroll">
        <view class="marathon-event-card" v-for="item in marathonEvents" :key="item.title">
          <view class="event-card-img">
            <image class="event-card-real-img" :src="item.img" mode="aspectFill"></image>
          </view>
          <view class="event-card-info">
            <text class="event-card-title">{{ item.title }}</text>
            <text class="event-card-sub">{{ item.sub }}</text>
          </view>
          <view class="event-hot-tag" v-if="item.hot">
            <text class="event-hot-text">热门</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Training Plans -->
    <view class="marathon-plan-section">
      <text class="section-title">推荐训练计划</text>
      <view class="marathon-plan-list">
        <view class="marathon-plan-item" v-for="item in marathonPlans" :key="item.name">
          <view class="plan-item-left">
            <view class="plan-item-icon-sm" :class="item.bgClass">
              <text class="iconfont" :class="item.icon"></text>
            </view>
            <view class="plan-item-text">
              <text class="plan-item-title">{{ item.name }}</text>
              <text class="plan-item-desc">周期: {{ item.cycle }} | 难度: {{ item.level }}</text>
            </view>
          </view>
          <text class="iconfont icon-plus-circle plan-plus-icon"></text>
        </view>
      </view>
    </view>

    <!-- Calendar + Profile -->
    <view class="content-wrapper">
      <view class="morning-column">
        <!-- Calendar -->
        <view class="section-card calendar-card">
          <view class="card-header">
            <text class="card-title">训练轨迹</text>
            <view class="calendar-controls">
              <text class="iconfont icon-chevron-left" @tap="emit('prevMonth')"></text>
              <view class="picker-trigger-btn" @tap="emit('openDatePicker', 'marathon')">
                <text class="calendar-month">{{ marathonCalYear }}年{{ marathonCalMonth }}月</text>
              </view>
              <text class="iconfont icon-chevron-right" @tap="emit('nextMonth')"></text>
            </view>
          </view>
          <view class="calendar-weekdays">
            <text class="weekday">一</text><text class="weekday">二</text><text class="weekday">三</text>
            <text class="weekday">四</text><text class="weekday">五</text><text class="weekday">六</text><text class="weekday">日</text>
          </view>
          <view class="calendar-grid">
            <view v-for="n in marathonPrevMonthPadding" :key="'prev-' + n" class="day-cell empty">
              <text class="day-num">{{ getMarathonPrevMonthDay(n) }}</text>
            </view>
            <view
              v-for="day in marathonDaysInMonth"
              :key="'cur-' + day"
              class="day-cell"
              :class="getMarathonDayState(day).cls"
              :style="getMarathonDayCellStyle(day)"
              @tap="emit('dayTapMarathon', day)"
            >
              <text class="day-num" :class="{ 'day-num-bold': isMarathonPastDay(day) }">{{ day }}</text>
              <view v-if="getMarathonDayBadges(day).includes('marathon')" class="marathon-ring-badge"></view>
            </view>
          </view>
          <view class="calendar-legend">
            <view class="legend-item">
              <view class="marathon-legend-dot purple-ring"></view>
              <text class="legend-text">马拉松训练</text>
            </view>
          </view>
        </view>

        <!-- Profile Card -->
        <view class="marathon-profile-card marathon-profile-card-col">
          <view class="pro-header-premium">
            <view class="pro-header-top">
              <text class="iconfont icon-lightning pro-title-icon"></text>
              <text class="pro-title-premium">马拉松档案</text>
            </view>
            <view class="pro-badge-group">
              <view class="pro-level-badge">
                <text class="pro-badge-icon iconfont icon-star"></text>
                <text class="pro-badge-text">精英跑者</text>
              </view>
            </view>
          </view>

          <view class="pro-pb-section">
            <view class="pro-pb-background">
              <view class="pro-pb-glow"></view>
              <view class="pro-pb-content">
                <text class="pro-pb-label">个人最佳 PB</text>
                <text class="pro-pb-value-huge">03:45:12</text>
                <view class="pro-pb-meta">
                  <text class="pro-pb-distance">42.195 KM</text>
                  <text class="pro-pb-separator">·</text>
                  <text class="pro-pb-event">2025 贵阳马拉松</text>
                </view>
              </view>
            </view>
          </view>

          <view class="pro-stats-dashboard">
            <view class="pro-stat-card pro-stat-races">
              <view class="pro-stat-icon-bg races-gradient">
                <text class="iconfont icon-flag pro-stat-icon"></text>
              </view>
              <text class="pro-stat-value">05</text>
              <text class="pro-stat-label">总参赛次数</text>
            </view>
            <view class="pro-stat-card pro-stat-distance">
              <view class="pro-stat-icon-bg distance-gradient">
                <text class="iconfont icon-location pro-stat-icon"></text>
              </view>
              <text class="pro-stat-value">210.97</text>
              <text class="pro-stat-label">完赛里程 <text class="pro-stat-unit">KM</text></text>
            </view>
            <view class="pro-stat-card pro-stat-pace">
              <view class="pro-stat-icon-bg pace-gradient">
                <text class="iconfont icon-zap pro-stat-icon"></text>
              </view>
              <text class="pro-stat-value pace-value">05'22''</text>
              <text class="pro-stat-label">平均配速</text>
            </view>
            <view class="pro-stat-card pro-stat-carbon">
              <view class="pro-stat-icon-bg carbon-gradient">
                <text class="iconfont icon-leaf pro-stat-icon"></text>
              </view>
              <text class="pro-stat-value carbon-value">1,240</text>
              <text class="pro-stat-label">低碳积分</text>
            </view>
          </view>

          <view class="pro-achievement-section">
            <view class="pro-level-header">
              <text class="pro-level-current">精英跑者</text>
              <text class="pro-level-arrow">→</text>
              <text class="pro-level-next">传奇跑者</text>
            </view>
            <view class="pro-progress-track">
              <view class="pro-progress-fill" style="width: 68%;"></view>
              <view class="pro-progress-indicator" style="left: 68%;"></view>
            </view>
            <text class="pro-level-hint">再完赛 2 次即可晋升传奇跑者</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  isRunning: Boolean,
  marathonCalYear: Number,
  marathonCalMonth: Number,
  marathonDaysInMonth: Number,
  marathonPrevMonthPadding: Number,
  runRecords: Object,
  marathonMenu: Array,
  marathonEvents: Array,
  marathonPlans: Array,
})

const emit = defineEmits([
  'toggleRun',
  'prevMonth', 'nextMonth', 'openDatePicker', 'dayTapMarathon'
])

const schoolLat = 26.4451
const schoolLng = 106.6589

const markers = [
  { id: 1, latitude: 26.4398, longitude: 106.6632, title: '体育馆A', iconPath: '/static/marker.png', width: 30, height: 30, callout: { content: '体育馆A', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' } },
  { id: 2, latitude: 26.4518, longitude: 106.6594, title: '体育馆B', iconPath: '/static/marker.png', width: 30, height: 30, callout: { content: '体育馆B', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' } }
]

const routePolyline = [{ points: [], color: '#f97316', width: 6, dottedLine: false, arrowLine: false }]

const TODAY_YEAR = new Date().getFullYear()
const TODAY_MONTH = new Date().getMonth() + 1
const TODAY_DAY = new Date().getDate()

const MARATHON_DAY_STYLES = {
  empty: { cls: 'empty', bg: '', hasDot: false },
  future: { cls: 'future', bg: '', hasDot: false },
  marathon: { cls: 'marathon', bg: '', hasDot: true }
}

function getMarathonDayState(day) {
  const status = getMarathonDayStatus(day)
  const future = isMarathonFutureDay(day)
  if (future) return MARATHON_DAY_STYLES.future
  if (!status) return MARATHON_DAY_STYLES.empty
  const types = Array.isArray(status) ? status : [status]
  if (types.includes('marathon')) return MARATHON_DAY_STYLES.marathon
  return MARATHON_DAY_STYLES.empty
}

function getMarathonDayBadges(day) {
  const status = getMarathonDayStatus(day)
  if (!status) return []
  const types = Array.isArray(status) ? status : [status]
  return types
}

function getMarathonDayCellStyle(day) {
  const state = getMarathonDayState(day)
  if (state.cls === 'empty') return ''
  if (state.cls === 'future') return ''
  if (state.cls === 'marathon') return 'background-color: #a855f7; color: #fff; border-radius: 50%;'
  return state.bg
}

function getMarathonDayStatus(day) {
  const key = `${props.marathonCalYear}-${props.marathonCalMonth}`
  const val = props.runRecords?.[key]?.[day]
  if (!val) return null
  if (Array.isArray(val)) return val
  return val
}

function isMarathonFutureDay(day) {
  if (props.marathonCalYear > TODAY_YEAR) return true
  if (props.marathonCalYear === TODAY_YEAR && props.marathonCalMonth > TODAY_MONTH) return true
  if (props.marathonCalYear === TODAY_YEAR && props.marathonCalMonth === TODAY_MONTH && day > TODAY_DAY) return true
  return false
}

function isMarathonPastDay(day) {
  if (props.marathonCalYear > TODAY_YEAR) return false
  if (props.marathonCalYear < TODAY_YEAR) return true
  if (props.marathonCalMonth < TODAY_MONTH) return true
  if (props.marathonCalMonth > TODAY_MONTH) return false
  return day < TODAY_DAY
}

function getMarathonPrevMonthDay(n) {
  const prevM = props.marathonCalMonth === 1 ? 12 : props.marathonCalMonth - 1
  const prevY = props.marathonCalMonth === 1 ? props.marathonCalYear - 1 : props.marathonCalYear
  const prevDays = new Date(prevY, prevM, 0).getDate()
  return prevDays - props.marathonPrevMonthPadding + n
}
</script>

<style scoped>
/* Map */
.map-container {
  position: relative;
  width: 100%;
  height: 480px;
  background-color: #f1f5f9;
  overflow: visible;
}

.map-bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0;
}

.marathon-climate-card {
  position: absolute;
  top: 24rpx;
  left: 24rpx;
  right: 24rpx;
  background: rgba(30, 41, 59, 0.90);
  backdrop-filter: blur(8px);
  border-radius: 24rpx;
  padding: 20rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid rgba(255, 255, 255, 0.20);
}

.climate-left {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.climate-icon {
  font-size: 40rpx;
  color: #60a5fa;
}

.climate-info {
  display: flex;
  flex-direction: column;
}

.climate-label {
  font-size: 16rpx;
  color: #94a3b8;
  font-weight: bold;
  text-transform: uppercase;
}

.climate-value {
  font-size: 22rpx;
  font-weight: bold;
  color: #fff;
}

.climate-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.climate-intensity {
  font-size: 22rpx;
  font-weight: bold;
  color: #fb923c;
}

.marathon-control-card {
  position: absolute;
  bottom: 24rpx;
  left: 24rpx;
  right: 24rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2rpx solid #f3f4f6;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.10);
  z-index: 5;
}

.marathon-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marathon-stat-label {
  font-size: 18rpx;
  color: #9ca3af;
  font-weight: bold;
  margin-bottom: 4rpx;
}

.marathon-stat-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.marathon-stat-unit {
  font-size: 16rpx;
}

.marathon-stat-divider {
  width: 2rpx;
  height: 48rpx;
  background: #e5e7eb;
}

.marathon-start-btn {
  background: #1e293b;
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
}

.marathon-start-text {
  font-size: 22rpx;
  font-weight: bold;
  color: #fff;
}

/* Grid */
.marathon-grid-section {
  padding: 120rpx 30rpx 0;
}

.marathon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
}

.marathon-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.marathon-grid-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-blue { background: #dbeafe; }
.menu-blue .iconfont { color: #3b82f6; font-size: 40rpx; }
.menu-orange { background: #ffedd5; }
.menu-orange .iconfont { color: #f97316; font-size: 40rpx; }
.menu-green { background: #dcfce7; }
.menu-green .iconfont { color: #22c55e; font-size: 40rpx; }
.menu-indigo { background: #e0e7ff; }
.menu-indigo .iconfont { color: #6366f1; font-size: 40rpx; }

.marathon-grid-name {
  font-size: 20rpx;
  font-weight: bold;
  color: #374151;
  text-align: center;
}

/* Events */
.marathon-event-section {
  padding: 28rpx 30rpx 0;
}

.marathon-event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.section-more {
  font-size: 22rpx;
  color: #9ca3af;
  display: flex;
  align-items: center;
}

.section-more-icon {
  font-size: 20rpx;
  color: #9ca3af;
  margin-left: 2rpx;
}

.marathon-event-scroll {
  display: flex;
  gap: 16rpx;
  overflow-x: auto;
  padding-bottom: 8rpx;
}

.marathon-event-card {
  flex-shrink: 0;
  width: 256rpx;
  background: #1e293b;
  border-radius: 24rpx;
  overflow: hidden;
  position: relative;
}

.event-card-img {
  height: 128rpx;
  background: linear-gradient(135deg, #334155, #475569);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.event-card-real-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-card-info {
  padding: 16rpx;
}

.event-card-title {
  font-size: 22rpx;
  font-weight: bold;
  color: #fff;
  display: block;
}

.event-card-sub {
  font-size: 18rpx;
  color: rgba(255, 255, 255, 0.6);
}

.event-hot-tag {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  background: #f97316;
  border-radius: 20rpx;
  padding: 4rpx 12rpx;
}

.event-hot-text {
  font-size: 16rpx;
  font-weight: bold;
  color: #fff;
}

/* Plans */
.marathon-plan-section {
  padding: 28rpx 30rpx 0;
}

.marathon-plan-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.marathon-plan-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.plan-item-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.plan-item-icon-sm {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plan-indigo { background: #e0e7ff; }
.plan-indigo .iconfont { color: #6366f1; font-size: 28rpx; }
.plan-red { background: #fee2e2; }
.plan-red .iconfont { color: #ef4444; font-size: 28rpx; }

.plan-item-text {
  display: flex;
  flex-direction: column;
}

.plan-item-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #374151;
}

.plan-item-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

.plan-plus-icon {
  font-size: 40rpx;
  color: #6366f1;
}

/* Calendar + Profile Layout */
.content-wrapper {
  padding: 0;
}

.morning-column {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx 30rpx 40rpx;
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
  margin-bottom: 24rpx;
  flex-wrap: wrap;
  gap: 12rpx;
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
  overflow: visible;
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

.marathon-ring-badge {
  position: absolute;
  bottom: -4rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #a855f7;
  border: 3rpx solid #fff;
  box-shadow: 0 0 8rpx rgba(168, 85, 247, 0.6);
  z-index: 2;
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

.legend-text {
  font-size: 22rpx;
  color: #9ca3af;
}

.marathon-legend-dot.purple-ring {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #a855f7;
  border: 3rpx solid #fff;
  box-shadow: 0 0 8rpx rgba(168, 85, 247, 0.6);
  flex-shrink: 0;
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

/* Profile Card */
.marathon-profile-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 40rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.40), inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.pro-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  position: relative;
  z-index: 1;
}

.pro-header-top {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.pro-title-icon {
  font-size: 36rpx;
  background: linear-gradient(135deg, #f97316, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pro-title-premium {
  font-size: 32rpx;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.5rpx;
}

.pro-badge-group {
  display: flex;
  gap: 12rpx;
}

.pro-level-badge {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 24rpx;
  padding: 8rpx 20rpx;
  box-shadow: 0 8rpx 20rpx rgba(249, 115, 22, 0.25);
  animation: badgePulse 3s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { box-shadow: 0 8rpx 20rpx rgba(249, 115, 22, 0.25); }
  50% { box-shadow: 0 12rpx 32rpx rgba(249, 115, 22, 0.35); }
}

.pro-badge-icon { font-size: 20rpx; color: #fff; }

.pro-badge-text {
  font-size: 18rpx;
  font-weight: bold;
  color: #fff;
}

/* PB Section */
.pro-pb-section {
  margin-bottom: 40rpx;
  position: relative;
  z-index: 2;
}

.pro-pb-background {
  position: relative;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(251, 146, 60, 0.08) 100%);
  border-radius: 32rpx;
  padding: 40rpx 32rpx;
  border: 1px solid rgba(249, 115, 22, 0.20);
  overflow: hidden;
}

.pro-pb-glow {
  position: absolute;
  top: -30rpx;
  right: -30rpx;
  width: 400rpx;
  height: 400rpx;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40rpx);
  pointer-events: none;
}

.pro-pb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

.pro-pb-label {
  font-size: 18rpx;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 12rpx;
}

.pro-pb-value-huge {
  font-size: 120rpx;
  font-weight: 900;
  color: #fff;
  letter-spacing: -3rpx;
  line-height: 1;
  margin-bottom: 16rpx;
  background: linear-gradient(180deg, #fff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.pro-pb-meta {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.pro-pb-distance {
  font-size: 20rpx;
  color: #f97316;
  font-weight: 600;
}

.pro-pb-separator {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.40);
}

.pro-pb-event {
  font-size: 20rpx;
  color: #94a3b8;
}

/* Stats Dashboard */
.pro-stats-dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  margin-bottom: 40rpx;
  position: relative;
  z-index: 2;
}

.pro-stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 24rpx;
  padding: 24rpx 16rpx;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10rpx);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pro-stat-card:active {
  transform: translateY(-4rpx);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.pro-stat-icon-bg {
  width: 60rpx;
  height: 60rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.pro-stat-icon { font-size: 32rpx; color: #fff; }

.races-gradient { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); }
.distance-gradient { background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%); }
.pace-gradient { background: linear-gradient(135deg, #f97316 0%, #c2410c 100%); }
.carbon-gradient { background: linear-gradient(135deg, #10b981 0%, #047857 100%); }

.pro-stat-value {
  font-size: 32rpx;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin-bottom: 8rpx;
  letter-spacing: -0.5rpx;
}

.pro-stat-value.pace-value { color: #f97316; }
.pro-stat-value.carbon-value { color: #10b981; }

.pro-stat-label {
  font-size: 14rpx;
  color: #94a3b8;
  text-align: center;
  font-weight: 500;
  line-height: 1.4;
}

.pro-stat-unit { font-size: 12rpx; color: #64748b; }

/* Level Progress */
.pro-achievement-section {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28rpx;
  padding: 28rpx;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 2;
}

.pro-level-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18rpx;
  gap: 8rpx;
}

.pro-level-current {
  font-size: 22rpx;
  font-weight: bold;
  color: #f97316;
  letter-spacing: -0.5rpx;
}

.pro-level-arrow {
  font-size: 20rpx;
  color: #64748b;
  flex: 1;
  text-align: center;
}

.pro-level-next {
  font-size: 22rpx;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: -0.5rpx;
}

.pro-progress-track {
  position: relative;
  height: 16rpx;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 16rpx;
  box-shadow: inset 0 2rpx 4rpx rgba(0, 0, 0, 0.20);
}

.pro-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #f97316 0%, #fbbf24 100%);
  border-radius: 12rpx;
  animation: progressFill 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 16rpx rgba(249, 115, 22, 0.40);
}

@keyframes progressFill {
  from { width: 0 !important; }
}

.pro-progress-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 24rpx;
  height: 24rpx;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(249, 115, 22, 0.30);
  border: 3rpx solid #f97316;
  animation: indicatorPulse 2s ease-in-out infinite;
}

@keyframes indicatorPulse {
  0%, 100% { box-shadow: 0 4rpx 12rpx rgba(249, 115, 22, 0.30); }
  50% { box-shadow: 0 8rpx 24rpx rgba(249, 115, 22, 0.50); }
}

.pro-level-hint {
  font-size: 16rpx;
  color: #64748b;
  text-align: center;
  font-weight: 500;
  line-height: 1.5;
}
</style>
