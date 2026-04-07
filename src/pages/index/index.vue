<template>
  <view class="page-home">
    <!-- Status Bar -->
    <view class="status-bar">
      <text class="status-time">2026-04-05 09:42</text>
      <view class="status-icons">
        <text class="iconfont icon-signal"></text>
        <text class="iconfont icon-wifi"></text>
        <text class="iconfont icon-battery"></text>
      </view>
    </view>

    <!-- Header Stats -->
    <view class="header-stats">
      <view class="bell-icon">
        <text class="iconfont icon-bell"></text>
        <view class="bell-dot"></view>
      </view>
    </view>

    <!-- Personal Card -->
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
              <text class="iconfont icon-tree"></text>
            </view>
            <text class="count-num">3.2 <text class="count-unit">棵</text></text>
          </view>
          <view class="fire-streak">
            <view class="fire-anim">
              <text class="iconfont icon-fire"></text>
            </view>
            <text class="streak-text">连续打卡 <text class="streak-num">12</text> 天</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Three Columns Stats -->
    <view class="stats-grid">
      <view class="stat-item stat-blue">
        <text class="iconfont icon-run"></text>
        <text class="stat-label">运动减碳</text>
        <text class="stat-value stat-blue-text">+1.2kg</text>
      </view>
      <view class="stat-item stat-orange">
        <text class="iconfont icon-home"></text>
        <text class="stat-label">生活减碳</text>
        <text class="stat-value stat-orange-text">+0.8kg</text>
      </view>
      <view class="stat-item stat-purple">
        <text class="iconfont icon-trophy"></text>
        <text class="stat-label">全校排名</text>
        <text class="stat-value stat-purple-text">第28名</text>
      </view>
    </view>

    <!-- Check-in Grid -->
    <view class="section-title">
      <text class="iconfont icon-calendar-check"></text>
      <text>快捷打卡入口</text>
    </view>
    <view class="action-grid">
      <view class="action-item">
        <text class="iconfont icon-flash"></text>
        <text class="action-text">校园跑</text>
      </view>
      <view class="action-item opacity-60">
        <text class="iconfont icon-bike"></text>
        <text class="action-text">绿色出行</text>
      </view>
      <view class="action-item">
        <text class="iconfont icon-org"></text>
        <text class="action-text">低碳饮食</text>
      </view>
      <view class="action-item">
        <text class="iconfont icon-package"></text>
        <text class="action-text">减外卖</text>
      </view>
      <view class="action-item action-highlight">
        <text class="iconfont icon-selfie"></text>
        <text class="action-text action-text-highlight">旧物利用</text>
      </view>
      <view class="action-item">
        <text class="iconfont icon-walk"></text>
        <text class="action-text">步行计步</text>
      </view>
    </view>

    <!-- Daily Task -->
    <view class="daily-task">
      <view class="task-left">
        <view class="task-icon">
          <text class="iconfont icon-check-circle"></text>
        </view>
        <view class="task-info">
          <text class="task-title">今日任务进度</text>
          <text class="task-sub">已完成 3/5 个任务</text>
        </view>
      </view>
      <button class="task-btn">去完成</button>
    </view>

    <!-- Banner -->
    <view class="banner">
      <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/b9c8194c51e2407997135fdc0513e984.jpg" mode="aspectFill"></image>
      <view class="banner-overlay">
        <text class="banner-title">2026 校园春季马拉松</text>
        <text class="banner-sub">即刻报名，最高奖励 500 积分</text>
      </view>
    </view>

    <!-- Knowledge Section -->
    <view class="knowledge-section">
      <view class="knowledge-title">
        <text class="iconfont icon-lightbulb"></text>
        <text>环保小贴士</text>
      </view>
      <text class="knowledge-text">"回收一吨废纸，可造好纸850公斤，节省木材3立方米，同时减少污染排放。"</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.page-home {
  padding: 0 30rpx;
  padding-bottom: 120rpx;
  background-color: #ffffff;
  min-height: 100vh;
}

/* Status Bar */
.status-bar {
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12rpx;
  font-size: 24rpx;
  color: #666;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

/* Header Stats */
.header-stats {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16rpx;
}

.bell-icon {
  position: relative;
  font-size: 48rpx;
  color: #666;
}

.bell-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 16rpx;
  height: 16rpx;
  background-color: #ef4444;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

/* Personal Card */
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

/* Tree Progress */
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
}

.streak-text {
  font-size: 28rpx;
  color: #fff;
  margin-left: 8rpx;
}

.streak-num {
  font-weight: bold;
}

/* Stats Grid */
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

/* Section Title */
.section-title {
  margin-top: 48rpx;
  margin-bottom: 24rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  display: flex;
  align-items: center;
}

/* Action Grid */
.action-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.action-item {
  width: calc(33.333% - 16rpx);
  text-align: center;
  padding: 24rpx 12rpx;
  background-color: #f9fafb;
  border: 2rpx solid #f3f4f6;
  border-radius: 24rpx;
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

/* Daily Task */
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

/* Knowledge Section */
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
  margin-bottom: 16rpx;
}

.knowledge-text {
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.6;
  font-style: italic;
}
</style>
