<template>
  <view class="page-run">
    <!-- Top Tabs -->
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ 'tab-active': currentTab === 'free' }"
        @tap="switchTab('free')"
      >校园跑</view>
      <view
        class="tab-item"
        :class="{ 'tab-active': currentTab === 'morning' }"
        @tap="switchTab('morning')"
      >晨跑计划</view>
      <view
        class="tab-item"
        :class="{ 'tab-active': currentTab === 'marathon' }"
        @tap="switchTab('marathon')"
      >马拉松训练</view>
    </view>

    <!-- Tab Content -->
    <FreeRunTab
      v-if="currentTab === 'free'"
      :isCardExpanded="isCardExpanded"
      :isRunning="isRunning"
      :currentDistance="currentDistance"
      :currentPace="currentPace"
      :displayDuration="displayDuration"
      :displayEmission="displayEmission"
      :calYear="calYear"
      :calMonth="calMonth"
      :daysInMonth="daysInMonth"
      :prevMonthPadding="prevMonthPadding"
      :runRecords="runRecords"
      :routePolyline="routePolyline"
      :markers="markers"
      :schoolLat="schoolLat"
      :schoolLng="schoolLng"
      @toggleCard="toggleCard"
      @collapseCard="collapseCard"
      @toggleRun="toggleRun"
      @endRun="endRun"
      @bindDevice="onBindDevice"
      @manualRecord="onManualRecord"
      @viewAchievements="viewAllAchievements"
      @prevMonth="prevMonth"
      @nextMonth="nextMonth"
      @openDatePicker="openDatePicker('main')"
      @dayTap="onDayTap"
    />

    <MorningRunTab
      v-if="currentTab === 'morning'"
      :isMorningCardExpanded="isMorningCardExpanded"
      :isRunning="isRunning"
      :currentDistance="currentDistance"
      :currentPace="currentPace"
      :displayDuration="displayDuration"
      :calYear="calYear"
      :calMonth="calMonth"
      :daysInMonth="daysInMonth"
      :prevMonthPadding="prevMonthPadding"
      :runRecords="runRecords"
      :routePolyline="routePolyline"
      :markers="markers"
      :schoolLat="schoolLat"
      :schoolLng="schoolLng"
      @toggleMorningCard="toggleMorningCard"
      @collapseMorningCard="collapseMorningCard"
      @toggleRun="toggleRun"
      @prevMonth="prevMonth"
      @nextMonth="nextMonth"
      @openDatePicker="openDatePicker('morning')"
      @dayTapMorning="onDayTapMorning"
    />

    <MarathonTab
      v-if="currentTab === 'marathon'"
      :isRunning="isRunning"
      :currentDistance="currentDistance"
      :currentPace="currentPace"
      :displayDuration="displayDuration"
      :marathonCalYear="marathonCalYear"
      :marathonCalMonth="marathonCalMonth"
      :marathonDaysInMonth="marathonDaysInMonth"
      :marathonPrevMonthPadding="marathonPrevMonthPadding"
      :runRecords="runRecords"
      :marathonMenu="marathonMenu"
      :marathonEvents="marathonEvents"
      :marathonPlans="marathonPlans"
      :routePolyline="routePolyline"
      :markers="markers"
      :schoolLat="schoolLat"
      :schoolLng="schoolLng"
      @toggleRun="toggleRun"
      @prevMonth="marathonPrevMonth"
      @nextMonth="marathonNextMonth"
      @openDatePicker="openDatePicker('marathon')"
      @dayTapMarathon="onMarathonDayTap"
    />

    <!-- Custom Date Picker -->
    <RunDatePicker
      v-if="showDatePicker"
      :activePickerTarget="activePickerTarget"
      :dpSelectedYear="dpSelectedYear"
      :dpSelectedMonth="dpSelectedMonth"
      :dpYearList="dpYearList"
      :dpScrollYearId="dpScrollYearId"
      :calYear="calYear"
      :calMonth="calMonth"
      :marathonCalYear="marathonCalYear"
      :marathonCalMonth="marathonCalMonth"
      @closeDatePicker="closeDatePicker"
      @confirmDatePicker="confirmDatePicker"
      @updateDpSelectedYear="dpSelectedYear = $event"
      @updateDpSelectedMonth="dpSelectedMonth = $event"
      @updateDpScrollYearId="dpScrollYearId = $event"
    />
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import FreeRunTab from './components/free/FreeRunTab.vue'
import MorningRunTab from './components/morning/MorningRunTab.vue'
import MarathonTab from './components/marathon/MarathonTab.vue'
import RunDatePicker from './components/RunDatePicker.vue'

// ==========================================
// Module 0: Tab Switching
// ==========================================
const currentTab = ref('free')

function switchTab(tab) {
  if (!tab) return
  currentTab.value = tab
  clearInterval(timer)
  timer = null
  isRunning.value = false
  isCardExpanded.value = false
  isMorningCardExpanded.value = false
  seconds = 0
  distance = 0
  currentDistance.value = ''
  currentPace.value = ''
  displayDuration.value = '00:00:00'
  displayEmission.value = '0'
}

// ==========================================
// Module 0: Map Config
// ==========================================
const schoolLat = 26.4451
const schoolLng = 106.6589

const markers = [
  {
    id: 1,
    latitude: 26.4398,
    longitude: 106.6632,
    title: '体育馆A',
    iconPath: '/static/marker.png',
    width: 30,
    height: 30,
    callout: { content: '体育馆A', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' }
  },
  {
    id: 2,
    latitude: 26.4518,
    longitude: 106.6594,
    title: '体育馆B',
    iconPath: '/static/marker.png',
    width: 30,
    height: 30,
    callout: { content: '体育馆B', color: '#ffffff', fontSize: 12, borderRadius: 4, padding: 6, display: 'ALWAYS', bgColor: '#10b981' }
  }
]

const routeColorMap = {
  morning: '#10b981',
  free: '#047857',
  marathon: '#f97316'
}
const currentRunType = ref('morning')
const routePolyline = ref([
  {
    points: [],
    color: routeColorMap[currentRunType.value],
    width: 6,
    dottedLine: false,
    arrowLine: false
  }
])

// ==========================================
// Module 1: Card State
// ==========================================
const isCardExpanded = ref(false)
const isMorningCardExpanded = ref(false)
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

function toggleMorningCard() {
  isMorningCardExpanded.value = !isMorningCardExpanded.value
}

function collapseMorningCard() {
  isMorningCardExpanded.value = false
}

function toggleRun() {
  if (isRunning.value) {
    clearInterval(timer)
    timer = null
    isRunning.value = false
  } else {
    clearInterval(timer)
    timer = null
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
  timer = null
  isRunning.value = false
  seconds = 0
  distance = 0
  currentDistance.value = ''
  currentPace.value = ''
  displayDuration.value = '00:00:00'
  displayEmission.value = '0'
}


// ==========================================
// Module 2: Calendar
// ==========================================
const TODAY_YEAR = new Date().getFullYear()
const TODAY_MONTH = new Date().getMonth() + 1
const TODAY_DAY = new Date().getDate()

const calYear = ref(TODAY_YEAR)
const calMonth = ref(TODAY_MONTH)

// Date Picker
const showDatePicker = ref(false)
const activePickerTarget = ref('main')
const dpYearList = Array.from({ length: 10 }, (_, i) => TODAY_YEAR - 5 + i)
const dpScrollYearId = ref(String(TODAY_YEAR))
const dpSelectedYear = ref(TODAY_YEAR)
const dpSelectedMonth = ref(TODAY_MONTH)

function openDatePicker(target) {
  activePickerTarget.value = target
  if (target === 'marathon') {
    dpSelectedYear.value = marathonCalYear.value
    dpSelectedMonth.value = marathonCalMonth.value
  } else {
    dpSelectedYear.value = calYear.value
    dpSelectedMonth.value = calMonth.value
  }
  dpScrollYearId.value = String(dpSelectedYear.value)
  showDatePicker.value = true
}

function closeDatePicker() {
  showDatePicker.value = false
}

function confirmDatePicker() {
  if (activePickerTarget.value === 'marathon') {
    marathonCalYear.value = dpSelectedYear.value
    marathonCalMonth.value = dpSelectedMonth.value
  } else {
    calYear.value = dpSelectedYear.value
    calMonth.value = dpSelectedMonth.value
  }
  showDatePicker.value = false
}

// Run Records
const runRecords = ref({
  '2026-4': {
    1: ['free', 'morning'],
    2: ['morning', 'marathon'],
    3: ['free', 'morning', 'marathon'],
    7: 'marathon',
    8: []
  },
  '2026-3': {
    2: 'morning', 5: 'free', 12: 'free', 18: 'marathon', 25: 'marathon', 28: 'morning'
  },
  '2026-2': {
    3: 'morning', 7: 'free', 14: 'marathon', 20: 'free', 27: 'morning'
  },
  '2026-1': {
    5: 'morning', 10: 'free', 15: 'marathon', 22: 'free', 29: 'morning'
  },
  '2026-5': { 3: 'free', 10: 'marathon' },
  '2026-6': { 1: 'free', 5: 'marathon', 15: 'free' },
})

const firstDayWeekday = computed(() => {
  const d = new Date(calYear.value, calMonth.value - 1, 1).getDay()
  return d === 0 ? 7 : d
})

const daysInMonth = computed(() => {
  return new Date(calYear.value, calMonth.value, 0).getDate()
})

const prevMonthPadding = computed(() => firstDayWeekday.value - 1)

const DAY_STYLES = {
  empty:   { cls: 'empty',   bg: '' },
  future:  { cls: 'future',  bg: '' },
  today:   { cls: 'today',   bg: '' },
  checked: { cls: 'checked', bg: '' },
}

function getDayState(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)

  if (future) return DAY_STYLES.future
  if (!status) return DAY_STYLES.empty
  return DAY_STYLES.checked
}


function getPrevMonthDay(n) {
  const prevM = calMonth.value === 1 ? 12 : calMonth.value - 1
  const prevY = calMonth.value === 1 ? calYear.value - 1 : calYear.value
  const prevDays = new Date(prevY, prevM, 0).getDate()
  return prevDays - prevMonthPadding.value + n
}

function getDayStatus(day) {
  const key = `${calYear.value}-${calMonth.value}`
  const val = runRecords.value[key]?.[day]
  if (!val) return null
  if (Array.isArray(val)) return val
  return val
}

function isFutureDay(day) {
  if (calYear.value > TODAY_YEAR) return true
  if (calYear.value === TODAY_YEAR && calMonth.value > TODAY_MONTH) return true
  if (calYear.value === TODAY_YEAR && calMonth.value === TODAY_MONTH && day > TODAY_DAY) return true
  return false
}

function onDayTap(day) {
  if (isFutureDay(day)) {
    uni.showToast({ title: '还未到这一天哦', icon: 'none' })
    return
  }
  const state = getDayState(day)
  if (state.cls === 'checked') {
    uni.showToast({ title: '已完成打卡', icon: 'none' })
  }
}

function onDayTapMorning(day) {
  if (isFutureDay(day)) {
    uni.showToast({ title: '还未到这一天哦', icon: 'none' })
    return
  }
  const key = `${calYear.value}-${calMonth.value}`
  const status = getDayStatus(day)
  if (status) {
    uni.showToast({ title: '已完成晨跑', icon: 'none' })
    return
  }
  if (!runRecords.value[key]) runRecords.value[key] = {}
  runRecords.value[key][day] = 'morning'
  uni.showToast({ title: '晨跑打卡成功', icon: 'success' })
}

function getDayCellClassMorning(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)
  if (future) return 'future'
  const types = Array.isArray(status) ? status : (status ? [status] : [])
  if (types.includes('morning')) return 'morning-day-cell'
  return ''
}

function isMorningPastDay(day) {
  if (calYear.value > TODAY_YEAR) return false
  if (calYear.value < TODAY_YEAR) return true
  if (calMonth.value < TODAY_MONTH) return true
  if (calMonth.value > TODAY_MONTH) return false
  return day < TODAY_DAY
}

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

function onBindDevice() {
  uni.showToast({ title: '绑定设备功能开发中', icon: 'none' })
}

function onManualRecord() {
  uni.showToast({ title: '手动记录功能开发中', icon: 'none' })
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// ==========================================
// Morning Tab Data
// ==========================================
const morningHistory = ref([
  { date: '2026.04.09 晨跑', km: '5.20', time: '31:40', pace: "06'05''", faded: false, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
  { date: '2026.04.08 晨跑', km: '3.80', time: '22:15', pace: "05'51''", faded: false, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
  { date: '2026.04.07 晨跑', km: '4.50', time: '28:20', pace: "06'17''", faded: true, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
])

// ==========================================
// Marathon Tab Data
// ==========================================
const marathonMenu = ref([
  { name: '马拉松学院', icon: 'icon-graduation', bgClass: 'menu-blue' },
  { name: '赛事活动', icon: 'icon-calendar', bgClass: 'menu-orange' },
  { name: '我的马拉松', icon: 'icon-user', bgClass: 'menu-green' },
  { name: '训练计划', icon: 'icon-list', bgClass: 'menu-indigo' },
])

const marathonEvents = ref([
  { title: '2026 校园半程马拉松', sub: '报名中 · 04月25日 开启', hot: true, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/3aff83eeb7bc4e4e89e1263d70ba099b.jpg' },
  { title: '城市低碳公益跑', sub: '进行中 · 累计跑量赢好礼', hot: false, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/c70df215739d494b8bb3fe1c2eb3d864.jpg' },
])

const marathonPlans = ref([
  { name: 'LSD 耐力提升计划', cycle: '4周', level: '中等', icon: 'icon-hourglass', bgClass: 'plan-indigo' },
  { name: '间歇跑速度训练', cycle: '2周', level: '困难', icon: 'icon-gauge', bgClass: 'plan-red' },
])

const achievements = ref([
  { name: '早起鸟', icon: 'icon-medal', iconClass: 'ach-orange', locked: false },
  { name: '低碳达人', icon: 'icon-tree', iconClass: 'ach-green', locked: false },
  { name: '极速跑者', icon: 'icon-lightning', iconClass: 'ach-blue', locked: false },
  { name: '100KM 达成', icon: 'icon-target', iconClass: 'ach-gray', locked: true },
  { name: '马拉松之星', icon: 'icon-star', iconClass: 'ach-gray', locked: true },
])

// ==========================================
// Marathon Calendar
// ==========================================
const marathonCalYear = ref(TODAY_YEAR)
const marathonCalMonth = ref(TODAY_MONTH)

const marathonDaysInMonth = computed(() => {
  return new Date(marathonCalYear.value, marathonCalMonth.value, 0).getDate()
})

const marathonFirstDayWeekday = computed(() => {
  const d = new Date(marathonCalYear.value, marathonCalMonth.value - 1, 1).getDay()
  return d === 0 ? 7 : d
})

const marathonPrevMonthPadding = computed(() => marathonFirstDayWeekday.value - 1)

const MARATHON_DAY_STYLES = {
  empty:   { cls: 'empty',    bg: '', hasDot: false },
  future:  { cls: 'future',   bg: '', hasDot: false },
  marathon:{ cls: 'marathon', bg: '', hasDot: true },
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

function isMarathonPastDay(day) {
  if (marathonCalYear.value > TODAY_YEAR) return false
  if (marathonCalYear.value < TODAY_YEAR) return true
  if (marathonCalMonth.value < TODAY_MONTH) return true
  if (marathonCalMonth.value > TODAY_MONTH) return false
  return day < TODAY_DAY
}

function getMarathonPrevMonthDay(n) {
  const prevM = marathonCalMonth.value === 1 ? 12 : marathonCalMonth.value - 1
  const prevY = marathonCalMonth.value === 1 ? marathonCalYear.value - 1 : marathonCalYear.value
  const prevDays = new Date(prevY, prevM, 0).getDate()
  return prevDays - marathonPrevMonthPadding.value + n
}

function getMarathonDayStatus(day) {
  const key = `${marathonCalYear.value}-${marathonCalMonth.value}`
  const val = runRecords.value[key]?.[day]
  if (!val) return null
  if (Array.isArray(val)) return val
  return val
}

function isMarathonFutureDay(day) {
  if (marathonCalYear.value > TODAY_YEAR) return true
  if (marathonCalYear.value === TODAY_YEAR && marathonCalMonth.value > TODAY_MONTH) return true
  if (marathonCalYear.value === TODAY_YEAR && marathonCalMonth.value === TODAY_MONTH && day > TODAY_DAY) return true
  return false
}

function onMarathonDayTap(day) {
  if (isMarathonFutureDay(day)) {
    uni.showToast({ title: '还未到这一天哦', icon: 'none' })
    return
  }
  const state = getMarathonDayState(day)
  if (state !== MARATHON_DAY_STYLES.empty && state !== MARATHON_DAY_STYLES.future) {
    uni.showToast({ title: '已完成马拉松训练', icon: 'none' })
  }
}

function marathonPrevMonth() {
  if (marathonCalMonth.value === 1) {
    marathonCalMonth.value = 12
    marathonCalYear.value--
  } else {
    marathonCalMonth.value--
  }
}

function marathonNextMonth() {
  if (marathonCalYear.value === TODAY_YEAR && marathonCalMonth.value >= TODAY_MONTH) {
    uni.showToast({ title: '只能翻到当月', icon: 'none' })
    return
  }
  if (marathonCalMonth.value === 12) {
    marathonCalMonth.value = 1
    marathonCalYear.value++
  } else {
    marathonCalMonth.value++
  }
}

function viewAllAchievements() {
  uni.showToast({ title: '成就详情开发中', icon: 'none' })
}

// Chart - kept on main page
onMounted(() => {
  const instance = getCurrentInstance()
  if (!instance) return
  const query = uni.createSelectorQuery().in(instance)
  if (query) {
    query.select('#runChart')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0]?.node
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const dpr = uni.getSystemInfoSync().pixelRatio || 2
        canvas.width = (res[0].width) * dpr
        canvas.height = (res[0].height) * dpr
        ctx.scale(dpr, dpr)
        const w = res[0].width
        const h = res[0].height
        const data = [3.2, 5.4, 2.1, 4.8, 6.2, 8.5, 4.1]
        const maxVal = Math.max(...data)
        const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        const barW = (w - 30 - 10) / 7 - 8
        const top = 20, bottom = 20, left = 30, right = 10
        const chartH = h - top - bottom
        const chartW = w - left - right
        ctx.strokeStyle = '#f0f0f0'
        ctx.setLineDash([4, 4])
        for (let i = 0; i <= 4; i++) {
          const y = top + (chartH / 4) * i
          ctx.beginPath()
          ctx.moveTo(left, y)
          ctx.lineTo(w - right, y)
          ctx.stroke()
        }
        ctx.setLineDash([])
        data.forEach((val, i) => {
          const barH = (val / maxVal) * chartH
          const x = left + i * (barW + 8) + 4
          const y = top + chartH - barH
          const grad = ctx.createLinearGradient(0, y, 0, y + barH)
          grad.addColorStop(0, '#22C55E')
          grad.addColorStop(1, '#86efac')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0])
          ctx.fill()
        })
        ctx.fillStyle = '#999'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        data.forEach((val, i) => {
          const x = left + i * (barW + 8) + 4 + barW / 2
          ctx.fillText(labels[i], x, h - 4)
        })
      })
  }
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
</style>
