<template>
  <view class="page-home carbon-page-shell" @click="closeScanMenu">
    <view v-if="sidebarShow" class="sidebar-mask" @click="toggleSidebar"></view>
    <Sidebar :show="sidebarShow" @close="sidebarShow = false" />

    <view class="home-aurora aurora-left"></view>
    <view class="home-aurora aurora-right"></view>

    <view class="header-stats carbon-fade-up">
      <view class="header-left">
        <view class="sidebar-trigger-btn carbon-lift" @click.stop="toggleSidebar">
          <text class="iconfont icon-menu"></text>
        </view>
        <view class="brand-block">
          <text class="brand-kicker">CARBON CAMPUS</text>
          <text class="brand-title">绿动校园</text>
        </view>
      </view>
      <view class="header-right">
        <view class="scan-btn-container" @click.stop="toggleScanMenu">
          <view class="scan-btn carbon-lift">
            <view class="scan-frame">
              <view class="scan-corner sc-tl"></view>
              <view class="scan-corner sc-tr"></view>
              <view class="scan-corner sc-bl"></view>
              <view class="scan-corner sc-br"></view>
            </view>
          </view>
          <view v-if="scanMenuShow" class="scan-dropdown" @click.stop>
            <view class="scan-dropdown-arrow"></view>
            <view class="scan-dropdown-inner carbon-glass-card">
              <view class="scan-dropdown-item" @click.stop="handleScanScan">扫码核销</view>
              <view class="scan-dropdown-divider"></view>
              <view class="scan-dropdown-item" @click.stop="handleInviteCode">输入邀请码</view>
            </view>
          </view>
        </view>
        <view class="bell-icon carbon-lift">
          <text class="iconfont icon-bell"></text>
          <view class="bell-dot"></view>
        </view>
      </view>
    </view>

    <view class="hero-panel carbon-fade-up">
      <view class="hero-copy">
        <text class="hero-label">贵州大学低碳账户</text>
        <text class="hero-title">把每一次校园生活，转化为可验证的碳资产</text>
        <view class="hero-tags">
          <text>AI 推荐</text>
          <text>行为核验</text>
          <text>积分激励</text>
        </view>
      </view>
      <view class="hero-orbit">
        <view class="orbit-ring ring-one"></view>
        <view class="orbit-ring ring-two"></view>
        <view class="orbit-core">CO₂</view>
      </view>
    </view>

    <PersonalCard />
    <StatsPanel />

    <view class="zone-divider">
      <view class="zone-divider-line"></view>
      <view class="zone-divider-badge">
        <text class="zone-divider-text">今日低碳任务</text>
      </view>
      <view class="zone-divider-line zone-divider-line-right"></view>
    </view>

    <view class="action-zone carbon-glass-card">
      <view class="section-title">
        <text class="section-mark"></text>
        <text>高频低碳场景</text>
      </view>
      <CircleGrid />
      <DailyTask />

      <view class="section-title">
        <text class="section-mark amber"></text>
        <text>校园活动</text>
      </view>
      <ActivityBanner />

      <EcoTips />
    </view>

    <InviteModal :show="showInviteModal" @close="closeInviteModal" @confirm="onInviteConfirm" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import PersonalCard from './components/PersonalCard.vue'
import StatsPanel from './components/StatsPanel.vue'
import CircleGrid from './components/CircleGrid.vue'
import DailyTask from './components/DailyTask.vue'
import ActivityBanner from './components/ActivityBanner.vue'
import EcoTips from './components/EcoTips.vue'
import InviteModal from './components/InviteModal.vue'

const sidebarShow = ref(false)
const showInviteModal = ref(false)
const scanMenuShow = ref(false)

const toggleSidebar = () => {
  sidebarShow.value = !sidebarShow.value
}

const toggleScanMenu = () => {
  scanMenuShow.value = !scanMenuShow.value
}

const closeScanMenu = () => {
  scanMenuShow.value = false
}

const handleScanScan = () => {
  scanMenuShow.value = false
  uni.showToast({ title: '扫码核销功能准备中', icon: 'none' })
}

const handleInviteCode = () => {
  scanMenuShow.value = false
  showInviteModal.value = true
}

const closeInviteModal = () => {
  showInviteModal.value = false
}

const onInviteConfirm = () => {
  uni.showToast({ title: '邀请码已提交', icon: 'success' })
}
</script>

<style scoped>
.page-home {
  padding: 0 30rpx 120rpx;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}

.sidebar-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(5, 20, 14, 0.56);
  z-index: 99;
  backdrop-filter: blur(8rpx);
}

.home-aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(10rpx);
  pointer-events: none;
}

.aurora-left {
  top: 120rpx;
  left: -80rpx;
  width: 260rpx;
  height: 260rpx;
  background: rgba(74, 222, 128, 0.22);
}

.aurora-right {
  top: 24rpx;
  right: -90rpx;
  width: 300rpx;
  height: 300rpx;
  background: rgba(56, 189, 248, 0.18);
}

.header-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24rpx;
  position: relative;
  z-index: 10;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.sidebar-trigger-btn, .bell-icon, .scan-btn {
  width: 78rpx;
  height: 78rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.82);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 12rpx 30rpx rgba(14, 78, 54, 0.10);
  position: relative;
}

.iconfont {
  font-size: 36rpx;
  color: #12392d;
}

.brand-block {
  display: flex;
  flex-direction: column;
}

.brand-kicker {
  font-size: 18rpx;
  color: #059669;
  font-weight: 800;
}

.brand-title {
  font-size: 36rpx;
  color: #10231b;
  font-weight: 900;
  line-height: 1.2;
}

.bell-dot {
  position: absolute;
  top: 14rpx; right: 14rpx;
  width: 14rpx; height: 14rpx;
  background-color: #ef4444;
  border-radius: 50%;
  border: 3rpx solid #fff;
}

.scan-btn-container {
  position: relative;
  z-index: 300;
}

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

.sc-tl { top: 0; left: 0; border-top: 3rpx solid #12392d; border-left: 3rpx solid #12392d; border-radius: 2rpx 0 0 0; }
.sc-tr { top: 0; right: 0; border-top: 3rpx solid #12392d; border-right: 3rpx solid #12392d; border-radius: 0 2rpx 0 0; }
.sc-bl { bottom: 0; left: 0; border-bottom: 3rpx solid #12392d; border-left: 3rpx solid #12392d; border-radius: 0 0 0 2rpx; }
.sc-br { bottom: 0; right: 0; border-bottom: 3rpx solid #12392d; border-right: 3rpx solid #12392d; border-radius: 0 0 2rpx 0; }

.scan-dropdown {
  position: absolute;
  top: 96rpx;
  right: 0;
  width: 228rpx;
  z-index: 301;
  animation: dropdownIn 0.18s ease both;
}

@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-12rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.scan-dropdown-arrow {
  position: absolute;
  top: -14rpx;
  right: 30rpx;
  width: 0; height: 0;
  border-left: 13rpx solid transparent;
  border-right: 13rpx solid transparent;
  border-bottom: 14rpx solid rgba(255, 255, 255, 0.92);
  z-index: 2;
}

.scan-dropdown-inner {
  border-radius: 24rpx;
  overflow: hidden;
}

.scan-dropdown-item {
  padding: 30rpx 0;
  text-align: center;
  font-size: 28rpx;
  color: #17382f;
  font-weight: 700;
}

.scan-dropdown-item:active { background-color: rgba(17, 169, 125, 0.08); }

.scan-dropdown-divider {
  height: 1rpx;
  background-color: rgba(17, 169, 125, 0.12);
  margin: 0 28rpx;
}

.hero-panel {
  margin-top: 34rpx;
  padding: 34rpx;
  min-height: 234rpx;
  border-radius: 40rpx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:
    linear-gradient(135deg, rgba(6, 78, 59, 0.94), rgba(17, 169, 125, 0.88)),
    url('https://modao.cc/agent-py/media/generated_images/2026-04-05/b9c8194c51e2407997135fdc0513e984.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: 0 24rpx 60rpx rgba(5, 95, 70, 0.26);
  overflow: hidden;
  position: relative;
}

.hero-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255,255,255,0.16) 0 1rpx, transparent 1rpx 100%);
  background-size: 34rpx 34rpx;
  opacity: 0.4;
}

.hero-copy {
  position: relative;
  z-index: 1;
  width: 430rpx;
  display: flex;
  flex-direction: column;
}

.hero-label {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.72);
  font-weight: 700;
}

.hero-title {
  margin-top: 12rpx;
  font-size: 42rpx;
  line-height: 1.24;
  font-weight: 900;
}

.hero-tags {
  display: flex;
  gap: 12rpx;
  margin-top: 24rpx;
  flex-wrap: wrap;
}

.hero-tags text {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #eafff5;
  background: rgba(255, 255, 255, 0.16);
  border: 1rpx solid rgba(255, 255, 255, 0.22);
}

.hero-orbit {
  position: relative;
  z-index: 1;
  width: 150rpx;
  height: 150rpx;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,0.34);
}

.ring-one {
  animation: spin 8s linear infinite;
}

.ring-two {
  inset: 24rpx;
  border-color: rgba(251, 191, 36, 0.68);
  animation: spin 6s linear infinite reverse;
}

.orbit-ring::after {
  content: "";
  position: absolute;
  top: -6rpx;
  left: 50%;
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #fbbf24;
}

.orbit-core {
  position: absolute;
  inset: 42rpx;
  border-radius: 50%;
  background: rgba(255,255,255,0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  font-weight: 900;
  backdrop-filter: blur(10rpx);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.zone-divider {
  display: flex;
  align-items: center;
  margin: 48rpx 0 0;
  gap: 18rpx;
}

.zone-divider-line {
  flex: 1;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, rgba(17, 169, 125, 0.48));
}

.zone-divider-line-right {
  background: linear-gradient(90deg, rgba(17, 169, 125, 0.48), transparent);
}

.zone-divider-badge {
  background: rgba(255, 255, 255, 0.78);
  border: 1rpx solid rgba(17, 169, 125, 0.18);
  border-radius: 999rpx;
  padding: 9rpx 24rpx;
}

.zone-divider-text {
  font-size: 22rpx;
  color: #047857;
  font-weight: 800;
}

.action-zone {
  border-radius: 36rpx;
  padding: 4rpx 20rpx 24rpx;
  margin-top: 18rpx;
  position: relative;
  z-index: 1;
}

.section-title {
  margin-top: 44rpx;
  margin-bottom: 24rpx;
  font-size: 32rpx;
  font-weight: 900;
  color: #16251f;
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.section-mark {
  width: 12rpx;
  height: 34rpx;
  border-radius: 999rpx;
  background: linear-gradient(180deg, #34d399, #059669);
  box-shadow: 0 8rpx 18rpx rgba(16, 185, 129, 0.24);
}

.section-mark.amber {
  background: linear-gradient(180deg, #facc15, #f97316);
}
</style>
