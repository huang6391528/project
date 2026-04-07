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
      <view class="weather-widget">
        <text class="iconfont icon-weather"></text>
        <text class="weather-text">22°C · 空气优</text>
      </view>
    </view>

    <!-- ============================================= -->
    <!-- 模块一：悬浮运动卡片（渐变绿背景 + 全白文字） -->
    <!-- ============================================= -->
    <view
      class="floating-card"
      :class="{ 'is-expanded': isCardExpanded, 'is-running': isRunning }"
    >
      <!-- 顶部收起区域（仅展开时可见，可点击折叠） -->
      <view v-if="isCardExpanded" class="card-top-bar" @tap="collapseCard">
        <view class="top-bar-line"></view>
        <text class="top-bar-hint">点击收起</text>
        <text class="top-bar-icon iconfont icon-chevron-up"></text>
      </view>

      <!-- ===== 折叠状态：渐绿背景 + 全白文字 ===== -->
      <view v-if="!isCardExpanded" class="card-collapsed" @tap="toggleCard">
        <view class="collapsed-inner">
          <view class="collapsed-block">
            <text class="collapsed-label">本次距离</text>
            <text class="collapsed-value">
              {{ currentDistance || '--' }}
              <text class="collapsed-unit">KM</text>
            </text>
          </view>
          <view class="collapsed-divider"></view>
          <view class="collapsed-block">
            <text class="collapsed-label">配速</text>
            <text class="collapsed-value">
              {{ currentPace || "--'--" }}
              <text class="collapsed-unit">"</text>
            </text>
          </view>
        </view>
        <!-- 向下呼吸箭头 -->
        <view class="collapsed-hint">
          <text class="hint-icon iconfont icon-chevron-down"></text>
        </view>
      </view>

      <!-- ===== 展开状态：全白文字 + 白色大按钮 ===== -->
      <view v-else class="card-expanded" @tap.stop>
        <!-- 关闭按钮 -->
        <view class="card-close" @tap="collapseCard">
          <text class="close-icon iconfont icon-chevron-up"></text>
        </view>

        <!-- 四格数据 -->
        <view class="expanded-grid">
          <view class="exp-stat">
            <text class="exp-label">时长</text>
            <text class="exp-value exp-large">{{ displayDuration || '00:00:00' }}</text>
          </view>
          <view class="exp-stat">
            <text class="exp-label">本次距离 (KM)</text>
            <text class="exp-value exp-large">{{ currentDistance || '0.00' }}</text>
          </view>
          <view class="exp-stat">
            <text class="exp-label">配速</text>
            <text class="exp-value"> {{ currentPace || "--'--\"" }}</text>
          </view>
          <view class="exp-stat">
            <text class="exp-label">累计减排 (g)</text>
            <text class="exp-value exp-emission">{{ displayEmission || '0' }}</text>
          </view>
        </view>

        <!-- 操作按钮区 -->
        <view class="action-area">
          <!-- 左侧：结束按钮 -->
          <view class="action-btn side-btn" v-if="isRunning" @tap="endRun">
            <text class="iconfont icon-stop"></text>
          </view>
          <!-- 中央：开始/暂停大按钮（白色背景 + 绿色图标） -->
          <view
            class="action-btn main-btn"
            :class="{ running: isRunning }"
            @tap="toggleRun"
          >
            <text class="iconfont" :class="isRunning ? 'icon-pause' : 'icon-play'"></text>
          </view>
          <!-- 右侧：暂停按钮 -->
          <view class="action-btn side-btn" v-if="isRunning" @tap="toggleRun">
            <text class="iconfont icon-pause"></text>
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

    <!-- ============================================= -->
    <!-- 模块二：原生 picker 月份选择器（动态标题）    -->
    <!-- ============================================= -->
    <view class="calendar-section">
      <view class="calendar-card">
        <!-- 头部 -->
        <view class="calendar-header">
          <!-- 左：动态绑定标题，点击触发 picker -->
          <view class="title-area" @tap="openMonthPicker">
            <text class="calendar-title">{{ displayMonthText }} 运动轨迹</text>
            <view class="picker-trigger">
              <text class="iconfont icon-chevron-down picker-icon"></text>
            </view>
          </view>
          <!-- 右：统计 + 左右翻页 -->
          <view class="header-right">
            <text class="calendar-sub">已跑 {{ completedDays }} 天</text>
            <view class="month-switcher">
              <view class="switch-btn" @tap="prevMonth">
                <text class="iconfont icon-chevron-left"></text>
              </view>
              <text class="switch-year">{{ calYear }}</text>
              <view class="switch-btn" @tap="nextMonth">
                <text class="iconfont icon-chevron-right"></text>
              </view>
            </view>
          </view>
        </view>

        <!-- 星期标题行 -->
        <view class="calendar-weekdays">
          <text class="weekday">一</text>
          <text class="weekday">二</text>
          <text class="weekday">三</text>
          <text class="weekday">四</text>
          <text class="weekday">五</text>
          <text class="weekday">六</text>
          <text class="weekday">日</text>
        </view>

        <!-- 日历网格（动态渲染） -->
        <view class="calendar-grid">
          <!-- 上月占位格 -->
          <view
            v-for="n in prevMonthPadding"
            :key="'prev-' + n"
            class="day-cell empty"
          >
            <text class="day-num">{{ getPrevMonthDay(n) }}</text>
          </view>
          <!-- 当月日期 -->
          <view
            v-for="day in daysInMonth"
            :key="'cur-' + day"
            class="day-cell"
            :class="getDayClass(day)"
            @tap="onDayTap(day)"
          >
            <text class="day-num">{{ day }}</text>
          </view>
        </view>

        <!-- 图例 -->
        <view class="calendar-legend">
          <view class="legend-item">
            <view class="legend-dot green"></view>
            <text class="legend-text">晨跑</text>
          </view>
          <view class="legend-item">
            <view class="legend-dot dark-green"></view>
            <text class="legend-text">自由跑/马拉松</text>
          </view>
          <view class="legend-item">
            <view class="legend-dot future"></view>
            <text class="legend-text">未到/未打卡</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 原生月份选择 picker（隐藏，用 JS 触发） -->
    <picker
      mode="date"
      :value="pickerDate"
      :fields="pickerFields"
      :start="pickerStart"
      :end="pickerEnd"
      @change="onPickerChange"
      @cancel="onPickerCancel"
    >
      <view id="month-picker-trigger"></view>
    </picker>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ==========================================
// 模块零：地图配置（学校主定位 + 体育场标记）
// ==========================================
const schoolLat = 26.4459
const schoolLng = 106.6592
const stadiumLat = 26.4486
const stadiumLng = 106.6558

const markers = [
  {
    id: 1,
    latitude: stadiumLat,
    longitude: stadiumLng,
    title: '体育场',
    iconPath: '/static/marker.png',
    width: 30,
    height: 30,
    callout: { content: '体育场', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' }
  }
]

const routePolyline = ref([
  {
    points: [],
    color: '#10b981',
    width: 6,
    dottedLine: false,
    arrowLine: false
  }
])

// ==========================================
// 模块一：运动卡片状态
// ==========================================
const isCardExpanded = ref(false)
const isRunning = ref(false)

const currentDistance = ref('')
const currentPace = ref('')
const displayDuration = ref('00:00:00')
const displayEmission = ref('0')

let timer = null
let seconds = 0
let distance = 0

function toggleCard() {
  isCardExpanded.value = true
}

function collapseCard() {
  isCardExpanded.value = false
}

function toggleRun() {
  if (isRunning.value) {
    clearInterval(timer)
    isRunning.value = false
  } else {
    isRunning.value = true
    timer = setInterval(() => {
      seconds++
      if (seconds % 4 === 0) {
        distance = parseFloat((distance + 0.01).toFixed(2))
        currentDistance.value = distance.toFixed(2)
        if (distance > 0) {
          const paceSeconds = Math.round(seconds / distance)
          const paceMin = Math.floor(paceSeconds / 60)
          const paceSec = paceSeconds % 60
          currentPace.value = `${paceMin}'${String(paceSec).padStart(2, '0')}"`
        }
      }
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = seconds % 60
      displayDuration.value = [h, m, s].map(v => String(v).padStart(2, '0')).join(':')
      displayEmission.value = Math.round(distance * 200).toString()
    }, 1000)
  }
}

function endRun() {
  clearInterval(timer)
  isRunning.value = false
  // 数据保留在卡片上
}

// ==========================================
// 模块二：真实可翻页日历
// ==========================================

const TODAY_YEAR = 2026
const TODAY_MONTH = 4
const TODAY_DAY = 7

const calYear = ref(TODAY_YEAR)
const calMonth = ref(TODAY_MONTH)

// picker 配置
const pickerFields = 'month'
const pickerStart = '2026-01'
const pickerEnd = '2026-04'
const pickerDate = computed(() => `${calYear.value}-${String(calMonth.value).padStart(2, '0')}`)

// 打卡记录数据
const runRecords = ref({
  '2026-4': { 1: 'completed', 2: 'completed', 3: 'active', 8: 'active', 10: 'completed', 15: 'active' },
  '2026-3': { 2: 'completed', 5: 'completed', 12: 'active', 18: 'completed', 25: 'active', 28: 'completed' },
  '2026-2': { 3: 'completed', 7: 'active', 14: 'completed', 20: 'active', 27: 'completed' },
  '2026-1': { 5: 'completed', 10: 'active', 15: 'completed', 22: 'active', 29: 'completed' },
  '2026-5': { 3: 'active', 10: 'completed' },
  '2026-6': { 1: 'active', 5: 'completed', 15: 'active' },
})

const completedDays = computed(() => {
  const key = `${calYear.value}-${calMonth.value}`
  return Object.keys(runRecords.value[key] || {}).length
})

const displayMonthText = computed(() => {
  const map = { 1:'1月',2:'2月',3:'3月',4:'4月',5:'5月',6:'6月',7:'7月',8:'8月',9:'9月',10:'10月',11:'11月',12:'12月' }
  return map[calMonth.value] || `${calMonth.value}月`
})

const daysInMonth = computed(() => {
  return new Date(calYear.value, calMonth.value, 0).getDate()
})

const firstDayWeekday = computed(() => {
  const d = new Date(calYear.value, calMonth.value - 1, 1).getDay()
  return d === 0 ? 7 : d
})

const prevMonthPadding = computed(() => firstDayWeekday.value - 1)

function getPrevMonthDay(n) {
  const prevM = calMonth.value === 1 ? 12 : calMonth.value - 1
  const prevY = calMonth.value === 1 ? calYear.value - 1 : calYear.value
  const prevDays = new Date(prevY, prevM, 0).getDate()
  return prevDays - prevMonthPadding.value + n
}

function getDayStatus(day) {
  const key = `${calYear.value}-${calMonth.value}`
  return runRecords.value[key]?.[day] || null
}

function isFutureDay(day) {
  if (calYear.value > TODAY_YEAR) return true
  if (calYear.value === TODAY_YEAR && calMonth.value > TODAY_MONTH) return true
  if (calYear.value === TODAY_YEAR && calMonth.value === TODAY_MONTH && day > TODAY_DAY) return true
  return false
}

function isToday(day) {
  return calYear.value === TODAY_YEAR && calMonth.value === TODAY_MONTH && day === TODAY_DAY
}

function getDayClass(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)
  const today = isToday(day)
  if (future) return 'future'
  if (today) return 'today'
  return 'empty'
}

function onDayTap(day) {
  if (isFutureDay(day)) {
    uni.showToast({ title: '还未到这一天哦', icon: 'none' })
    return
  }
  const status = getDayStatus(day)
  if (status) {
    uni.showToast({ title: `已完成${status === 'active' ? '晨跑' : '打卡'}`, icon: 'none' })
  } else {
    const key = `${calYear.value}-${calMonth.value}`
    if (!runRecords.value[key]) runRecords.value[key] = {}
    runRecords.value[key][day] = 'completed'
    uni.showToast({ title: '打卡成功', icon: 'success' })
  }
}

// 月份切换
function prevMonth() {
  if (calMonth.value === 1) {
    calMonth.value = 12
    calYear.value--
  } else {
    calMonth.value--
  }
}

function nextMonth() {
  if (calYear.value === TODAY_YEAR && calMonth.value >= TODAY_MONTH) {
    uni.showToast({ title: '只能翻到当月', icon: 'none' })
    return
  }
  if (calMonth.value === 12) {
    calMonth.value = 1
    calYear.value++
  } else {
    calMonth.value++
  }
}

// ==========================================
// 模块二·附：原生月份 picker 集成
// ==========================================

// 点击标题区域，通过操作隐藏的 picker 触发原生弹窗
function openMonthPicker() {
  const trigger = document.querySelector('#month-picker-trigger')
  if (trigger) trigger.dispatchEvent(new Event('tap'))
  // uni-app 中直接调用 uni.showPicker 的兼容写法
  // 使用延迟确保 picker 被渲染后再触发
  setTimeout(() => {
    const picker = uni.createSelectorQuery().select('#month-picker-trigger')
    // 兼容 uni-app: picker 是隐藏的，直接通知用户可操作
    // 在实际 uni-app 运行时，<picker> 本身就是一个可点击触发器
    // 这里通过 JS 主动调用 picker 组件的内部方法
    const pickerNode = document.querySelector('#month-picker-trigger')
    if (pickerNode && pickerNode.__pickerInstance) {
      pickerNode.__pickerInstance.open()
    }
  }, 50)
}

// picker 选中后回调：解析 YYYY-MM，更新年月，标题自动联动
function onPickerChange(e) {
  const val = e.detail.value  // 'YYYY-MM'
  if (!val) return
  const [y, m] = val.split('-').map(Number)
  calYear.value = y
  calMonth.value = m
}

function onPickerCancel() {
  // 用户取消，什么都不做
}

// ==========================================
// 其他
// ==========================================
function goToTotalRun() {
  uni.showToast({ title: '总运动详情页开发中', icon: 'none' })
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
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
  height: 320px;
  background-color: #f1f5f9;
  overflow: hidden;
}

.map-bg {
  width: 100%;
  height: 100%;
}

.route-svg {
  display: none;
}

.route-line {
  stroke-dasharray: 1000;
  animation: dash 5s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: 0; }
}

.route-dot {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  0%   { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
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

/* ============================================= */
/* 模块一：悬浮运动卡片 — 渐变绿主题             */
/* ============================================= */

.floating-card {
  position: relative;
  z-index: 5;
  margin: -40rpx 30rpx 0;
  border-radius: 40rpx;
  overflow: hidden;
  /* 渐变绿色背景 */
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

/* 顶部收起条 */
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

/* --- 折叠状态（全白文字） --- */
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

/* 向下呼吸箭头 */
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
  0%, 100% {
    opacity: 0.40;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(6rpx);
  }
}

/* 折叠状态底部呼吸提示文字 */
.collapsed-tip {
  display: flex;
  justify-content: center;
  padding-bottom: 16rpx;
}

.tip-text {
  font-size: 18rpx;
  color: rgba(255, 255, 255, 0.80);
  letter-spacing: 2rpx;
  font-weight: 500;
  animation: breatheTip 2.4s ease-in-out infinite;
}

@keyframes breatheTip {
  0%, 100% { opacity: 0.45; }
  50%       { opacity: 1; }
}

/* --- 展开状态（全白文字） --- */
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

.expanded-grid {
  display: flex;
  flex-wrap: wrap;
}

.exp-stat {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32rpx;
}

.exp-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 8rpx;
  font-weight: 500;
}

.exp-value {
  font-size: 44rpx;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -1rpx;
  line-height: 1;
}

.exp-large {
  font-size: 60rpx;
}

.exp-emission {
  color: #a7f3d0;
}

/* 操作按钮区 */
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

.action-btn:active {
  transform: scale(0.90);
}

/* 中央大按钮：白色背景 + 绿色图标 */
.main-btn {
  width: 188rpx;
  height: 188rpx;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 0 0 8rpx rgba(255,255,255,0.20),
              0 16rpx 48rpx rgba(0, 0, 0, 0.22),
              0 0 60rpx rgba(255, 255, 255, 0.30);
  animation: pulseBtn 2.5s ease-in-out infinite;
}

.main-btn.running {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 0 8rpx rgba(255,255,255,0.20),
              0 16rpx 48rpx rgba(0, 0, 0, 0.22),
              0 0 60rpx rgba(255, 255, 255, 0.30);
}

@keyframes pulseBtn {
  0%, 100% {
    box-shadow: 0 0 0 8rpx rgba(255,255,255,0.20),
                0 16rpx 48rpx rgba(0, 0, 0, 0.20),
                0 0 40rpx rgba(255, 255, 255, 0.25);
  }
  50% {
    box-shadow: 0 0 0 12rpx rgba(255,255,255,0.30),
                0 20rpx 60rpx rgba(0, 0, 0, 0.25),
                0 0 80rpx rgba(255, 255, 255, 0.45);
  }
}

.main-btn .iconfont {
  font-size: 72rpx;
  /* 绿色图标，与白色按钮形成强烈反差 */
  color: #059669;
  text-shadow: 0 2rpx 8rpx rgba(5, 150, 105, 0.20);
}

/* 两侧小按钮 */
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

/* ============================================= */
/* Total Run Bar                                */
/* ============================================= */
.total-run-bar {
  margin: 24rpx 30rpx 0;
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

/* ============================================= */
/* 模块二：日历 — picker 触发器                 */
/* ============================================= */
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
  align-items: flex-start;
  margin-bottom: 28rpx;
  flex-wrap: wrap;
  gap: 12rpx;
}

/* 标题区域（可点击触发 picker） */
.title-area {
  display: flex;
  align-items: center;
  gap: 8rpx;
  cursor: pointer;
}

.calendar-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  line-height: 1;
}

.picker-trigger {
  display: flex;
  align-items: center;
  padding: 4rpx;
}

.picker-icon {
  font-size: 24rpx;
  color: #10b981;
  transition: transform 0.3s ease;
}

.title-area:active .picker-icon {
  transform: rotate(180deg);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex-wrap: wrap;
}

.calendar-sub {
  font-size: 20rpx;
  color: #10b981;
  font-weight: 500;
}

/* 月份切换器 */
.month-switcher {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: #fff;
  border-radius: 40rpx;
  padding: 6rpx 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06);
}

.switch-btn {
  width: 44rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
  color: #6b7280;
}

.switch-btn:active {
  background: #10b981;
  color: #fff;
}

.switch-btn .iconfont {
  font-size: 24rpx;
  color: inherit;
}

.switch-year {
  font-size: 22rpx;
  font-weight: 700;
  color: #374151;
  min-width: 80rpx;
  text-align: center;
}

/* 星期行 */
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

/* 日历网格 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12rpx;
}

.day-cell {
  height: 68rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  position: relative;
  font-weight: 700;
  transition: transform 0.15s ease;
}

.day-cell:active {
  transform: scale(0.90);
}

.day-num {
  font-size: 24rpx;
  color: inherit;
  line-height: 1;
}

.day-cell.empty {
  color: #e5e7eb;
}

.day-cell.future {
  color: #e5e7eb;
}

.day-cell.active {
  background-color: #d1fae5;
  color: #059669;
  box-shadow: 0 4rpx 12rpx rgba(16, 185, 129, 0.15);
}

.day-cell.completed {
  background-color: #10b981;
  color: #fff;
  box-shadow: 0 8rpx 16rpx rgba(16, 185, 129, 0.30);
}

.day-cell.today {
  background-color: #10b981;
  color: #fff;
  box-shadow: 0 0 0 4rpx #a7f3d0, 0 8rpx 16rpx rgba(16, 185, 129, 0.30);
}

.day-dot {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
  width: 14rpx;
  height: 14rpx;
  background-color: #f97316;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

.day-dot.orange {
  background-color: #f97316;
}

/* 图例 */
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
  background-color: #d1fae5;
  border: 2rpx solid #10b981;
}

.legend-dot.dark-green {
  background-color: #10b981;
}

.legend-dot.future {
  background-color: #e5e7eb;
}

.legend-text {
  font-size: 22rpx;
  color: #9ca3af;
}

/* 隐藏的 picker 触发器 */
#month-picker-trigger {
  position: fixed;
  left: -9999px;
  top: -9999px;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}
</style>
