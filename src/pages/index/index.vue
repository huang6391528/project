<template>
  <view class="page-home" @click="closeScanMenu">
    <!-- 侧边栏遮罩层 -->
    <view v-if="sidebarShow" class="sidebar-mask" @click="toggleSidebar"></view>

    <!-- 侧边栏容器 -->
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
        <view class="menu-group">
          <view class="menu-item parent-item" @click="toggleJoinedClass">
            <text class="menu-icon">🏫</text>
            <text class="menu-label">已加入班级</text>
            <text class="menu-arrow">{{ joinedClassExpanded ? '▼' : '▶' }}</text>
          </view>
          <view v-if="joinedClassExpanded" class="sub-menu">
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/class-list/class-list?type=major')">
              <text class="menu-label">专业班级</text>
            </view>
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/class-list/class-list?type=course')">
              <text class="menu-label">课程班级</text>
            </view>
          </view>
        </view>

        <view class="menu-group">
          <view class="menu-item parent-item" @click="toggleCheckinGroup">
            <text class="menu-icon">🤝</text>
            <text class="menu-label">我的打卡团</text>
            <text class="menu-arrow">{{ checkinGroupExpanded ? '▼' : '▶' }}</text>
          </view>
          <view v-if="checkinGroupExpanded" class="sub-menu">
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/checkin-group/checkin-group?status=joined')">
              <text class="menu-label">已加入</text>
            </view>
            <view class="menu-item sub-item" @click.stop="navigateTo('/pages/checkin-group/checkin-group?status=pending')">
              <text class="menu-label">未通过</text>
            </view>
          </view>
        </view>

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

    <!-- Header -->
    <view class="header-stats">
      <view class="header-left">
        <view class="sidebar-trigger-btn" @click.stop="toggleSidebar">
          <text class="icon-btn">☰</text>
        </view>
      </view>
      <view class="header-right">
        <!-- 扫码按钮 + 下拉菜单 -->
        <view class="scan-btn-container" @click.stop="toggleScanMenu">
          <view class="scan-btn">
            <view class="scan-frame">
              <view class="scan-corner sc-tl"></view>
              <view class="scan-corner sc-tr"></view>
              <view class="scan-corner sc-bl"></view>
              <view class="scan-corner sc-br"></view>
            </view>
          </view>
          <!-- 下拉菜单 -->
          <view v-if="scanMenuShow" class="scan-dropdown" @click.stop>
            <view class="scan-dropdown-arrow"></view>
            <view class="scan-dropdown-inner">
              <view class="scan-dropdown-item" @click.stop="handleScanScan">扫一扫</view>
              <view class="scan-dropdown-divider"></view>
              <view class="scan-dropdown-item" @click.stop="handleInviteCode">邀请码</view>
            </view>
          </view>
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
            <view class="tree-anim"><text>🌳</text></view>
            <text class="count-num">3.2 <text class="count-unit">棵</text></text>
          </view>
          <view class="fire-streak">
            <view class="fire-anim"><text>🔥</text></view>
            <text class="streak-text">连续打卡 <text class="streak-num">12</text> 天</text>
          </view>
        </view>
      </view>
    </view>

    <!-- ── UNIFIED 数据仪表面板（单一无缝横向面板）── -->
    <view class="unified-stats-panel">
      <view class="unified-stat-cell">
        <text class="unified-stat-emoji">🏃</text>
        <text class="unified-stat-value u-blue">+1.2kg</text>
        <text class="unified-stat-label">运动减碳</text>
      </view>
      <view class="unified-stat-sep"></view>
      <view class="unified-stat-cell">
        <text class="unified-stat-emoji">🏠</text>
        <text class="unified-stat-value u-orange">+0.8kg</text>
        <text class="unified-stat-label">生活减碳</text>
      </view>
      <view class="unified-stat-sep"></view>
      <view class="unified-stat-cell">
        <text class="unified-stat-emoji">🏆</text>
        <text class="unified-stat-value u-purple">第28名</text>
        <text class="unified-stat-label">全校排名</text>
      </view>
    </view>

    <!-- 区域分隔：数据展示 → 快捷操作 -->
    <view class="zone-divider">
      <view class="zone-divider-line"></view>
      <view class="zone-divider-badge">
        <text class="zone-divider-text">快 捷 操 作</text>
      </view>
      <view class="zone-divider-line zone-divider-line-right"></view>
    </view>

    <!-- ── 快捷操作区容器 ── -->
    <view class="action-zone">

      <!-- 快捷打卡入口标题 -->
      <view class="section-title">
        <text>快捷打卡入口</text>
      </view>

      <!-- Alipay-style 圆形图标网格 -->
      <view class="circle-action-grid">
        <view class="circle-action-item">
          <view class="circle-icon circle-running">
            <text class="circle-emoji">⚡</text>
          </view>
          <text class="circle-label">校园跑</text>
        </view>
        <view class="circle-action-item circle-dimmed">
          <view class="circle-icon circle-transport">
            <text class="circle-emoji">🚲</text>
          </view>
          <text class="circle-label">绿色出行</text>
        </view>
        <view class="circle-action-item">
          <view class="circle-icon circle-diet">
            <text class="circle-emoji">🥗</text>
          </view>
          <text class="circle-label">低碳饮食</text>
        </view>
        <view class="circle-action-item">
          <view class="circle-icon circle-takeout">
            <text class="circle-emoji">📦</text>
          </view>
          <text class="circle-label">减外卖</text>
        </view>
        <view class="circle-action-item">
          <view class="circle-icon circle-reuse">
            <text class="circle-emoji">📸</text>
          </view>
          <text class="circle-label circle-label-featured">旧物利用</text>
        </view>
        <view class="circle-action-item">
          <view class="circle-icon circle-walk">
            <text class="circle-emoji">🚶</text>
          </view>
          <text class="circle-label">步行计步</text>
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

    </view><!-- /action-zone -->

    <!-- ── 邀请码输入弹窗 ── -->
    <view v-if="showInviteModal" class="invite-modal-mask" @click="closeInviteModal">
      <view class="invite-modal-box" @click.stop>
        <view class="invite-modal-header">
          <text class="invite-modal-title">邀请码</text>
          <view class="invite-close-btn" @click="closeInviteModal">✕</view>
        </view>
        <text class="invite-modal-desc">输入好友邀请码，加入班级或打卡团</text>
        <view class="invite-input-wrap">
          <input
            class="invite-input"
            v-model="inviteCodeInput"
            placeholder="请输入邀请码"
            placeholder-class="invite-placeholder"
            maxlength="20"
            focus
          />
        </view>
        <view class="invite-modal-actions">
          <view class="invite-btn invite-btn-cancel" @click="closeInviteModal">取消</view>
          <view class="invite-btn invite-btn-confirm" @click="confirmInviteCode">确认</view>
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
const showInviteModal = ref(false)
const inviteCodeInput = ref('')
const scanMenuShow = ref(false)

const toggleSidebar = () => {
  sidebarShow.value = !sidebarShow.value
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

const toggleScanMenu = () => {
  scanMenuShow.value = !scanMenuShow.value
}

const closeScanMenu = () => {
  scanMenuShow.value = false
}

const handleScanScan = () => {
  scanMenuShow.value = false
  uni.showToast({ title: '启动扫一扫', icon: 'none' })
}

const handleInviteCode = () => {
  scanMenuShow.value = false
  inviteCodeInput.value = ''
  showInviteModal.value = true
}

const closeInviteModal = () => {
  showInviteModal.value = false
}

const confirmInviteCode = () => {
  const code = inviteCodeInput.value.trim()
  if (!code) {
    uni.showToast({ title: '请输入邀请码', icon: 'none' })
    return
  }
  showInviteModal.value = false
  uni.showToast({ title: '邀请码已提交', icon: 'success' })
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
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: opacity 0.3s ease;
}

/* 侧边栏容器 */
.sidebar {
  position: fixed;
  top: 0; left: 0;
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
.parent-item { cursor: pointer; }
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
.sub-item .menu-label {
  font-size: 24rpx;
  color: #555;
}
.direct-item { cursor: pointer; }

/* 通用 Emoji 图标 */
.icon-emoji {
  font-size: 48rpx;
  display: inline-block;
  line-height: 1;
}

/* ── Header ── */
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
  top: 10rpx; right: 10rpx;
  width: 16rpx; height: 16rpx;
  background-color: #ef4444;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

/* ── 扫码按钮 + 下拉菜单 ── */
.scan-btn-container {
  position: relative;
  z-index: 300;
}

.scan-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f5f5f5;
  cursor: pointer;
}

/* CSS 绘制扫描框图标 */
.scan-frame {
  width: 34rpx;
  height: 34rpx;
  position: relative;
}
.scan-corner {
  position: absolute;
  width: 11rpx;
  height: 11rpx;
}
.sc-tl {
  top: 0; left: 0;
  border-top: 3rpx solid #555;
  border-left: 3rpx solid #555;
  border-radius: 2rpx 0 0 0;
}
.sc-tr {
  top: 0; right: 0;
  border-top: 3rpx solid #555;
  border-right: 3rpx solid #555;
  border-radius: 0 2rpx 0 0;
}
.sc-bl {
  bottom: 0; left: 0;
  border-bottom: 3rpx solid #555;
  border-left: 3rpx solid #555;
  border-radius: 0 0 0 2rpx;
}
.sc-br {
  bottom: 0; right: 0;
  border-bottom: 3rpx solid #555;
  border-right: 3rpx solid #555;
  border-radius: 0 0 2rpx 0;
}

/* 下拉菜单容器 */
.scan-dropdown {
  position: absolute;
  top: 92rpx;
  right: 0;
  width: 220rpx;
  z-index: 301;
}

/* 向上三角箭头 */
.scan-dropdown-arrow {
  position: absolute;
  top: -14rpx;
  right: 30rpx;
  width: 0; height: 0;
  border-left: 13rpx solid transparent;
  border-right: 13rpx solid transparent;
  border-bottom: 14rpx solid #fff;
  z-index: 2;
  filter: drop-shadow(0 -2px 2px rgba(0,0,0,0.06));
}

/* 菜单内容区 */
.scan-dropdown-inner {
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.13),
              0 2rpx 10rpx rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.scan-dropdown-item {
  padding: 32rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #222;
  font-weight: 500;
  letter-spacing: 1rpx;
}
.scan-dropdown-item:active {
  background-color: #f5f5f5;
}
.scan-dropdown-divider {
  height: 1rpx;
  background-color: #f0f0f0;
  margin: 0 28rpx;
}

/* ── 个人卡片 ── */
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
  width: 112rpx; height: 112rpx;
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

/* ══════════════════════════════════════════
   UNIFIED 数据仪表面板（单一无缝横向面板）
   ══════════════════════════════════════════ */
.unified-stats-panel {
  display: flex;
  align-items: stretch;
  margin-top: 32rpx;
  background-color: #ffffff;
  border-radius: 36rpx;
  box-shadow: 0 6rpx 28rpx rgba(0, 0, 0, 0.08),
              0 1rpx 6rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
  padding: 36rpx 0;
}

.unified-stat-cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 0 8rpx;
}

/* 极细分割线 */
.unified-stat-sep {
  width: 1.5rpx;
  background-color: #f0f0f0;
  align-self: stretch;
  margin: 4rpx 0;
}

.unified-stat-emoji {
  font-size: 30rpx;
  line-height: 1;
  opacity: 0.7;
}

.unified-stat-value {
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1rpx;
}

.unified-stat-label {
  font-size: 20rpx;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: 0.5rpx;
}

.u-blue   { color: #1d4ed8; }
.u-orange { color: #c2410c; }
.u-purple { color: #7c3aed; }

/* ── 区域分隔线 ── */
.zone-divider {
  display: flex;
  align-items: center;
  margin: 48rpx 0 0;
  gap: 20rpx;
}
.zone-divider-line {
  flex: 1;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #a7f3d0);
}
.zone-divider-line-right {
  background: linear-gradient(90deg, #a7f3d0, transparent);
}
.zone-divider-badge {
  background: linear-gradient(135deg, #d1fae5, #bbf7d0);
  border-radius: 20rpx;
  padding: 8rpx 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(16, 185, 129, 0.15);
}
.zone-divider-text {
  font-size: 20rpx;
  color: #059669;
  font-weight: 700;
  letter-spacing: 6rpx;
}

/* ── 快捷操作区容器 ── */
.action-zone {
  background: linear-gradient(180deg, #f0fdf4 0%, #f7fffe 60%, #ffffff 100%);
  border-radius: 40rpx;
  padding: 0 20rpx 24rpx;
  margin-top: 16rpx;
  box-shadow: inset 0 2rpx 8rpx rgba(16, 185, 129, 0.06),
              0 2rpx 16rpx rgba(16, 185, 129, 0.08);
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

/* ══════════════════════════════════════════
   Alipay-style 圆形图标操作网格
   ══════════════════════════════════════════ */
.circle-action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40rpx 16rpx;
  padding: 4rpx 8rpx;
}

.circle-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  cursor: pointer;
}

.circle-icon {
  width: 108rpx;
  height: 108rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.circle-action-item:active .circle-icon {
  transform: scale(0.88);
}

.circle-emoji {
  font-size: 46rpx;
  line-height: 1;
}

.circle-label {
  font-size: 24rpx;
  color: #4b5563;
  font-weight: 500;
  text-align: center;
}

.circle-label-featured {
  color: #059669;
  font-weight: 700;
}

.circle-dimmed {
  opacity: 0.45;
}

/* 各圆圈配色 */
.circle-running   { background-color: #dbeafe; }
.circle-transport { background-color: #d1fae5; }
.circle-diet      { background-color: #fef3c7; }
.circle-takeout   { background-color: #fee2e2; }
.circle-reuse     {
  background-color: #d1fae5;
  box-shadow: 0 6rpx 20rpx rgba(16, 185, 129, 0.32);
  border: 2.5rpx solid #6ee7b7;
}
.circle-walk      { background-color: #ede9fe; }

/* 今日任务 */
.daily-task {
  margin-top: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 3rpx solid #d1fae5;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.task-left {
  display: flex;
  align-items: center;
}

.task-icon {
  width: 96rpx; height: 96rpx;
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
  width: 100%; height: 100%;
}

.banner-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
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

/* ══════════════════════════════════════════
   邀请码输入弹窗
   ══════════════════════════════════════════ */
.invite-modal-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invite-modal-box {
  width: 560rpx;
  background-color: #fff;
  border-radius: 40rpx;
  padding: 52rpx 44rpx 44rpx;
  animation: fadeInUp 0.22s ease;
}

.invite-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14rpx;
}

.invite-modal-title {
  font-size: 38rpx;
  font-weight: 700;
  color: #111827;
  letter-spacing: 1rpx;
}

.invite-close-btn {
  width: 52rpx; height: 52rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  color: #9ca3af;
  cursor: pointer;
}

.invite-modal-desc {
  font-size: 24rpx;
  color: #9ca3af;
  display: block;
  margin-bottom: 40rpx;
}

.invite-input-wrap {
  background-color: #f9fafb;
  border: 1.5rpx solid #e5e7eb;
  border-radius: 20rpx;
  padding: 0 28rpx;
  height: 92rpx;
  display: flex;
  align-items: center;
  margin-bottom: 44rpx;
  transition: border-color 0.15s;
}

.invite-input-wrap:focus-within {
  border-color: #10b981;
}

.invite-input {
  flex: 1;
  height: 100%;
  font-size: 32rpx;
  color: #111827;
  background-color: transparent;
  letter-spacing: 2rpx;
}

.invite-placeholder {
  color: #d1d5db;
}

.invite-modal-actions {
  display: flex;
  gap: 20rpx;
}

.invite-btn {
  flex: 1;
  height: 92rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 46rpx;
  font-size: 30rpx;
  font-weight: 600;
  cursor: pointer;
}

.invite-btn-cancel {
  background-color: #f3f4f6;
  color: #6b7280;
}

.invite-btn-confirm {
  background-color: #10b981;
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.38);
}

.invite-btn-confirm:active {
  background-color: #059669;
}

/* ── 动画 ── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30rpx); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes tree-sway {
  0%, 100% { transform: rotate(-5deg); }
  50%       { transform: rotate(5deg); }
}

@keyframes fire-flicker {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.8; transform: scale(1.1); }
}
</style>
