<template>
  <view class="page-low-carbon">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="sport-back-btn" @tap="goBack">
        <text class="iconfont icon-chevron-left"></text>
      </view>
      <text class="lc-logo">Life<text class="lc-logo-accent">Eco</text></text>
      <text class="lc-date">2026.04.11</text>
    </view>

    <view class="page-content">
      <!-- 低碳等级卡片 -->
      <view class="lc-asset-card life-asset">
        <view class="asset-inner">
          <view class="asset-left">
            <text class="asset-label">学习生活低碳等级</text>
            <text class="asset-value">LV.5</text>
            <text class="life-recycle-tag">已回收旧物约 24.5kg</text>
          </view>
        </view>
      </view>

      <!-- 子功能页签 -->
      <view class="life-tabs">
        <view class="life-tab life-tab-active">首页</view>
        <view class="life-tab" @tap="goTab('dorm')">宿舍节能</view>
        <view class="life-tab" @tap="goTab('study')">低碳学习</view>
      </view>

      <!-- 功能网格 -->
      <view class="life-grid">
        <view class="life-card">
          <text class="iconfont icon-gift life-card-icon indigo"></text>
          <text class="life-card-name">旧物捐赠</text>
          <text class="life-card-desc">旧书/衣/家电上传</text>
          <button class="life-card-btn">去捐赠</button>
        </view>
        <view class="life-card">
          <text class="iconfont icon-shopping-bag life-card-icon emerald"></text>
          <text class="life-card-name">环保购物</text>
          <text class="life-card-desc">自带布袋/无包装</text>
          <button class="life-card-btn green-btn">打卡</button>
        </view>
        <view class="life-card">
          <text class="iconfont icon-flower life-card-icon green"></text>
          <text class="life-card-name">绿植养护</text>
          <text class="life-card-desc">碳吸附实时记录</text>
          <button class="life-card-btn green-btn">记录</button>
        </view>
        <view class="life-card">
          <text class="iconfont icon-book life-card-icon blue"></text>
          <text class="life-card-name">低碳学习</text>
          <text class="life-card-desc">无纸化/二手教材</text>
          <button class="life-card-btn blue-btn-sm">上传</button>
        </view>
        <!-- 宿舍节能看板（跨列） -->
        <view class="life-card life-card-dark">
          <view class="dark-inner">
            <text class="dark-title">宿舍节能看板</text>
            <view class="dark-tags">
              <view class="dark-tag">
                <text class="iconfont icon-temp"></text>
                <text class="dark-tag-text">空调温控自律</text>
              </view>
              <view class="dark-tag">
                <text class="iconfont icon-night"></text>
                <text class="dark-tag-text">熄灯打卡</text>
              </view>
            </view>
          </view>
          <button class="dark-btn">节能打卡</button>
        </view>
        <!-- 无塑日常（跨列） -->
        <view class="life-card life-card-wide">
          <view class="wide-icon-wrap">
            <text class="iconfont icon-no-plastic"></text>
          </view>
          <view class="wide-info">
            <text class="life-card-name">无塑日常</text>
            <text class="life-card-desc">拒绝一次性吸管、水杯记录</text>
          </view>
          <view class="wide-check"></view>
        </view>
      </view>
    </view>

    <!-- 底部 Tab 导航 -->
    <view class="lc-bottom-nav">
      <view class="lc-nav-item" @tap="switchTab('sport')">
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
      <view class="lc-nav-item active" @tap="switchTab('life')">
        <text class="iconfont icon-home"></text>
        <text class="nav-text">生活</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const goBack = () => uni.switchTab({ url: '/pages/action/action' })
const goTab = (tab) => {
  if (tab === 'dorm') uni.navigateTo({ url: '/pages/low-carbon/dorm-energy' })
  if (tab === 'study') uni.navigateTo({ url: '/pages/low-carbon/low-carbon-study' })
}
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

.lc-logo-accent { color: #8b5cf6; }

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

/* 碳资产卡片 */
.lc-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
}

.life-asset { background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%); }

.asset-inner {
  position: relative;
  z-index: 1;
}

.asset-left { display: flex; flex-direction: column; }

.asset-label {
  font-size: 20rpx;
  opacity: 0.7;
}

.asset-value {
  font-size: 60rpx;
  font-weight: 900;
  margin-top: 4rpx;
  line-height: 1;
}

.life-recycle-tag {
  display: inline-block;
  margin-top: 16rpx;
  background: rgba(255,255,255,0.2);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
}

/* 子功能页签 */
.life-tabs {
  display: flex;
  gap: 16rpx;
  padding: 0 6rpx;
  overflow-x: auto;
  margin-bottom: 24rpx;
  white-space: nowrap;
}

.life-tab {
  padding: 16rpx 32rpx;
  background: #fff;
  color: #9ca3af;
  border-radius: 50rpx;
  font-size: 22rpx;
  font-weight: bold;
  border: 1rpx solid #f0f0f0;
  flex-shrink: 0;
}

.life-tab-active {
  background: #7c3aed;
  color: #fff;
  border: 1rpx solid #7c3aed;
}

/* 垃圾分类AI */
.life-ai-card {
  background: #f5f3ff;
  border-radius: 32rpx;
  padding: 32rpx;
  border: 2rpx solid #ede9fe;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.life-ai-left { display: flex; align-items: center; gap: 24rpx; }

.life-ai-icon {
  width: 96rpx;
  height: 96rpx;
  background: #7c3aed;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.life-ai-icon .iconfont { font-size: 48rpx; color: #fff; }

.life-ai-info { flex: 1; }

.life-ai-title {
  display: block;
  font-size: 24rpx;
  font-weight: bold;
  color: #3b0764;
  margin-bottom: 4rpx;
}

.life-ai-desc {
  display: block;
  font-size: 18rpx;
  color: #7c3aed;
}

.life-ai-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

/* 生活网格 */
.life-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.life-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  flex-direction: column;
}

.life-card-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.life-card-icon.indigo { color: #4f46e5; }
.life-card-icon.emerald { color: #059669; }
.life-card-icon.green { color: #22c55e; }
.life-card-icon.blue { color: #3b82f6; }

.life-card-name {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.life-card-desc {
  font-size: 18rpx;
  color: #9ca3af;
  margin-bottom: 16rpx;
}

.life-card-btn {
  width: 100%;
  border: 2rpx solid #e0e7ff;
  color: #4f46e5;
  font-size: 18rpx;
  font-weight: bold;
  padding: 12rpx;
  border-radius: 12rpx;
  background: none;
  margin-top: auto;
}

.green-btn { border-color: #d1fae5; color: #059669; }
.blue-btn-sm { border-color: #dbeafe; color: #3b82f6; }

/* 宿舍节能看板 */
.life-card-dark {
  background: #1f2937;
  color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
}

.dark-inner { flex: 1; }

.dark-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
}

.dark-tags { display: flex; gap: 24rpx; }

.dark-tag {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.dark-tag .iconfont {
  font-size: 24rpx;
  color: #60a5fa;
}

.dark-tag .iconfont:last-child { color: #fbbf24; }

.dark-tag-text {
  font-size: 20rpx;
  color: #d1d5db;
}

.dark-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 18rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

/* 无塑日常 */
.life-card-wide {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
}

.wide-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wide-icon-wrap .iconfont { font-size: 36rpx; color: #9ca3af; }

.wide-info { flex: 1; margin-left: 16rpx; }

.wide-check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 4rpx solid #8b5cf6;
  flex-shrink: 0;
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
  color: #7c3aed;
  transform: translateY(-6rpx);
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .lc-bottom-nav {
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  }
}
</style>
