<template>
  <view class="page-home" @click="closeScanMenu">
    <!-- 侧边栏遮罩层 -->
    <view v-if="sidebarShow" class="sidebar-mask" @click="toggleSidebar"></view>

    <!-- 侧边栏 -->
    <Sidebar :show="sidebarShow" @close="sidebarShow = false" />

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
    <PersonalCard />

    <!-- 统一数据仪表面板 -->
    <StatsPanel />

    <!-- 区域分隔：快捷操作 -->
    <view class="zone-divider">
      <view class="zone-divider-line"></view>
      <view class="zone-divider-badge">
        <text class="zone-divider-text">快 捷 操 作</text>
      </view>
      <view class="zone-divider-line zone-divider-line-right"></view>
    </view>

    <!-- 快捷操作区 -->
    <view class="action-zone">
      <view class="section-title">
        <text>快捷打卡入口</text>
      </view>
      <CircleGrid />
      <DailyTask />

      <view class="section-title">
        <text>活动</text>
      </view>
      <ActivityBanner />

      <EcoTips />
    </view>

    <!-- 邀请码弹窗 -->
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
const inviteCodeInput = ref('')

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

const onInviteConfirm = (code) => {
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

.sidebar-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  transition: opacity 0.3s ease;
}

/* Header */
.header-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
  position: relative;
  z-index: 10;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.sidebar-trigger-btn, .bell-icon {
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

/* 扫码按钮 */
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
.sc-tl { top: 0; left: 0; border-top: 3rpx solid #555; border-left: 3rpx solid #555; border-radius: 2rpx 0 0 0; }
.sc-tr { top: 0; right: 0; border-top: 3rpx solid #555; border-right: 3rpx solid #555; border-radius: 0 2rpx 0 0; }
.sc-bl { bottom: 0; left: 0; border-bottom: 3rpx solid #555; border-left: 3rpx solid #555; border-radius: 0 0 0 2rpx; }
.sc-br { bottom: 0; right: 0; border-bottom: 3rpx solid #555; border-right: 3rpx solid #555; border-radius: 0 0 2rpx 0; }

.scan-dropdown {
  position: absolute;
  top: 92rpx;
  right: 0;
  width: 220rpx;
  z-index: 301;
}

.scan-dropdown-arrow {
  position: absolute;
  top: -14rpx;
  right: 30rpx;
  width: 0; height: 0;
  border-left: 13rpx solid transparent;
  border-right: 13rpx solid transparent;
  border-bottom: 14rpx solid #fff;
  z-index: 2;
  filter: drop-shadow(0 -2rpx 2rpx rgba(0,0,0,0.06));
}

.scan-dropdown-inner {
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.13), 0 2rpx 10rpx rgba(0, 0, 0, 0.07);
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
.scan-dropdown-item:active { background-color: #f5f5f5; }
.scan-dropdown-divider {
  height: 1rpx;
  background-color: #f0f0f0;
  margin: 0 28rpx;
}

/* 区域分隔线 */
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
.zone-divider-line-right { background: linear-gradient(90deg, #a7f3d0, transparent); }
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

/* 快捷操作区容器 */
.action-zone {
  background: linear-gradient(180deg, #f0fdf4 0%, #f7fffe 60%, #ffffff 100%);
  border-radius: 40rpx;
  padding: 0 20rpx 24rpx;
  margin-top: 16rpx;
  box-shadow: inset 0 2rpx 8rpx rgba(16, 185, 129, 0.06), 0 2rpx 16rpx rgba(16, 185, 129, 0.08);
}

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
</style>
