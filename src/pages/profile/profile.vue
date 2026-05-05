<template>
  <view class="page-profile carbon-page-shell">
    <view class="profile-hero carbon-fade-up">
      <view class="profile-main">
        <view class="avatar-wrapper">
          <image class="avatar" src="@/static/tabbar/profile_photo.jpg" mode="aspectFill"></image>
          <view class="avatar-badge">星</view>
        </view>
        <view class="profile-detail">
          <text class="profile-name">陈同学</text>
          <text class="profile-school">贵州大学 · 经济学院</text>
          <view class="profile-badge">
            <text class="badge-text">环保大使 · Lv.6</text>
          </view>
        </view>
        <view class="edit-entry carbon-lift" @tap="onEditProfile">
          <text class="edit-entry-text">编辑</text>
        </view>
      </view>
      <view class="profile-kpis">
        <view>
          <text class="kpi-value">12.5kg</text>
          <text class="kpi-label">累计减碳</text>
        </view>
        <view>
          <text class="kpi-value">2,480</text>
          <text class="kpi-label">碳积分</text>
        </view>
        <view>
          <text class="kpi-value">28</text>
          <text class="kpi-label">校园排名</text>
        </view>
      </view>
    </view>

    <view class="carbon-card carbon-glass-card">
      <view class="carbon-card-header">
        <view class="carbon-card-title">
          <text>碳账户结构</text>
        </view>
        <view class="data-center-link" @tap="goToDataCenter">
          <text>数据中心</text>
          <text class="iconfont icon-chevron-right"></text>
        </view>
      </view>
      <view class="chart-section">
        <view class="pie-chart carbon-flow">
          <view class="pie-center">
            <text class="pie-value">12.5</text>
            <text class="pie-unit">kg CO₂</text>
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

    <view class="medal-card carbon-glass-card">
      <view class="medal-card-header">
        <text class="medal-title">荣誉勋章</text>
        <text class="medal-sub">4/8 已点亮</text>
      </view>
      <view class="medal-list">
        <view class="medal-item active">
          <view class="medal-emoji">RUN</view>
          <text class="medal-label">晨跑达人</text>
          <text class="medal-desc">连续晨跑 30 天</text>
        </view>
        <view class="medal-item active">
          <view class="medal-emoji">CO₂</view>
          <text class="medal-label">低碳先锋</text>
          <text class="medal-desc">累计减碳 50kg</text>
        </view>
        <view class="medal-item">
          <view class="medal-emoji">TOP</view>
          <text class="medal-label">校园之星</text>
          <text class="medal-desc">积分前 10%</text>
        </view>
        <view class="medal-item">
          <view class="medal-emoji">ECO</view>
          <text class="medal-label">环保大使</text>
          <text class="medal-desc">完成全部任务</text>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-item carbon-glass-card carbon-lift" @tap="goToSettings">
        <view class="menu-left">
          <text class="menu-icon">SET</text>
          <text class="menu-text">账号设置</text>
        </view>
        <text class="iconfont icon-chevron-right menu-arrow"></text>
      </view>
      <view class="menu-item carbon-glass-card carbon-lift" @tap="goToNotification">
        <view class="menu-left">
          <text class="menu-icon">MSG</text>
          <text class="menu-text">消息通知</text>
        </view>
        <text class="iconfont icon-chevron-right menu-arrow"></text>
      </view>
      <view class="menu-item carbon-glass-card carbon-lift" @tap="goToHelp">
        <view class="menu-left">
          <text class="menu-icon">FAQ</text>
          <text class="menu-text">帮助与反馈</text>
        </view>
        <text class="iconfont icon-chevron-right menu-arrow"></text>
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

function goToSettings() {
  uni.navigateTo({ url: '/pages/profile/settings' })
}

function goToNotification() {
  uni.navigateTo({ url: '/pages/profile/notification' })
}

function goToHelp() {
  uni.navigateTo({ url: '/pages/profile/help' })
}
</script>

<style scoped>
.page-profile {
  min-height: 100vh;
  padding-bottom: 120rpx;
}

.profile-hero {
  margin: 26rpx 30rpx 0;
  padding: 36rpx;
  border-radius: 42rpx;
  color: #fff;
  background:
    radial-gradient(circle at 88% 8%, rgba(250, 204, 21, 0.34), transparent 30%),
    linear-gradient(135deg, #10231b, #047857 72%);
  box-shadow: 0 24rpx 58rpx rgba(5, 95, 70, 0.22);
}

.profile-main {
  display: flex;
  align-items: center;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 132rpx;
  height: 132rpx;
  border-radius: 34rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.58);
  box-shadow: 0 12rpx 28rpx rgba(0, 0, 0, 0.18);
}

.avatar-badge {
  position: absolute;
  bottom: -4rpx;
  right: -4rpx;
  width: 46rpx;
  height: 46rpx;
  background-color: #fbbf24;
  border-radius: 16rpx;
  border: 3rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 900;
  color: #713f12;
}

.profile-detail {
  flex: 1;
  margin-left: 28rpx;
  overflow: hidden;
}

.profile-name {
  display: block;
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.2;
}

.profile-school {
  display: block;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.76);
  margin-top: 6rpx;
}

.profile-badge {
  display: inline-block;
  margin-top: 12rpx;
  background: rgba(255, 255, 255, 0.16);
  padding: 7rpx 18rpx;
  border-radius: 999rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.24);
}

.badge-text {
  font-size: 20rpx;
  font-weight: 800;
}

.edit-entry {
  flex-shrink: 0;
  padding: 12rpx 20rpx;
  border-radius: 999rpx;
  background: rgba(255,255,255,0.14);
  border: 1rpx solid rgba(255,255,255,0.22);
}

.edit-entry-text {
  font-size: 24rpx;
  color: #fff;
  font-weight: 800;
}

.profile-kpis {
  margin-top: 32rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12rpx;
}

.profile-kpis view {
  padding: 18rpx 12rpx;
  border-radius: 24rpx;
  background: rgba(255,255,255,0.14);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kpi-value {
  font-size: 30rpx;
  font-weight: 900;
  color: #facc15;
}

.kpi-label {
  font-size: 20rpx;
  color: rgba(255,255,255,0.72);
  margin-top: 4rpx;
}

.carbon-card {
  border-radius: 32rpx;
  padding: 32rpx 34rpx;
  margin: 24rpx 30rpx 0;
}

.carbon-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28rpx;
}

.carbon-card-title text {
  font-size: 30rpx;
  font-weight: 900;
  color: #12211b;
}

.data-center-link {
  display: flex;
  align-items: center;
  gap: 4rpx;
  font-size: 24rpx;
  color: #047857;
  font-weight: 800;
}

.chart-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50rpx;
}

.pie-chart {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background: conic-gradient(
    #10b981 0deg 162deg,
    #38bdf8 162deg 252deg,
    #f59e0b 252deg 324deg,
    #8b5cf6 324deg 360deg
  );
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 14rpx 34rpx rgba(16, 185, 129, 0.16);
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 118rpx;
  height: 118rpx;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pie-value {
  font-size: 30rpx;
  font-weight: 900;
  color: #12211b;
  line-height: 1;
}

.pie-unit {
  font-size: 18rpx;
  color: #65746d;
  margin-top: 4rpx;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.legend-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 4rpx;
  flex-shrink: 0;
}

.legend-dot.green { background-color: #10b981; }
.legend-dot.blue { background-color: #38bdf8; }
.legend-dot.orange { background-color: #f59e0b; }
.legend-dot.purple { background-color: #8b5cf6; }

.legend-text {
  font-size: 24rpx;
  color: #50635a;
  font-weight: 700;
}

.medal-card {
  margin: 24rpx 30rpx 0;
  border-radius: 32rpx;
  padding: 32rpx 28rpx 36rpx;
}

.medal-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26rpx;
}

.medal-title {
  font-size: 30rpx;
  font-weight: 900;
  color: #12211b;
}

.medal-sub {
  font-size: 22rpx;
  color: #047857;
  font-weight: 800;
}

.medal-list {
  display: flex;
  gap: 16rpx;
}

.medal-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(248, 250, 252, 0.82);
  border-radius: 22rpx;
  padding: 20rpx 8rpx 16rpx;
  border: 1rpx solid rgba(17, 169, 125, 0.10);
  opacity: 0.72;
}

.medal-item.active {
  opacity: 1;
  background: linear-gradient(180deg, #ecfdf5, #ffffff);
}

.medal-emoji {
  width: 80rpx;
  height: 80rpx;
  border-radius: 26rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 900;
  color: #047857;
  margin-bottom: 10rpx;
  box-shadow: 0 8rpx 20rpx rgba(16, 185, 129, 0.10);
}

.medal-label {
  font-size: 21rpx;
  font-weight: 900;
  color: #22352d;
  text-align: center;
}

.medal-desc {
  font-size: 18rpx;
  color: #7b8b83;
  text-align: center;
  margin-top: 4rpx;
  line-height: 1.25;
}

.menu-section {
  padding: 24rpx 30rpx 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 30rpx;
  border-radius: 28rpx;
  margin-bottom: 16rpx;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 58rpx;
  height: 58rpx;
  border-radius: 18rpx;
  background: rgba(16,185,129,0.10);
  color: #047857;
  font-size: 18rpx;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-text {
  font-size: 28rpx;
  font-weight: 800;
  color: #22352d;
  margin-left: 22rpx;
}

.menu-arrow {
  font-size: 34rpx;
  color: #8aa197;
}
</style>
