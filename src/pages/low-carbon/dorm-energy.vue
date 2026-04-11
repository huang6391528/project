<template>
  <view class="page-dorm">
    <!-- 头部导航 -->
    <view class="dorm-header">
      <text class="iconfont icon-chevron-left" @tap="goBack"></text>
      <text class="dorm-title">宿舍节能助手</text>
      <view class="dorm-header-right"></view>
    </view>

    <scroll-view class="dorm-scroll" scroll-y>
      <!-- 1. 宿舍实时概况 -->
      <view class="dorm-room-card">
        <view class="room-info">
          <text class="room-label">我的寝室</text>
          <text class="room-name">C 栋 502</text>
        </view>
        <view class="room-rank">
          <text class="iconfont icon-leaf rank-icon"></text>
          <text class="rank-text">领先 92% 寝室</text>
        </view>
      </view>

      <!-- 2. 空调温控卡片 -->
      <view class="dorm-ac-card">
        <view class="ac-top">
          <view class="ac-left">
            <view class="ac-icon-wrap">
              <text class="iconfont icon-ac"></text>
            </view>
            <text class="ac-label">空调温控</text>
          </view>
          <view class="ac-toggle">
            <view class="toggle-track">
              <view class="toggle-thumb on"></view>
            </view>
          </view>
        </view>
        <view class="ac-dial-wrap">
          <view class="ac-dial">
            <text class="ac-temp-num">26</text>
            <text class="ac-temp-unit">°C</text>
            <text class="ac-temp-sub">当前节能温度</text>
          </view>
        </view>
        <view class="ac-hint">
          <text class="iconfont icon-info ac-hint-icon"></text>
          <text class="ac-hint-text">已保持节能运行 4.5 小时，预计减碳 120g</text>
        </view>
      </view>

      <!-- 3. 每日节能打卡 -->
      <view class="dorm-section-title">每日节能打卡</view>

      <!-- 离开寝室关灯 -->
      <view class="dorm-checkin-card">
        <view class="checkin-left">
          <view class="checkin-icon-wrap yellow">
            <text class="iconfont icon-lightbulb"></text>
          </view>
          <view class="checkin-info">
            <text class="checkin-title">离开寝室关灯</text>
            <text class="checkin-desc">杜绝长明灯，从我做起</text>
          </view>
        </view>
        <button class="checkin-btn-active">打卡</button>
      </view>

      <!-- 洗漱关水龙头 -->
      <view class="dorm-checkin-card done">
        <view class="checkin-left">
          <view class="checkin-icon-wrap blue">
            <text class="iconfont icon-water"></text>
          </view>
          <view class="checkin-info">
            <text class="checkin-title">洗漱关水龙头</text>
            <text class="checkin-desc">已完成 1/1 次打卡</text>
          </view>
        </view>
        <view class="checkin-btn-done">已达成</view>
      </view>

      <!-- 熄灯准时断电 -->
      <view class="dorm-checkin-card">
        <view class="checkin-left">
          <view class="checkin-icon-wrap indigo">
            <text class="iconfont icon-bed"></text>
          </view>
          <view class="checkin-info">
            <text class="checkin-title">熄灯准时断电</text>
            <text class="checkin-desc">23:00 前完成打卡</text>
          </view>
        </view>
        <button class="checkin-btn-outline">待开启</button>
      </view>

      <!-- 拔掉闲置充电器 -->
      <view class="dorm-checkin-card">
        <view class="checkin-left">
          <view class="checkin-icon-wrap rose">
            <text class="iconfont icon-power-off"></text>
          </view>
          <view class="checkin-info">
            <text class="checkin-title">拔掉闲置充电器</text>
            <text class="checkin-desc">减少隐性电耗</text>
          </view>
        </view>
        <button class="checkin-btn-active">打卡</button>
      </view>

      <!-- 4. 楼栋排名 -->
      <view class="dorm-rank-card">
        <view class="rank-header">
          <text class="rank-title">楼栋排名</text>
          <text class="iconfont icon-chevron-right rank-arrow"></text>
        </view>
        <!-- 我的寝室 -->
        <view class="rank-item rank-item-me">
          <text class="rank-num rank-num-gold">01</text>
          <view class="rank-bar-wrap">
            <view class="rank-bar-label">
              <text class="rank-name">502 寝室 (我)</text>
              <text class="rank-val">8,420 kg</text>
            </view>
            <view class="rank-bar">
              <view class="rank-bar-fill green"></view>
            </view>
          </view>
        </view>
        <!-- 311 寝室 -->
        <view class="rank-item">
          <text class="rank-num rank-num-gray">02</text>
          <view class="rank-bar-wrap">
            <view class="rank-bar-label">
              <text class="rank-name">311 寝室</text>
              <text class="rank-val">8,150 kg</text>
            </view>
            <view class="rank-bar">
              <view class="rank-bar-fill gray"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="dorm-bottom-spacer"></view>
    </scroll-view>

    <!-- 底部导航 -->
    <view class="dorm-bottom-nav">
      <view class="dorm-nav-item">
        <text class="iconfont icon-home"></text>
        <text class="dorm-nav-text">首页</text>
      </view>
      <view class="dorm-nav-item">
        <text class="iconfont icon-leaf"></text>
        <text class="dorm-nav-text">打卡</text>
      </view>
      <view class="dorm-nav-item">
        <text class="iconfont icon-trophy"></text>
        <text class="dorm-nav-text">排行</text>
      </view>
      <view class="dorm-nav-item">
        <text class="iconfont icon-user"></text>
        <text class="dorm-nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const goBack = () => uni.navigateBack()
</script>

<style scoped>
/* 页面背景 */
.page-dorm {
  min-height: 100vh;
  background: #f8fafc;
}

/* 头部 */
.dorm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80rpx 30rpx 24rpx 16rpx;
  background: #fff;
}
.dorm-header .iconfont {
  font-size: 40rpx;
  color: #1f2937;
}
.dorm-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
  flex: 1;
  text-align: center;
}
.dorm-header-right {
  width: 40rpx;
}

/* 滚动区域 */
.dorm-scroll {
  height: calc(100vh - 140rpx);
}

/* 1. 寝室卡片 */
.dorm-room-card {
  margin: 24rpx;
  background: #fff;
  border-radius: 32rpx;
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.room-label {
  display: block;
  font-size: 24rpx;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 8rpx;
}
.room-name {
  display: block;
  font-size: 48rpx;
  font-weight: 900;
  color: #1f2937;
}
.room-rank {
  display: flex;
  align-items: center;
  gap: 6rpx;
}
.rank-icon {
  font-size: 28rpx;
  color: #22c55e;
}
.rank-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #22c55e;
}

/* 2. 空调卡片 */
.dorm-ac-card {
  margin: 0 24rpx 24rpx;
  background: #eff6ff;
  border-radius: 32rpx;
  padding: 32rpx;
  overflow: hidden;
}
.ac-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}
.ac-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.ac-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ac-icon-wrap .iconfont {
  font-size: 32rpx;
  color: #fff;
}
.ac-label {
  font-size: 28rpx;
  font-weight: 700;
  color: #374151;
}
.ac-toggle {
  width: 96rpx;
  height: 48rpx;
  background: #e5e7eb;
  border-radius: 24rpx;
  position: relative;
  padding: 6rpx;
}
.toggle-thumb {
  width: 36rpx;
  height: 36rpx;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: 6rpx;
  top: 6rpx;
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
  transition: right 0.2s;
}
.toggle-thumb.on {
  right: 48rpx;
}
.ac-dial-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 24rpx;
}
.ac-dial {
  width: 256rpx;
  height: 256rpx;
  border-radius: 50%;
  border: 8rpx solid rgba(255,255,255,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #f59e0b, #3b82f6);
  background-size: 200% 200%;
  animation: dialGradient 6s linear infinite;
}
@keyframes dialGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.ac-temp-num {
  font-size: 72rpx;
  font-weight: 900;
  color: #1d4ed8;
}
.ac-temp-unit {
  font-size: 28rpx;
  color: #1d4ed8;
  margin-top: -8rpx;
}
.ac-temp-sub {
  font-size: 20rpx;
  color: #93c5fd;
  margin-top: 4rpx;
}
.ac-hint {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 24rpx;
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.ac-hint-icon {
  font-size: 28rpx;
  color: #3b82f6;
}
.ac-hint-text {
  font-size: 20rpx;
  color: #1e40af;
}

/* 3. 每日打卡标题 */
.dorm-section-title {
  margin: 0 24rpx 24rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}

/* 打卡卡片 */
.dorm-checkin-card {
  margin: 0 24rpx  16rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f9fafb;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
}
.dorm-checkin-card.done {
  opacity: 0.6;
}
.checkin-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}
.checkin-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkin-icon-wrap .iconfont {
  font-size: 36rpx;
}
.checkin-icon-wrap.yellow { background: #fefce8; }
.checkin-icon-wrap.yellow .iconfont { color: #eab308; }
.checkin-icon-wrap.blue { background: #eff6ff; }
.checkin-icon-wrap.blue .iconfont { color: #3b82f6; }
.checkin-icon-wrap.indigo { background: #eef2ff; }
.checkin-icon-wrap.indigo .iconfont { color: #6366f1; }
.checkin-icon-wrap.rose { background: #fff1f2; }
.checkin-icon-wrap.rose .iconfont { color: #f43f5e; }
.checkin-info { display: flex; flex-direction: column; gap: 4rpx; }
.checkin-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}
.checkin-desc {
  font-size: 20rpx;
  color: #9ca3af;
}
.checkin-btn-active {
  background: #22c55e;
  color: #fff;
  font-size: 22rpx;
  font-weight: 700;
  padding: 12rpx 28rpx;
  border-radius: 50rpx;
  border: none;
  box-shadow: 0 4rpx 12rpx rgba(34,197,94,0.3);
}
.checkin-btn-outline {
  background: transparent;
  color: #22c55e;
  font-size: 22rpx;
  font-weight: 700;
  padding: 12rpx 28rpx;
  border-radius: 50rpx;
  border: 2rpx solid #22c55e;
}
.checkin-btn-done {
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 22rpx;
  font-weight: 700;
  padding: 12rpx 28rpx;
  border-radius: 50rpx;
  font-style: italic;
}

/* 4. 排名卡片 */
.dorm-rank-card {
  margin: 32rpx 24rpx;
  background: #0f172a;
  border-radius: 32rpx;
  padding: 32rpx;
}
.rank-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}
.rank-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #fff;
}
.rank-arrow {
  font-size: 32rpx;
  color: #64748b;
}
.rank-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 20rpx;
}
.rank-item:last-child { margin-bottom: 0; }
.rank-num {
  font-size: 28rpx;
  font-weight: 900;
  font-style: italic;
  width: 48rpx;
  text-align: center;
}
.rank-num-gold { color: #fbbf24; }
.rank-num-gray { color: #64748b; }
.rank-bar-wrap { flex: 1; }
.rank-bar-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8rpx;
}
.rank-name {
  font-size: 20rpx;
  color: #94a3b8;
}
.rank-val {
  font-size: 20rpx;
  color: #94a3b8;
}
.rank-bar {
  width: 100%;
  height: 8rpx;
  background: rgba(255,255,255,0.1);
  border-radius: 4rpx;
  overflow: hidden;
}
.rank-bar-fill {
  height: 100%;
  border-radius: 4rpx;
}
.rank-bar-fill.green {
  width: 85%;
  background: #22c55e;
  box-shadow: 0 0 16rpx rgba(34,197,94,0.6);
}
.rank-bar-fill.gray {
  width: 80%;
  background: rgba(255,255,255,0.4);
}

.dorm-bottom-spacer { height: 160rpx; }

/* 底部导航 */
.dorm-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160rpx;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20rpx);
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: 8rpx;
}
.dorm-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
  color: #94a3b8;
}
.dorm-nav-item .iconfont {
  font-size: 44rpx;
}
.dorm-nav-text {
  font-size: 20rpx;
  font-weight: 500;
}
</style>
