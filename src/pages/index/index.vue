<template>
  <view class="page-home">
    <!-- 侧边栏遮罩层 -->
    <view v-if="sidebarShow" class="sidebar-mask" @click="toggleSidebar"></view>
    
    <!-- 侧边栏容器 - 宽度已调整为1/3屏宽 -->
    <view class="sidebar" :class="{ 'sidebar-show': sidebarShow }">
      <!-- 用户资料区 -->
      <view class="sidebar-profile">
        <view class="sidebar-profile-main">
          <image class="sidebar-avatar" src="/static/tabbar/profile.jpg" mode="aspectFill"></image>
          <view class="sidebar-profile-info">
            <text class="sidebar-name">陈同学</text>
            <text class="sidebar-meta">经济学院</text>
            <text class="sidebar-class">2023级经济一班</text>
          </view>
        </view>
        <view class="sidebar-follow-row">
          <view class="follow-item">
            <text class="follow-num">12</text>
            <text class="follow-label">关注</text>
          </view>
          <view class="follow-divider"></view>
          <view class="follow-item">
            <text class="follow-num">38</text>
            <text class="follow-label">粉丝</text>
          </view>
        </view>
      </view>

      <!-- 菜单列表（可滚动） -->
      <scroll-view class="sidebar-menu" scroll-y>
        <!-- 可折叠：已加入班级 -->
        <view class="menu-group">
          <view class="menu-item parent-item" @click="toggleJoinedClass">
            <text class="menu-icon">🏫</text>
            <text class="menu-label">已加入班级</text>
            <text class="menu-arrow">{{ joinedClassExpanded ? '▼' : '▶' }}</text>
          </view>
          <view v-if="joinedClassExpanded" class="sub-menu">
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/class-list/class-list?type=major')">
              <text class="menu-icon">📘</text>
              <text class="menu-label">专业班级</text>
            </view>
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/class-list/class-list?type=course')">
              <text class="menu-icon">📗</text>
              <text class="menu-label">课程班级</text>
            </view>
          </view>
        </view>

        <!-- 可折叠：我的打卡团 -->
        <view class="menu-group">
          <view class="menu-item parent-item" @click="toggleCheckinGroup">
            <text class="menu-icon">🤝</text>
            <text class="menu-label">我的打卡团</text>
            <text class="menu-arrow">{{ checkinGroupExpanded ? '▼' : '▶' }}</text>
          </view>
          <view v-if="checkinGroupExpanded" class="sub-menu">
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/checkin-group/checkin-group?status=joined')">
              <text class="menu-icon">✅</text>
              <text class="menu-label">已加入</text>
            </view>
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/checkin-group/checkin-group?status=pending')">
              <text class="menu-icon">❌</text>
              <text class="menu-label">未通过</text>
            </view>
          </view>
        </view>

        <!-- 直接入口 -->
        <view class="menu-item direct-item" @click="navigateTo('/pages/message/message')">
          <text class="menu-icon">💬</text>
          <text class="menu-label">消息</text>
        </view>
        <view class="menu-item direct-item" @click="navigateTo('/pages/friends/friends')">
          <text class="menu-icon">❤️</text>
          <text class="menu-label">关注好友</text>
        </view>
        <view class="menu-item direct-item" @click="navigateTo('/pages/moments/moments')">
          <text class="menu-icon">📝</text>
          <text class="menu-label">我的动态</text>
        </view>
        <view class="menu-item direct-item" @click="navigateTo('/pages/low-carbon-circle/low-carbon-circle')">
          <text class="menu-icon">🌿</text>
          <text class="menu-label">低碳圈</text>
        </view>
      </scroll-view>
    </view>

    <!-- Header Stats - 左侧三条杠，右侧扫码+铃铛 -->
    <view class="header-stats">
      <view class="header-left">
        <view class="sidebar-trigger-btn" @click="toggleSidebar">
          <text class="icon-btn">☰</text>
        </view>
      </view>
      <view class="header-right">
        <view class="scan-btn" @click="handleScan">
          <text class="icon-btn">🔍</text>
        </view>
        <view class="bell-icon">
          <text class="icon-btn">🔔</text>
          <view class="bell-dot"></view>
        </view>
      </view>
    </view>

    <!-- 个人卡片 -->
    <view class="personal-card">
      <view class="user-info">
        <image class="avatar" src="/static/tabbar/profile.jpg" mode="aspectFill"></image>
        <view class="user-detail">
          <text class="user-name">陈同学</text>
          <text class="user-school">复旦大学 · 经济学院</text>
          <view class="carbon-points">
            <text class="carbon-points-num">2,480</text>
            <text class="carbon-points-unit">碳积分</text>
          </view>
        </view>
      </view>
      <view class="tree-progress">
        <view class="progress-header">
          <view class="progress-title-area">
            <text class="progress-points-big"></text>
            <text class="progress-title">树木守护进度</text>
          </view>
          <text class="progress-sub">已抵消 45.2kg CO₂</text>
        </view>
        <view class="progress-bar">
          <view class="progress-fill" style="width: 65%"></view>
        </view>
        <view class="progress-footer">
          <view class="tree-count">
            <view class="tree-anim">
              <text>🌳</text>
            </view>
            <text class="count-num">3.2 <text class="count-unit">棵</text></text>
          </view>
          <view class="fire-streak">
            <view class="fire-anim">
              <text>🔥</text>
            </view>
            <text class="streak-text">连续打卡 <text class="streak-num">12</text> 天</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 统计卡片 -->
    <view class="stats-grid">
      <view class="stat-item stat-blue">
        <text class="icon-emoji">🏃</text>
        <text class="stat-label">运动减碳</text>
        <text class="stat-value stat-blue-text">+1.2kg</text>
      </view>
      <view class="stat-item stat-orange">
        <text class="icon-emoji">🏠</text>
        <text class="stat-label">生活减碳</text>
        <text class="stat-value stat-orange-text">+0.8kg</text>
      </view>
      <view class="stat-item stat-purple">
        <text class="icon-emoji">🏆</text>
        <text class="stat-label">全校排名</text>
        <text class="stat-value stat-purple-text">第28名</text>
      </view>
    </view>

    <!-- 快捷打卡入口 -->
    <view class="section-title">
      <text class="icon-emoji">📅</text>
      <text>快捷打卡入口</text>
    </view>
    <view class="action-grid">
      <view class="action-item">
        <text class="icon-emoji">⚡</text>
        <text class="action-text">校园跑</text>
      </view>
      <view class="action-item opacity-60">
        <text class="icon-emoji">🚲</text>
        <text class="action-text">绿色出行</text>
      </view>
      <view class="action-item">
        <text class="icon-emoji">🥗</text>
        <text class="action-text">低碳饮食</text>
      </view>
      <view class="action-item">
        <text class="icon-emoji">📦</text>
        <text class="action-text">减外卖</text>
      </view>
      <view class="action-item action-highlight">
        <text class="icon-emoji">📸</text>
        <text class="action-text action-text-highlight">旧物利用</text>
      </view>
      <view class="action-item">
        <text class="icon-emoji">🚶</text>
        <text class="action-text">步行计步</text>
      </view>
    </view>

    <!-- 今日任务 -->
    <view class="daily-task">
      <view class="task-left">
        <view class="task-icon">
          <text class="icon-emoji task-check">✅</text>
        </view>
        <view class="task-info">
          <text class="task-title">今日任务进度</text>
          <text class="task-sub">已完成 3/5 个任务</text>
        </view>
      </view>
      <button class="task-btn">去完成</button>
    </view>

    <!-- 活动 Banner -->
    <view class="section-title">
      <text class="icon-emoji">📅</text>
      <text>活动</text>
    </view>
    <view class="banner">
      <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/b9c8194c51e2407997135fdc0513e984.jpg" mode="aspectFill"></image>
      <view class="banner-overlay">
        <text class="banner-title">2026 校园春季马拉松</text>
        <text class="banner-sub">即刻报名，最高奖励 500 积分</text>
      </view>
    </view>

    <!-- 环保小贴士 -->
    <view class="knowledge-section">
      <view class="knowledge-title">
        <text class="icon-emoji">💡</text>
        <text>环保小贴士</text>
      </view>
      <text class="knowledge-text">"回收一吨废纸，可造好纸850公斤，节省木材3立方米，同时减少污染排放。"</text>
    </view>

    <!-- 二维码弹窗 -->
    <view v-if="showQrModal" class="qr-modal-mask" @click="closeQrModal">
      <view class="qr-modal-container" @click.stop>
        <view class="qr-modal-header">
          <text class="qr-modal-title">扫描二维码</text>
          <view class="qr-close-btn" @click="closeQrModal">✕</view>
        </view>
        <view class="qr-code-wrapper">
          <image class="qr-code-image" mode="widthFix" :src="qrCodeUrl"></image>
          <text class="qr-tip">请使用微信/支付宝扫一扫</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const sidebarShow = ref(false)
const joinedClassExpanded = ref(false)
const checkinGroupExpanded = ref(false)
const showQrModal = ref(false)

const qrCodeUrl = ref('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/carbon-campus')

const toggleSidebar = () => {
  sidebarShow.value = !sidebarShow.value
  console.log('侧边栏状态:', sidebarShow.value)
}

const toggleJoinedClass = () => {
  joinedClassExpanded.value = !joinedClassExpanded.value
}

const toggleCheckinGroup = () => {
  checkinGroupExpanded.value = !checkinGroupExpanded.value
}

const navigateTo = (url) => {
  sidebarShow.value = false
  uni.navigateTo({ url })
}

const handleScan = () => {
  console.log('点击了扫码按钮，显示二维码')
  showQrModal.value = true
}

const closeQrModal = () => {
  showQrModal.value = false
}
</script>

<style scoped>
.page-home {
  padding: 0 30rpx;
  padding-bottom: 120rpx;
  background-color: #ffffff;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* 侧边栏遮罩层 */
.sidebar-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: opacity 0.3s ease;
}

/* 侧边栏容器 */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 33.33vw;
  max-width: 320rpx;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.sidebar-show {
  transform: translateX(0);
}

/* 侧边栏资料区 */
.sidebar-profile {
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  margin-bottom: 16rpx;
  flex-shrink: 0;
}
.sidebar-profile-main {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}
.sidebar-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  flex-shrink: 0;
}
.sidebar-profile-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sidebar-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}
.sidebar-meta {
  font-size: 22rpx;
  color: #666;
  line-height: 1.4;
}
.sidebar-class {
  font-size: 20rpx;
  color: #999;
  line-height: 1.4;
}
.sidebar-follow-row {
  display: flex;
  align-items: center;
  gap: 0;
}
.follow-item {
  display: flex;
  align-items: center;
  gap: 6rpx;
}
.follow-num {
  font-size: 24rpx;
  font-weight: 600;
  color: #10b981;
}
.follow-label {
  font-size: 22rpx;
  color: #666;
}
.follow-divider {
  width: 1rpx;
  height: 24rpx;
  background-color: #e0e0e0;
  margin: 0 20rpx;
}

/* 侧边栏菜单 */
.sidebar-menu {
  flex: 1;
  width: 100%;
  height: calc(100vh - 200rpx);
}
.menu-group {
  margin-bottom: 8rpx;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 16rpx 8rpx;
  border-radius: 12rpx;
  gap: 12rpx;
  transition: background-color 0.15s;
}
.menu-item:active {
  background-color: #f0f0f0;
}
.parent-item {
  cursor: pointer;
}
.menu-icon {
  font-size: 28rpx;
  flex-shrink: 0;
}
.menu-label {
  font-size: 26rpx;
  color: #333;
  flex: 1;
}
.menu-arrow {
  font-size: 20rpx;
  color: #999;
  flex-shrink: 0;
}
.sub-menu {
  padding-left: 16rpx;
}
.sub-item {
  padding: 12rpx 8rpx;
}
.sub-item .menu-icon {
  font-size: 24rpx;
}
.sub-item .menu-label {
  font-size: 24rpx;
  color: #555;
}
.direct-item {
  cursor: pointer;
}

/* 通用 Emoji 图标样式 */
.icon-emoji {
  font-size: 48rpx;
  display: inline-block;
  line-height: 1;
}

/* Header 按钮样式 */
.header-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
  position: relative;
  z-index: 10;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.sidebar-trigger-btn,
.scan-btn,
.bell-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f5f5f5;
  cursor: pointer;
  position: relative;
}

.icon-btn {
  font-size: 48rpx;
  color: #666;
}

.bell-dot {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  width: 16rpx;
  height: 16rpx;
  background-color: #ef4444;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

/* 个人卡片 */
.personal-card {
  margin-top: 48rpx;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 48rpx;
  padding: 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(16, 185, 129, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255,255,255,0.5);
}

.user-detail {
  margin-left: 32rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  display: block;
}

.user-school {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  display: block;
  margin-top: 4rpx;
}

.carbon-points {
  display: flex;
  align-items: baseline;
  margin-top: 12rpx;
}

.carbon-points-num {
  font-size: 56rpx;
  font-weight: 900;
  color: #fbbf24;
  line-height: 1;
  text-shadow: 0 4rpx 12rpx rgba(0,0,0,0.15);
}

.carbon-points-unit {
  font-size: 28rpx;
  color: rgba(255,255,255,0.9);
  margin-left: 10rpx;
  font-weight: 600;
}

/* 树木进度 */
.tree-progress {
  margin-top: 48rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 32rpx;
  padding: 32rpx;
  backdrop-filter: blur(10px);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.progress-title-area {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
}

.progress-points-big {
  font-size: 40rpx;
  font-weight: 800;
  color: #fbbf24;
}

.progress-title {
  font-size: 28rpx;
  color: #fff;
}

.progress-sub {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
}

.progress-bar {
  width: 100%;
  height: 24rpx;
  background-color: rgba(255,255,255,0.3);
  border-radius: 12rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #fff;
  border-radius: 12rpx;
}

.progress-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 32rpx;
}

.tree-count {
  display: flex;
  align-items: center;
}

.tree-anim {
  animation: tree-sway 3s ease-in-out infinite;
  font-size: 40rpx;
}

.count-num {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
  margin-left: 8rpx;
}

.count-unit {
  font-size: 28rpx;
  font-weight: normal;
}

.fire-streak {
  display: flex;
  align-items: center;
}

.fire-anim {
  animation: fire-flicker 1s ease-in-out infinite;
  font-size: 40rpx;
}

.streak-text {
  font-size: 28rpx;
  color: #fff;
  margin-left: 8rpx;
}

.streak-num {
  font-weight: bold;
}

/* 统计卡片 */
.stats-grid {
  display: flex;
  justify-content: space-between;
  margin-top: 32rpx;
  gap: 24rpx;
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 12rpx;
  border-radius: 32rpx;
}

.stat-blue {
  background-color: #eff6ff;
  border: 2rpx solid #dbeafe;
}

.stat-orange {
  background-color: #fff7ed;
  border: 2rpx solid #fed7aa;
}

.stat-purple {
  background-color: #faf5ff;
  border: 2rpx solid #e9d5ff;
}

.stat-label {
  display: block;
  font-size: 20rpx;
  color: #666;
  margin-top: 8rpx;
}

.stat-value {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-top: 4rpx;
}

.stat-blue-text { color: #1d4ed8; }
.stat-orange-text { color: #c2410c; }
.stat-purple-text { color: #7c3aed; }

.stat-item .icon-emoji {
  font-size: 40rpx;
}

/* 分区标题 */
.section-title {
  margin-top: 48rpx;
  margin-bottom: 24rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 12rpx;
}

/* 快捷打卡网格 */
.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24rpx;
}

.action-item {
  text-align: center;
  padding: 24rpx 12rpx;
  background-color: #f9fafb;
  border: 2rpx solid #f3f4f6;
  border-radius: 24rpx;
}

.action-item .icon-emoji {
  font-size: 48rpx;
}

.action-text {
  display: block;
  font-size: 22rpx;
  color: #374151;
  margin-top: 8rpx;
}

.action-highlight {
  background-color: #ecfdf5;
  border-color: #a7f3d0;
}

.action-text-highlight {
  color: #059669;
  font-weight: bold;
}

.opacity-60 {
  opacity: 0.6;
}

/* 今日任务 */
.daily-task {
  margin-top: 48rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 4rpx solid #d1fae5;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.task-left {
  display: flex;
  align-items: center;
}

.task-icon {
  width: 96rpx;
  height: 96rpx;
  background-color: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-icon .icon-emoji {
  font-size: 56rpx;
}

.task-info {
  margin-left: 24rpx;
}

.task-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.task-sub {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}

.task-btn {
  background-color: #10b981;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 12rpx 28rpx;
  border-radius: 50rpx;
  box-shadow: 0 8rpx 16rpx rgba(16, 185, 129, 0.3);
}

/* Banner */
.banner {
  margin-top: 48rpx;
  margin-bottom: 32rpx;
  height: 224rpx;
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32rpx;
}

.banner-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.banner-sub {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 8rpx;
}

/* 环保小贴士 */
.knowledge-section {
  background-color: #f9fafb;
  border-radius: 32rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.knowledge-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.knowledge-text {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.6;
  font-style: italic;
}

/* 二维码弹窗 */
.qr-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-modal-container {
  width: 500rpx;
  background-color: #fff;
  border-radius: 32rpx;
  overflow: hidden;
  animation: fadeInUp 0.2s ease;
}

.qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 30rpx 0 30rpx;
}

.qr-modal-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.qr-close-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #999;
  cursor: pointer;
}

.qr-code-wrapper {
  padding: 40rpx 30rpx 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code-image {
  width: 280rpx;
  height: 280rpx;
  border-radius: 16rpx;
}

.qr-tip {
  margin-top: 24rpx;
  font-size: 24rpx;
  color: #666;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 动画 */
@keyframes tree-sway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes fire-flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}
</style>