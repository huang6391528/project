<template>
  <view class="page-home carbon-page-shell" @click="closeScanMenu">
    <view v-if="sidebarShow" class="sidebar-mask" @click="toggleSidebar"></view>
    <Sidebar :show="sidebarShow" @close="sidebarShow = false" />

    <view class="home-light light-a"></view>
    <view class="home-light light-b"></view>
    <view class="home-light light-c"></view>

    <view class="header-stats carbon-fade-up">
      <view class="header-left">
        <view class="sidebar-trigger-btn carbon-lift" @click.stop="toggleSidebar">
          <text class="iconfont icon-menu"></text>
        </view>
        <view class="brand-block">
          <text class="brand-kicker">CARBON CAMPUS</text>
          <text class="brand-title">碳迹校园</text>
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
              <view class="scan-line"></view>
            </view>
          </view>
          <view v-if="scanMenuShow" class="scan-dropdown" @click.stop>
            <view class="scan-dropdown-arrow"></view>
            <view class="scan-dropdown-inner carbon-glass-card">
              <view class="scan-dropdown-item" @click.stop="handleScanScan">扫码记录低碳行为</view>
              <view class="scan-dropdown-divider"></view>
              <view class="scan-dropdown-item" @click.stop="handleInviteCode">输入团队邀请码</view>
            </view>
          </view>
        </view>
        <view class="bell-icon carbon-lift">
          <text class="iconfont icon-bell"></text>
          <view class="bell-dot"></view>
        </view>
      </view>
    </view>

    <view class="hero-panel carbon-fade-up carbon-scanline">
      <view class="hero-copy">
        <text class="hero-label">校园碳中和实时指挥舱</text>
        <text class="hero-title">把每一次选择，转化为可验证的绿色影响力</text>
        <view class="hero-tags">
          <text>AI 核算</text>
          <text>行为认证</text>
          <text>积分激励</text>
        </view>
      </view>
      <view class="hero-orbit">
        <view class="orbit-ring ring-one"></view>
        <view class="orbit-ring ring-two"></view>
        <view class="orbit-ring ring-three"></view>
        <view class="orbit-core">
          <text class="orbit-number">2.4</text>
          <text class="orbit-unit">tCO2e</text>
        </view>
      </view>
    </view>

    <PersonalCard />
    <StatsPanel />

    <view class="zone-divider">
      <view class="zone-divider-line"></view>
      <view class="zone-divider-badge">
        <text class="zone-divider-text">今日低碳行动矩阵</text>
      </view>
      <view class="zone-divider-line zone-divider-line-right"></view>
    </view>

    <view class="action-zone carbon-glass-card">
      <view class="section-title">
        <text class="section-mark"></text>
        <text>快捷认证入口</text>
      </view>
      <CircleGrid />
      <DailyTask />

      <view class="section-title">
        <text class="section-mark amber"></text>
        <text>校园挑战精选</text>
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
  uni.showToast({ title: '已启动低碳行为扫码', icon: 'none' })
}

const handleInviteCode = () => {
  scanMenuShow.value = false
  showInviteModal.value = true
}

const closeInviteModal = () => {
  showInviteModal.value = false
}

const onInviteConfirm = () => {
  uni.showToast({ title: '邀请码已绑定', icon: 'success' })
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
  backdrop-filter: blur(10rpx);
}

.home-light {
  position: absolute;
  border-radius: 50%;
  filter: blur(12rpx);
  pointer-events: none;
  animation: floatGlow 8s ease-in-out infinite;
}

.light-a {
  top: 126rpx;
  left: -84rpx;
  width: 270rpx;
  height: 270rpx;
  background: rgba(167, 240, 75, 0.26);
}

.light-b {
  top: 20rpx;
  right: -92rpx;
  width: 320rpx;
  height: 320rpx;
  background: rgba(47, 211, 230, 0.20);
  animation-delay: -2.2s;
}

.light-c {
  top: 474rpx;
  right: 42rpx;
  width: 150rpx;
  height: 150rpx;
  background: rgba(255, 184, 77, 0.18);
  animation-delay: -4s;
}

@keyframes floatGlow {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(18rpx, -20rpx, 0) scale(1.06); }
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
  border-radius: 26rpx;
  background: rgba(255, 255, 255, 0.76);
  border: 1rpx solid rgba(255, 255, 255, 0.86);
  box-shadow: 0 16rpx 36rpx rgba(14, 78, 54, 0.12);
  position: relative;
}

.iconfont {
  font-size: 36rpx;
  color: #10251f;
}

.brand-block {
  display: flex;
  flex-direction: column;
}

.brand-kicker {
  font-size: 18rpx;
  color: #0b8f64;
  font-weight: 900;
  letter-spacing: 0;
}

.brand-title {
  font-size: 38rpx;
  color: #101a17;
  font-weight: 900;
  line-height: 1.15;
}

.bell-dot {
  position: absolute;
  top: 14rpx; right: 14rpx;
  width: 14rpx; height: 14rpx;
  background-color: #ff5d73;
  border-radius: 50%;
  border: 3rpx solid #fff;
  box-shadow: 0 0 0 8rpx rgba(255, 93, 115, 0.12);
}

.scan-btn-container {
  position: relative;
  z-index: 300;
}

.scan-frame {
  width: 36rpx;
  height: 36rpx;
  position: relative;
  overflow: hidden;
}

.scan-corner {
  position: absolute;
  width: 12rpx;
  height: 12rpx;
}

.scan-line {
  position: absolute;
  left: 2rpx;
  right: 2rpx;
  top: 4rpx;
  height: 3rpx;
  background: #0ea56f;
  box-shadow: 0 0 12rpx rgba(14,165,111,0.6);
  animation: scanMove 1.8s ease-in-out infinite;
}

@keyframes scanMove {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(25rpx); opacity: 1; }
}

.sc-tl { top: 0; left: 0; border-top: 3rpx solid #10251f; border-left: 3rpx solid #10251f; border-radius: 2rpx 0 0 0; }
.sc-tr { top: 0; right: 0; border-top: 3rpx solid #10251f; border-right: 3rpx solid #10251f; border-radius: 0 2rpx 0 0; }
.sc-bl { bottom: 0; left: 0; border-bottom: 3rpx solid #10251f; border-left: 3rpx solid #10251f; border-radius: 0 0 0 2rpx; }
.sc-br { bottom: 0; right: 0; border-bottom: 3rpx solid #10251f; border-right: 3rpx solid #10251f; border-radius: 0 0 2rpx 0; }

.scan-dropdown {
  position: absolute;
  top: 96rpx;
  right: 0;
  width: 286rpx;
  z-index: 301;
  animation: dropdownIn 0.2s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-12rpx) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
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
  border-radius: 26rpx;
  overflow: hidden;
}

.scan-dropdown-item {
  padding: 28rpx 20rpx;
  text-align: center;
  font-size: 26rpx;
  color: #17382f;
  font-weight: 800;
}

.scan-dropdown-item:active { background-color: rgba(14, 165, 111, 0.09); }

.scan-dropdown-divider {
  height: 1rpx;
  background-color: rgba(14, 165, 111, 0.14);
  margin: 0 28rpx;
}

.hero-panel {
  margin-top: 34rpx;
  padding: 38rpx 34rpx;
  min-height: 256rpx;
  border-radius: 44rpx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:
    radial-gradient(circle at 88% 18%, rgba(167, 240, 75, 0.36), transparent 28%),
    radial-gradient(circle at 34% 0%, rgba(47, 211, 230, 0.28), transparent 32%),
    linear-gradient(132deg, rgba(7, 24, 20, 0.98), rgba(5, 95, 70, 0.96) 58%, rgba(14, 165, 111, 0.92));
  box-shadow: var(--carbon-shadow-strong);
  overflow: hidden;
  position: relative;
}

.hero-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(255,255,255,0.14) 0 1rpx, transparent 1rpx 100%);
  background-size: 34rpx 34rpx;
  opacity: 0.34;
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
  font-weight: 800;
}

.hero-title {
  margin-top: 12rpx;
  font-size: 43rpx;
  line-height: 1.22;
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
  color: #effff5;
  background: rgba(255, 255, 255, 0.15);
  border: 1rpx solid rgba(255, 255, 255, 0.22);
}

.hero-orbit {
  position: relative;
  z-index: 1;
  width: 166rpx;
  height: 166rpx;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2rpx solid rgba(255,255,255,0.34);
}

.ring-one {
  animation: spin 9s linear infinite;
}

.ring-two {
  inset: 20rpx;
  border-color: rgba(167, 240, 75, 0.62);
  animation: spin 6.4s linear infinite reverse;
}

.ring-three {
  inset: 42rpx;
  border-color: rgba(47, 211, 230, 0.58);
  animation: spin 4.8s linear infinite;
}

.orbit-ring::after {
  content: "";
  position: absolute;
  top: -7rpx;
  left: 50%;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #a7f04b;
  box-shadow: 0 0 20rpx rgba(167, 240, 75, 0.8);
}

.orbit-core {
  position: absolute;
  inset: 50rpx;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(14rpx);
}

.orbit-number {
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1;
}

.orbit-unit {
  margin-top: 4rpx;
  font-size: 15rpx;
  color: rgba(255,255,255,0.74);
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
  background: linear-gradient(90deg, transparent, rgba(14, 165, 111, 0.52));
}

.zone-divider-line-right {
  background: linear-gradient(90deg, rgba(14, 165, 111, 0.52), transparent);
}

.zone-divider-badge {
  background: rgba(255, 255, 255, 0.78);
  border: 1rpx solid rgba(14, 165, 111, 0.18);
  border-radius: 999rpx;
  padding: 9rpx 24rpx;
  box-shadow: 0 10rpx 26rpx rgba(14, 78, 54, 0.08);
}

.zone-divider-text {
  font-size: 22rpx;
  color: #047857;
  font-weight: 900;
}

.action-zone {
  border-radius: 38rpx;
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
  background: linear-gradient(180deg, #a7f04b, #0ea56f);
  box-shadow: 0 8rpx 18rpx rgba(14, 165, 111, 0.28);
}

.section-mark.amber {
  background: linear-gradient(180deg, #ffd166, #ff7a59);
}
</style>
