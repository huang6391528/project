<template>
  <view class="page-profile">
    <!-- Top Profile -->
    <view class="profile-header">
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
        </view>
      </view>
      <view class="edit-btn" @tap="onEditProfile">
        <text class="iconfont icon-edit"></text>
        <text class="edit-text">编辑资料</text>
      </view>
    </view>

    <!-- Carbon Account Card -->
    <view class="carbon-card">
      <view class="carbon-card-header">
        <view class="carbon-card-title">
          <text class="iconfont icon-chart"></text>
          <text>碳账户</text>
        </view>
        <view class="data-center-link" @tap="goToDataCenter">
          <text>查看数据中心</text>
          <text class="iconfont icon-chevron-right"></text>
        </view>
      </view>
      <view class="chart-section">
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

    <!-- Menu Sections -->
    <view class="menu-section">
      <view class="menu-item">
        <view class="menu-left">
          <text class="iconfont icon-trophy"></text>
          <text class="menu-text">荣誉勋章</text>
        </view>
        <text class="iconfont icon-chevron-right"></text>
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <text class="iconfont icon-settings"></text>
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
  </view>
</template>

<script setup>
function onEditProfile() {
  uni.showToast({ title: '编辑资料开发中', icon: 'none' })
}

function goToDataCenter() {
  uni.showToast({ title: '数据中心开发中', icon: 'none' })
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

.edit-btn {
  position: absolute;
  top: 40rpx;
  right: 48rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
  background-color: #fff;
  padding: 12rpx 28rpx;
  border-radius: 50rpx;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
}

.edit-btn text:first-child {
  font-size: 28rpx;
  color: #059669;
}

.edit-text {
  font-size: 24rpx;
  font-weight: 600;
  color: #059669;
}

/* Carbon Account Card */
.carbon-card {
  background-color: #fff;
  border-radius: 48rpx;
  padding: 32rpx;
  margin: -48rpx 30rpx 0;
  box-shadow: 0 16rpx 48rpx rgba(0,0,0,0.08);
}

.carbon-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.carbon-card-title {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.carbon-card-title text:first-child {
  font-size: 36rpx;
  color: #10b981;
}

.data-center-link {
  display: flex;
  align-items: center;
  gap: 4rpx;
  font-size: 24rpx;
  color: #10b981;
  font-weight: 600;
}

.data-center-link .iconfont {
  font-size: 28rpx;
}

/* Chart Section */
.chart-section {
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

.pie-segment {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
</style>
