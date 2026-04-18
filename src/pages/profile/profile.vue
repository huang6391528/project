<template>
  <view class="page-profile">

    <!-- ============================
         模块一：个人资料头部
         左侧头像 | 中间姓名+学校 | 右侧编辑入口
         ============================ -->
    <view class="profile-header">
      <view class="profile-main">
        <!-- 左侧：头像 -->
        <view class="avatar-wrapper">
          <image class="avatar" src="@/static/tabbar/profile_photo.jpg" mode="aspectFill"></image>
          <view class="avatar-badge">
            <text class="iconfont icon-star"></text>
          </view>
        </view>

        <!-- 中间：姓名 + 学校 + 标签 -->
        <view class="profile-detail">
          <text class="profile-name">陈同学</text>
          <text class="profile-school">贵州大学 · 经济学院</text>
          <view class="profile-badge">
            <text class="badge-text">环保大使</text>
          </view>
        </view>

        <!-- 右侧：编辑入口 -->
        <view class="edit-entry" @tap="onEditProfile">
          <text class="edit-entry-text">编辑资料</text>
          <text class="iconfont icon-chevron-right edit-entry-arrow"></text>
        </view>
      </view>
    </view>

    <!-- ============================
         模块二：碳账户卡片
         保留饼图，右上角"查看数据中心 >"文本链接
         ============================ -->
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

    <!-- ============================
         模块三：荣誉勋章独立大卡片
         直接展示 4 个勋章图标，无需点击展开
         ============================ -->
    <view class="medal-card">
      <view class="medal-card-header">
        <text class="iconfont icon-trophy medal-icon"></text>
        <text class="medal-title">荣誉勋章</text>
      </view>
      <view class="medal-list">
        <view class="medal-item">
          <view class="medal-emoji">🥇</view>
          <text class="medal-label">晨跑达人</text>
          <text class="medal-desc">连续晨跑 30 天</text>
        </view>
        <view class="medal-item">
          <view class="medal-emoji">🌿</view>
          <text class="medal-label">低碳先锋</text>
          <text class="medal-desc">累计减碳 50kg</text>
        </view>
        <view class="medal-item">
          <view class="medal-emoji">🌟</view>
          <text class="medal-label">校园之星</text>
          <text class="medal-desc">积分排名前 10%</text>
        </view>
        <view class="medal-item">
          <view class="medal-emoji">🏅</view>
          <text class="medal-label">环保大使</text>
          <text class="medal-desc">完成全部任务</text>
        </view>
      </view>
    </view>

    <!-- ============================
         模块四：底部基础菜单列表
         ============================ -->
    <view class="menu-section">
      <!-- 账号设置 -->
      <view class="menu-item" @tap="goToSettings">
        <view class="menu-left">
          <text class="menu-text">账号设置</text>
        </view>
        <text class="iconfont icon-chevron-right menu-arrow"></text>
      </view>
      
      <!-- 消息通知 -->
      <view class="menu-item" @tap="goToNotification">
        <view class="menu-left">
          <text class="menu-text">消息通知</text>
        </view>
        <text class="iconfont icon-chevron-right menu-arrow"></text>
      </view>
      
      <!-- 帮助与反馈 -->
      <view class="menu-item" @tap="goToHelp">
        <view class="menu-left">
          <text class="menu-text">帮助与反馈</text>
        </view>
        <text class="iconfont icon-chevron-right menu-arrow"></text>
      </view>
    </view>

  </view>
</template>

<script setup>
// 原有方法保留
function onEditProfile() {
  uni.showToast({ title: '编辑资料开发中', icon: 'none' })
}

function goToDataCenter() {
  uni.showToast({ title: '数据中心开发中', icon: 'none' })
}


// ========== 修改后的跳转方法 ==========
function goToSettings() {
  uni.navigateTo({
    url: '/pages/profile/settings'
  })
}

function goToNotification() {
  uni.navigateTo({
    url: '/pages/profile/notification'
  })
}

function goToHelp() {
  uni.navigateTo({
    url: '/pages/profile/help'
  })
}
</script>

<style scoped>
/* ─────────────────────────────────────────
   页面容器
   ───────────────────────────────────────── */
.page-profile {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* ─────────────────────────────────────────
   模块一：个人资料头部
   ───────────────────────────────────────── */
.profile-header {
  background: linear-gradient(160deg, #10b981 0%, #059669 100%);
  padding: 96rpx 40rpx 72rpx;
  border-radius: 0 0 56rpx 56rpx;
}

.profile-main {
  display: flex;
  align-items: center;
}

/* 头像 */
.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 144rpx;
  height: 144rpx;
  border-radius: 50%;
  border: 6rpx solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.avatar-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48rpx;
  height: 48rpx;
  background-color: #fbbf24;
  border-radius: 50%;
  border: 3rpx solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-badge text {
  font-size: 20rpx;
  color: #fff;
}

/* 中间信息 */
.profile-detail {
  flex: 1;
  margin-left: 32rpx;
  overflow: hidden;
}

.profile-name {
  display: block;
  font-size: 44rpx;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: 2rpx;
}

.profile-school {
  display: block;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 6rpx;
}

.profile-badge {
  display: inline-block;
  margin-top: 12rpx;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 6rpx 20rpx;
  border-radius: 50rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.35);
}

.badge-text {
  font-size: 20rpx;
  font-weight: 600;
  color: #ffffff;
}

/* 右侧编辑入口 */
.edit-entry {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2rpx;
  padding: 12rpx 0 12rpx 20rpx;
  margin-left: 8rpx;
}

.edit-entry-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.edit-entry-arrow {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.85);
  margin-left: 2rpx;
}

/* ─────────────────────────────────────────
   模块二：碳账户卡片
   ───────────────────────────────────────── */
.carbon-card {
  background-color: #ffffff;
  border-radius: 32rpx;
  padding: 32rpx 36rpx;
  margin: -32rpx 28rpx 0;
  box-shadow: 0 8rpx 32rpx rgba(16, 185, 129, 0.10);
}

.carbon-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28rpx;
}

.carbon-card-title {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.carbon-card-title .iconfont {
  font-size: 36rpx;
  color: #10b981;
}

.carbon-card-title text:last-child {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
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
  font-size: 26rpx;
}

/* 饼图区域 */
.chart-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 56rpx;
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
  flex-shrink: 0;
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
  font-weight: 800;
  color: #1f2937;
  line-height: 1;
}

.pie-unit {
  font-size: 18rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}

/* 图例 */
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

.legend-dot.green  { background-color: #10b981; }
.legend-dot.blue   { background-color: #3b82f6; }
.legend-dot.orange { background-color: #f59e0b; }
.legend-dot.purple { background-color: #8b5cf6; }

.legend-text {
  font-size: 24rpx;
  color: #6b7280;
  font-weight: 500;
}

/* ─────────────────────────────────────────
   模块三：荣誉勋章大卡片
   ───────────────────────────────────────── */
.medal-card {
  margin: 28rpx 28rpx 0;
  background-color: #ffffff;
  border-radius: 32rpx;
  padding: 32rpx 28rpx 36rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.06);
}

.medal-card-header {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 28rpx;
}

.medal-icon {
  font-size: 36rpx;
  color: #f59e0b;
}

.medal-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #1f2937;
}

/* 勋章网格：4 列 */
.medal-list {
  display: flex;
  gap: 20rpx;
}

.medal-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  border-radius: 20rpx;
  padding: 20rpx 8rpx 16rpx;
  border: 1rpx solid #f3f4f6;
}

.medal-emoji {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52rpx;
  line-height: 1;
  margin-bottom: 10rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.medal-label {
  font-size: 22rpx;
  font-weight: 700;
  color: #374151;
  text-align: center;
  line-height: 1.2;
}

.medal-desc {
  font-size: 18rpx;
  color: #9ca3af;
  text-align: center;
  margin-top: 4rpx;
  line-height: 1.2;
}

/* ─────────────────────────────────────────
   模块四：底部菜单列表
   ───────────────────────────────────────── */
.menu-section {
  padding: 28rpx 28rpx 0;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 32rpx 32rpx;
  border-radius: 24rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  font-size: 40rpx;
  color: #d1d5db;
}

.menu-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #374151;
  margin-left: 24rpx;
}

.menu-arrow {
  font-size: 36rpx;
  color: #d1d5db;
}
</style>