<template>
  <view class="page-about">
    <!-- 导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">关于</text>
      <view class="nav-placeholder"></view>
    </view>

    <view class="content">
      <!-- Logo 和版本信息 -->
      <view class="logo-section">
        <view class="logo-wrapper">
          <text class="logo-icon">🌿</text>
        </view>
        <text class="app-name">绿境校园</text>
        <text class="app-version">版本 2.4.0 (2026.0415)</text>
      </view>

      <!-- 平台介绍 -->
      <view class="info-section">
        <text class="section-title">平台介绍</text>
        <text class="section-desc">
          绿境校园是一款专注于校园减碳生活的社交与管理平台。通过记录运动、光盘行动、校园回收等行为，将你的环保贡献转化为碳积分，开启智慧绿色的校园生活。
        </text>
      </view>

      <!-- 合作单位 -->
      <view class="info-section">
        <text class="section-title">合作单位</text>
        <view class="partners">
          <text class="partner-tag">国家气候战略中心</text>
          <text class="partner-tag">贵州大学绿色实验室</text>
          <text class="partner-tag">高校碳中和联盟</text>
        </view>
      </view>

      <!-- 协议和政策 -->
      <view class="links-section">
        <view class="link-item" @tap="showToast('用户协议')">
          <text class="link-text">用户协议</text>
          <text class="link-arrow">›</text>
        </view>
        <view class="link-item" @tap="showToast('隐私政策')">
          <text class="link-text">隐私政策</text>
          <text class="link-arrow">›</text>
        </view>
        <view class="link-item" @tap="showToast('证照信息')">
          <text class="link-text">证照信息</text>
          <text class="link-arrow">›</text>
        </view>
      </view>

      <!-- 版权信息 -->
      <view class="copyright">
        <text class="copyright-text">Copyright © 2024-2026 GreenCampus Tech.</text>
        <text class="copyright-text">All Rights Reserved. 绿境校园 版权所有</text>
      </view>
    </view>
  </view>
</template>

<script setup>
function goBack() {
  uni.navigateBack()
}

function showToast(msg) {
  uni.showToast({ title: msg + '开发中', icon: 'none' })
}
</script>

<style scoped>
.page-about {
  min-height: 100vh;
  background-color: #ffffff;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #f3f4f6;
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

.content {
  padding: 32rpx 40rpx;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0 48rpx;
}

.logo-wrapper {
  width: 160rpx;
  height: 160rpx;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  box-shadow: 0 16rpx 32rpx rgba(16, 185, 129, 0.3);
}

.logo-icon {
  font-size: 96rpx;
  color: #ffffff;
}

.app-name {
  font-size: 48rpx;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 12rpx;
}

.app-version {
  font-size: 26rpx;
  color: #9ca3af;
  font-weight: 500;
}

.info-section {
  margin-bottom: 40rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20rpx;
}

.section-desc {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  line-height: 1.6;
}

.partners {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.partner-tag {
  padding: 12rpx 24rpx;
  background-color: #f3f4f6;
  border-radius: 60rpx;
  font-size: 24rpx;
  color: #6b7280;
}

.links-section {
  margin-top: 48rpx;
  border-top: 1rpx solid #f3f4f6;
  padding-top: 32rpx;
}

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  transition: background-color 0.15s;
}

.link-item:active {
  background-color: #f9fafb;
}

.link-text {
  font-size: 30rpx;
  font-weight: 500;
  color: #374151;
}

.link-arrow {
  font-size: 40rpx;
  color: #d1d5db;
}

.copyright {
  margin-top: 80rpx;
  text-align: center;
}

.copyright-text {
  display: block;
  font-size: 22rpx;
  color: #d1d5db;
  line-height: 1.8;
}
</style>