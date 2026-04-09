<template>
  <view class="page-class-list">
    <view class="page-header">
      <text class="page-title">{{ pageTitle }}</text>
    </view>
    <view class="content-section">
      <text class="content-label">类型</text>
      <text class="content-value">{{ classType }}</text>
    </view>
    <view class="empty-state">
      <text class="empty-icon">🎓</text>
      <text class="empty-text">暂无班级数据</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const pageTitle = ref('班级列表')
const classType = ref('')

onLoad((options) => {
  if (options.type === 'major') {
    classType.value = '专业班级'
    pageTitle.value = '专业班级'
  } else if (options.type === 'course') {
    classType.value = '课程班级'
    pageTitle.value = '课程班级'
  } else {
    classType.value = options.type || '未知'
  }
})
</script>

<style scoped>
.page-class-list {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}
.page-header {
  padding: 60rpx 30rpx 30rpx;
  background-color: #fff;
}
.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}
.content-section {
  margin: 20rpx 30rpx;
  padding: 24rpx;
  background-color: #fff;
  border-radius: 24rpx;
}
.content-label {
  font-size: 24rpx;
  color: #999;
  margin-right: 12rpx;
}
.content-value {
  font-size: 28rpx;
  color: #333;
}
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}
.empty-icon {
  font-size: 96rpx;
  margin-bottom: 24rpx;
}
.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
