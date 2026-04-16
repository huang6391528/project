<template>
  <view class="app-container">
    <!-- 状态栏 -->
    <view class="status-bar">
      <text class="time">{{ statusTime }}</text>
      <view class="status-icons">
        <text class="iconfont icon-signal"></text>
        <text class="iconfont icon-wifi"></text>
        <text class="iconfont icon-battery"></text>
      </view>
    </view>

    <!-- 顶部 Tab 切换 -->
    <view class="top-tabs">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: currentTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view
      scroll-y
      class="content-scroll"
      :scroll-top="scrollTop"
      @scroll="handleScroll"
    >
      <!-- 校园跑页面 -->
      <view v-if="currentTab === 'campus'" class="page-campus">
        <!-- 地图与跑步控制区 -->
        <view class="map-section" :class="{ 'running-mode': isCampusRunning }">
          <map
            id="runMap"
            class="map-bg"
            :latitude="currentLocation.latitude"
            :longitude="currentLocation.longitude"
            :scale="mapScale"
            :show-location="true"
            :markers="mapMarkers"
            :polyline="campusRunPolyline"
            @updated="onMapUpdated"
          />
          <view class="map-overlay"></view>

          <!-- 普通模式 -->
          <view v-if="!isCampusRunning" class="normal-mode">
            <view class="start-btn" @click="startCampusRunning">
              <text class="iconfont icon-play"></text>
              <text class="btn-text">开始跑步</text>
            </view>
            <view class="weather-tag">
              <text>{{ weatherInfo }}</text>
            </view>
          </view>

          <!-- 跑步模式 -->
          <view v-else class="running-panel">
            <view class="run-stats-top">
              <view class="stat-item">
                <text class="stat-label">配速</text>
                <text class="stat-value">{{ campusPace }}</text>
              </view>
              <view class="stat-item">
                <text class="stat-label">用时</text>
                <text class="stat-value">{{ campusRunTime }}</text>
              </view>
              <view class="stat-item">
                <text class="stat-label">千卡</text>
                <text class="stat-value">{{ campusCalories }}</text>
              </view>
            </view>
            
            <view class="distance-display">
              <text class="distance-label">当前距离 (KM)</text>
              <text class="distance-value">{{ campusDistance }}</text>
            </view>
            
            <view class="run-actions">
              <view class="action-btn stop-btn" @click="stopCampusRunning">
                <text class="iconfont icon-stop"></text>
                <text class="btn-label">结束</text>
              </view>
              <view class="action-btn pause-btn" @click="pauseCampusRunning">
                <text class="iconfont" :class="isCampusPaused ? 'icon-play' : 'icon-pause'"></text>
                <text class="btn-label">{{ isCampusPaused ? '继续' : '暂停' }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 快捷操作 -->
        <view class="quick-actions">
          <view class="action-card" @click="bindDevice">
            <view class="action-icon blue">
              <text class="iconfont icon-watch"></text>
            </view>
            <view class="action-info">
              <text class="action-title">绑定设备</text>
              <text class="action-sub">同步Apple Watch</text>
            </view>
          </view>
          <view class="action-card" @click="manualRecord">
            <view class="action-icon orange">
              <text class="iconfont icon-edit"></text>
            </view>
            <view class="action-info">
              <text class="action-title">手动记录</text>
              <text class="action-sub">上传跑步数据</text>
            </view>
          </view>
        </view>

        <!-- 任务进度 -->
        <view class="content-wrapper">
          <view class="section-card">
            <view class="card-header">
              <text class="card-title">体育课校园跑任务</text>
              <text class="badge green">进行中</text>
            </view>
            <view class="progress-item">
              <view class="progress-header">
                <text class="progress-label">总计跑量目标</text>
                <text class="progress-value">{{ totalDistance }} / 130 KM</text>
              </view>
              <view class="progress-bar">
                <view class="progress-fill green" :style="{ width: distanceProgress + '%' }"></view>
              </view>
            </view>
            <view class="progress-item">
              <view class="progress-header">
                <text class="progress-label">晨跑次数要求</text>
                <text class="progress-value">{{ morningRunCount }} / 26 次</text>
              </view>
              <view class="progress-bar">
                <view class="progress-fill orange" :style="{ width: morningProgress + '%' }"></view>
              </view>
            </view>
            <view class="carbon-tip">
              <text class="iconfont icon-leaf green-text"></text>
              <text>已累计减排 {{ carbonReduction }}kg 碳，相当于种植了 {{ treesPlanted }} 棵树</text>
            </view>
          </view>
        </view>

        <!-- 双列布局：我的计划 + 图表 -->
        <view class="content-wrapper">
          <view class="two-column">
            <view class="section-card">
              <view class="plan-tabs">
                <view class="plan-tabs-left">
                  <text class="plan-tab" :class="{ active: planFilter === 'pending' }" @click="filterPlans('pending')">待完成</text>
                  <text class="plan-tab" :class="{ active: planFilter === 'completed' }" @click="filterPlans('completed')">已完成</text>
                </view>
                <text class="new-plan-btn" @click="createNewPlan">
                  <text class="iconfont icon-plus"></text>制定新计划
                </text>
              </view>
              <view v-for="plan in filteredPlans" :key="plan.id" class="plan-item" @click="selectPlan(plan)">
                <view class="plan-icon">
                  <text class="iconfont" :class="[plan.icon, plan.color]"></text>
                </view>
                <view class="plan-info">
                  <text class="plan-name">{{ plan.name }}</text>
                  <text class="plan-detail">{{ plan.detail }}</text>
                </view>
                <text class="iconfont icon-arrow-right"></text>
              </view>
            </view>

            <view class="section-card">
              <view class="card-header">
                <text class="card-title">跑步数据明细</text>
                <text class="card-sub">本周跑量趋势</text>
              </view>
              <view class="chart-container">
                <canvas
                  canvas-id="runChart"
                  id="runChart"
                  class="run-chart"
                  @touchstart="touchChart"
                ></canvas>
              </view>
            </view>
          </view>
        </view>

        <!-- 双列布局：日历 + 成就 -->
        <view class="content-wrapper">
          <view class="two-column">
            <view class="section-card calendar-card">
              <view class="card-header">
                <text class="card-title">运动轨迹日历</text>
                <view class="calendar-controls">
                  <text class="iconfont icon-arrow-left" @click="prevMonth"></text>
                  <picker mode="date" fields="month" :value="calendarDate" @change="onDateChange">
                    <text class="calendar-month">{{ currentYear }}年{{ currentMonth }}月</text>
                  </picker>
                  <text class="iconfont icon-arrow-right" @click="nextMonth"></text>
                </view>
              </view>
              <view class="calendar-grid">
                <text v-for="day in weekdays" :key="day" class="weekday">{{ day }}</text>
                <view
                  v-for="(item, index) in displayCalendarDays"
                  :key="index"
                  class="day-cell"
                  :class="{
                    active: item.hasRun,
                    today: item.isToday,
                    empty: !item.isCurrentMonth
                  }"
                  @click="selectDate(item)"
                >
                  {{ item.date }}
                  <view v-if="item.hasRun" class="day-dot"></view>
                </view>
              </view>
              <view class="calendar-legend">
                <view class="legend-item">
                  <view class="legend-dot green"></view>
                  <text>已运动</text>
                </view>
                <view class="legend-item">
                  <view class="legend-dot orange"></view>
                  <text>今日</text>
                </view>
              </view>
            </view>

            <view class="section-card achievement-card">
              <view class="card-header">
                <text class="card-title">我的成就</text>
                <text class="view-all" @click="viewAllAchievements">查看全部</text>
              </view>
              <view class="achievements-grid">
                <view v-for="achievement in achievements" :key="achievement.id" class="achievement-item" :class="{ disabled: !achievement.unlocked }">
                  <view class="achievement-icon" :class="achievement.bgClass">
                    <text class="iconfont" :class="achievement.icon"></text>
                  </view>
                  <text class="achievement-name">{{ achievement.name }}</text>
                  <text v-if="!achievement.unlocked" class="achievement-progress">{{ achievement.progress }}%</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 晨跑计划页面 -->
      <view v-if="currentTab === 'morning'" class="page-morning">
        <!-- 地图与跑步控制区 - 统一卡片样式 -->
        <view class="map-section" :class="{ 'running-mode': isMorningRunning }">
          <map
            id="morningMap"
            class="map-bg"
            :latitude="currentLocation.latitude"
            :longitude="currentLocation.longitude"
            :scale="15"
            :show-location="true"
            :markers="morningMapMarkers"
            :polyline="morningRunPolyline"
          />
          <view class="map-overlay"></view>

          <!-- 普通模式 -->
          <view v-if="!isMorningRunning" class="normal-mode">
            <view class="weather-card-overlay">
              <view class="weather-left">
                <text class="iconfont" :class="weatherIcon"></text>
                <view class="weather-info">
                  <text class="weather-label">今日晨跑环境</text>
                  <text class="weather-value">{{ weatherDescription }}</text>
                </view>
              </view>
            </view>
            <view class="start-btn" @click="startMorningRunning">
              <text class="iconfont icon-play"></text>
              <text class="btn-text">开始晨跑</text>
            </view>
          </view>

          <!-- 跑步模式 -->
          <view v-else class="running-panel">
            <view class="run-stats-top">
              <view class="stat-item">
                <text class="stat-label">距离(KM)</text>
                <text class="stat-value">{{ morningDistance }}</text>
              </view>
              <view class="stat-item">
                <text class="stat-label">配速</text>
                <text class="stat-value">{{ morningPace }}</text>
              </view>
              <view class="stat-item">
                <text class="stat-label">用时</text>
                <text class="stat-value">{{ morningDuration }}</text>
              </view>
            </view>
            
            <view class="distance-display">
              <text class="distance-label">今日目标</text>
              <text class="distance-value">5.0</text>
              <text class="distance-unit">KM</text>
            </view>
            
            <view class="run-actions">
              <view class="action-btn stop-btn" @click="stopMorningRunning">
                <text class="iconfont icon-stop"></text>
                <text class="btn-label">结束</text>
              </view>
              <view class="action-btn pause-btn" @click="pauseMorningRunning">
                <text class="iconfont" :class="isMorningPaused ? 'icon-play' : 'icon-pause'"></text>
                <text class="btn-label">{{ isMorningPaused ? '继续' : '暂停' }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 快捷操作 -->
        <view class="quick-actions">
          <view class="action-card" @click="morningPunch">
            <view class="action-icon green">
              <text class="iconfont icon-check"></text>
            </view>
            <view class="action-info">
              <text class="action-title">快速打卡</text>
              <text class="action-sub">完成晨跑打卡</text>
            </view>
          </view>
          <view class="action-card" @click="viewMorningStats">
            <view class="action-icon blue">
              <text class="iconfont icon-chart"></text>
            </view>
            <view class="action-info">
              <text class="action-title">数据统计</text>
              <text class="action-sub">查看历史数据</text>
            </view>
          </view>
        </view>

        <view class="content-wrapper">
          <view class="two-column">
            <view class="section-card">
              <view class="card-header">
                <text class="card-title">本阶段晨跑目标</text>
                <text class="progress-text">{{ morningCheckins.length }}/26 次</text>
              </view>
              <view class="segmented-progress">
                <view
                  v-for="i in 6"
                  :key="i"
                  class="progress-segment"
                  :class="{ filled: i <= Math.floor(morningCheckins.length / 5), half: i === Math.ceil(morningCheckins.length / 5) && morningCheckins.length % 5 !== 0 }"
                  :style="{ width: i === Math.ceil(morningCheckins.length / 5) && morningCheckins.length % 5 !== 0 ? (morningCheckins.length % 5 * 3) + '%' : '15%' }"
                ></view>
                <view class="progress-segment empty" :style="{ width: (100 - morningCheckins.length * 3.85) + '%' }"></view>
              </view>
              <view class="stats-grid-2">
                <view class="stat-box">
                  <text class="stat-box-label">累计晨跑里程</text>
                  <text class="stat-box-value">{{ morningTotalDistance }} KM</text>
                </view>
                <view class="stat-box">
                  <text class="stat-box-label">晨跑低碳积分</text>
                  <text class="stat-box-value green">+ {{ morningPoints }} pts</text>
                </view>
              </view>
            </view>

            <view class="section-card">
              <view class="card-header">
                <text class="card-title">晨跑打卡日历</text>
                <view class="calendar-controls">
                  <text class="iconfont icon-arrow-left" @click="prevMorningMonth"></text>
                  <picker mode="date" fields="month" :value="morningCalendarDate" @change="onMorningDateChange">
                    <text class="calendar-month">{{ morningYear }}年{{ morningMonth }}月</text>
                  </picker>
                  <text class="iconfont icon-arrow-right" @click="nextMorningMonth"></text>
                </view>
              </view>
              <view class="checkin-calendar">
                <view
                  v-for="item in displayMorningCalendar"
                  :key="item.dateStr"
                  class="checkin-day"
                  :class="{
                    checked: item.checked,
                    today: item.isToday,
                    future: item.isFuture
                  }"
                  @click="toggleCheckin(item)"
                >
                  {{ item.day }}
                </view>
              </view>
              <view class="calendar-legend">
                <view class="legend-item">
                  <view class="legend-dot green"></view>
                  <text>已打卡</text>
                </view>
                <view class="legend-item">
                  <view class="legend-dot orange"></view>
                  <text>今日</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view class="content-wrapper">
          <view class="section-card">
            <view class="card-header">
              <text class="card-title">晨跑历史</text>
            </view>
            <view class="history-list">
              <view v-for="item in morningHistory" :key="item.id" class="history-item" @click="viewHistoryDetail(item)">
                <image class="history-thumb" :src="item.thumb" mode="aspectFill"></image>
                <view class="history-info">
                  <text class="history-date">{{ item.date }} 晨跑</text>
                  <text class="history-detail">{{ item.distance }} · {{ item.duration }} · {{ item.pace }}</text>
                </view>
                <view class="history-status">
                  <text class="status-text">打卡成功</text>
                  <text class="iconfont icon-leaf green"></text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 马拉松训练页面 -->
      <view v-if="currentTab === 'marathon'" class="page-marathon">
        <!-- 地图与跑步控制区 - 统一卡片样式 -->
        <view class="map-section" :class="{ 'running-mode': isMarathonRunning }">
          <map
            id="marathonMap"
            class="map-bg"
            :latitude="currentLocation.latitude"
            :longitude="currentLocation.longitude"
            :scale="14"
            :show-location="true"
            :markers="marathonMapMarkers"
            :polyline="marathonRunPolyline"
          />
          <view class="map-overlay"></view>

          <!-- 普通模式 -->
          <view v-if="!isMarathonRunning" class="normal-mode">
            <view class="climate-card-overlay">
              <view class="climate-left">
                <text class="iconfont icon-wind"></text>
                <view class="climate-info">
                  <text class="climate-label">实时气候</text>
                  <text class="climate-value">{{ marathonWeather }}</text>
                </view>
              </view>
              <view class="climate-right">
                <text class="climate-label">训练强度</text>
                <text class="climate-value orange">{{ trainingIntensity }}</text>
              </view>
            </view>
            <view class="start-btn" @click="startMarathonRunning">
              <text class="iconfont icon-play"></text>
              <text class="btn-text">开始训练</text>
            </view>
          </view>

          <!-- 跑步模式 -->
          <view v-else class="running-panel">
            <view class="run-stats-top">
              <view class="stat-item">
                <text class="stat-label">距离(KM)</text>
                <text class="stat-value">{{ marathonDistance }}</text>
              </view>
              <view class="stat-item">
                <text class="stat-label">配速</text>
                <text class="stat-value">{{ marathonPace }}</text>
              </view>
              <view class="stat-item">
                <text class="stat-label">用时</text>
                <text class="stat-value">{{ marathonDuration }}</text>
              </view>
            </view>
            
            <view class="distance-display">
              <text class="distance-label">目标配速</text>
              <text class="distance-value">{{ targetPace }}</text>
            </view>
            
            <view class="run-actions">
              <view class="action-btn stop-btn" @click="stopMarathonRunning">
                <text class="iconfont icon-stop"></text>
                <text class="btn-label">结束</text>
              </view>
              <view class="action-btn pause-btn" @click="pauseMarathonRunning">
                <text class="iconfont" :class="isMarathonPaused ? 'icon-play' : 'icon-pause'"></text>
                <text class="btn-label">{{ isMarathonPaused ? '继续' : '暂停' }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 快捷操作 -->
        <view class="quick-actions">
          <view class="action-card" @click="navigateTo('plan')">
            <view class="action-icon indigo">
              <text class="iconfont icon-list"></text>
            </view>
            <view class="action-info">
              <text class="action-title">训练计划</text>
              <text class="action-sub">查看今日计划</text>
            </view>
          </view>
          <view class="action-card" @click="navigateTo('stats')">
            <view class="action-icon orange">
              <text class="iconfont icon-chart"></text>
            </view>
            <view class="action-info">
              <text class="action-title">训练分析</text>
              <text class="action-sub">查看详细数据</text>
            </view>
          </view>
        </view>

        <!-- 功能网格 -->
        <view class="content-wrapper">
          <view class="grid-menu">
            <view class="grid-item" @click="navigateTo('academy')">
              <view class="grid-icon blue-bg">
                <text class="iconfont icon-graduation"></text>
              </view>
              <text class="grid-text">马拉松学院</text>
            </view>
            <view class="grid-item" @click="navigateTo('events')">
              <view class="grid-icon orange-bg">
                <text class="iconfont icon-calendar-star"></text>
              </view>
              <text class="grid-text">赛事活动</text>
            </view>
            <view class="grid-item" @click="navigateTo('myMarathon')">
              <view class="grid-icon green-bg">
                <text class="iconfont icon-user-gear"></text>
              </view>
              <text class="grid-text">我的马拉松</text>
            </view>
            <view class="grid-item" @click="navigateTo('training')">
              <view class="grid-icon indigo-bg">
                <text class="iconfont icon-list-check"></text>
              </view>
              <text class="grid-text">训练计划</text>
            </view>
          </view>
        </view>

        <!-- 赛事活动 -->
        <view class="content-wrapper">
          <view class="section-card">
            <view class="card-header">
              <text class="card-title">最新赛事活动</text>
              <text class="view-all" @click="viewAllEvents">更多 <text class="iconfont icon-arrow-right"></text></text>
            </view>
            <view class="events-grid">
              <view v-for="event in marathonEvents" :key="event.id" class="event-card" @click="viewEventDetail(event)">
                <image
                  class="event-img"
                  :src="event.image"
                  mode="aspectFill"
                />
                <view class="event-overlay"></view>
                <view class="event-info">
                  <text class="event-title">{{ event.title }}</text>
                  <text class="event-date">{{ event.status }} · {{ event.date }}</text>
                </view>
                <text v-if="event.hot" class="event-tag">热门</text>
              </view>
            </view>
          </view>
        </view>

        <view class="content-wrapper">
          <view class="two-column">
            <view class="section-card">
              <view class="card-header">
                <text class="card-title">推荐训练计划</text>
              </view>
              <view v-for="plan in trainingPlans" :key="plan.id" class="training-plan" @click="selectTrainingPlan(plan)">
                <view class="plan-icon" :class="plan.color">
                  <text class="iconfont" :class="plan.icon"></text>
                </view>
                <view class="plan-info">
                  <text class="plan-name">{{ plan.name }}</text>
                  <text class="plan-detail">周期: {{ plan.period }} | 难度: {{ plan.difficulty }}</text>
                </view>
                <text class="iconfont icon-plus-circle" :class="plan.color"></text>
              </view>
            </view>

            <view class="section-card">
              <view class="card-header">
                <text class="card-title">训练轨迹</text>
                <view class="calendar-controls">
                  <text class="iconfont icon-arrow-left" @click="prevTrainingMonth"></text>
                  <picker mode="date" fields="month" :value="trainingCalendarDate" @change="onTrainingDateChange">
                    <text class="calendar-month">{{ trainingYear }}年{{ trainingMonth }}月</text>
                  </picker>
                  <text class="iconfont icon-arrow-right" @click="nextTrainingMonth"></text>
                </view>
              </view>
              <view class="training-calendar-grid">
                <view
                  v-for="day in displayTrainingWeek"
                  :key="day.date"
                  class="training-day-item"
                  :class="{ active: day.trained, today: day.isToday }"
                  @click="selectTrainingDate(day)"
                >
                  <text class="day-week">{{ day.week }}</text>
                  <view class="day-circle">
                    {{ day.date }}
                  </view>
                  <view v-if="day.trained" class="day-indicator"></view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 个人档案 -->
        <view class="content-wrapper">
          <view class="profile-card">
            <view class="profile-header">
              <text class="iconfont icon-lightning yellow"></text>
              <text class="profile-title">我的马拉松档案</text>
            </view>
            <view class="profile-stats">
              <view class="profile-pb">
                <text class="pb-label">个人最佳 PB</text>
                <text class="pb-value">{{ personalBest }}</text>
              </view>
              <view class="profile-races">
                <text class="races-label">总参赛次数</text>
                <text class="races-value">{{ totalRaces }}</text>
              </view>
            </view>
            <view class="profile-footer">
              <view class="footer-stat">
                <text class="footer-label">累计完赛里程</text>
                <text class="footer-value">{{ totalRaceDistance }} KM</text>
              </view>
              <view class="footer-stat">
                <text class="footer-label">当前等级</text>
                <text class="footer-value orange">{{ runnerLevel }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部 Tab 栏 -->
    <view class="bottom-tabs">
      <view
        v-for="tab in bottomTabs"
        :key="tab.key"
        class="bottom-tab"
        :class="{ active: currentTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        <text class="iconfont" :class="tab.icon"></text>
        <text class="tab-text">{{ tab.name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
// 扩展 CanvasRenderingContext2D 原型
if (typeof CanvasRenderingContext2D !== 'undefined') {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2
    if (h < 2 * r) r = h / 2
    this.moveTo(x + r, y)
    this.lineTo(x + w - r, y)
    this.quadraticCurveTo(x + w, y, x + w, y + r)
    this.lineTo(x + w, y + h - r)
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    this.lineTo(x + r, y + h)
    this.quadraticCurveTo(x, y + h, x, y + h - r)
    this.lineTo(x, y + r)
    this.quadraticCurveTo(x, y, x + r, y)
    return this
  }
}

export default {
  data() {
    return {
      currentTab: 'campus',
      statusTime: '09:41',
      scrollTop: 0,
      
      // 校园跑状态
      isCampusRunning: false,
      isCampusPaused: false,
      campusRunTime: '00:00:00',
      campusDistance: '0.00',
      campusPace: '00\'00"',
      campusCalories: '0',
      campusTimerInterval: null,
      campusLocationInterval: null,
      campusRunPath: [],
      campusRunPolyline: [],
      
      // 晨跑状态
      isMorningRunning: false,
      isMorningPaused: false,
      morningRunTime: '00:00:00',
      morningTimerInterval: null,
      morningLocationInterval: null,
      morningRunPath: [],
      morningRunPolyline: [],
      morningMapMarkers: [],
      
      // 马拉松状态
      isMarathonRunning: false,
      isMarathonPaused: false,
      marathonRunTime: '00:00:00',
      marathonPace: '00\'00"',
      marathonDuration: '00:00',
      marathonTimerInterval: null,
      marathonLocationInterval: null,
      marathonRunPath: [],
      marathonRunPolyline: [],
      marathonMapMarkers: [],
      
      // 位置和地图相关
      currentLocation: {
        latitude: 39.9042,
        longitude: 116.4074
      },
      mapScale: 15,
      mapMarkers: [],
      
      // 天气相关
      weatherInfo: '加载中...',
      weatherDescription: '加载中...',
      weatherIcon: 'icon-sun',
      marathonWeather: '加载中...',
      trainingIntensity: '适宜 LSD',
      
      // 跑步数据
      totalDistance: '84.5',
      distanceProgress: 65,
      morningRunCount: 18,
      morningProgress: 69,
      carbonReduction: '15.2',
      treesPlanted: '0.8',
      
      // 日历相关
      currentYear: 2026,
      currentMonth: 4,
      calendarDate: '2026-04',
      weekdays: ['一', '二', '三', '四', '五', '六', '日'],
      runRecords: [],
      
      // 晨跑相关
      morningYear: 2026,
      morningMonth: 4,
      morningCalendarDate: '2026-04',
      morningDistance: '0.00',
      morningPace: '00\'00"',
      morningDuration: '00:00',
      morningTotalDistance: '39.41',
      morningPoints: 450,
      morningCheckins: [],
      
      // 马拉松相关
      trainingYear: 2026,
      trainingMonth: 4,
      trainingCalendarDate: '2026-04',
      marathonDistance: '0.00',
      targetPace: '05\'15"',
      personalBest: '03:45:12',
      totalRaces: '05',
      totalRaceDistance: '210.97',
      runnerLevel: '精英跑者',
      
      tabs: [
        { key: 'campus', name: '校园跑' },
        { key: 'morning', name: '晨跑计划' },
        { key: 'marathon', name: '马拉松训练' }
      ],
      bottomTabs: [
        { key: 'campus', name: '校园跑', icon: 'icon-sneaker' },
        { key: 'morning', name: '晨跑计划', icon: 'icon-sun' },
        { key: 'marathon', name: '马拉松训练', icon: 'icon-trophy' }
      ],
      
      planFilter: 'pending',
      plans: [
        { id: 1, name: '燃脂 5KM 慢跑', detail: '建议配速: 06\'00" - 07\'00"', icon: 'icon-fire', color: 'red', status: 'pending' },
        { id: 2, name: '间歇跑训练', detail: '400m x 8组', icon: 'icon-gauge', color: 'orange', status: 'pending' },
        { id: 3, name: '恢复跑', detail: '3KM 轻松跑', icon: 'icon-heart', color: 'green', status: 'pending' }
      ],
      
      achievements: [
        { id: 1, name: '早起鸟', icon: 'icon-medal', bgClass: 'orange-bg', unlocked: true, progress: 100 },
        { id: 2, name: '低碳达人', icon: 'icon-tree', bgClass: 'green-bg', unlocked: true, progress: 100 },
        { id: 3, name: '极速跑者', icon: 'icon-lightning', bgClass: 'blue-bg', unlocked: true, progress: 100 },
        { id: 4, name: '100KM达成', icon: 'icon-target', bgClass: 'gray-bg', unlocked: false, progress: 85 },
        { id: 5, name: '马拉松之星', icon: 'icon-star', bgClass: 'gray-bg', unlocked: false, progress: 40 }
      ],
      
      morningHistory: [
        { id: 1, date: '2026.04.09', distance: '5.20KM', duration: '31:40', pace: '06\'05"', thumb: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
        { id: 2, date: '2026.04.08', distance: '3.80KM', duration: '22:15', pace: '05\'51"', thumb: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
        { id: 3, date: '2026.04.07', distance: '4.50KM', duration: '28:20', pace: '06\'17"', thumb: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' }
      ],
      
      marathonEvents: [
        { id: 1, title: '2026 校园半程马拉松', status: '报名中', date: '04月25日 开启', image: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/3aff83eeb7bc4e4e89e1263d70ba099b.jpg', hot: true },
        { id: 2, title: '城市低碳公益跑', status: '进行中', date: '累计跑量赢好礼', image: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/c70df215739d494b8bb3fe1c2eb3d864.jpg', hot: false }
      ],
      
      trainingPlans: [
        { id: 1, name: 'LSD 耐力提升计划', period: '4周', difficulty: '中等', icon: 'icon-hourglass', color: 'indigo' },
        { id: 2, name: '间歇跑速度训练', period: '2周', difficulty: '困难', icon: 'icon-gauge', color: 'red' }
      ]
    }
  },
  
  computed: {
    filteredPlans() {
      return this.plans.filter(p => p.status === this.planFilter)
    },
    
    displayCalendarDays() {
      const days = []
      const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1)
      const lastDay = new Date(this.currentYear, this.currentMonth, 0)
      const startWeekday = firstDay.getDay() || 7
      
      const prevMonthLastDay = new Date(this.currentYear, this.currentMonth - 1, 0).getDate()
      for (let i = startWeekday - 1; i > 0; i--) {
        days.push({
          date: prevMonthLastDay - i + 1,
          isCurrentMonth: false,
          hasRun: this.hasRunRecord(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i + 1),
          isToday: false
        })
      }
      
      const today = new Date()
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
          date: i,
          isCurrentMonth: true,
          hasRun: this.hasRunRecord(this.currentYear, this.currentMonth, i),
          isToday: today.getFullYear() === this.currentYear && 
                   today.getMonth() + 1 === this.currentMonth && 
                   today.getDate() === i
        })
      }
      
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          isCurrentMonth: false,
          hasRun: this.hasRunRecord(this.currentYear, this.currentMonth + 1, i),
          isToday: false
        })
      }
      
      return days
    },
    
    displayMorningCalendar() {
      const days = []
      const today = new Date()
      const year = this.morningYear
      const month = this.morningMonth
      
      for (let i = 1; i <= 12; i++) {
        const date = new Date(year, month - 1, i)
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`
        const isChecked = this.morningCheckins.includes(dateStr)
        const isToday = today.getFullYear() === year && 
                       today.getMonth() + 1 === month && 
                       today.getDate() === i
        const isFuture = date > today
        
        days.push({
          day: i,
          dateStr,
          checked: isChecked,
          isToday,
          isFuture
        })
      }
      
      return days
    },
    
    displayTrainingWeek() {
      const days = []
      const today = new Date()
      const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(this.trainingYear, this.trainingMonth - 1, i + 6)
        days.push({
          week: weekdays[i],
          date: date.getDate(),
          trained: this.hasTrainingRecord(date),
          isToday: date.toDateString() === today.toDateString()
        })
      }
      
      return days
    }
  },
  
  mounted() {
    this.updateStatusTime()
    this.getCurrentLocation()
    this.getWeatherInfo()
    this.loadRunRecords()
    this.loadMorningCheckins()
    this.$nextTick(() => {
      this.initChart()
    })
    
    setInterval(() => {
      this.updateStatusTime()
    }, 60000)
  },
  
  beforeDestroy() {
    this.stopAllTimers()
  },
  
  methods: {
    switchTab(key) {
      this.currentTab = key
      this.scrollTop = 0
      if (key === 'campus') {
        this.$nextTick(() => {
          this.initChart()
        })
      }
    },
    
    updateStatusTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      this.statusTime = `${hours}:${minutes}`
    },
    
    stopAllTimers() {
      if (this.campusTimerInterval) clearInterval(this.campusTimerInterval)
      if (this.campusLocationInterval) clearInterval(this.campusLocationInterval)
      if (this.morningTimerInterval) clearInterval(this.morningTimerInterval)
      if (this.morningLocationInterval) clearInterval(this.morningLocationInterval)
      if (this.marathonTimerInterval) clearInterval(this.marathonTimerInterval)
      if (this.marathonLocationInterval) clearInterval(this.marathonLocationInterval)
    },
    
    getCurrentLocation() {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.currentLocation = {
            latitude: res.latitude,
            longitude: res.longitude
          }
          this.mapMarkers = [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/static/location.png',
            width: 30,
            height: 30
          }]
        },
        fail: () => {
          uni.showToast({
            title: '获取位置失败',
            icon: 'none'
          })
        }
      })
    },
    
    getWeatherInfo() {
      uni.request({
        url: 'https://api.open-meteo.com/v1/forecast',
        data: {
          latitude: this.currentLocation.latitude,
          longitude: this.currentLocation.longitude,
          current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m',
          timezone: 'Asia/Shanghai'
        },
        success: (res) => {
          if (res.data && res.data.current) {
            const weather = res.data.current
            const temp = Math.round(weather.temperature_2m)
            const humidity = weather.relative_humidity_2m
            const windSpeed = weather.wind_speed_10m
            const windDir = this.getWindDirection(weather.wind_direction_10m)
            const weatherText = this.getWeatherText(weather.weather_code)
            
            this.weatherInfo = `${temp}℃ · ${weatherText}`
            this.weatherDescription = `${temp}℃ · ${weatherText} · 湿度${humidity}%`
            this.marathonWeather = `${temp}℃ · 湿度 ${humidity}% · ${windDir} ${windSpeed}级`
            this.updateWeatherIcon(weather.weather_code)
            this.updateTrainingIntensity(temp, humidity, windSpeed)
          }
        },
        fail: () => {
          this.weatherInfo = '22℃ · 晴'
          this.weatherDescription = '18℃ · 晴 · 湿度45%'
          this.marathonWeather = '22℃ · 湿度 45% · 西北风 2级'
          this.weatherIcon = 'icon-sun'
          this.trainingIntensity = '适宜 LSD'
        }
      })
    },
    
    getWindDirection(degrees) {
      const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
      const index = Math.round(degrees / 45) % 8
      return directions[index]
    },
    
    getWeatherText(code) {
      if (code <= 3) return '晴'
      if (code <= 49) return '多云'
      if (code <= 59) return '小雨'
      if (code <= 69) return '中雨'
      if (code <= 79) return '雪'
      if (code <= 82) return '雨'
      return '阴'
    },
    
    updateWeatherIcon(code) {
      if (code <= 3) this.weatherIcon = 'icon-sun'
      else if (code <= 49) this.weatherIcon = 'icon-cloud'
      else if (code <= 69) this.weatherIcon = 'icon-rain'
      else if (code <= 79) this.weatherIcon = 'icon-snow'
      else this.weatherIcon = 'icon-cloudy'
    },
    
    updateTrainingIntensity(temp, humidity, windSpeed) {
      if (temp >= 15 && temp <= 25 && humidity <= 60 && windSpeed <= 3) {
        this.trainingIntensity = '适宜 LSD'
      } else if (temp > 25 || humidity > 70 || windSpeed > 4) {
        this.trainingIntensity = '建议减量'
      } else {
        this.trainingIntensity = '可正常训练'
      }
    },
    
    // 校园跑方法
    startCampusRunning() {
      this.isCampusRunning = true
      this.isCampusPaused = false
      this.campusRunTime = '00:00:00'
      this.campusDistance = '0.00'
      this.campusPace = '00\'00"'
      this.campusCalories = '0'
      this.campusRunPath = [this.currentLocation]
      this.campusRunPolyline = []
      
      this.startCampusTimer()
      this.startCampusLocationTracking()
    },
    
    stopCampusRunning() {
      this.isCampusRunning = false
      this.isCampusPaused = false
      if (this.campusTimerInterval) {
        clearInterval(this.campusTimerInterval)
        this.campusTimerInterval = null
      }
      if (this.campusLocationInterval) {
        clearInterval(this.campusLocationInterval)
        this.campusLocationInterval = null
      }
      
      if (parseFloat(this.campusDistance) > 0.1) {
        this.saveCampusRunRecord()
      }
    },
    
    pauseCampusRunning() {
      this.isCampusPaused = !this.isCampusPaused
    },
    
    startCampusTimer() {
      if (this.campusTimerInterval) clearInterval(this.campusTimerInterval)
      this.campusTimerInterval = setInterval(() => {
        if (!this.isCampusPaused) {
          const timeParts = this.campusRunTime.split(':')
          let hours = parseInt(timeParts[0])
          let minutes = parseInt(timeParts[1])
          let seconds = parseInt(timeParts[2])
          seconds++
          if (seconds >= 60) {
            seconds = 0
            minutes++
            if (minutes >= 60) {
              minutes = 0
              hours++
            }
          }
          this.campusRunTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          this.updateCampusPace()
        }
      }, 1000)
    },
    
    startCampusLocationTracking() {
      this.campusLocationInterval = setInterval(() => {
        uni.getLocation({
          type: 'gcj02',
          success: (res) => {
            const newLocation = {
              latitude: res.latitude,
              longitude: res.longitude
            }
            this.campusRunPath.push(newLocation)
            this.currentLocation = newLocation
            this.updateCampusMapPolyline()
            this.calculateCampusDistance()
            this.calculateCampusCalories()
          }
        })
      }, 3000)
    },
    
    updateCampusMapPolyline() {
      if (this.campusRunPath.length > 1) {
        this.campusRunPolyline = [{
          points: this.campusRunPath,
          color: '#22C55E',
          width: 4,
          arrowLine: true
        }]
      }
    },
    
    calculateCampusDistance() {
      let distance = 0
      for (let i = 1; i < this.campusRunPath.length; i++) {
        distance += this.getDistance(this.campusRunPath[i-1], this.campusRunPath[i])
      }
      this.campusDistance = distance.toFixed(2)
    },
    
    getDistance(p1, p2) {
      const R = 6371
      const dLat = (p2.latitude - p1.latitude) * Math.PI / 180
      const dLon = (p2.longitude - p1.longitude) * Math.PI / 180
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(p1.latitude * Math.PI / 180) * Math.cos(p2.latitude * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      return R * c
    },
    
    updateCampusPace() {
      const distance = parseFloat(this.campusDistance)
      if (distance > 0) {
        const timeParts = this.campusRunTime.split(':')
        const totalSeconds = parseInt(timeParts[0]) * 3600 + 
                            parseInt(timeParts[1]) * 60 + 
                            parseInt(timeParts[2])
        const paceSeconds = totalSeconds / distance
        const paceMinutes = Math.floor(paceSeconds / 60)
        const paceRemainingSeconds = Math.floor(paceSeconds % 60)
        this.campusPace = `${paceMinutes.toString().padStart(2, '0')}'${paceRemainingSeconds.toString().padStart(2, '0')}"`
      }
    },
    
    calculateCampusCalories() {
      const distance = parseFloat(this.campusDistance)
      const calories = distance * 60
      this.campusCalories = Math.floor(calories).toString()
    },
    
    saveCampusRunRecord() {
      const today = new Date()
      const record = {
        date: `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
        distance: this.campusDistance,
        duration: this.campusRunTime,
        pace: this.campusPace,
        calories: this.campusCalories
      }
      
      this.runRecords.push(record)
      try {
        uni.setStorageSync('runRecords', JSON.stringify(this.runRecords))
      } catch (e) {
        console.error('保存失败', e)
      }
      
      this.totalDistance = (parseFloat(this.totalDistance) + parseFloat(this.campusDistance)).toFixed(1)
      this.distanceProgress = Math.min(100, Math.round(parseFloat(this.totalDistance) / 130 * 100))
      this.carbonReduction = (parseFloat(this.totalDistance) * 0.18).toFixed(1)
      this.treesPlanted = (parseFloat(this.totalDistance) * 0.01).toFixed(1)
      
      uni.showToast({
        title: '跑步记录已保存',
        icon: 'success'
      })
    },
    
    // 晨跑方法
    startMorningRunning() {
      this.isMorningRunning = true
      this.isMorningPaused = false
      this.morningDistance = '0.00'
      this.morningPace = '00\'00"'
      this.morningDuration = '00:00'
      this.morningRunPath = [this.currentLocation]
      this.morningRunPolyline = []
      this.morningMapMarkers = [{
        id: 1,
        latitude: this.currentLocation.latitude,
        longitude: this.currentLocation.longitude,
        iconPath: '/static/location.png',
        width: 30,
        height: 30
      }]
      
      this.startMorningTimer()
      this.startMorningLocationTracking()
    },
    
    stopMorningRunning() {
      this.isMorningRunning = false
      this.isMorningPaused = false
      if (this.morningTimerInterval) {
        clearInterval(this.morningTimerInterval)
        this.morningTimerInterval = null
      }
      if (this.morningLocationInterval) {
        clearInterval(this.morningLocationInterval)
        this.morningLocationInterval = null
      }
      
      if (parseFloat(this.morningDistance) > 0.1) {
        this.saveMorningRunRecord()
      }
    },
    
    pauseMorningRunning() {
      this.isMorningPaused = !this.isMorningPaused
    },
    
    startMorningTimer() {
      if (this.morningTimerInterval) clearInterval(this.morningTimerInterval)
      let seconds = 0
      this.morningTimerInterval = setInterval(() => {
        if (!this.isMorningPaused) {
          seconds++
          const mins = Math.floor(seconds / 60)
          const secs = seconds % 60
          this.morningDuration = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
          this.updateMorningPace()
        }
      }, 1000)
    },
    
    startMorningLocationTracking() {
      this.morningLocationInterval = setInterval(() => {
        uni.getLocation({
          type: 'gcj02',
          success: (res) => {
            const newLocation = {
              latitude: res.latitude,
              longitude: res.longitude
            }
            this.morningRunPath.push(newLocation)
            this.currentLocation = newLocation
            this.updateMorningMapPolyline()
            this.calculateMorningDistance()
          }
        })
      }, 3000)
    },
    
    updateMorningMapPolyline() {
      if (this.morningRunPath.length > 1) {
        this.morningRunPolyline = [{
          points: this.morningRunPath,
          color: '#F97316',
          width: 4,
          arrowLine: true
        }]
      }
    },
    
    calculateMorningDistance() {
      let distance = 0
      for (let i = 1; i < this.morningRunPath.length; i++) {
        distance += this.getDistance(this.morningRunPath[i-1], this.morningRunPath[i])
      }
      this.morningDistance = distance.toFixed(2)
    },
    
    updateMorningPace() {
      const distance = parseFloat(this.morningDistance)
      if (distance > 0) {
        const timeParts = this.morningDuration.split(':')
        const totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1])
        const paceSeconds = totalSeconds / distance
        const paceMinutes = Math.floor(paceSeconds / 60)
        const paceRemainingSeconds = Math.floor(paceSeconds % 60)
        this.morningPace = `${paceMinutes.toString().padStart(2, '0')}'${paceRemainingSeconds.toString().padStart(2, '0')}"`
      }
    },
    
    saveMorningRunRecord() {
      const today = new Date()
      const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
      
      if (!this.morningCheckins.includes(dateStr)) {
        this.morningCheckins.push(dateStr)
        try {
          uni.setStorageSync('morningCheckins', JSON.stringify(this.morningCheckins))
        } catch (e) {
          console.error('保存失败', e)
        }
      }
      
      this.morningTotalDistance = (parseFloat(this.morningTotalDistance) + parseFloat(this.morningDistance)).toFixed(2)
      this.morningPoints += Math.floor(parseFloat(this.morningDistance) * 10)
      
      uni.showToast({
        title: '晨跑完成！',
        icon: 'success'
      })
    },
    
    morningPunch() {
      this.punchMorning()
    },
    
    viewMorningStats() {
      uni.showToast({
        title: '查看统计数据',
        icon: 'none'
      })
    },
    
    // 马拉松方法
    startMarathonRunning() {
      this.isMarathonRunning = true
      this.isMarathonPaused = false
      this.marathonDistance = '0.00'
      this.marathonPace = '00\'00"'
      this.marathonDuration = '00:00'
      this.marathonRunPath = [this.currentLocation]
      this.marathonRunPolyline = []
      this.marathonMapMarkers = [{
        id: 1,
        latitude: this.currentLocation.latitude,
        longitude: this.currentLocation.longitude,
        iconPath: '/static/location.png',
        width: 30,
        height: 30
      }]
      
      this.startMarathonTimer()
      this.startMarathonLocationTracking()
    },
    
    stopMarathonRunning() {
      this.isMarathonRunning = false
      this.isMarathonPaused = false
      if (this.marathonTimerInterval) {
        clearInterval(this.marathonTimerInterval)
        this.marathonTimerInterval = null
      }
      if (this.marathonLocationInterval) {
        clearInterval(this.marathonLocationInterval)
        this.marathonLocationInterval = null
      }
      
      if (parseFloat(this.marathonDistance) > 0.1) {
        this.saveMarathonRunRecord()
      }
    },
    
    pauseMarathonRunning() {
      this.isMarathonPaused = !this.isMarathonPaused
    },
    
    startMarathonTimer() {
      if (this.marathonTimerInterval) clearInterval(this.marathonTimerInterval)
      let seconds = 0
      this.marathonTimerInterval = setInterval(() => {
        if (!this.isMarathonPaused) {
          seconds++
          const mins = Math.floor(seconds / 60)
          const secs = seconds % 60
          this.marathonDuration = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
          this.updateMarathonPace()
        }
      }, 1000)
    },
    
    startMarathonLocationTracking() {
      this.marathonLocationInterval = setInterval(() => {
        uni.getLocation({
          type: 'gcj02',
          success: (res) => {
            const newLocation = {
              latitude: res.latitude,
              longitude: res.longitude
            }
            this.marathonRunPath.push(newLocation)
            this.currentLocation = newLocation
            this.updateMarathonMapPolyline()
            this.calculateMarathonDistance()
          }
        })
      }, 3000)
    },
    
    updateMarathonMapPolyline() {
      if (this.marathonRunPath.length > 1) {
        this.marathonRunPolyline = [{
          points: this.marathonRunPath,
          color: '#3B82F6',
          width: 4,
          arrowLine: true
        }]
      }
    },
    
    calculateMarathonDistance() {
      let distance = 0
      for (let i = 1; i < this.marathonRunPath.length; i++) {
        distance += this.getDistance(this.marathonRunPath[i-1], this.marathonRunPath[i])
      }
      this.marathonDistance = distance.toFixed(2)
    },
    
    updateMarathonPace() {
      const distance = parseFloat(this.marathonDistance)
      if (distance > 0) {
        const timeParts = this.marathonDuration.split(':')
        const totalSeconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1])
        const paceSeconds = totalSeconds / distance
        const paceMinutes = Math.floor(paceSeconds / 60)
        const paceRemainingSeconds = Math.floor(paceSeconds % 60)
        this.marathonPace = `${paceMinutes.toString().padStart(2, '0')}'${paceRemainingSeconds.toString().padStart(2, '0')}"`
      }
    },
    
    saveMarathonRunRecord() {
      uni.showToast({
        title: '训练完成！',
        icon: 'success'
      })
    },
    
    // 日历方法
    onDateChange(e) {
      const date = e.detail.value
      const [year, month] = date.split('-')
      this.currentYear = parseInt(year)
      this.currentMonth = parseInt(month)
      this.calendarDate = date
    },
    
    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12
        this.currentYear--
      } else {
        this.currentMonth--
      }
      this.calendarDate = `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}`
    },
    
    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1
        this.currentYear++
      } else {
        this.currentMonth++
      }
      this.calendarDate = `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}`
    },
    
    selectDate(item) {
      if (item.hasRun) {
        uni.showToast({
          title: `${item.date}日 已运动`,
          icon: 'success'
        })
      }
    },
    
    hasRunRecord(year, month, day) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      return this.runRecords.some(r => r.date === dateStr)
    },
    
    loadRunRecords() {
      try {
        const records = uni.getStorageSync('runRecords')
        if (records) {
          this.runRecords = JSON.parse(records)
        }
      } catch (e) {
        console.error('加载失败', e)
      }
    },
    
    onMorningDateChange(e) {
      const date = e.detail.value
      const [year, month] = date.split('-')
      this.morningYear = parseInt(year)
      this.morningMonth = parseInt(month)
      this.morningCalendarDate = date
    },
    
    prevMorningMonth() {
      if (this.morningMonth === 1) {
        this.morningMonth = 12
        this.morningYear--
      } else {
        this.morningMonth--
      }
      this.morningCalendarDate = `${this.morningYear}-${this.morningMonth.toString().padStart(2, '0')}`
    },
    
    nextMorningMonth() {
      if (this.morningMonth === 12) {
        this.morningMonth = 1
        this.morningYear++
      } else {
        this.morningMonth++
      }
      this.morningCalendarDate = `${this.morningYear}-${this.morningMonth.toString().padStart(2, '0')}`
    },
    
    punchMorning() {
      const today = new Date()
      const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
      
      if (!this.morningCheckins.includes(dateStr)) {
        this.morningCheckins.push(dateStr)
        try {
          uni.setStorageSync('morningCheckins', JSON.stringify(this.morningCheckins))
        } catch (e) {
          console.error('保存失败', e)
        }
        
        uni.showToast({
          title: '打卡成功！',
          icon: 'success'
        })
      } else {
        uni.showToast({
          title: '今日已打卡',
          icon: 'none'
        })
      }
    },
    
    toggleCheckin(item) {
      if (item.isFuture) {
        uni.showToast({
          title: '不能提前打卡',
          icon: 'none'
        })
        return
      }
      
      if (!item.checked) {
        this.morningCheckins.push(item.dateStr)
      } else {
        const index = this.morningCheckins.indexOf(item.dateStr)
        if (index > -1) {
          this.morningCheckins.splice(index, 1)
        }
      }
      
      try {
        uni.setStorageSync('morningCheckins', JSON.stringify(this.morningCheckins))
      } catch (e) {
        console.error('保存失败', e)
      }
      
      uni.showToast({
        title: item.checked ? '取消打卡' : '打卡成功',
        icon: 'success'
      })
    },
    
    loadMorningCheckins() {
      try {
        const checkins = uni.getStorageSync('morningCheckins')
        if (checkins) {
          this.morningCheckins = JSON.parse(checkins)
        }
      } catch (e) {
        console.error('加载失败', e)
      }
    },
    
    onTrainingDateChange(e) {
      const date = e.detail.value
      const [year, month] = date.split('-')
      this.trainingYear = parseInt(year)
      this.trainingMonth = parseInt(month)
      this.trainingCalendarDate = date
    },
    
    prevTrainingMonth() {
      if (this.trainingMonth === 1) {
        this.trainingMonth = 12
        this.trainingYear--
      } else {
        this.trainingMonth--
      }
      this.trainingCalendarDate = `${this.trainingYear}-${this.trainingMonth.toString().padStart(2, '0')}`
    },
    
    nextTrainingMonth() {
      if (this.trainingMonth === 12) {
        this.trainingMonth = 1
        this.trainingYear++
      } else {
        this.trainingMonth++
      }
      this.trainingCalendarDate = `${this.trainingYear}-${this.trainingMonth.toString().padStart(2, '0')}`
    },
    
    hasTrainingRecord(date) {
      return Math.random() > 0.5
    },
    
    // 通用方法
    bindDevice() {
      uni.showToast({
        title: '正在连接设备...',
        icon: 'loading'
      })
    },
    
    manualRecord() {
      uni.showToast({
        title: '手动记录功能开发中',
        icon: 'none'
      })
    },
    
    filterPlans(type) {
      this.planFilter = type
    },
    
    createNewPlan() {
      uni.showToast({
        title: '创建新计划',
        icon: 'none'
      })
    },
    
    selectPlan(plan) {
      uni.showToast({
        title: `选择计划: ${plan.name}`,
        icon: 'none'
      })
    },
    
    viewAllAchievements() {
      uni.showToast({
        title: '查看全部成就',
        icon: 'none'
      })
    },
    
    viewHistoryDetail(item) {
      uni.showToast({
        title: `查看${item.date}详情`,
        icon: 'none'
      })
    },
    
    navigateTo(page) {
      uni.showToast({
        title: `跳转到${page}`,
        icon: 'none'
      })
    },
    
    viewAllEvents() {
      uni.showToast({
        title: '查看更多赛事',
        icon: 'none'
      })
    },
    
    viewEventDetail(event) {
      uni.showToast({
        title: event.title,
        icon: 'none'
      })
    },
    
    selectTrainingPlan(plan) {
      uni.showToast({
        title: `选择${plan.name}`,
        icon: 'none'
      })
    },
    
    selectTrainingDate(day) {
      if (day.trained) {
        uni.showToast({
          title: `${day.date}日 已训练`,
          icon: 'success'
        })
      }
    },
    
    onMapUpdated(e) {},
    
    handleScroll(e) {},
    
    initChart() {
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#runChart')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (res && res[0]) {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            const dpr = uni.getSystemInfoSync().pixelRatio
            canvas.width = res[0].width * dpr
            canvas.height = res[0].height * dpr
            ctx.scale(dpr, dpr)

            const data = [3.2, 5.4, 2.1, 4.8, 6.2, 8.5, 4.1]
            const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            const barWidth = Math.max(8, Math.min(16, (res[0].width - 60) / 7 - 6))
            const maxValue = Math.max(...data)
            const chartHeight = 90
            const baseY = 110

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.beginPath()
            ctx.strokeStyle = '#eee'
            ctx.lineWidth = 1
            ctx.moveTo(25, 20)
            ctx.lineTo(25, baseY)
            ctx.lineTo(canvas.width / dpr - 10, baseY)
            ctx.stroke()

            data.forEach((value, index) => {
              const barHeight = (value / maxValue) * chartHeight
              const x = 30 + index * (barWidth + 6)
              const y = baseY - barHeight

              const gradient = ctx.createLinearGradient(0, y, 0, baseY)
              gradient.addColorStop(0, '#22C55E')
              gradient.addColorStop(1, '#86efac')
              ctx.fillStyle = gradient

              ctx.beginPath()
              if (ctx.roundRect) {
                ctx.roundRect(x, y, barWidth, barHeight, 3)
              } else {
                ctx.fillRect(x, y, barWidth, barHeight)
              }
              ctx.fill()

              ctx.fillStyle = '#999'
              ctx.font = '9px sans-serif'
              ctx.textAlign = 'center'
              ctx.fillText(labels[index], x + barWidth / 2, baseY + 12)
            })
          }
        })
    },
    
    touchChart(e) {}
  }
}
</script>

<style>
/* 全局样式 - 保持与之前相同 */
page {
  background-color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9fafb;
  position: relative;
  display: flex;
  flex-direction: column;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 16px 6px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.time {
  font-size: 14px;
  font-weight: bold;
  color: #1f2937;
}

.status-icons {
  display: flex;
  gap: 4px;
}

.top-tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  background-color: #ffffff;
  border-bottom: 1px solid #f3f4f6;
  padding: 0 16px;
}

.tab-item {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 13px;
  color: #9ca3af;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.tab-item.active {
  color: #22c55e;
  border-bottom-color: #22c55e;
  font-weight: bold;
}

.content-scroll {
  flex: 1;
  height: calc(100vh - 150px);
}

.content-wrapper {
  width: 100%;
  padding: 0 12px;
  box-sizing: border-box;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.section-card {
  background-color: #ffffff;
  border-radius: 14px;
  padding: 14px;
  margin: 10px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #1f2937;
}

.card-sub {
  font-size: 10px;
  color: #9ca3af;
}

.badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
}

.badge.green {
  background-color: #dcfce7;
  color: #16a34a;
}

/* 统一的地图卡片样式 */
.map-section {
  width: calc(100% - 24px);
  margin: 0 12px;
  height: 260px;
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  box-sizing: border-box;
}

.map-bg {
  width: 100%;
  height: 100%;
}

.map-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
}

.normal-mode {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}

.normal-mode .start-btn,
.normal-mode .weather-card-overlay,
.normal-mode .climate-card-overlay {
  pointer-events: auto;
}

.start-btn {
  width: 80px;
  height: 80px;
  background-color: #22c55e;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.4);
  border: 3px solid #ffffff;
  transition: transform 0.1s;
  cursor: pointer;
}

.start-btn:active {
  transform: scale(0.95);
}

.btn-text {
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
}

.weather-tag {
  margin-top: 12px;
  padding: 4px 12px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  color: #ffffff;
  font-size: 12px;
  pointer-events: auto;
}

/* 天气卡片叠加层 */
.weather-card-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.climate-card-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  background-color: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
}

.weather-left,
.climate-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.weather-info,
.climate-info {
  display: flex;
  flex-direction: column;
}

.weather-label,
.climate-label {
  font-size: 10px;
  color: #6b7280;
  font-weight: bold;
  text-transform: uppercase;
}

.climate-label {
  color: #9ca3af;
}

.weather-value,
.climate-value {
  font-size: 12px;
  font-weight: bold;
}

.climate-value {
  font-size: 11px;
}

.climate-value.orange {
  color: #f97316;
}

.climate-right {
  text-align: right;
}

/* 统一的跑步模式面板 */
.running-panel {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  z-index: 20;
  pointer-events: auto;
}

.run-stats-top {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 8px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  font-family: 'DIN Condensed', sans-serif;
  line-height: 1.2;
}

.distance-display {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.distance-label {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.distance-value {
  font-size: 52px;
  font-weight: 800;
  color: #4ade80;
  font-family: 'DIN Condensed', sans-serif;
  line-height: 1.2;
}

.distance-unit {
  font-size: 16px;
  color: #9ca3af;
  margin-left: 4px;
}

.run-actions {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  padding-bottom: 8px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.stop-btn,
.pause-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s;
}

.stop-btn {
  background-color: #ef4444;
  color: #ffffff;
}

.pause-btn {
  background-color: #f97316;
  color: #ffffff;
}

.stop-btn:active,
.pause-btn:active {
  transform: scale(0.9);
}

.btn-label {
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
}

/* 快捷操作 */
.quick-actions {
  width: calc(100% - 24px);
  margin: -25px 12px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  position: relative;
  z-index: 5;
  box-sizing: border-box;
}

.action-card {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  box-sizing: border-box;
}

.action-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon.blue {
  background-color: #dbeafe;
  color: #2563eb;
}

.action-icon.orange {
  background-color: #ffedd5;
  color: #ea580c;
}

.action-icon.green {
  background-color: #dcfce7;
  color: #16a34a;
}

.action-icon.indigo {
  background-color: #eef2ff;
  color: #4f46e5;
}

.action-info {
  display: flex;
  flex-direction: column;
}

.action-title {
  font-size: 12px;
  font-weight: bold;
}

.action-sub {
  font-size: 10px;
  color: #6b7280;
}

/* 进度条 */
.progress-item {
  margin-bottom: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 5px;
}

.progress-label {
  color: #6b7280;
}

.progress-value {
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-fill.green {
  background-color: #22c55e;
}

.progress-fill.orange {
  background-color: #f97316;
}

.carbon-tip {
  margin-top: 12px;
  font-size: 10px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 计划 */
.plan-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.plan-tabs-left {
  display: flex;
  gap: 16px;
}

.plan-tab {
  font-size: 13px;
  font-weight: bold;
  color: #9ca3af;
  cursor: pointer;
  padding-bottom: 3px;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.plan-tab.active {
  color: #f97316;
  border-bottom-color: #f97316;
}

.new-plan-btn {
  font-size: 11px;
  color: #2563eb;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.plan-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9fafb;
  border-radius: 10px;
  margin-bottom: 6px;
  cursor: pointer;
}

.plan-item:last-child {
  margin-bottom: 0;
}

.plan-icon {
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border: 1px solid #f3f4f6;
}

.plan-info {
  flex: 1;
}

.plan-name {
  font-size: 12px;
  font-weight: bold;
  display: block;
  margin-bottom: 2px;
}

.plan-detail {
  font-size: 10px;
  color: #9ca3af;
}

/* 图表 */
.chart-container {
  width: 100%;
  height: 140px;
}

.run-chart {
  width: 100%;
  height: 100%;
}

/* 日历 */
.calendar-card {
  padding: 12px;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.calendar-month {
  font-size: 11px;
  font-weight: bold;
  color: #1f2937;
  min-width: 70px;
  text-align: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  text-align: center;
}

.weekday {
  font-size: 9px;
  color: #9ca3af;
  margin-bottom: 5px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  position: relative;
  border-radius: 5px;
  background-color: #f9fafb;
  cursor: pointer;
  padding: 2px;
}

.day-cell.empty {
  color: #d1d5db;
}

.day-cell.active {
  background-color: #dcfce7;
  color: #16a34a;
  font-weight: bold;
}

.day-cell.today {
  background-color: #22c55e;
  color: #ffffff;
  font-weight: bold;
}

.day-dot {
  position: absolute;
  bottom: 2px;
  width: 3px;
  height: 3px;
  background-color: #22c55e;
  border-radius: 50%;
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  color: #6b7280;
}

.legend-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.legend-dot.green {
  background-color: #22c55e;
}

.legend-dot.orange {
  background-color: #f97316;
}

/* 成就 */
.achievement-card {
  padding: 14px;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.achievement-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.achievement-icon.orange-bg {
  background-color: #fff7ed;
  color: #f97316;
}

.achievement-icon.green-bg {
  background-color: #f0fdf4;
  color: #22c55e;
}

.achievement-icon.blue-bg {
  background-color: #eff6ff;
  color: #3b82f6;
}

.achievement-icon.gray-bg {
  background-color: #f3f4f6;
  color: #9ca3af;
}

.achievement-item.disabled .achievement-icon {
  opacity: 0.5;
}

.achievement-name {
  font-size: 10px;
  font-weight: bold;
  text-align: center;
}

.achievement-item.disabled .achievement-name {
  color: #9ca3af;
}

.achievement-progress {
  font-size: 8px;
  color: #9ca3af;
  margin-top: 2px;
}

/* 晨跑页面特有样式 */
.segmented-progress {
  display: flex;
  height: 12px;
  gap: 2px;
  margin-bottom: 16px;
}

.progress-segment {
  height: 100%;
  background-color: #f3f4f6;
  transition: all 0.3s;
}

.progress-segment.filled {
  background-color: #f97316;
}

.progress-segment.half {
  background-color: #f97316;
}

.progress-segment.empty {
  background-color: #e5e7eb;
}

.stats-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-box {
  background-color: #f9fafb;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #f3f4f6;
}

.stat-box-label {
  display: block;
  font-size: 10px;
  color: #9ca3af;
  margin-bottom: 6px;
}

.stat-box-value {
  font-size: 20px;
  font-weight: 800;
  color: #1e293b;
  font-family: 'DIN Condensed', sans-serif;
}

.stat-box-value.green {
  color: #16a34a;
}

.checkin-calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.checkin-day {
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  background-color: #f9fafb;
  cursor: pointer;
  transition: all 0.2s;
}

.checkin-day.checked {
  background-color: #f0fdf4;
  color: #16a34a;
  font-weight: bold;
  border: 1px solid #bbf7d0;
}

.checkin-day.today {
  background-color: #f97316;
  color: #ffffff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(249, 115, 22, 0.3);
}

.checkin-day.future {
  border: 1px dashed #e5e7eb;
  color: #9ca3af;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  cursor: pointer;
}

.history-thumb {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f3f4f6;
}

.history-info {
  flex: 1;
}

.history-date {
  font-size: 12px;
  font-weight: bold;
  display: block;
  margin-bottom: 3px;
}

.history-detail {
  font-size: 10px;
  color: #9ca3af;
}

.history-status {
  text-align: right;
}

.status-text {
  display: block;
  font-size: 10px;
  color: #16a34a;
  font-weight: bold;
  margin-bottom: 3px;
}

/* 马拉松页面特有样式 */
.grid-menu {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px 0 16px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.grid-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.grid-icon.blue-bg {
  background-color: #eff6ff;
  color: #2563eb;
}

.grid-icon.orange-bg {
  background-color: #fff7ed;
  color: #ea580c;
}

.grid-icon.green-bg {
  background-color: #f0fdf4;
  color: #16a34a;
}

.grid-icon.indigo-bg {
  background-color: #eef2ff;
  color: #4f46e5;
}

.grid-text {
  font-size: 11px;
  font-weight: bold;
}

.events-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.event-card {
  position: relative;
  height: 130px;
  border-radius: 14px;
  overflow: hidden;
  background-color: #0f172a;
  cursor: pointer;
}

.event-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
}

.event-info {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  color: #ffffff;
  z-index: 2;
}

.event-title {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
}

.event-date {
  font-size: 9px;
  opacity: 0.9;
}

.event-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #f97316;
  color: #ffffff;
  font-size: 8px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 10px;
  z-index: 2;
}

.training-plan {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #f3f4f6;
  margin-bottom: 10px;
  cursor: pointer;
}

.training-plan:last-child {
  margin-bottom: 0;
}

.plan-icon.indigo {
  background-color: #eef2ff;
  color: #4f46e5;
}

.plan-icon.red {
  background-color: #fef2f2;
  color: #ef4444;
}

.icon-plus-circle.indigo {
  color: #4f46e5;
  cursor: pointer;
}

.icon-plus-circle.red {
  color: #ef4444;
  cursor: pointer;
}

.training-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.training-day-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.day-week {
  font-size: 9px;
  color: #9ca3af;
  margin-bottom: 5px;
}

.day-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

.training-day-item.active .day-circle {
  background-color: #eef2ff;
  border: 2px solid #c7d2fe;
  color: #4f46e5;
}

.training-day-item.today .day-circle {
  background-color: #22c55e;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(34, 197, 94, 0.3);
}

.training-day-item.today .day-week {
  color: #22c55e;
  font-weight: bold;
}

.day-indicator {
  width: 3px;
  height: 3px;
  background-color: #22c55e;
  border-radius: 50%;
  margin-top: 3px;
}

.profile-card {
  background-color: #0f172a;
  border-radius: 20px;
  padding: 20px;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 10px 0;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.profile-title {
  font-size: 15px;
  font-weight: bold;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 18px;
}

.profile-pb {
  flex: 1;
}

.pb-label {
  display: block;
  font-size: 9px;
  color: #9ca3af;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.pb-value {
  font-size: 28px;
  font-weight: 800;
  font-family: 'DIN Condensed', sans-serif;
}

.profile-races {
  text-align: right;
}

.races-label {
  display: block;
  font-size: 9px;
  color: #9ca3af;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.races-value {
  font-size: 22px;
  font-weight: 800;
  font-family: 'DIN Condensed', sans-serif;
}

.profile-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.footer-stat {
  display: flex;
  flex-direction: column;
}

.footer-label {
  font-size: 9px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.footer-value {
  font-size: 12px;
  font-weight: bold;
}

.footer-value.orange {
  color: #f97316;
}

/* 底部 Tab */
.bottom-tabs {
  height: 65px;
  background-color: #ffffff;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 16px 0;
}

.bottom-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #9ca3af;
  cursor: pointer;
}

.bottom-tab.active {
  color: #22c55e;
}

.tab-text {
  font-size: 10px;
  font-weight: 500;
}

.bottom-tab.active .tab-text {
  font-weight: bold;
}

/* 工具类 */
.iconfont {
  font-size: 22px;
}

.green-text {
  color: #22c55e;
}

.red {
  color: #ef4444;
}

.yellow {
  color: #fbbf24;
}

.orange {
  color: #f97316;
}

.indigo {
  color: #4f46e5;
}

.view-all {
  font-size: 10px;
  color: #2563eb;
  font-weight: 500;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>