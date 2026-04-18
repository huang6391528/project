<template>
  <view class="page-low-carbon">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="sport-back-btn" @tap="goBack">
        <text class="iconfont icon-chevron-left"></text>
      </view>
      <text class="lc-logo">Travel<text class="lc-logo-accent">Zero</text></text>
      <text class="lc-date-blue">2026.04.11</text>
    </view>

    <view class="page-content">
      <!-- 出行碳资产 -->
      <view class="lc-asset-card travel-asset">
        <view class="asset-inner">
          <view class="asset-left">
            <text class="asset-label">本月出行减碳量</text>
            <text class="asset-value">42.8 kg</text>
          </view>
        </view>
        <text class="travel-rank-tag">里程超越 92% 同学</text>
      </view>

      <!-- LBS监控 -->
      <view class="travel-lbs-card">
        <view class="lbs-icon-wrap">
          <view class="lbs-dot"></view>
          <text class="iconfont icon-location"></text>
        </view>
        <view class="lbs-content">
          <text class="lbs-title">校园LBS自动监测中</text>
          <text class="lbs-desc">正在核验：学生活动中心 -&gt; 实验楼</text>
        </view>
      </view>

      <!-- 出行选项 -->
      <view class="lc-section">
        <view class="lc-section-header">
          <text class="section-title">出行打卡选项</text>
          <text class="iconfont icon-info"></text>
        </view>
        <view class="travel-list">
          <view class="travel-item">
            <view class="travel-icon indigo-icon">
              <text class="iconfont icon-bus"></text>
            </view>
            <view class="travel-info">
              <text class="travel-name">公交地铁</text>
              <text class="travel-desc">线路选择 · 乘车次数凭证</text>
            </view>
          </view>
          <view class="travel-item">
            <view class="travel-icon green-icon">
              <text class="iconfont icon-bike"></text>
            </view>
            <view class="travel-info">
              <text class="travel-name">共享单车/私车</text>
              <text class="travel-desc">扫码自动记录公里数</text>
            </view>
          </view>
          <view class="travel-item">
            <view class="travel-icon orange-icon-sm">
              <text class="iconfont icon-walk"></text>
            </view>
            <view class="travel-info">
              <text class="travel-name">步行通勤</text>
              <text class="travel-desc">上下学通勤路径校验</text>
            </view>
          </view>
          <view class="travel-item">
            <view class="travel-icon purple-icon-sm">
              <text class="iconfont icon-group"></text>
            </view>
            <view class="travel-info">
              <text class="travel-name">拼车共享</text>
              <text class="travel-desc">多人结伴奖励积分 x1.5</text>
            </view>
          </view>
          <view class="travel-item">
            <view class="travel-icon cyan-icon-sm">
              <text class="iconfont icon-scooter"></text>
            </view>
            <view class="travel-info">
              <text class="travel-name">新能源代步</text>
              <text class="travel-desc">电车/滑板车合规打卡</text>
            </view>
          </view>
          <view class="travel-item">
            <view class="travel-icon rose-icon-sm">
              <text class="iconfont icon-school-bus"></text>
            </view>
            <view class="travel-info">
              <text class="travel-name">校车通勤</text>
              <text class="travel-desc">扫码记录校内校车次数</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部 Tab 导航 -->
    <view class="lc-bottom-nav">
      <view class="lc-nav-item" @tap="switchTab('sport')">
        <text class="iconfont icon-run"></text>
        <text class="nav-text">运动</text>
      </view>
      <view class="lc-nav-item active" @tap="switchTab('travel')">
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

.lc-logo-accent { color: #3b82f6; }

.lc-header .iconfont {
  font-size: 40rpx;
  color: #1f2937;
}

.lc-date-blue {
  font-size: 20rpx;
  font-weight: bold;
  color: #3b82f6;
  background: #eff6ff;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
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

.travel-asset { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); }

.asset-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
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

.travel-rank-tag {
  display: inline-block;
  margin-top: 24rpx;
  background: rgba(255,255,255,0.2);
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  position: relative;
  z-index: 1;
}

/* LBS监控 */
.travel-lbs-card {
  background: #eff6ff;
  border-radius: 32rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  border: 2rpx solid #dbeafe;
  margin-bottom: 24rpx;
}

.lbs-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: #3b82f6;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.lbs-dot {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  width: 20rpx;
  height: 20rpx;
  background: #3b82f6;
  border-radius: 50%;
}

.lbs-icon-wrap .iconfont { font-size: 48rpx; color: #fff; }

.lbs-content { flex: 1; }

.lbs-title {
  display: block;
  font-size: 22rpx;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 4rpx;
}

.lbs-desc {
  display: block;
  font-size: 18rpx;
  color: #60a5fa;
}

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

/* 出行列表 */
.travel-list { display: flex; flex-direction: column; gap: 16rpx; }

.travel-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.travel-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.travel-icon .iconfont { font-size: 48rpx; }

.indigo-icon { background: #eef2ff; }
.indigo-icon .iconfont { color: #4f46e5; }
.green-icon { background: #ecfdf5; }
.green-icon .iconfont { color: #059669; }
.orange-icon-sm { background: #fff7ed; }
.orange-icon-sm .iconfont { color: #ea580c; }
.purple-icon-sm { background: #f5f3ff; }
.purple-icon-sm .iconfont { color: #7c3aed; }
.cyan-icon-sm { background: #ecfeff; }
.cyan-icon-sm .iconfont { color: #0891b2; }
.rose-icon-sm { background: #fff1f2; }
.rose-icon-sm .iconfont { color: #e11d48; }

.travel-info { flex: 1; }

.travel-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.travel-desc {
  display: block;
  font-size: 20rpx;
  color: #9ca3af;
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
  color: #2563eb;
  transform: translateY(-6rpx);
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .lc-bottom-nav {
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  }
}
</style>
