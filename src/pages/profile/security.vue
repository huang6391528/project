<template>
  <view class="page-security">
    <!-- 导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">账号与安全</text>
      <view class="nav-placeholder"></view>
    </view>

    <view class="content">
      <!-- 安全状态卡片 -->
      <view class="security-status">
        <view class="shield-icon">🛡️</view>
        <text class="status-title">账号非常安全</text>
        <text class="status-desc">上次登录: 2026-04-15 08:30 · 贵阳</text>
      </view>

      <!-- 安全设置列表 -->
      <view class="security-list">
        <!-- 修改登录密码 -->
        <view class="security-item" @tap="showToast('修改登录密码')">
          <view class="item-content">
            <text class="item-title">修改登录密码</text>
            <text class="item-desc">支持原密码验证，修改账号登录密码</text>
          </view>
          <view class="item-action">
            <text class="action-btn">去修改</text>
          </view>
        </view>

        <!-- 手机号管理 -->
        <view class="security-item" @tap="showToast('更换手机号')">
          <view class="item-content">
            <text class="item-title">手机号管理</text>
            <text class="item-desc">查看/更换绑定手机号，需验证码验证</text>
            <text class="item-phone">138****8888</text>
          </view>
          <view class="item-action">
            <text class="action-btn">更换</text>
          </view>
        </view>

        <!-- 账号注销 -->
        <view class="security-item logout-item" @tap="showLogoutModal">
          <view class="item-content">
            <text class="item-title danger">账号注销</text>
            <text class="item-desc danger-light">注销后账号数据、碳积分将永久清空，不可逆</text>
          </view>
          <view class="item-action">
            <text class="arrow danger">›</text>
          </view>
        </view>
      </view>

      <!-- 安全提醒 -->
      <view class="safety-tips">
        <view class="tips-header">
          <text class="tips-icon">⚠️</text>
          <text class="tips-title">安全提醒</text>
        </view>
        <text class="tips-content">
          平台不会以任何理由向您索要密码或验证码。如发现账号异常，请第一时间联系平台客服处理。
        </text>
      </view>
    </view>

    <!-- 注销确认弹窗 -->
    <view class="modal-overlay" v-if="logoutModalVisible" @tap="hideLogoutModal">
      <view class="modal-card" @tap.stop>
        <view class="modal-icon">⚠️</view>
        <text class="modal-title">确认注销账号？</text>
        <text class="modal-desc">注销后，您的账号数据、碳积分将永久清空，此操作不可逆。</text>
        <view class="modal-actions">
          <view class="modal-btn cancel" @tap="hideLogoutModal">取消</view>
          <view class="modal-btn confirm" @tap="confirmLogout">确认注销</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const logoutModalVisible = ref(false)

function goBack() {
  uni.navigateBack()
}

function showToast(msg) {
  uni.showToast({ title: msg + '开发中', icon: 'none' })
}

function showLogoutModal() {
  logoutModalVisible.value = true
}

function hideLogoutModal() {
  logoutModalVisible.value = false
}

function confirmLogout() {
  hideLogoutModal()
  uni.showToast({ title: '账号注销申请已提交', icon: 'none' })
  // 实际注销逻辑
}
</script>

<style scoped>
.page-security {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* 导航栏 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-back {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 48rpx;
  color: #1f2937;
}

.nav-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
}

.nav-placeholder {
  width: 80rpx;
}

/* 内容区 */
.content {
  padding: 48rpx 32rpx;
}

/* 安全状态 */
.security-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48rpx 0;
  margin-bottom: 32rpx;
}

.shield-icon {
  width: 160rpx;
  height: 160rpx;
  background-color: #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 96rpx;
  margin-bottom: 32rpx;
}

.status-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12rpx;
}

.status-desc {
  font-size: 26rpx;
  color: #9ca3af;
}

/* 安全设置列表 */
.security-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 64rpx;
}

.security-item {
  background-color: #ffffff;
  border-radius: 40rpx;
  padding: 40rpx 32rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.item-content {
  flex: 1;
}

.item-title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8rpx;
}

.item-title.danger {
  color: #ef4444;
}

.item-desc {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
  line-height: 1.5;
}

.item-desc.danger-light {
  color: #fca5a5;
}

.item-phone {
  display: block;
  font-size: 28rpx;
  font-weight: 500;
  color: #4b5563;
  margin-top: 16rpx;
}

.item-action {
  flex-shrink: 0;
  margin-left: 24rpx;
}

.action-btn {
  padding: 16rpx 32rpx;
  background-color: #f3f4f6;
  border-radius: 60rpx;
  font-size: 24rpx;
  font-weight: 700;
  color: #4b5563;
  transition: background-color 0.15s;
}

.action-btn:active {
  background-color: #e5e7eb;
}

.arrow {
  font-size: 48rpx;
  color: #d1d5db;
}

.arrow.danger {
  color: #fca5a5;
}

.logout-item {
  border: 2rpx solid transparent;
  transition: border-color 0.2s;
}

.logout-item:active {
  border-color: #fee2e2;
}

/* 安全提醒 */
.safety-tips {
  background-color: #eff6ff;
  border-radius: 32rpx;
  padding: 32rpx;
  border: 1rpx solid #dbeafe;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.tips-icon {
  font-size: 36rpx;
}

.tips-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #2563eb;
}

.tips-content {
  font-size: 24rpx;
  color: #3b82f6;
  line-height: 1.6;
  opacity: 0.8;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 64rpx;
}

.modal-card {
  background-color: #ffffff;
  border-radius: 48rpx;
  width: 100%;
  max-width: 600rpx;
  overflow: hidden;
}

.modal-icon {
  font-size: 72rpx;
  text-align: center;
  margin-top: 64rpx;
  margin-bottom: 24rpx;
}

.modal-title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 16rpx;
}

.modal-desc {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  text-align: center;
  padding: 0 32rpx;
  margin-bottom: 48rpx;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  border-top: 1rpx solid #f3f4f6;
}

.modal-btn {
  flex: 1;
  padding: 34rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
  transition: background-color 0.15s;
}

.modal-btn.cancel {
  color: #6b7280;
  border-right: 1rpx solid #f3f4f6;
}

.modal-btn.cancel:active {
  background-color: #f9fafb;
}

.modal-btn.confirm {
  color: #ef4444;
  font-weight: 700;
}

.modal-btn.confirm:active {
  background-color: #f9fafb;
}
</style>