<template>
  <view class="page-action">
    <!-- Header -->
    <view class="page-header">
      <view class="header-left">
        <text class="page-title">行为打卡</text>
        <text class="page-sub">记录你的低碳足迹，赚取积分</text>
      </view>
      <view class="header-right">
        <text class="header-sub-label">今日已减排</text>
        <text class="header-value">1.85 kg</text>
      </view>
    </view>

    <!-- Categories -->
    <scroll-view class="category-scroll" scroll-x="true">
      <view class="category-tags">
        <view class="category-tag tag-active">推荐</view>
        <view class="category-tag">运动</view>
        <view class="category-tag">饮食</view>
        <view class="category-tag">出行</view>
        <view class="category-tag">生活</view>
      </view>
    </scroll-view>

    <!-- Content -->
    <view class="content">
      <!-- AI Recognition Tip -->
      <view class="ai-tip">
        <view class="ai-icon">
          <text class="iconfont icon-camera"></text>
        </view>
        <view class="ai-content">
          <text class="ai-title">AI 视觉识别打卡</text>
          <text class="ai-desc">拍照识别垃圾分类、空盘等</text>
        </view>
        <text class="iconfont icon-chevron-right"></text>
      </view>

      <!-- Promotion Card -->
      <view class="promo-card">
        <view class="promo-icon">
          <text class="iconfont icon-bento"></text>
        </view>
        <view class="promo-content">
          <text class="promo-title">低碳光盘行动</text>
          <text class="promo-desc">今日打卡奖励翻倍</text>
        </view>
        <view class="promo-badge">+100</view>
      </view>

      <!-- Action Grid -->
      <view class="action-grid">
        <view class="action-card">
          <text class="iconfont icon-bicycle"></text>
          <text class="action-title">单车出行</text>
          <text class="action-points">+15 积分/km</text>
        </view>
        <view class="action-card">
          <text class="iconfont icon-cup"></text>
          <text class="action-title">自带水杯</text>
          <text class="action-points">+30 积分/次</text>
        </view>
        <view class="action-card">
          <text class="iconfont icon-shopping"></text>
          <text class="action-title">环保袋购物</text>
          <text class="action-points">+20 积分/次</text>
        </view>
        <view class="action-card card-disabled">
          <text class="iconfont icon-plug"></text>
          <text class="action-title">随手关灯</text>
          <text class="action-points">+5 积分/次</text>
        </view>
      </view>

      <!-- History Timeline -->
      <text class="history-title">打卡历史</text>
      <view class="history-list">
        <view class="history-item">
          <view class="history-dot"></view>
          <view class="history-content">
            <text class="history-text">旧书捐赠记录</text>
            <text class="history-time">2026-04-05 08:30 · 教学楼3楼回收站</text>
            <view class="history-images">
              <image class="history-img" src="/static/placeholder.png" mode="aspectFill"></image>
              <image class="history-img" src="/static/placeholder.png" mode="aspectFill"></image>
            </view>
          </view>
        </view>
        <view class="history-item history-pass">
          <view class="history-dot dot-gray"></view>
          <view class="history-content">
            <text class="history-text">校园跑 3.5km</text>
            <text class="history-time">2026-04-04 19:15 · 操场</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Floating Action Button -->
    <view class="fab">
      <text class="iconfont icon-plus"></text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.page-action {
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 32rpx 30rpx 24rpx;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 44rpx;
  font-weight: 800;
  color: #1f2937;
}

.page-sub {
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

.header-right {
  text-align: right;
}

.header-sub-label {
  display: block;
  font-size: 20rpx;
  color: #d1d5db;
}

.header-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #059669;
}

/* Category Scroll */
.category-scroll {
  padding: 0 30rpx;
  white-space: nowrap;
}

.category-tags {
  display: flex;
  gap: 24rpx;
  padding-bottom: 16rpx;
}

.category-tag {
  padding: 12rpx 32rpx;
  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 50rpx;
  font-size: 28rpx;
  white-space: nowrap;
}

.tag-active {
  background-color: #10b981;
  color: #fff;
  font-weight: 600;
}

/* Content */
.content {
  padding: 0 30rpx;
}

/* AI Tip */
.ai-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #3b82f6, #4f46e5);
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.2);
}

.ai-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
}

.ai-content {
  flex: 1;
  margin-left: 24rpx;
}

.ai-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.ai-desc {
  display: block;
  font-size: 22rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 4rpx;
}

.ai-tip .iconfont:last-child {
  font-size: 40rpx;
  color: #fff;
}

/* Promo Card */
.promo-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff7ed;
  border: 4rpx solid #fed7aa;
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 32rpx;
}

.promo-icon {
  font-size: 80rpx;
}

.promo-content {
  flex: 1;
  margin-left: 24rpx;
}

.promo-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #9a3412;
}

.promo-desc {
  display: block;
  font-size: 22rpx;
  color: #c2410c;
  margin-top: 4rpx;
}

.promo-badge {
  background-color: #fed7aa;
  color: #9a3412;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}

/* Action Grid */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 32rpx;
}

.action-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #fff 100%);
  padding: 32rpx;
  border-radius: 32rpx;
  border: 2rpx solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.action-card text:first-child {
  font-size: 80rpx;
}

.action-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 16rpx;
}

.action-points {
  font-size: 22rpx;
  color: #10b981;
  font-weight: bold;
  margin-top: 8rpx;
}

.card-disabled {
  opacity: 0.6;
}

/* History Section */
.history-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 64rpx;
  margin-bottom: 24rpx;
}

.history-list {
  padding-bottom: 40rpx;
}

.history-item {
  display: flex;
  align-items: flex-start;
  padding-bottom: 32rpx;
}

.history-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #10b981;
  border-radius: 50%;
  margin-top: 8rpx;
  flex-shrink: 0;
  box-shadow: 0 0 0 8rpx rgba(16, 185, 129, 0.1);
}

.dot-gray {
  background-color: #d1d5db;
  box-shadow: 0 0 0 8rpx rgba(209, 213, 219, 0.1);
}

.history-pass {
  opacity: 0.7;
}

.history-content {
  margin-left: 24rpx;
  flex: 1;
}

.history-text {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.history-time {
  display: block;
  font-size: 22rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}

.history-images {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}

.history-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background-color: #f3f4f6;
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 200rpx;
  right: 64rpx;
  width: 112rpx;
  height: 112rpx;
  background-color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56rpx;
  color: #fff;
  box-shadow: 0 16rpx 32rpx rgba(16, 185, 129, 0.4);
  z-index: 100;
}

.fab:active {
  transform: scale(0.9);
  transition: transform 0.1s;
}
</style>
