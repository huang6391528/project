<template>
  <view class="page-feedback">
    <!-- 状态栏 -->
    <view class="status-bar">
      <text class="time">09:42</text>
      <view class="status-icons">
        <text>📶</text>
        <text>📶</text>
        <text>🔋</text>
      </view>
    </view>

    <!-- 导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="nav-title">意见反馈</text>
      <view class="nav-placeholder"></view>
    </view>

    <scroll-view class="content" scroll-y>
      <!-- 反馈类型 -->
      <view class="section">
        <text class="section-label">反馈类型 <text class="required">*</text></text>
        <view class="type-buttons">
          <view 
            v-for="type in feedbackTypes" 
            :key="type"
            :class="['type-btn', { active: selectedType === type }]"
            @tap="selectType(type)"
          >
            {{ type }}
          </view>
        </view>
      </view>

      <!-- 反馈内容 -->
      <view class="section">
        <text class="section-label">反馈内容 <text class="required">*</text></text>
        <textarea 
          class="content-input"
          v-model="feedbackContent"
          placeholder="请详细描述您遇到的问题或建议，我们将不断改进体验..."
          placeholder-class="placeholder"
          maxlength="500"
        />
        <text class="char-count">{{ feedbackContent.length }}/500</text>
      </view>

      <!-- 图片上传 -->
      <view class="section">
        <text class="section-label">上传图片 (最多3张)</text>
        <view class="image-upload">
          <view 
            v-for="(img, index) in uploadedImages" 
            :key="index"
            class="image-item"
          >
            <image :src="img" mode="aspectFill" class="uploaded-img"></image>
            <view class="delete-btn" @tap="deleteImage(index)">✕</view>
          </view>
          <view 
            v-if="uploadedImages.length < 3"
            class="upload-btn"
            @tap="chooseImage"
          >
            <text class="upload-icon">📷</text>
            <text class="upload-text">添加图片</text>
          </view>
        </view>
        <text class="upload-tip">支持 JPG, PNG 格式，图片大小不超过 5MB</text>
      </view>

      <!-- 联系方式 -->
      <view class="section">
        <text class="section-label">联系方式</text>
        <input 
          class="contact-input"
          v-model="contact"
          placeholder="手机号或邮箱，方便我们与您联系（选填）"
          placeholder-class="placeholder"
          type="text"
        />
      </view>

      <!-- 提交按钮 -->
      <view class="submit-btn" @tap="submitFeedback">
        <text>提交反馈</text>
      </view>
    </scroll-view>

    <!-- 提交成功弹窗 -->
    <view class="modal-overlay" v-if="successModalVisible" @tap="closeModal">
      <view class="modal-card" @tap.stop>
        <view class="modal-icon">✓</view>
        <text class="modal-title">提交成功</text>
        <text class="modal-desc">感谢您的反馈！我们将在 1-3 个工作日内处理，请留意"反馈记录"中的更新状态。</text>
        <view class="modal-btn" @tap="goToHome">返回首页</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const feedbackTypes = ['功能建议', 'BUG反馈', '其他问题']
const selectedType = ref('功能建议')
const feedbackContent = ref('')
const contact = ref('')
const uploadedImages = ref([])
const successModalVisible = ref(false)

function goBack() {
  uni.navigateBack()
}

function selectType(type) {
  selectedType.value = type
}

function chooseImage() {
  uni.chooseImage({
    count: 3 - uploadedImages.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      uploadedImages.value = [...uploadedImages.value, ...res.tempFilePaths]
    }
  })
}

function deleteImage(index) {
  uploadedImages.value.splice(index, 1)
}

function submitFeedback() {
  if (!feedbackContent.value.trim()) {
    uni.showToast({ title: '请填写反馈内容', icon: 'none' })
    return
  }
  successModalVisible.value = true
}

function closeModal() {
  successModalVisible.value = false
}

function goToHome() {
  successModalVisible.value = false
  uni.switchTab({
    url: '/pages/index/index'
  })
}
</script>

<style scoped>
.page-feedback {
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
  padding: 32rpx;
  height: calc(100vh - 200rpx);
}

.section {
  margin-bottom: 48rpx;
}

.section-label {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24rpx;
  display: block;
}

.required {
  color: #ef4444;
  font-weight: 400;
}

.type-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.type-btn {
  padding: 16rpx 32rpx;
  border: 1rpx solid #e5e7eb;
  border-radius: 60rpx;
  font-size: 26rpx;
  color: #6b7280;
  background-color: #ffffff;
  transition: all 0.15s;
}

.type-btn.active {
  background-color: #10b981;
  color: #ffffff;
  border-color: #10b981;
}

.content-input {
  width: 100%;
  height: 240rpx;
  background-color: #f9fafb;
  border: 1rpx solid #f3f4f6;
  border-radius: 24rpx;
  padding: 24rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.placeholder {
  color: #d1d5db;
}

.char-count {
  display: block;
  text-align: right;
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 12rpx;
}

.image-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  border-radius: 24rpx;
  overflow: hidden;
}

.uploaded-img {
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 24rpx;
}

.upload-btn {
  width: 160rpx;
  height: 160rpx;
  background-color: #f9fafb;
  border: 2rpx dashed #e5e7eb;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.upload-icon {
  font-size: 48rpx;
  color: #d1d5db;
}

.upload-text {
  font-size: 20rpx;
  color: #9ca3af;
}

.upload-tip {
  display: block;
  font-size: 22rpx;
  color: #9ca3af;
  margin-top: 16rpx;
}

.contact-input {
  width: 100%;
  background-color: #f9fafb;
  border: 1rpx solid #f3f4f6;
  border-radius: 24rpx;
  padding: 24rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #10b981;
  padding: 28rpx;
  border-radius: 32rpx;
  text-align: center;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 700;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.3);
  margin-top: 32rpx;
  margin-bottom: 60rpx;
  transition: transform 0.1s;
}

.submit-btn:active {
  transform: scale(0.98);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4rpx);
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
  padding: 64rpx 32rpx 40rpx;
  text-align: center;
}

.modal-icon {
  width: 120rpx;
  height: 120rpx;
  background-color: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40rpx;
  font-size: 64rpx;
  color: #10b981;
}

.modal-title {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16rpx;
}

.modal-desc {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 48rpx;
}

.modal-btn {
  background-color: #1f2937;
  color: #ffffff;
  padding: 28rpx;
  border-radius: 32rpx;
  font-size: 32rpx;
  font-weight: 700;
}
</style>