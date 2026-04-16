<template>
  <view class="page-low-carbon">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="header-left-group">
        <view class="sport-back-btn" @tap="goBack">
          <text class="iconfont icon-chevron-left"></text>
        </view>
        <!-- 碳资产小卡（左上角） -->
        <view class="sport-carbon-mini">
          <view class="carbon-mini-left">
            <text class="carbon-mini-label">碳资产</text>
            <text class="carbon-mini-value">2,840</text>
          </view>
          <view class="carbon-mini-right">
            <text class="carbon-mini-kg">125.4 kg</text>
            <text class="carbon-mini-tag">减排</text>
          </view>
        </view>
      </view>
      <text class="lc-logo">Campus<text class="lc-logo-accent">Eco</text></text>
      <text class="lc-date">2026.04.11</text>
    </view>

    <view class="page-content">
      <!-- 自动化步数采集 -->
      <view class="sport-sync-card">
        <view class="sync-left">
          <view class="sync-dot-wrap">
            <view class="sync-dot"></view>
            <text class="sync-label">STEP SYNC ACTIVE</text>
          </view>
          <text class="sync-value">8,432<span class="sync-unit">/10000</span></text>
          <text class="sync-desc">今日步数已同步 · 产出碳汇 +0.84 kg</text>
        </view>
        <view class="sync-icon-wrap">
          <text class="iconfont icon-footprint"></text>
        </view>
      </view>

      <!-- 运动场景 -->
      <view class="lc-section">
        <view class="lc-section-header">
          <text class="section-title">运动场景打卡</text>
          <text class="section-hint">滑动查看更多</text>
        </view>
        <view class="sport-grid">
          <view class="sport-card blue-card">
            <view class="sport-icon blue-icon">
              <text class="iconfont icon-run"></text>
            </view>
            <text class="sport-name">户外跑步</text>
            <text class="sport-desc">每公里产出 +5 积分</text>
          </view>
          <view class="sport-card orange-card">
            <view class="sport-badge-wrap"><text class="sport-badge">专属审核</text></view>
            <view class="sport-icon orange-icon">
              <text class="iconfont icon-school"></text>
            </view>
            <text class="sport-name">体育课运动</text>
            <text class="sport-desc">积分上浮 20%</text>
          </view>
          <view class="sport-card purple-card">
            <view class="sport-icon purple-icon">
              <text class="iconfont icon-dumbbell"></text>
            </view>
            <text class="sport-name">健身塑形</text>
            <text class="sport-desc">瑜伽/跳绳/HIIT录入</text>
          </view>
          <view class="sport-card amber-card">
            <view class="sport-icon amber-icon">
              <text class="iconfont icon-basketball"></text>
            </view>
            <text class="sport-name">球类运动</text>
            <text class="sport-desc">篮足羽乒 · 计时打卡</text>
          </view>
          <view class="sport-card cyan-card">
            <view class="sport-icon cyan-icon">
              <text class="iconfont icon-swim"></text>
            </view>
            <text class="sport-name">水上运动</text>
            <text class="sport-desc">游泳及水上运动录入</text>
          </view>
          <view class="sport-card green-card">
            <view class="sport-icon green-icon">
              <text class="iconfont icon-bike"></text>
            </view>
            <text class="sport-name">骑行运动</text>
            <text class="sport-desc">校园/户外骑行记录</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部 Tab 导航 -->
    <view class="lc-bottom-nav">
      <view class="lc-nav-item active" @tap="switchTab('sport')">
        <text class="iconfont icon-run"></text>
        <text class="nav-text">运动</text>
      </view>
      <view class="lc-nav-item" @tap="switchTab('travel')">
        <text class="iconfont icon-bus"></text>
        <text class="nav-text">出行</text>
      </view>
      <view class="lc-nav-item" @tap="switchTab('diet')">
        <text class="iconfont icon-meal"></text>
        <text class="nav-text">饮食</text>
      </view>
      <view class="lc-nav-item" @tap="switchTab('life')">
        <text class="iconfont icon-home"></text>
        <text class="nav-text">生活</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const goBack = () => uni.switchTab({ url: '/pages/action/action' })
const switchTab = (tab) => {
  // 所有标签都指向容器页面
  const tabMap = {
    sport:  'sport',
    travel: 'travel',
    diet:   'diet',
    life:   'life',
  }
  uni.redirectTo({ 
    url: `/pages/low-carbon/index?tab=${tabMap[tab]}` 
  })
}
</script>

<style scoped>
@import url('../../static/iconfont.css');

.page-low-carbon {
  background-color: #fafafa;
  min-height: 100vh;
}

.lc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80rpx 24rpx 24rpx 16rpx;
  background: #fff;
  gap: 16rpx;
}

.header-left-group {
  display: flex;
  align-items: center;
  gap: 16rpx;
  min-width: 0;
}

.sport-back-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sport-back-btn .iconfont {
  font-size: 34rpx;
  color: #1f2937;
}

.lc-logo {
  font-size: 40rpx;
  font-weight: 900;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.lc-logo-accent { color: #10b981; }

.lc-header .iconfont {
  font-size: 40rpx;
  color: #1f2937;
}

.lc-date {
  font-size: 20rpx;
  color: #9ca3af;
  font-weight: bold;
}

.page-content {
  padding: 0 24rpx 200rpx;
}

/* 碳资产小卡（左上角） */
.sport-carbon-mini {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border-radius: 20rpx;
  padding: 14rpx 18rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(16,185,129,0.3);
}
.carbon-mini-left { display: flex; flex-direction: column; }
.carbon-mini-label { font-size: 18rpx; color: rgba(255,255,255,0.7); }
.carbon-mini-value { font-size: 36rpx; font-weight: 900; color: #fff; line-height: 1.1; }
.carbon-mini-right { display: flex; flex-direction: column; align-items: flex-end; }
.carbon-mini-kg { font-size: 22rpx; font-weight: 700; color: #fff; }
.carbon-mini-tag {
  font-size: 16rpx;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.15);
  padding: 2rpx 10rpx;
  border-radius: 8rpx;
}

/* 步数同步 */
.sport-sync-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid #f0fdf4;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.sync-dot-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 8rpx;
}
.sync-dot {
  width: 16rpx;
  height: 16rpx;
  background: #10b981;
  border-radius: 50%;
}
.sync-label {
  font-size: 18rpx;
  font-weight: bold;
  color: #10b981;
}
.sync-value {
  font-size: 60rpx;
  font-weight: 900;
  color: #1f2937;
  line-height: 1;
  display: block;
  margin-bottom: 8rpx;
}
.sync-unit {
  font-size: 28rpx;
  font-weight: normal;
  color: #9ca3af;
}
.sync-desc {
  font-size: 20rpx;
  color: #9ca3af;
}
.sync-icon-wrap {
  width: 112rpx;
  height: 112rpx;
  border: 8rpx solid #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sync-icon-wrap .iconfont { font-size: 56rpx; color: #10b981; }

/* 区块标题 */
.lc-section { margin-top: 8rpx; }

.lc-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #1f2937;
}

.section-hint {
  font-size: 20rpx;
  color: #10b981;
  font-weight: bold;
}

/* 运动网格（sport.html风格） */
.sport-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.sport-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  position: relative;
  transition: all 0.2s;
}

.sport-card:active { transform: scale(0.96); background: #f9f9f9; }

.sport-badge-wrap {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
}

.sport-badge {
  font-size: 16rpx;
  background: #f97316;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-weight: bold;
}

.sport-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.sport-icon .iconfont { font-size: 40rpx; color: #fff; }

.blue-icon { background: #3b82f6; }
.orange-icon { background: #f97316; }
.purple-icon { background: #8b5cf6; }
.amber-icon { background: #f59e0b; }
.cyan-icon { background: #06b6d4; }
.green-icon { background: #10b981; }

.sport-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 6rpx;
}

.sport-desc {
  display: block;
  font-size: 20rpx;
}

/* ============================================= */
/* 底部导航                                     */
/* ============================================= */
.lc-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160rpx;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  border-top: 1rpx solid #f0f0f0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 20rpx;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}

.lc-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
  color: #94a3b8;
  padding: 0 16rpx;
}

.lc-nav-item .iconfont { font-size: 48rpx; }

.nav-text {
  font-size: 20rpx;
  font-weight: bold;
}

.lc-nav-item.active {
  color: #10b981;
  transform: translateY(-6rpx);
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .lc-bottom-nav {
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  }
}
</style>
