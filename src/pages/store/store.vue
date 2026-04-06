<template>
  <view class="page-store">
    <!-- Points Header -->
    <view class="points-header">
      <view class="points-info">
        <text class="points-label">可用积分</text>
        <text class="points-value">2,480</text>
      </view>
      <view class="rules-btn">
        <text class="iconfont icon-help"></text>
        <text class="rules-text">积分规则</text>
      </view>
    </view>

    <!-- Categories -->
    <view class="category-bar">
      <view class="category-item cat-active">全部</view>
      <view class="category-item">限时抢购</view>
      <view class="category-item">虚拟权益</view>
      <view class="category-item">校园服务</view>
      <view class="category-item">环保好物</view>
    </view>

    <!-- Content -->
    <view class="content">
      <!-- Hot Banner -->
      <view class="hot-banner">
        <image class="banner-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-05/ca4e172a941f4e3d89987c7cab0aef77.jpg" mode="aspectFill"></image>
        <view class="banner-overlay">
          <view class="hot-tag">HOT</view>
          <text class="banner-title">定制环保帆布包</text>
          <text class="banner-desc">限时 8.5 折抢兑</text>
        </view>
      </view>

      <!-- Time-Limited Section -->
      <view class="flash-sale">
        <view class="flash-header">
          <view class="flash-title">
            <text class="iconfont icon-clock"></text>
            <text class="flash-text">限时秒杀</text>
          </view>
          <view class="countdown">
            <text class="countdown-num">04</text>
            <text class="countdown-sep">:</text>
            <text class="countdown-num">12</text>
            <text class="countdown-sep">:</text>
            <text class="countdown-num">45</text>
          </view>
        </view>
        <scroll-view class="flash-scroll" scroll-x="true">
          <view class="flash-list">
            <view class="flash-item">
              <image class="flash-img" src="/static/placeholder.png" mode="aspectFill"></image>
              <text class="flash-name">食堂5元抵用券</text>
              <text class="flash-price">200 <text class="price-unit">积分</text></text>
            </view>
            <view class="flash-item">
              <image class="flash-img" src="/static/placeholder.png" mode="aspectFill"></image>
              <text class="flash-name">图书馆咖啡券</text>
              <text class="flash-price">450 <text class="price-unit">积分</text></text>
            </view>
            <view class="flash-item">
              <image class="flash-img" src="/static/placeholder.png" mode="aspectFill"></image>
              <text class="flash-name">校园网包月包</text>
              <text class="flash-price">1200 <text class="price-unit">积分</text></text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- Campus Section -->
      <text class="section-title">校园专区</text>
      <view class="product-grid">
        <view class="product-card">
          <image class="product-img" src="/static/placeholder.png" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-name">教学楼空调使用券</text>
            <view class="product-bottom">
              <text class="product-price">300</text>
              <view class="exchange-btn">兑换</view>
            </view>
          </view>
        </view>
        <view class="product-card">
          <image class="product-img" src="/static/placeholder.png" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-name">免费打印10页券</text>
            <view class="product-bottom">
              <text class="product-price">150</text>
              <view class="exchange-btn">兑换</view>
            </view>
          </view>
        </view>
        <view class="product-card">
          <image class="product-img" src="/static/placeholder.png" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-name">校园共享电单车</text>
            <view class="product-bottom">
              <text class="product-price">500</text>
              <view class="exchange-btn">兑换</view>
            </view>
          </view>
        </view>
      </view>

      <!-- Carbon Offset Certificate -->
      <view class="certificate-card">
        <text class="iconfont icon-certificate"></text>
        <text class="cert-title">碳汇交易证书</text>
        <text class="cert-desc">认养真实树木</text>
        <view class="cert-btn">查看详情</view>
      </view>

      <!-- Footer Record Link -->
      <view class="record-link">
        <text class="iconfont icon-receipt"></text>
        <text class="record-text">查看我的兑换记录</text>
      </view>
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
.page-store {
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* Points Header */
.points-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32rpx 30rpx 24rpx;
}

.points-label {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
}

.points-value {
  display: block;
  font-size: 72rpx;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.2;
}

.rules-btn {
  display: flex;
  align-items: center;
  background-color: #f3f4f6;
  padding: 12rpx 24rpx;
  border-radius: 50rpx;
  margin-top: 16rpx;
}

.rules-text {
  font-size: 20rpx;
  color: #6b7280;
  margin-left: 8rpx;
}

/* Category Bar */
.category-bar {
  display: flex;
  gap: 48rpx;
  padding: 0 30rpx 24rpx;
  border-bottom: 2rpx solid #f3f4f6;
  overflow-x: auto;
}

.category-item {
  padding-bottom: 16rpx;
  font-size: 28rpx;
  color: #9ca3af;
  font-weight: 500;
  white-space: nowrap;
  border-bottom: 4rpx solid transparent;
}

.cat-active {
  color: #059669;
  font-weight: bold;
  border-bottom-color: #10b981;
}

/* Content */
.content {
  padding: 0 30rpx;
}

/* Hot Banner */
.hot-banner {
  position: relative;
  width: 100%;
  height: 256rpx;
  border-radius: 32rpx;
  overflow: hidden;
  margin-top: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}

.banner-img {
  width: 100%;
  height: 100%;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.6), transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 32rpx;
}

.hot-tag {
  background-color: #fbbf24;
  color: #065f46;
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  width: fit-content;
  margin-bottom: 12rpx;
}

.banner-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.banner-desc {
  display: block;
  font-size: 24rpx;
  color: rgba(255,255,255,0.9);
  margin-top: 8rpx;
}

/* Flash Sale */
.flash-sale {
  background-color: #fef2f2;
  border-radius: 32rpx;
  padding: 32rpx;
  margin-top: 32rpx;
}

.flash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.flash-title {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.flash-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #991b1b;
}

.countdown {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.countdown-num {
  background-color: #ef4444;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;
}

.countdown-sep {
  color: #ef4444;
  font-weight: bold;
  margin: 0 4rpx;
}

.flash-scroll {
  white-space: nowrap;
}

.flash-list {
  display: flex;
  gap: 24rpx;
}

.flash-item {
  min-width: 200rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.flash-img {
  width: 100%;
  height: 160rpx;
  border-radius: 16rpx;
  background-color: #f3f4f6;
}

.flash-name {
  display: block;
  font-size: 22rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flash-price {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #ef4444;
  margin-top: 8rpx;
}

.price-unit {
  font-size: 16rpx;
}

/* Section Title */
.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 48rpx;
  margin-bottom: 24rpx;
  padding-left: 8rpx;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.product-card {
  background-color: #fff;
  border-radius: 32rpx;
  overflow: hidden;
  border: 2rpx solid #f9fafb;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.product-img {
  width: 100%;
  height: 200rpx;
  background-color: #f3f4f6;
}

.product-info {
  padding: 24rpx;
}

.product-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
}

.product-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #059669;
}

.exchange-btn {
  background-color: #10b981;
  color: #fff;
  font-size: 22rpx;
  font-weight: bold;
  padding: 8rpx 24rpx;
  border-radius: 50rpx;
  box-shadow: 0 4rpx 8rpx rgba(16, 185, 129, 0.2);
}

.exchange-btn:active {
  transform: scale(0.95);
}

/* Certificate Card */
.certificate-card {
  background-color: #ecfdf5;
  border-radius: 32rpx;
  padding: 48rpx 32rpx;
  margin-top: 48rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2rpx solid #a7f3d0;
}

.certificate-card text:nth-child(1) {
  font-size: 80rpx;
  color: #10b981;
}

.cert-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #065f46;
  margin-top: 16rpx;
}

.cert-desc {
  font-size: 22rpx;
  color: #059669;
  margin-top: 8rpx;
}

.cert-btn {
  width: 100%;
  background-color: #059669;
  color: #fff;
  font-size: 22rpx;
  font-weight: bold;
  padding: 16rpx 0;
  border-radius: 16rpx;
  margin-top: 24rpx;
  text-align: center;
}

/* Record Link */
.record-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64rpx;
  padding-bottom: 40rpx;
}

.record-text {
  font-size: 24rpx;
  color: #9ca3af;
}
</style>
