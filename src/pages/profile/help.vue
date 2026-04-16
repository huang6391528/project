<template>
  <view class="page-help">
    <!-- 状态栏 -->


    <!-- 导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">帮助与反馈</text>
      <view class="nav-placeholder"></view>
    </view>

    <view class="content">
      <!-- 搜索框 -->
      <view class="search-box">
        <text class="search-icon">🔍</text>
        <input 
          type="text" 
          placeholder="搜索您遇到的问题..." 
          placeholder-class="search-placeholder"
          v-model="searchKeyword"
        />
      </view>

      <!-- 快捷入口 -->
      <view class="quick-actions">
        <view class="quick-card" @tap="goToFeedback">
          <text class="quick-icon">✏️</text>
          <text class="quick-text">我要反馈</text>
        </view>
        <view class="quick-card" @tap="goToRecords">
          <text class="quick-icon">📋</text>
          <text class="quick-text">反馈记录</text>
        </view>
      </view>

      <!-- 常见问题 FAQ -->
      <view class="section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">常见问题 (FAQ)</text>
        </view>

        <!-- 账号与认证 -->
        <view class="faq-group">
          <text class="faq-group-title">账号与认证</text>
          <view class="faq-list">
            <view class="faq-item" @tap="toggleFaq(0)">
              <view class="faq-question">
                <text class="faq-q">如何完成校园认证？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 0 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 0">
                您可以在"个人中心-身份认证"中上传学生证照片或通过校园网账号进行一键认证。审核通常在1个工作日内完成。
              </view>
            </view>
            <view class="faq-item" @tap="toggleFaq(1)">
              <view class="faq-question">
                <text class="faq-q">账号注销后数据会保留吗？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 1 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 1">
                账号注销为不可逆操作。注销后，您的个人信息、碳减排数据及尚未兑换的碳积分将全部清空，无法找回。
              </view>
            </view>
            <view class="faq-item" @tap="toggleFaq(2)">
              <view class="faq-question">
                <text class="faq-q">如何更换绑定手机号？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 2 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 2">
                进入"设置-账号安全-修改手机号"，验证原手机号后即可绑定新号码。若原号码已停用，请联系客服。
              </view>
            </view>
          </view>
        </view>

        <!-- 碳积分与减排 -->
        <view class="faq-group">
          <text class="faq-group-title">碳积分与减排</text>
          <view class="faq-list">
            <view class="faq-item" @tap="toggleFaq(3)">
              <view class="faq-question">
                <text class="faq-q">碳积分怎么获取？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 3 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 3">
                您可以通过校园跑、光盘行动打卡、旧物捐赠、低碳出行等方式获取。每项行为产生的减排量将按照1:100比例转换为积分。
              </view>
            </view>
            <view class="faq-item" @tap="toggleFaq(4)">
              <view class="faq-question">
                <text class="faq-q">积分可以兑换哪些权益？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 4 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 4">
                积分可在积分商城兑换校园超市优惠券、共享单车月卡、图书馆优先预约位及平台专属碳中和数字证书。
              </view>
            </view>
          </view>
        </view>

        <!-- 行为打卡 -->
        <view class="faq-group">
          <text class="faq-group-title">行为打卡</text>
          <view class="faq-list">
            <view class="faq-item" @tap="toggleFaq(5)">
              <view class="faq-question">
                <text class="faq-q">打卡凭证审核需要多久？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 5 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 5">
                AI自动识别的打卡（如光盘行动）为实时审核；人工抽检审核（如旧物捐赠）通常需要2-4小时。
              </view>
            </view>
            <view class="faq-item" @tap="toggleFaq(6)">
              <view class="faq-question">
                <text class="faq-q">校园跑数据怎么同步？</text>
                <text class="faq-arrow" :class="{ expanded: expandedFaq === 6 }">▼</text>
              </view>
              <view class="faq-answer" v-if="expandedFaq === 6">
                请确保授权平台访问您的运动健康数据。每次运动结束后，打开APP即可自动同步。
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 联系我们 -->
      <view class="section">
        <view class="section-header">
          <view class="section-indicator"></view>
          <text class="section-title">联系我们</text>
        </view>
        <view class="contact-card">
          <view class="contact-item">
            <text class="contact-icon">📧</text>
            <view class="contact-info">
              <text class="contact-label">官方客服邮箱</text>
              <text class="contact-value">service@uni-carbon.edu.cn</text>
            </view>
          </view>
          <view class="contact-item">
            <text class="contact-icon">⏰</text>
            <view class="contact-info">
              <text class="contact-label">客服工作时间</text>
              <text class="contact-value">工作日 9:00-17:00</text>
            </view>
          </view>
          <view class="contact-buttons">
            <view class="contact-btn" @tap="showToast('官网地址: green-campus.cn')">
              <text>官网地址</text>
            </view>
            <view class="contact-btn" @tap="showToast('公众号: 绿境校园')">
              <text>官方公众号</text>
            </view>
          </view>
          <view class="complaint-entry" @tap="showToast('投诉与维权')">
            <text class="complaint-text">投诉与维权专属入口</text>
            <text class="complaint-arrow">›</text>
          </view>
        </view>
      </view>

      <!-- 法律合规 -->
      <view class="legal-links">
        <text class="legal-link" @tap="showToast('用户协议')">用户协议</text>
        <text class="legal-link" @tap="showToast('隐私政策')">隐私政策</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const searchKeyword = ref('')
const expandedFaq = ref(null)

function goBack() {
  uni.navigateBack()
}

function goToFeedback() {
  uni.navigateTo({
    url: '/pages/profile/feedback'
  })
}

function goToRecords() {
  uni.navigateTo({
    url: '/pages/profile/records'
  })
}


function toggleFaq(index) {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

function showToast(msg) {
  uni.showToast({ title: msg, icon: 'none' })
}
</script>

<style scoped>
.page-help {
  min-height: 100vh;
  background-color: #f8fafc;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 40rpx;
  background-color: #ffffff;
}

.time {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.status-icons {
  display: flex;
  gap: 12rpx;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
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
  padding: 24rpx 24rpx 60rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 60rpx;
  padding: 20rpx 32rpx;
  margin-bottom: 32rpx;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
  color: #9ca3af;
}

.search-box input {
  flex: 1;
  font-size: 28rpx;
  background: transparent;
}

.search-placeholder {
  color: #9ca3af;
}

.quick-actions {
  display: flex;
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.quick-card {
  flex: 1;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 32rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
}

.quick-card:nth-child(1) .quick-icon {
  color: #10b981;
}

.quick-card:nth-child(2) .quick-icon {
  color: #3b82f6;
}

.quick-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.quick-text {
  font-size: 26rpx;
  font-weight: 600;
  color: #1f2937;
}

.section {
  margin-bottom: 40rpx;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-indicator {
  width: 8rpx;
  height: 32rpx;
  background-color: #10b981;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
}

.faq-group {
  margin-bottom: 32rpx;
}

.faq-group-title {
  font-size: 24rpx;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1rpx;
  margin-bottom: 12rpx;
  margin-left: 8rpx;
}

.faq-list {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
}

.faq-item {
  padding: 28rpx 32rpx;
  border-bottom: 1rpx solid #f3f4f6;
  transition: background-color 0.15s;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item:active {
  background-color: #f9fafb;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-q {
  font-size: 28rpx;
  color: #374151;
}

.faq-arrow {
  font-size: 24rpx;
  color: #9ca3af;
  transition: transform 0.2s;
}

.faq-arrow.expanded {
  transform: rotate(180deg);
}

.faq-answer {
  padding-top: 20rpx;
  font-size: 26rpx;
  color: #6b7280;
  line-height: 1.6;
}

.contact-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 16rpx 0;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f3f4f6;
}

.contact-icon {
  font-size: 40rpx;
  margin-right: 24rpx;
}

.contact-info {
  flex: 1;
}

.contact-label {
  display: block;
  font-size: 22rpx;
  color: #9ca3af;
  margin-bottom: 6rpx;
}

.contact-value {
  font-size: 26rpx;
  font-weight: 500;
  color: #374151;
}

.contact-buttons {
  display: flex;
  gap: 24rpx;
  padding: 24rpx 32rpx;
}

.contact-btn {
  flex: 1;
  padding: 20rpx 0;
  text-align: center;
  background-color: #f3f4f6;
  border-radius: 60rpx;
  font-size: 24rpx;
  color: #4b5563;
  transition: background-color 0.15s;
}

.contact-btn:active {
  background-color: #e5e7eb;
}

.complaint-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  background-color: #fef2f2;
  border-radius: 16rpx;
  margin: 0 32rpx 24rpx;
}

.complaint-text {
  font-size: 24rpx;
  font-weight: 600;
  color: #dc2626;
}

.complaint-arrow {
  font-size: 32rpx;
  color: #fca5a5;
}

.legal-links {
  display: flex;
  justify-content: center;
  gap: 48rpx;
  margin-top: 40rpx;
}

.legal-link {
  font-size: 24rpx;
  color: #9ca3af;
  text-decoration: underline;
  text-decoration-color: #e5e7eb;
}
</style>