<template>
  <view class="page-low-carbon">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="sport-back-btn" @tap="goBack">
        <text class="iconfont icon-chevron-left"></text>
      </view>
      <text class="lc-logo">Eco<text class="lc-logo-accent">Meal</text></text>
      <text class="lc-date-orange-tag">Canteen Open</text>
    </view>

    <view class="page-content">
      <!-- 食堂定位（放大 + 地图） -->
      <view class="diet-map-card">
        <map
          class="diet-map"
          :latitude="26.4509"
          :longitude="106.6579"
          :markers="canteenMarkers"
          scale="16"
          :show-location="true"
        ></map>
        <view class="diet-map-overlay">
          <view class="diet-map-pin">
            <text class="iconfont icon-location pin-icon"></text>
          </view>
          <view class="diet-map-info">
            <text class="diet-map-name">第一学生食堂</text>
            <text class="diet-map-hint">请确保您在食堂范围内打卡</text>
          </view>
          <button class="diet-map-btn">一键签到</button>
        </view>
      </view>

      <!-- 饮食打卡 -->
      <view class="lc-section">
        <view class="lc-section-header">
          <text class="section-title">饮食场景打卡</text>
        </view>
        <view class="diet-list">
          <!-- 光盘行动 -->
          <view class="diet-item">
            <view class="diet-left">
              <view class="diet-icon orange-icon">
                <text class="iconfont icon-camera"></text>
              </view>
              <view class="diet-info">
                <text class="diet-name">光盘行动</text>
                <text class="diet-desc">AI拍照识别识别空盘情况</text>
              </view>
            </view>
            <button class="diet-btn">AI拍摄</button>
          </view>
          <!-- 低碳素食 -->
          <view class="diet-item">
            <view class="diet-left">
              <view class="diet-icon green-icon">
                <text class="iconfont icon-leaf"></text>
              </view>
              <view class="diet-info">
                <text class="diet-name">低碳素食</text>
                <text class="diet-desc">选择全素餐/本地时令餐</text>
              </view>
            </view>
            <view class="diet-check"></view>
          </view>
          <!-- 减外卖减塑 -->
          <view class="diet-item">
            <view class="diet-left">
              <view class="diet-icon rose-icon">
                <text class="iconfont icon-no-plastic"></text>
              </view>
              <view class="diet-info">
                <text class="diet-name">减外卖减塑</text>
                <text class="diet-desc">今日未点外卖、拒绝一次性餐盒</text>
              </view>
            </view>
            <view class="diet-check-done">
              <text class="iconfont icon-check"></text>
            </view>
          </view>
          <!-- 自带餐具 -->
          <view class="diet-item">
            <view class="diet-left">
              <view class="diet-icon blue-icon">
                <text class="iconfont icon-cup"></text>
              </view>
              <view class="diet-info">
                <text class="diet-name">自带餐具</text>
                <text class="diet-desc">自带碗筷及杯子用餐打卡</text>
              </view>
            </view>
            <button class="diet-btn-gray">已领</button>
          </view>
          <!-- 节水惜食 -->
          <view class="diet-item">
            <view class="diet-left">
              <view class="diet-icon cyan-icon">
                <text class="iconfont icon-water"></text>
              </view>
              <view class="diet-info">
                <text class="diet-name">节水惜食</text>
                <text class="diet-desc">节约用水、无浪费零食打卡</text>
              </view>
            </view>
            <button class="diet-btn-blue">记录</button>
          </view>
        </view>

        <!-- 连续光盘打卡（每日小任务样式） -->
        <view class="diet-chain-task">
          <view class="chain-left">
            <text class="iconfont icon-meal chain-icon"></text>
            <view class="chain-info">
              <text class="chain-title">连续光盘打卡</text>
              <view class="chain-progress">
                <view class="chain-bar">
                  <view class="chain-fill" style="width: 75%"></view>
                </view>
                <text class="chain-days">12 / 30 天</text>
              </view>
            </view>
          </view>
          <view class="chain-badge">进行中</view>
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
      <view class="lc-nav-item active" @tap="switchTab('diet')">
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
  const appUrls = {
    sport:  '/pages/low-carbon/sport',
    travel: '/pages/low-carbon/travel',
    diet:   '/pages/low-carbon/diet',
    life:   '/pages/low-carbon/life',
  }
  uni.navigateTo({ url: appUrls[tab] })
}

const canteenMarkers = [{
  id: 1,
  latitude: 26.4509,
  longitude: 106.6579,
  width: 40,
  height: 50,
  callout: { content: '第一学生食堂', color: '#f97316', fontSize: 12, borderRadius: 8, padding: 8, display: 'ALWAYS', bgColor: '#fff7ed' }
}]
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

.lc-logo-accent { color: #f97316; }

.lc-header .iconfont {
  font-size: 40rpx;
  color: #1f2937;
}

.lc-date-orange-tag {
  font-size: 20rpx;
  font-weight: bold;
  color: #f97316;
  background: #fff7ed;
  padding: 6rpx 20rpx;
  border-radius: 20rpx;
  text-transform: uppercase;
}

.page-content {
  padding: 0 24rpx 200rpx;
}

/* 食堂地图卡片 */
.diet-map-card {
  border-radius: 32rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  position: relative;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
}
.diet-map {
  width: 100%;
  height: 480rpx;
  border-radius: 32rpx;
}
.diet-map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10rpx);
  padding: 24rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}
.diet-map-pin {
  width: 72rpx;
  height: 72rpx;
  background: #fff7ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pin-icon { font-size: 36rpx; color: #ea580c; }
.diet-map-info { flex: 1; }
.diet-map-name {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4rpx;
}
.diet-map-hint {
  display: block;
  font-size: 18rpx;
  color: #9ca3af;
}
.diet-map-btn {
  background: #f97316;
  color: #fff;
  font-size: 22rpx;
  font-weight: 700;
  padding: 16rpx 28rpx;
  border-radius: 50rpx;
  border: none;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(249,115,22,0.3);
}

/* 碳资产卡片 */
/*.lc-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
}*/

.diet-asset { background: linear-gradient(135deg, #f97316 0%, #fb923c 100%); }

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

.diet-reward-tag {
  display: inline-block;
  margin-top: 16rpx;
  background: rgba(255,255,255,0.2);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
}

/* 食堂核验 */
/*.diet-lbs-card {
  background: #ecfdf5;
  border-radius: 40rpx;
  padding: 48rpx 40rpx;
  border: 2rpx solid #d1fae5;
  text-align: center;
  margin-bottom: 24rpx;
}*/

.diet-lbs-content { position: relative; z-index: 1; }

.diet-lbs-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #064e3b;
  margin-bottom: 8rpx;
}

.diet-lbs-desc {
  display: block;
  font-size: 20rpx;
  color: #059669;
  margin-bottom: 24rpx;
}

.diet-lbs-btn {
  width: 100%;
  background: #10b981;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  padding: 24rpx;
  border-radius: 32rpx;
  border: none;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.3);
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

/* 饮食列表 */
.diet-list { display: flex; flex-direction: column; gap: 16rpx; }

.diet-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.diet-left { display: flex; align-items: center; gap: 24rpx; flex: 1; }

.diet-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diet-icon .iconfont { font-size: 36rpx; }

.orange-icon { background: #fff7ed; }
.orange-icon .iconfont { color: #ea580c; }
.green-icon { background: #ecfdf5; }
.green-icon .iconfont { color: #059669; }
.rose-icon { background: #fff1f2; }
.rose-icon .iconfont { color: #e11d48; }
.blue-icon { background: #eff6ff; }
.blue-icon .iconfont { color: #3b82f6; }
.cyan-icon { background: #ecfeff; }
.cyan-icon .iconfont { color: #0891b2; }

.diet-info { flex: 1; }

.diet-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.diet-desc {
  display: block;
  font-size: 20rpx;
  color: #9ca3af;
}

.diet-btn {
  background: #f97316;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-btn-gray {
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-btn-blue {
  background: #3b82f6;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-check {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #10b981;
  flex-shrink: 0;
}

.diet-check-done {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diet-check-done .iconfont {
  font-size: 28rpx;
  color: #fff;
}

/* 连续光盘小任务 */
.diet-chain-task {
  margin-top: 20rpx;
  background: linear-gradient(135deg, #fff7ed, #fed7aa);
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1rpx solid #fed7aa;
}
.chain-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex: 1;
}
.chain-icon { font-size: 40rpx; color: #ea580c; }
.chain-info { flex: 1; }
.chain-title {
  display: block;
  font-size: 26rpx;
  font-weight: 700;
  color: #92400e;
  margin-bottom: 8rpx;
}
.chain-progress { display: flex; align-items: center; gap: 12rpx; }
.chain-bar {
  flex: 1;
  height: 8rpx;
  background: rgba(249,115,22,0.2);
  border-radius: 4rpx;
  overflow: hidden;
}
.chain-fill {
  height: 100%;
  background: #f97316;
  border-radius: 4rpx;
}
.chain-days {
  font-size: 18rpx;
  font-weight: 700;
  color: #ea580c;
  white-space: nowrap;
}
.chain-badge {
  background: #f97316;
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  padding: 8rpx 20rpx;
  border-radius: 50rpx;
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
  color: #f97316;
  transform: translateY(-6rpx);
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .lc-bottom-nav {
    padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  }
}
</style>
