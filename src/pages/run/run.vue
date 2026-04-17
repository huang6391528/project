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

    <!-- ============================================= -->
    <!-- 校园跑 Tab                                          -->
    <!-- ============================================= -->
    <view v-if="currentTab === 'free'">
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
          <text class="weather-text">2026.04.10 · 晴 22°C</text>
        </view>
      </view>

      <!-- 悬浮运动卡片 -->
      <view
        class="floating-card"
        :class="{ 'is-expanded': isCardExpanded, 'is-running': isRunning }"
      >
        <view v-if="isCardExpanded" class="card-top-bar" @tap="collapseCard">
          <view class="top-bar-line"></view>
          <text class="top-bar-hint">点击收起</text>
          <text class="top-bar-icon iconfont icon-chevron-up"></text>
        </view>
        <view v-if="!isCardExpanded" class="card-collapsed" @tap="toggleCard">
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
          <view class="card-close" @tap="collapseCard">
            <text class="close-icon iconfont icon-chevron-up"></text>
          </view>
          <view class="expanded-grid">
            <view class="exp-stat"><text class="exp-label">时长</text><text class="exp-value exp-large">{{ displayDuration || '00:00:00' }}</text></view>
            <view class="exp-stat"><text class="exp-label">本次距离 (KM)</text><text class="exp-value exp-large">{{ currentDistance || '0.00' }}</text></view>
            <view class="exp-stat"><text class="exp-label">配速</text><text class="exp-value">{{ currentPace || "--'--\"" }}</text></view>
            <view class="exp-stat"><text class="exp-label">累计减排 (g)</text><text class="exp-value exp-emission">{{ displayEmission || '0' }}</text></view>
          </view>
          <view class="action-area">
            <view class="action-btn side-btn" v-if="isRunning" @tap="endRun"><text class="iconfont icon-stop"></text></view>
            <view class="action-btn main-btn" :class="{ running: isRunning }" @tap="toggleRun">
              <text class="iconfont" :class="isRunning ? 'icon-pause' : 'icon-play'"></text>
            </view>
            <view class="action-btn side-btn" v-if="isRunning" @tap="toggleRun"><text class="iconfont icon-pause"></text></view>
          </view>
        </view>
      </view>

      <!-- Quick Actions -->
      <view class="quick-actions">
        <view class="quick-action-item" @tap="onBindDevice">
          <view class="qa-icon blue">
            <text class="iconfont icon-watch"></text>
          </view>
          <view class="qa-text">
            <text class="qa-title">绑定设备</text>
            <text class="qa-sub">同步Apple Watch</text>
          </view>
        </view>
        <view class="quick-action-item" @tap="onManualRecord">
          <view class="qa-icon orange">
            <text class="iconfont icon-pencil"></text>
          </view>
          <view class="qa-text">
            <text class="qa-title">手动记录</text>
            <text class="qa-sub">上传跑步数据</text>
          </view>
        </view>
      </view>

      <!-- 体育课校园跑任务卡片 -->
      <view class="campus-task-section">
        <view class="campus-task-card">
          <view class="campus-task-header">
            <text class="campus-task-title">体育课校园跑任务</text>
            <view class="campus-task-badge">
              <text class="campus-task-badge-text">进行中</text>
            </view>
          </view>
          <!-- KM Progress -->
          <view class="campus-progress-item">
            <view class="campus-progress-label-row">
              <text class="campus-progress-label">总计跑量目标</text>
              <text class="campus-progress-count">84.5 / 130 KM</text>
            </view>
            <view class="campus-progress-bar">
              <view class="campus-progress-fill green" style="width: 65%"></view>
            </view>
          </view>
          <!-- Morning Run Progress -->
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

      <!-- 我的计划 -->
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

      <!-- 跑步数据明细 -->
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

      <!-- 上下布局：日历 + 成就 -->
      <view class="content-wrapper">
        <view class="morning-column">
          <view class="section-card calendar-card">
            <view class="card-header">
              <text class="card-title">运动轨迹日历</text>
              <view class="calendar-controls">
                <text class="iconfont icon-chevron-left" @tap="prevMonth"></text>
                <picker mode="date" fields="month" :value="pickerDate" @change="onPickerChange">
                  <text class="calendar-month">{{ calYear }}年{{ calMonth }}月</text>
                </picker>
                <text class="iconfont icon-chevron-right" @tap="nextMonth"></text>
              </view>
            </view>
            <view class="calendar-weekdays">
              <text class="weekday">一</text><text class="weekday">二</text><text class="weekday">三</text>
              <text class="weekday">四</text><text class="weekday">五</text><text class="weekday">六</text><text class="weekday">日</text>
            </view>
            <view class="calendar-grid">
              <view
                v-for="n in prevMonthPadding"
                :key="'prev-' + n"
                class="day-cell empty"
              >
                <text class="day-num">{{ getPrevMonthDay(n) }}</text>
              </view>
              <view
                v-for="day in daysInMonth"
                :key="'cur-' + day"
                class="day-cell"
                :class="getDayState(day).cls"
                @tap="onDayTap(day)"
              >
                <text class="day-num" :class="{ 'day-num-bold': isPastDay(day) }">{{ day }}</text>
                <!-- 晨跑标识：浅绿实心矩形 -->
                <view
                  v-if="getDayBadges(day).includes('morning')"
                  class="morning-day-rect"
                ></view>
                <!-- 马拉松标识：右上角橙色圆点 -->
                <view
                  v-if="getDayBadges(day).includes('marathon')"
                  class="day-dot marathon-badge"
                ></view>
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
              <text class="view-all" @tap="viewAllAchievements">查看全部</text>
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

    <!-- ============================================= -->
    <!-- 晨跑计划 Tab                                       -->
    <!-- ============================================= -->
    <view v-if="currentTab === 'morning'">
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
        <!-- 今日晨跑环境卡片 -->
        <view class="morning-weather-card">
          <view class="morning-weather-left">
            <text class="iconfont icon-sun morning-weather-icon"></text>
          </view>
          <view class="morning-weather-info">
            <text class="morning-weather-label">今日晨跑环境</text>
            <text class="morning-weather-value">晴 18°C · 优 AQI 32</text>
          </view>
        </view>
        <!-- 收起遮罩层 -->
        <view v-if="isMorningCardExpanded" class="morning-modal-backdrop" @tap="collapseMorningCard"></view>
        
        <!-- 跑步控制面板 -->
        <view class="morning-floating-card" :class="{ 'is-expanded': isMorningCardExpanded, 'is-running': isRunning }">
          <!-- 折叠状态：简化按钮 -->
          <view v-if="!isMorningCardExpanded" class="morning-card-collapsed-simple" @tap="toggleMorningCard">
            <text class="morning-btn-icon-simple iconfont icon-map-pin"></text>
            <text class="morning-btn-text-simple">{{ isRunning ? '晨跑进行中' : '确认晨跑打卡' }}</text>
            <text class="morning-chevron iconfont icon-chevron-down"></text>
          </view>
          
          <!-- 展开状态：简化三行数据 + 按钮 -->
          <view v-if="isMorningCardExpanded" class="morning-card-expanded-full" @tap.stop>
            <!-- 统计数据一行 -->
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
            
            <!-- 操作按钮区 -->
            <view class="action-area-morning-simple">
              <view class="action-btn-morning-simple main-btn-morning-simple orange-btn" :class="{ running: isRunning }" @tap.stop="toggleRun">
                <text class="iconfont" :class="isRunning ? 'icon-pause' : 'icon-play'"></text>
                <text class="btn-text-simple">{{ isRunning ? '暂停' : '开始' }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 本阶段晨跑目标 -->
      <view class="morning-goal-section" :style="{ marginTop: isMorningCardExpanded ? '280rpx' : '0rpx' }">
        <view class="morning-goal-card">
          <view class="morning-goal-header">
            <text class="morning-goal-title">本阶段晨跑目标</text>
            <text class="morning-goal-count">18/26 次</text>
          </view>
          <view class="morning-goal-bar-bg">
            <view class="morning-segments">
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment active" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment" style="width: 3.85%"></view>
              <view class="segment inactive" style="width: 3.85%"></view>
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

      <!-- 上下布局：日历 + 历史 -->
      <view class="content-wrapper">
        <view class="morning-column">
          <view class="section-card calendar-card">
            <view class="card-header">
              <text class="card-title">晨跑打卡</text>
              <view class="calendar-controls">
                <text class="iconfont icon-chevron-left" @tap="prevMonth"></text>
                <picker mode="date" fields="month" :value="pickerDate" @change="onPickerChange">
                  <text class="calendar-month">{{ calYear }}年{{ calMonth }}月</text>
                </picker>
                <text class="iconfont icon-chevron-right" @tap="nextMonth"></text>
              </view>
            </view>
            <view class="calendar-weekdays">
              <text class="weekday">一</text><text class="weekday">二</text><text class="weekday">三</text>
              <text class="weekday">四</text><text class="weekday">五</text><text class="weekday">六</text><text class="weekday">日</text>
            </view>
            <view class="calendar-grid">
              <view
                v-for="n in prevMonthPadding"
                :key="'prev-' + n"
                class="day-cell empty"
              >
                <text class="day-num">{{ getPrevMonthDay(n) }}</text>
              </view>
              <view
                v-for="day in daysInMonth"
                :key="'cur-' + day"
                class="day-cell"
                :class="getDayCellClassMorning(day)"
                @tap="onDayTapMorning(day)"
              >
                <text class="day-num" :class="{ 'day-num-bold': isMorningPastDay(day) }">{{ day }}</text>
                <!-- 晨跑标识：左上角深绿小方块 -->
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
                  <image
                    class="history-map-real-img"
                    :src="item.img"
                    mode="aspectFill"
                  ></image>
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

    <!-- ============================================= -->
    <!-- 马拉松训练 Tab                                     -->
    <!-- ============================================= -->
    <view v-if="currentTab === 'marathon'">
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
        <!-- 实时气候卡 -->
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
        <!-- 跑步控制面板 -->
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
          <view class="marathon-start-btn" @tap="toggleRun">
            <text class="marathon-start-text">{{ isRunning ? '结束训练' : '开始训练' }}</text>
          </view>
        </view>
      </view>

      <!-- 四个网格功能入口 -->
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

      <!-- 最新赛事活动 -->
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

      <!-- 推荐训练计划 -->
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

      <!-- 双列布局：日历 + 档案 -->
      <view class="content-wrapper">
        <view class="two-column">
          <view class="section-card calendar-card">
            <view class="card-header">
              <text class="card-title">训练轨迹</text>
              <view class="calendar-controls">
                <text class="iconfont icon-chevron-left" @tap="marathonPrevMonth"></text>
                <picker mode="date" fields="month" :value="marathonPickerDate" @change="onMarathonPickerChange">
                  <text class="calendar-month">{{ marathonCalYear }}年{{ marathonCalMonth }}月</text>
                </picker>
                <text class="iconfont icon-chevron-right" @tap="marathonNextMonth"></text>
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
                v-for="n in marathonPrevMonthPadding"
                :key="'prev-' + n"
                class="day-cell empty"
              >
                <text class="day-num">{{ getMarathonPrevMonthDay(n) }}</text>
              </view>
              <!-- 当月日期 -->
              <view
                v-for="day in marathonDaysInMonth"
                :key="'cur-' + day"
                class="day-cell"
                :class="getMarathonDayState(day).cls"
                :style="getMarathonDayCellStyle(day)"
                @tap="onMarathonDayTap(day)"
              >
                <text class="day-num" :class="{ 'day-num-bold': isMarathonPastDay(day) }">{{ day }}</text>
                <!-- 马拉松训练标识：紫色圆圈 -->
                <view v-if="getMarathonDayBadges(day).includes('marathon')" class="marathon-ring-badge"></view>
              </view>
            </view>
            
            <!-- 图例 -->
            <view class="calendar-legend">
              <view class="legend-item">
                <view class="marathon-legend-dot purple-ring"></view>
                <text class="legend-text">马拉松训练</text>
              </view>
            </view>
          </view>

          <view class="marathon-profile-card marathon-profile-card-col">
            <!-- 标题 + 徽章 -->
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

            <!-- PB 英雄区 - 仪表盘风格 -->
            <view class="pro-pb-section">
              <view class="pro-pb-background">
                <!-- 背景装饰 -->
                <view class="pro-pb-glow"></view>
                <!-- PB 内容 -->
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

            <!-- 数据仪表板 - 4 个精心设计的卡片 -->
            <view class="pro-stats-dashboard">
              <!-- 1. 总参赛次数 -->
              <view class="pro-stat-card pro-stat-races">
                <view class="pro-stat-icon-bg races-gradient">
                  <text class="iconfont icon-flag pro-stat-icon"></text>
                </view>
                <text class="pro-stat-value">05</text>
                <text class="pro-stat-label">总参赛次数</text>
              </view>
              <!-- 2. 完赛里程 -->
              <view class="pro-stat-card pro-stat-distance">
                <view class="pro-stat-icon-bg distance-gradient">
                  <text class="iconfont icon-location pro-stat-icon"></text>
                </view>
                <text class="pro-stat-value">210.97</text>
                <text class="pro-stat-label">完赛里程 <text class="pro-stat-unit">KM</text></text>
              </view>
              <!-- 3. 平均配速 -->
              <view class="pro-stat-card pro-stat-pace">
                <view class="pro-stat-icon-bg pace-gradient">
                  <text class="iconfont icon-zap pro-stat-icon"></text>
                </view>
                <text class="pro-stat-value pace-value">05'22''</text>
                <text class="pro-stat-label">平均配速</text>
              </view>
              <!-- 4. 低碳积分 -->
              <view class="pro-stat-card pro-stat-carbon">
                <view class="pro-stat-icon-bg carbon-gradient">
                  <text class="iconfont icon-leaf pro-stat-icon"></text>
                </view>
                <text class="pro-stat-value carbon-value">1,240</text>
                <text class="pro-stat-label">低碳积分</text>
              </view>
            </view>

            <!-- 等级晋升进度 - 精致版 -->
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
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'

// ==========================================
// 模块零：Tab 切换状态
// ==========================================
const currentTab = ref('free') // 'free'=校园跑, 'morning'=晨跑, 'marathon'=马拉松

function switchTab(tab) {
  currentTab.value = tab
  if (isRunning.value) {
    clearInterval(timer)
    isRunning.value = false
  }
  isCardExpanded.value = false
}

// ==========================================
// 模块零：地图配置
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

// 轨迹线颜色映射（按运动类型）
const routeColorMap = {
  morning: '#10b981', // 晨跑-绿色
  free: '#047857',    // 自由跑-深绿
  marathon: '#f97316' // 马拉松-橙色
}
// 当前选中的运动类型（默认晨跑）
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
// 模块一：运动卡片状态
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

const TODAY_YEAR = new Date().getFullYear()
const TODAY_MONTH = new Date().getMonth() + 1
const TODAY_DAY = new Date().getDate()

const calYear = ref(TODAY_YEAR)
const calMonth = ref(TODAY_MONTH)

// picker 配置
const pickerFields = 'month'
const pickerStart = '2026-01'
const pickerEnd = '2026-12'
const pickerDate = computed(() => `${calYear.value}-${String(calMonth.value).padStart(2, '0')}`)

// 打卡记录数据 - 扩展类型：morning(晨跑)/free(自由跑)/marathon(马拉松)
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

// 当月「有任意跑步打卡」的天数：一天无论几种类型都只算 1 天（与日历格子一致）
const completedDays = computed(() => {
  const dim = new Date(calYear.value, calMonth.value, 0).getDate()
  let n = 0
  for (let d = 1; d <= dim; d++) {
    const s = getDayStatus(d)
    if (s == null || s === '') continue
    if (Array.isArray(s) && s.length === 0) continue
    n++
  }
  return n
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

// ==========================================
// 状态设计（统一、清晰、可扩展）
// ==========================================
// 打卡统一样式：全部用深绿色发光边框，无其他标识
const DAY_STYLES = {
  empty:   { cls: 'empty',   bg: '' },
  future:  { cls: 'future',  bg: '' },
  today:   { cls: 'today',   bg: '' },
  checked: { cls: 'checked', bg: '' },
}

// 任意打卡类型均标记为 checked（深绿发光框）
const TYPE_PRIORITY = ['free', 'morning', 'marathon']

function getDayState(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)

  if (future) return DAY_STYLES.future
  if (!status) return DAY_STYLES.empty
  return DAY_STYLES.checked
}

// 单元格样式：任意打卡类型（free/morning/marathon）都用深绿发光框
function getDayCellStyle(day) {
  const badges = getDayBadges(day)
  const future = isFutureDay(day)

  if (future) return ''
  if (badges.length > 0) return 'border: 4rpx solid #065f46; color: #065f46; box-shadow: 0 0 16rpx rgba(5, 150, 105, 0.7), 0 0 32rpx rgba(5, 150, 105, 0.4);'
  return ''
}

// 自由跑：今天之前未打卡，数字加粗
function isPastDay(day) {
  if (calYear.value > TODAY_YEAR) return false
  if (calYear.value < TODAY_YEAR) return true
  if (calMonth.value < TODAY_MONTH) return true
  if (calMonth.value > TODAY_MONTH) return false
  return day < TODAY_DAY
}

// 返回当天打卡类型数组（用于渲染多个徽章）
function getDayBadges(day) {
  const status = getDayStatus(day)
  if (!status) return []
  return Array.isArray(status) ? status : [status]
}

// ==========================================
// 日计算辅助
// ==========================================

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
  // 如果是数组说明当天有多条打卡，取第一个作为主样式（可按优先级调整顺序）
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

// 晨跑日历格子样式：浅绿底矩形
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

// 晨跑计划日历格子 class
function getDayCellClassMorning(day) {
  const status = getDayStatus(day)
  const future = isFutureDay(day)
  if (future) return 'future'
  const types = Array.isArray(status) ? status : (status ? [status] : [])
  if (types.includes('morning')) return 'morning-day-cell'
  return ''
}

// 晨跑：今天之前未打卡，数字加粗
function isMorningPastDay(day) {
  if (calYear.value > TODAY_YEAR) return false
  if (calYear.value < TODAY_YEAR) return true
  if (calMonth.value < TODAY_MONTH) return true
  if (calMonth.value > TODAY_MONTH) return false
  return day < TODAY_DAY
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
// 模块二·附：月份选择器
// ==========================================

// 显示月份选择器（校园跑/晨跑）
function showMonthPicker() {
  // 简单的月份切换，使用左右箭头
  // 点击标题时提示用户
  uni.showToast({
    title: '请点击左右箭头切换月份',
    icon: 'none'
  })
}

// 显示月份选择器（马拉松）
function showMarathonMonthPicker() {
  uni.showToast({
    title: '请点击左右箭头切换月份',
    icon: 'none'
  })
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
// 晨跑 Tab 数据
// ==========================================
const morningHistory = ref([
  { date: '2026.04.09 晨跑', km: '5.20', time: '31:40', pace: "06'05''", faded: false, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
  { date: '2026.04.08 晨跑', km: '3.80', time: '22:15', pace: "05'51''", faded: false, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
  { date: '2026.04.07 晨跑', km: '4.50', time: '28:20', pace: "06'17''", faded: true, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-10/d7294226572d438d8e8de2fe6568f8d1.jpg' },
])

const morningCompletedDays = computed(() => {
  const key = `${calYear.value}-${calMonth.value}`
  const monthData = runRecords.value[key] || {}
  return Object.entries(monthData).filter(([day, val]) => {
    if (!val) return false
    const types = Array.isArray(val) ? val : [val]
    return types.includes('morning')
  }).length
})

// ==========================================
// 马拉松 Tab 数据
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

// 校园跑成就数据
const achievements = ref([
  { name: '早起鸟', icon: 'icon-medal', iconClass: 'ach-orange', locked: false },
  { name: '低碳达人', icon: 'icon-tree', iconClass: 'ach-green', locked: false },
  { name: '极速跑者', icon: 'icon-lightning', iconClass: 'ach-blue', locked: false },
  { name: '100KM 达成', icon: 'icon-target', iconClass: 'ach-gray', locked: true },
  { name: '马拉松之星', icon: 'icon-star', iconClass: 'ach-gray', locked: true },
])

// ==========================================
// 马拉松月历数据
// ==========================================
const marathonCalYear = ref(TODAY_YEAR)
const marathonCalMonth = ref(TODAY_MONTH)

// 马拉松 picker 配置（年月滚轮）
const marathonPickerFields = 'month'
const marathonPickerStart = '2026-01'
const marathonPickerEnd = '2026-12'
const marathonPickerDate = computed(() => `${marathonCalYear.value}-${String(marathonCalMonth.value).padStart(2, '0')}`)

// 马拉松月历：当月已跑天数
const marathonCompletedDays = computed(() => {
  const dim = new Date(marathonCalYear.value, marathonCalMonth.value, 0).getDate()
  let n = 0
  for (let d = 1; d <= dim; d++) {
    const s = getMarathonDayStatus(d)
    if (!s) continue
    const types = Array.isArray(s) ? s : [s]
    if (types.includes('marathon')) n++
  }
  return n
})

const marathonDisplayMonthText = computed(() => {
  const map = { 1:'1 月',2:'2 月',3:'3 月',4:'4 月',5:'5 月',6:'6 月',7:'7 月',8:'8 月',9:'9 月',10:'10 月',11:'11 月',12:'12 月' }
  return map[marathonCalMonth.value] || `${marathonCalMonth.value}月`
})

const marathonDaysInMonth = computed(() => {
  return new Date(marathonCalYear.value, marathonCalMonth.value, 0).getDate()
})

const marathonFirstDayWeekday = computed(() => {
  const d = new Date(marathonCalYear.value, marathonCalMonth.value - 1, 1).getDay()
  return d === 0 ? 7 : d
})

const marathonPrevMonthPadding = computed(() => marathonFirstDayWeekday.value - 1)

// 马拉松日历状态设计
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

// 马拉松：今天之前未打卡，数字加粗
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

// 月份切换
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

// 马拉松 picker
function openMarathonMonthPicker() {
  setTimeout(() => {
    const picker = uni.createSelectorQuery().select('#marathon-month-picker-trigger')
    const pickerNode = document.querySelector('#marathon-month-picker-trigger')
    if (pickerNode && pickerNode.__pickerInstance) {
      pickerNode.__pickerInstance.open()
    }
  }, 50)
}

function onMarathonPickerChange(e) {
  const val = e.detail.value  // 'YYYY-MM'
  if (!val) return
  const [y, m] = val.split('-').map(Number)
  marathonCalYear.value = y
  marathonCalMonth.value = m
}

function onMarathonPickerCancel() {
  // 用户取消，什么都不做
}

// 跑步数据图表（ECharts）
onMounted(() => {
  const query = uni.createSelectorQuery().in(getCurrentInstance?.())
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
        // Y轴虚线
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
        // 柱状图
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
        // X轴标签
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

/* Map Container */
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
  z-index: 10;
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
/* 校园跑 Tab Quick Actions                    */
/* ============================================= */
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

/* 日历 picker 组件样式 */
.calendar-picker {
  display: flex;
  align-items: center;
}

.calendar-picker .title-area {
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

.day-cell:active {
  transform: scale(0.90);
}

.day-num {
  font-size: 24rpx;
  color: inherit;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.day-num-bold {
  font-weight: bold;
}

.day-cell.empty {
  color: #e5e7eb;
}

.day-cell.future {
  color: #e5e7eb;
}

/* 已打卡 - 深绿色发光边框，文字为深绿，无背景 */
.day-cell.checked {
  background-color: transparent;
  color: #065f46;
  border: 4rpx solid #065f46;
  box-shadow: 0 0 16rpx rgba(5, 150, 105, 0.7), 0 0 32rpx rgba(5, 150, 105, 0.4);
}

/* 校园跑打卡标识：左下角荧光绿小圆点 */
.green-check-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8rpx rgba(16, 185, 129, 0.8), 0 0 16rpx rgba(16, 185, 129, 0.5);
  position: absolute;
  bottom: 8rpx;
  left: 8rpx;
}

/* 晨跑标识：浅绿实心矩形，填满整个格子（含边框） */  
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

/* 晨跑tab格子背景样式 */
.day-cell.morning-day-cell {
  background-color: #dcfce7;
  border: 2rpx solid #86efac;
}
.day-cell.morning-day-cell .day-num {
  color: #16a34a;
  font-weight: bold;
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

.day-dot.orange {
  background-color: #f97316;
}

/* 马拉松角标：橙色小圆，位于格子右上角，与晨跑/自由跑背景不冲突 */
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

/* 马拉松右上角橙色标识（独立元素） */
.marathon-corner-badge {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #f97316;
  position: absolute;
  top: 6rpx;
  right: 6rpx;
  border: 2rpx solid #fff;
  box-shadow: 0 2rpx 4rpx rgba(249, 115, 22, 0.30);
  z-index: 10;
}

/* 图例 - 新增橙色（马拉松） */
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

/* 自由跑/已打卡 - 深绿发光边框 */
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

/* ============================================= */
/* 晨跑 Tab 样式                                  */
/* ============================================= */
.map-morning {
  height: 320px;
  position: relative;
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

.morning-weather-left {
  flex-shrink: 0;
}

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

.morning-control-card {
  position: absolute;
  bottom: 24rpx;
  left: 24rpx;
  right: 24rpx;
  background: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(12px);
  border-radius: 32rpx;
  padding: 28rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.60);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
}

.morning-stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.morning-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.morning-stat-label {
  font-size: 18rpx;
  color: #9ca3af;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 6rpx;
}

.morning-stat-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
}

.morning-stat-unit {
  font-size: 18rpx;
}

.morning-stat-divider {
  width: 2rpx;
  height: 48rpx;
  background: #e5e7eb;
  flex-shrink: 0;
}

/* 已移除空规则 .morning-btn-area */

.morning-btn {
  width: 100%;
  background: linear-gradient(135deg, #f97316, #ea580c);
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
  animation: pulseOrange 2s ease-in-out infinite;
}

@keyframes pulseOrange {
  0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
  70% { box-shadow: 0 0 0 16rpx rgba(249, 115, 22, 0); }
  100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
}

.morning-btn-icon {
  font-size: 32rpx;
  color: #fff;
}

.morning-btn-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

/* 晨跑目标 */
.morning-goal-section {
  padding: 20rpx 30rpx 0;
  margin-top: 0;
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
  margin-bottom: 16rpx;
}

.morning-goal-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.morning-goal-count {
  font-size: 24rpx;
  color: #f97316;
  font-weight: bold;
}

.morning-goal-bar-bg {
  height: 16rpx;
  background: #f3f4f6;
  border-radius: 10rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.morning-segments {
  height: 100%;
  border-radius: 10rpx;
  display: flex;
  gap: 1rpx;
  overflow: hidden;
}

.segment {
  height: 100%;
  flex-shrink: 0;
}

.segment.active {
  background: linear-gradient(90deg, #f97316, #fb923c);
}

.segment.inactive {
  background: #e5e7eb;
}

.morning-goal-stats {
  display: flex;
  gap: 16rpx;
}

.morning-goal-stat {
  flex: 1;
  background: #f9fafb;
  border-radius: 16rpx;
  padding: 16rpx;
}

.morning-goal-stat-label {
  font-size: 18rpx;
  color: #9ca3af;
  display: block;
  margin-bottom: 4rpx;
}

.morning-goal-stat-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.morning-goal-stat-value.green {
  color: #22c55e;
}

/* 晨跑历史 */
.morning-history-section {
  padding: 20rpx 30rpx 40rpx;
}

.morning-history-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f3f4f6;
}

.morning-history-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  margin-bottom: 20rpx;
}

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
}

.history-item-faded {
  opacity: 0.6;
}

.history-map-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  overflow: hidden;
  flex-shrink: 0;
  background: #e5e7eb;
}

.history-map-real-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-info {
  flex: 1;
}

.history-date {
  font-size: 24rpx;
  font-weight: bold;
  color: #374151;
  display: block;
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

/* ============================================= */
/* 马拉松 Tab 样式                                */
/* ============================================= */
.map-marathon {
  height: 480px;
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

/* 四个网格 */
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

/* 赛事活动 */
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

/* 推荐训练计划 */
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

/* 马拉松档案 */
.marathon-profile-section {
  padding: 28rpx 30rpx 0;
}

.marathon-profile-card-col {
  flex: 1;
  overflow: hidden;
}

.profile-pb-value {
  font-size: 96rpx;
  font-weight: bold;
  color: #fff;
}

.profile-race-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.profile-footer {
  border-top: 2rpx solid rgba(255, 255, 255, 0.10);
  padding-top: 20rpx;
  display: flex;
  justify-content: space-between;
}

/* 已移除空规则 .profile-stat */

.profile-stat-label {
  font-size: 18rpx;
  color: #64748b;
  display: block;
  margin-bottom: 4rpx;
}

.profile-stat-value {
  font-size: 24rpx;
  font-weight: bold;
  color: #fff;
}

.profile-stat-value.orange {
  color: #fb923c;
}

.text-right {
  text-align: right;
}

/* 马拉松训练日历 */
.marathon-calendar-section {
  padding: 28rpx 30rpx 40rpx;
}

.marathon-calendar-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

/* 马拉松日历头部 */
.marathon-calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.marathon-title-area {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.marathon-calendar-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.marathon-picker-trigger {
  display: flex;
  align-items: center;
}

.marathon-picker-icon {
  font-size: 20rpx;
  color: #9ca3af;
}

.marathon-header-right {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.marathon-calendar-sub {
  font-size: 20rpx;
  color: #a855f7;
  font-weight: 500;
}

.marathon-month-switcher {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.marathon-switch-btn {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
}

.marathon-switch-btn .iconfont {
  font-size: 18rpx;
  color: #6b7280;
}

.marathon-switch-year {
  font-size: 22rpx;
  font-weight: bold;
  color: #374151;
}

/* 星期标题行 */
.marathon-calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.marathon-weekday {
  font-size: 18rpx;
  color: #9ca3af;
  text-align: center;
  font-weight: 500;
}

/* 日历网格 */
.marathon-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8rpx;
}

.marathon-day-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 16rpx;
  background: #f9fafb;
}

.marathon-day-cell.empty {
  background: transparent;
}

.marathon-day-cell.future {
  background: transparent;
}

.marathon-day-cell.today {
  background: #f3f4f6;
}

.marathon-day-cell.marathon {
  background: #f3e8ff;
  border: 2rpx solid #c084fc;
}

.marathon-day-num {
  font-size: 20rpx;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4rpx;
}

.marathon-day-cell.empty .marathon-day-num,
.marathon-day-cell.future .marathon-day-num {
  color: #d1d5db;
}

.marathon-day-cell.today .marathon-day-num {
  color: #a855f7;
  font-weight: bold;
}

.marathon-day-cell.marathon .marathon-day-num {
  color: #7c3aed;
  font-weight: bold;
}



/* 图例 */
.marathon-calendar-legend {
  display: flex;
  gap: 24rpx;
  margin-top: 20rpx;
  justify-content: center;
}

.marathon-legend-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.marathon-legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
}

.marathon-legend-dot.purple-ring {
  background: #a855f7;
  box-shadow: 0 2rpx 6rpx rgba(168, 85, 247, 0.30);
}

.marathon-legend-text {
  font-size: 18rpx;
  color: #9ca3af;
}

/* ============================================= */
/* 校园跑 Tab 新增样式                            */
/* ============================================= */
.free-map-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;
}

.free-start-btn {
  width: 160rpx;
  height: 160rpx;
  background: #22c55e;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(34, 197, 94, 0.40);
}

.free-start-icon {
  font-size: 64rpx;
  color: #fff;
}

.free-start-text {
  font-size: 24rpx;
  font-weight: bold;
  color: #fff;
}

/* 体育课任务卡片 */
.campus-task-section {
  padding: 0 30rpx;
  margin-top: 20rpx;
}

.campus-task-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.campus-task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.campus-task-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.campus-task-badge {
  background: #dcfce7;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.campus-task-badge-text {
  font-size: 18rpx;
  font-weight: bold;
  color: #16a34a;
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
  font-size: 20rpx;
  color: #6b7280;
}

.campus-progress-count {
  font-size: 20rpx;
  font-weight: bold;
  color: #374151;
}

.campus-progress-bar {
  height: 12rpx;
  background: #f3f4f6;
  border-radius: 6rpx;
  overflow: hidden;
}

.campus-progress-fill {
  height: 100%;
  border-radius: 6rpx;
}

.campus-progress-fill.green { background: #22c55e; }
.campus-progress-fill.orange { background: #f97316; }

.campus-carbon-tip {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 2rpx solid #f3f4f6;
}

.campus-tip-icon {
  font-size: 24rpx;
  color: #22c55e;
}

.campus-tip-text {
  font-size: 18rpx;
  color: #9ca3af;
}

/* 我的计划 */
.campus-plan-section {
  padding: 20rpx 30rpx 0;
}

.campus-plan-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
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
  font-size: 28rpx;
  font-weight: bold;
  color: #9ca3af;
  padding-bottom: 4rpx;
}

.campus-plan-tab.active {
  color: #f97316;
  border-bottom: 4rpx solid #f97316;
}

.campus-plan-add {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.campus-add-icon {
  font-size: 24rpx;
  color: #3b82f6;
}

.campus-add-text {
  font-size: 22rpx;
  color: #3b82f6;
  font-weight: 500;
}

.campus-plan-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.campus-plan-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx;
  background: #f9fafb;
  border-radius: 16rpx;
}

.campus-plan-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.campus-plan-icon.fire {
  background: #fef2f2;
}

.campus-plan-icon.fire .iconfont {
  font-size: 32rpx;
  color: #ef4444;
}

.campus-plan-info {
  flex: 1;
}

.campus-plan-name {
  font-size: 24rpx;
  font-weight: bold;
  color: #374151;
  display: block;
}

.campus-plan-desc {
  font-size: 18rpx;
  color: #9ca3af;
}

.campus-plan-arrow {
  font-size: 24rpx;
  color: #d1d5db;
}

/* 跑步数据明细图表 */
.campus-data-section {
  padding: 20rpx 30rpx 0;
}

.campus-data-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
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
.legend-item {
  display: flex;
  align-items: center;
}

.legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 4rpx; /* 圆角方块，如果想圆点改50% */
  margin-right: 10rpx;
}

.dark-green {
  background-color:#DCFCE7; /* 和日历一致的绿色 */
}
.campus-chart-area {
  height: 160rpx;
  position: relative;
}

.chart-canvas {
  width: 100%;
  height: 160rpx;
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
  position: relative;
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

/* 双列布局 */
.content-wrapper {
  padding: 0;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
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

/* 日历控件 */
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

/* 成就网格 */
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
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.achievement-icon .iconfont {
  font-size: 32rpx;
  color: #f59e0b;
}

.achievement-icon.achieve-orange {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}

.achievement-icon.achieve-green {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
}

.achievement-icon.achieve-green .iconfont {
  color: #10b981;
}

.achievement-icon.achieve-blue {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.achievement-icon.achieve-blue .iconfont {
  color: #3b82f6;
}

.achievement-icon.achieve-gray {
  background: #f3f4f6;
}

.achievement-icon.achieve-gray .iconfont {
  color: #9ca3af;
}

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

/* 我的成就 */
.campus-achievement-section {
  padding: 20rpx 30rpx 40rpx;
}

.campus-achievement-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.campus-achievement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.campus-achievement-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.campus-achievement-more {
  font-size: 20rpx;
  color: #3b82f6;
}

.campus-achievement-list {
  display: flex;
  gap: 24rpx;
  overflow-x: auto;
  padding-bottom: 8rpx;
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  flex-shrink: 0;
}

.achievement-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.achievement-icon .iconfont {
  font-size: 40rpx;
}

.ach-orange { background: #ffedd5; }
.ach-orange .iconfont { color: #f97316; }
.ach-green { background: #dcfce7; }
.ach-green .iconfont { color: #22c55e; }
.ach-blue { background: #dbeafe; }
.ach-blue .iconfont { color: #3b82f6; }
.ach-gray { background: #f3f4f6; opacity: 0.5; }
.ach-gray .iconfont { color: #9ca3af; }

.achievement-locked .achievement-icon {
  opacity: 0.5;
}

.achievement-name {
  font-size: 18rpx;
  font-weight: bold;
  color: #374151;
}

.achievement-locked .achievement-name {
  color: #9ca3af;
}

/* 校园跑 Tab 日历卡片（白色底，对齐 index.html） */
.campus-calendar .calendar-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

/* 晨跑日历：浅绿底矩形打卡标志 */
.calendar-section {
  padding: 20rpx 30rpx 0;
}

/* ============================================= */
/* 优化版马拉松档案 — 高级UI/UX设计              */
/* 风格参考：Nike Run Club + Apple Fitness      */
/* ============================================= */

/* 卡片容器 - 深色高级背景 */
.marathon-profile-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  border-radius: 40rpx;
  padding: 40rpx;
  box-shadow: 
    0 20rpx 60rpx rgba(0, 0, 0, 0.40),
    inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.marathon-profile-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600rpx;
  height: 600rpx;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* 标题区域 - 顶部标题+徽章 */
.pro-header-premium {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  position: relative;
  z-index: 2;
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
  0%, 100% {
    box-shadow: 0 8rpx 20rpx rgba(249, 115, 22, 0.25);
  }
  50% {
    box-shadow: 0 12rpx 32rpx rgba(249, 115, 22, 0.35);
  }
}

.pro-badge-icon {
  font-size: 20rpx;
  color: #fff;
}

.pro-badge-text {
  font-size: 18rpx;
  font-weight: bold;
  color: #fff;
}

/* PB 英雄区 - 仪表盘设计 */
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

/* 数据仪表板 - 4个卡片布局 */
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
  font-size: 0;
}

.pro-stat-icon {
  font-size: 32rpx;
  color: #fff;
}

/* 各数据卡片的渐变背景 */
.races-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
}

.distance-gradient {
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
}

.pace-gradient {
  background: linear-gradient(135deg, #f97316 0%, #c2410c 100%);
}

.carbon-gradient {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
}

.pro-stat-value {
  font-size: 32rpx;
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin-bottom: 8rpx;
  letter-spacing: -0.5rpx;
}

.pro-stat-value.pace-value {
  color: #f97316;
}

.pro-stat-value.carbon-value {
  color: #10b981;
}

.pro-stat-label {
  font-size: 14rpx;
  color: #94a3b8;
  text-align: center;
  font-weight: 500;
  line-height: 1.4;
}

.pro-stat-unit {
  font-size: 12rpx;
  color: #64748b;
}

/* 等级晋升区 - 进度仪表 */
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
  from {
    width: 0 !important;
  }
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
  0%, 100% {
    box-shadow: 0 4rpx 12rpx rgba(249, 115, 22, 0.30);
  }
  50% {
    box-shadow: 0 8rpx 24rpx rgba(249, 115, 22, 0.50);
  }
}

.pro-level-hint {
  font-size: 16rpx;
  color: #64748b;
  text-align: center;
  font-weight: 500;
  line-height: 1.5;
}

/* ============================================= */
/* 晨跑浮动卡片 — 橙色主题                        */
/* ============================================= */

/* 背景遮罩层 - 点击收起 */
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
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.morning-floating-card {
  position: relative;
  z-index: 10;
  margin: -40rpx 30rpx 150rpx;
  border-radius: 40rpx;
  overflow: visible;
  /* 渐变橙色背景 */
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

/* 折叠状态：简化按钮 */
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
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  0%, 100% {
    opacity: 0.40;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(6rpx);
  }
}

/* 展开状态：简化三行数据 */
.morning-card-expanded-full {
  padding: 28rpx 40rpx 32rpx;
  position: relative;
  animation: expandMorningCard 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes expandMorningCard {
  from {
    opacity: 0;
    transform: translateY(-10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 一行三个数据 */
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

/* 简化操作按钮区 */
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

.action-btn-morning-simple:active {
  transform: scale(0.95);
}

.main-btn-morning-simple {
  width: auto;
  height: auto;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.20),
              0 0 40rpx rgba(255, 255, 255, 0.25);
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

/* 晨跑上下布局 */
.morning-column {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx 30rpx;
}

.morning-column .section-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

/* 改进晨跑历史卡片样式 */
.morning-history-card {
  padding: 28rpx !important;
}

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

.history-item-faded {
  opacity: 0.6;
}
</style>