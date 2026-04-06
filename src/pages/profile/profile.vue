<template>
  <view class="page-profile">
    <!-- Top Profile -->
    <view class="profile-header">
      <view class="header-icons">
        <view class="header-icon-btn" @tap="onEditProfile">
          <text class="iconfont icon-edit"></text>
        </view>
        <view class="header-icon-btn" @tap="onSettings">
          <text class="iconfont icon-settings"></text>
        </view>
      </view>
      <view class="profile-info">
        <view class="avatar-wrapper">
          <image class="avatar" src="/static/avatar.png" mode="aspectFill"></image>
          <view class="avatar-badge">
            <text class="iconfont icon-star"></text>
          </view>
        </view>
        <view class="profile-detail">
          <text class="profile-name">陈同学</text>
          <text class="profile-school">复旦大学 · 经济学院</text>
          <view class="profile-badge">
            <text class="badge-text">环保大使</text>
          </view>
          <view class="profile-medals">
            <text class="iconfont icon-trophy"></text>
            <text class="iconfont icon-medal"></text>
            <text class="iconfont icon-crown"></text>
          </view>
        </view>
      </view>
    </view>

    <!-- Carbon Account Card -->
    <view class="stats-card">
      <view class="stats-card-title">
        <text class="iconfont icon-chart"></text>
        <text>碳账户总览</text>
      </view>
      <view class="stats-grid">
        <view class="stat-cell">
          <text class="stat-label">累计减排</text>
          <text class="stat-value">12.5 <text class="stat-unit">kg</text></text>
        </view>
        <view class="stat-cell">
          <text class="stat-label">种植树木</text>
          <text class="stat-value">3 <text class="stat-unit">棵</text></text>
        </view>
      </view>
      <view class="chart-section">
        <text class="chart-label">行为数据分布</text>
        <view class="chart-container">
          <view class="pie-chart">
            <view class="pie-segment seg-green" style="transform: rotate(0deg);"></view>
            <view class="pie-segment seg-blue" style="transform: rotate(162deg);"></view>
            <view class="pie-segment seg-orange" style="transform: rotate(252deg);"></view>
            <view class="pie-segment seg-purple" style="transform: rotate(324deg);"></view>
            <view class="pie-center">
              <text class="pie-text">12.5kg</text>
            </view>
          </view>
          <view class="chart-legend">
            <view class="legend-item">
              <view class="legend-dot green"></view>
              <text class="legend-text">跑步 45%</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot blue"></view>
              <text class="legend-text">饮食 25%</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot orange"></view>
              <text class="legend-text">回收 20%</text>
            </view>
            <view class="legend-item">
              <view class="legend-dot purple"></view>
              <text class="legend-text">出行 10%</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Menu Sections -->
    <view class="menu-section">
      <view class="menu-item">
        <view class="menu-left">
          <text class="iconfont icon-account"></text>
          <text class="menu-text">账号设置</text>
        </view>
        <text class="iconfont icon-chevron-right"></text>
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <text class="iconfont icon-message"></text>
          <text class="menu-text">消息通知</text>
        </view>
        <text class="iconfont icon-chevron-right"></text>
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <text class="iconfont icon-help-circle"></text>
          <text class="menu-text">帮助与反馈</text>
        </view>
        <text class="iconfont icon-chevron-right"></text>
      </view>
    </view>

    <!-- Achievement Banner -->
    <view class="achievement-section">
      <text class="section-title">成就徽章</text>
      <scroll-view class="badge-scroll" scroll-x="true">
        <view class="badge-list">
          <view class="badge-item badge-disabled">
            <text class="iconfont icon-earth"></text>
          </view>
          <view class="badge-item badge-yellow">
            <text class="iconfont icon-star-glow"></text>
          </view>
          <view class="badge-item badge-green">
            <text class="iconfont icon-leaf"></text>
          </view>
          <view class="badge-item badge-blue">
            <text class="iconfont icon-runner"></text>
          </view>
        </view>
      </scroll-view>

      <!-- Declaration -->
      <view class="declaration">
        <text class="declaration-sub">My Eco Declaration</text>
        <text class="declaration-text">"每一小步，都是地球的新生"</text>
        <text class="declaration-date">今日已贡献减排 420g · 2026-04-05</text>
      </view>
    </view>
  </view>
</template>

<script setup>
function onEditProfile() {
  uni.showToast({ title: '编辑资料开发中', icon: 'none' })
}

function onSettings() {
  uni.showToast({ title: '账号设置开发中', icon: 'none' })
}
</script>

<style scoped>
.page-profile {
  background-color: #f0fdf4;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* Profile Header */
.profile-header {
  background-color: #ecfdf5;
  padding: 96rpx 48rpx 80rpx;
  border-radius: 0 0 80rpx 80rpx;
  position: relative;
}

.header-icons {
  position: absolute;
  top: 32rpx;
  right: 48rpx;
  display: flex;
  gap: 24rpx;
}

.header-icon-btn {
  width: 72rpx;
  height: 72rpx;
  background-color: rgba(255,255,255,0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon-btn text {
  font-size: 36rpx;
  color: #065f46;
}

.profile-info {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 8rpx solid #fff;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}

.avatar-badge {
  position: absolute;
  bottom: -8rpx;
  right: -8rpx;
  width: 56rpx;
  height: 56rpx;
  background-color: #fbbf24;
  border-radius: 50%;
  border: 4rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-badge text {
  font-size: 24rpx;
  color: #fff;
}

.profile-detail {
  margin-left: 40rpx;
}

.profile-name {
  display: block;
  font-size: 40rpx;
  font-weight: 800;
  color: #065f46;
}

.profile-school {
  display: block;
  font-size: 24rpx;
  color: rgba(6, 95, 70, 0.7);
  margin-top: 6rpx;
}

.profile-badge {
  display: inline-block;
  margin-top: 8rpx;
  background-color: rgba(16, 185, 129, 0.1);
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
}

.badge-text {
  font-size: 20rpx;
  font-weight: bold;
  color: #059669;
}

.profile-medals {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}

.profile-medals text {
  font-size: 40rpx;
}

/* Stats Card */
.stats-card {
  background-color: #fff;
  border-radius: 48rpx;
  padding: 32rpx;
  margin: -48rpx 30rpx 0;
  box-shadow: 0 16rpx 48rpx rgba(0,0,0,0.08);
}

.stats-card-title {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 24rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.stats-card-title text:first-child {
  font-size: 36rpx;
  color: #10b981;
}

.stats-grid {
  display: flex;
  border-bottom: 2rpx solid #f3f4f6;
  padding-bottom: 32rpx;
  margin-bottom: 32rpx;
}

.stat-cell {
  flex: 1;
  text-align: center;
}

.stat-cell:first-child {
  border-right: 2rpx solid #f3f4f6;
}

.stat-label {
  display: block;
  font-size: 22rpx;
  color: #9ca3af;
  margin-bottom: 8rpx;
}

.stat-value {
  font-size: 40rpx;
  font-weight: 800;
  color: #1f2937;
}

.stat-unit {
  font-size: 24rpx;
  font-weight: normal;
}

/* Chart Section */
.chart-section {
  padding-top: 16rpx;
}

.chart-label {
  display: block;
  text-align: center;
  font-size: 20rpx;
  color: #9ca3af;
  margin-bottom: 24rpx;
  letter-spacing: 2rpx;
}

.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48rpx;
}

.pie-chart {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background: conic-gradient(
    #10b981 0deg 162deg,
    #3b82f6 162deg 252deg,
    #f59e0b 252deg 324deg,
    #8b5cf6 324deg 360deg
  );
  position: relative;
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120rpx;
  height: 120rpx;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-text {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
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

.legend-dot.green { background-color: #10b981; }
.legend-dot.blue { background-color: #3b82f6; }
.legend-dot.orange { background-color: #f59e0b; }
.legend-dot.purple { background-color: #8b5cf6; }

.legend-text {
  font-size: 22rpx;
  color: #6b7280;
}

/* Menu Section */
.menu-section {
  padding: 48rpx 30rpx 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 32rpx;
  border-radius: 24rpx;
  margin-bottom: 16rpx;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-left text:first-child {
  font-size: 40rpx;
  color: #9ca3af;
}

.menu-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #374151;
  margin-left: 24rpx;
}

.menu-item .iconfont:last-child {
  font-size: 40rpx;
  color: #d1d5db;
}

.new-badge {
  background-color: #ef4444;
  color: #fff;
  font-size: 16rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  visibility: hidden;
}

/* Achievement Section */
.achievement-section {
  padding: 48rpx 30rpx 0;
}

.badge-scroll {
  white-space: nowrap;
}

.badge-list {
  display: flex;
  gap: 24rpx;
  padding-bottom: 16rpx;
}

.badge-item {
  min-width: 160rpx;
  height: 160rpx;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-item text {
  font-size: 64rpx;
}

.badge-yellow {
  background-color: #fefce8;
  border: 2rpx solid #fde047;
}

.badge-green {
  background-color: #ecfdf5;
  border: 2rpx solid #a7f3d0;
}

.badge-blue {
  background-color: #eff6ff;
  border: 2rpx solid #bfdbfe;
}

.badge-disabled {
  background-color: #f9fafb;
  opacity: 0.4;
  filter: grayscale(1);
}

/* Declaration */
.declaration {
  text-align: center;
  margin-top: 48rpx;
  padding-bottom: 40rpx;
}

.declaration-sub {
  display: block;
  font-size: 18rpx;
  color: #d1d5db;
  letter-spacing: 4rpx;
  text-transform: uppercase;
  margin-bottom: 16rpx;
}

.declaration-text {
  display: block;
  font-size: 28rpx;
  color: #059669;
  font-weight: 500;
  font-style: italic;
}

.declaration-date {
  display: block;
  font-size: 20rpx;
  color: #d1d5db;
  margin-top: 16rpx;
}
</style>
