<template>
  <view class="page-feedback">
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">意见反馈</text>
      <view class="nav-placeholder"></view>
    </view>
    <view class="content">
      <view class="feedback-type-section">
        <text class="section-label">反馈类型</text>
        <view class="type-grid">
          <view
            v-for="item in feedbackTypes"
            :key="item"
            class="type-item"
            :class="{ 'type-active': selectedType === item }"
            @tap="selectedType = item"
          >
            {{ item }}
          </view>
        </view>
      </view>
      <view class="feedback-content-section">
        <text class="section-label">反馈内容</text>
        <textarea
          class="feedback-textarea"
          v-model="feedbackText"
          placeholder="请详细描述您遇到的问题或建议..."
          placeholder-class="textarea-placeholder"
          maxlength="500"
        />
        <text class="char-count">{{ feedbackText.length }}/500</text>
      </view>
      <view class="feedback-contact-section">
        <text class="section-label">联系方式（选填）</text>
        <input
          class="contact-input"
          v-model="contact"
          placeholder="手机号或邮箱"
          placeholder-class="input-placeholder"
        />
      </view>
      <view class="submit-btn" @tap="submitFeedback">
        <text>提交反馈</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const selectedType = ref('功能建议')
const feedbackText = ref('')
const contact = ref('')

const feedbackTypes = ['功能建议', '体验问题', 'Bug 反馈', '其他']

function goBack() {
  uni.navigateBack()
}

function submitFeedback() {
  if (!feedbackText.value.trim()) {
    uni.showToast({ title: '请输入反馈内容', icon: 'none' })
    return
  }
  uni.showToast({ title: '反馈已提交，感谢您的建议', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style scoped>
.page-feedback {
  min-height: 100vh;
  background-color: #f9fafb;
}
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  background-color: #fff;
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
  padding: 32rpx;
}
.section-label {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #374151;
  margin-bottom: 16rpx;
}
.feedback-type-section {
  margin-bottom: 40rpx;
}
.type-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}
.type-item {
  padding: 12rpx 28rpx;
  background-color: #fff;
  border-radius: 60rpx;
  font-size: 26rpx;
  color: #6b7280;
  border: 2rpx solid #e5e7eb;
}
.type-active {
  background-color: #10b981;
  color: #fff;
  border-color: #10b981;
}
.feedback-content-section {
  margin-bottom: 40rpx;
  position: relative;
}
.feedback-textarea {
  width: 100%;
  height: 280rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  font-size: 28rpx;
  color: #1f2937;
  box-sizing: border-box;
  border: 2rpx solid #e5e7eb;
  line-height: 1.6;
}
.textarea-placeholder {
  color: #d1d5db;
}
.char-count {
  display: block;
  text-align: right;
  font-size: 22rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}
.feedback-contact-section {
  margin-bottom: 48rpx;
}
.contact-input {
  width: 100%;
  height: 96rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 0 28rpx;
  font-size: 28rpx;
  color: #1f2937;
  box-sizing: border-box;
  border: 2rpx solid #e5e7eb;
}
.input-placeholder {
  color: #d1d5db;
}
.submit-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  font-size: 32rpx;
  font-weight: 700;
  text-align: center;
  padding: 28rpx 0;
  border-radius: 60rpx;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.35);
}
</style>
