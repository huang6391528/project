<template>
  <view class="page-study">
    <!-- 头部导航 -->
    <view class="study-header">
      <text class="iconfont icon-chevron-left" @tap="goBack"></text>
      <text class="study-title">低碳学习办公</text>
      <view class="study-header-right"></view>
    </view>

    <scroll-view class="study-scroll" scroll-y>
      <!-- 1. 无纸化成就看板 -->
      <view class="study-achievement-card">
        <view class="achievement-header">
          <text class="iconfont icon-file-text achievement-icon"></text>
          <text class="achievement-label">无纸化学习本学期省下</text>
        </view>
        <view class="achievement-num">
          <text class="achievement-big">425</text>
          <text class="achievement-unit">张 A4 纸</text>
        </view>
        <text class="achievement-sub">相当于保护了 0.05 棵成年树木</text>
      </view>

      <!-- 2. 分类打卡入口 -->
      <view class="study-grid">
        <view class="study-grid-card">
          <view class="study-grid-icon green">
            <text class="iconfont icon-tablet"></text>
          </view>
          <text class="study-grid-name">无纸化笔记</text>
          <text class="study-grid-desc">使用平板/电脑记录</text>
        </view>
        <view class="study-grid-card">
          <view class="study-grid-icon blue">
            <text class="iconfont icon-recycle"></text>
          </view>
          <text class="study-grid-name">草稿纸回收</text>
          <text class="study-grid-desc">废旧纸张定点回收</text>
        </view>
        <view class="study-grid-card">
          <view class="study-grid-icon purple">
            <text class="iconfont icon-share"></text>
          </view>
          <text class="study-grid-name">电子共享</text>
          <text class="study-grid-desc">云端传资料免打印</text>
        </view>
        <view class="study-grid-card">
          <view class="study-grid-icon amber">
            <text class="iconfont icon-book-refresh"></text>
          </view>
          <text class="study-grid-name">二手教材</text>
          <text class="study-grid-desc">学长学姐课本转借</text>
        </view>
      </view>

      <!-- 3. 二手教材市场 -->
      <view class="study-section-header">
        <text class="study-section-title">二手教材市场</text>
        <view class="study-tag-group">
          <text class="study-tag-active">求购</text>
          <text class="study-tag">转让</text>
        </view>
      </view>

      <!-- 教材卡片1 -->
      <view class="study-book-card">
        <image
          class="book-cover"
          src="https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg"
          mode="aspectFill"
        ></image>
        <view class="book-info">
          <view class="book-top">
            <text class="book-title">《高等数学（下）》</text>
            <text class="book-meta">发布者：23级张同学 · 9成新</text>
          </view>
          <view class="book-bottom">
            <text class="book-price">免费转借</text>
            <button class="book-btn">联系他</button>
          </view>
        </view>
      </view>

      <!-- 教材卡片2 -->
      <view class="study-book-card">
        <image
          class="book-cover"
          src="https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg"
          mode="aspectFill"
        ></image>
        <view class="book-info">
          <view class="book-top">
            <text class="book-title">《计算机组成原理》</text>
            <text class="book-meta">发布者：王学姐 · 含有精美笔记</text>
          </view>
          <view class="book-bottom">
            <text class="book-price orange">50 碳汇分</text>
            <button class="book-btn">立即兑换</button>
          </view>
        </view>
      </view>

      <!-- 4. 本周热门共享资料 -->
      <view class="study-doc-section">
        <text class="study-section-title">本周热门共享资料</text>
        <view class="study-doc-list">
          <view class="study-doc-item">
            <view class="doc-left">
              <text class="iconfont icon-file-pdf doc-icon-pdf"></text>
              <view class="doc-info">
                <text class="doc-name">大学物理复习大纲.pdf</text>
                <text class="doc-meta">已省下 24 张纸 · 120人下载</text>
              </view>
            </view>
            <text class="iconfont icon-download doc-download"></text>
          </view>
          <view class="study-doc-item">
            <view class="doc-left">
              <text class="iconfont icon-file-word doc-icon-word"></text>
              <view class="doc-info">
                <text class="doc-name">思修期末复习题库.docx</text>
                <text class="doc-meta">已省下 15 张纸 · 88人下载</text>
              </view>
            </view>
            <text class="iconfont icon-download doc-download"></text>
          </view>
        </view>
      </view>

      <view class="study-bottom-spacer"></view>
    </scroll-view>

    <!-- 底部导航 -->
    <view class="study-bottom-nav">
      <view class="study-nav-item">
        <text class="iconfont icon-home"></text>
        <text class="study-nav-text">首页</text>
      </view>
      <view class="study-nav-item">
        <text class="iconfont icon-leaf"></text>
        <text class="study-nav-text">打卡</text>
      </view>
      <view class="study-nav-item">
        <text class="iconfont icon-trophy"></text>
        <text class="study-nav-text">排行</text>
      </view>
      <view class="study-nav-item">
        <text class="iconfont icon-user"></text>
        <text class="study-nav-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const goBack = () => uni.navigateBack()
</script>

<style scoped>
.page-study {
  min-height: 100vh;
  background: #fff;
}

/* 头部 */
.study-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80rpx 30rpx 24rpx 16rpx;
  background: #fff;
}
.study-header .iconfont {
  font-size: 40rpx;
  color: #1f2937;
}
.study-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #1f2937;
  flex: 1;
  text-align: center;
}
.study-header-right {
  width: 40rpx;
}

/* 滚动区域 */
.study-scroll {
  height: calc(100vh - 140rpx);
}

/* 1. 成就卡片 */
.study-achievement-card {
  margin: 24rpx;
  background: linear-gradient(135deg, #fb923c, #f97316);
  border-radius: 32rpx;
  padding: 32rpx;
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(249, 115, 22, 0.2);
}
.achievement-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}
.achievement-icon {
  font-size: 32rpx;
}
.achievement-label {
  font-size: 26rpx;
  font-weight: 500;
  opacity: 0.9;
}
.achievement-num {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
  margin-bottom: 16rpx;
}
.achievement-big {
  font-size: 80rpx;
  font-weight: 900;
}
.achievement-unit {
  font-size: 26rpx;
  opacity: 0.9;
}
.achievement-sub {
  font-size: 22rpx;
  opacity: 0.75;
}

/* 2. 四宫格 */
.study-grid {
  margin: 0 24rpx 24rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}
.study-grid-card {
  background: #f9fafb;
  border-radius: 24rpx;
  padding: 28rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f3f4f6;
}
.study-grid-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}
.study-grid-icon .iconfont { font-size: 36rpx; }
.study-grid-icon.green { background: #f0fdf4; }
.study-grid-icon.green .iconfont { color: #16a34a; }
.study-grid-icon.blue { background: #eff6ff; }
.study-grid-icon.blue .iconfont { color: #2563eb; }
.study-grid-icon.purple { background: #faf5ff; }
.study-grid-icon.purple .iconfont { color: #9333ea; }
.study-grid-icon.amber { background: #fffbeb; }
.study-grid-icon.amber .iconfont { color: #d97706; }
.study-grid-name {
  font-size: 26rpx;
  font-weight: 700;
  color: #374151;
  margin-bottom: 4rpx;
}
.study-grid-desc {
  font-size: 18rpx;
  color: #9ca3af;
}

/* 3. 二手市场标题 */
.study-section-header {
  margin: 0 24rpx 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.study-section-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}
.study-tag-group {
  display: flex;
  gap: 8rpx;
}
.study-tag-active {
  background: #22c55e;
  color: #fff;
  font-size: 20rpx;
  font-weight: 700;
  padding: 6rpx 16rpx;
  border-radius: 50rpx;
}
.study-tag {
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 20rpx;
  font-weight: 700;
  padding: 6rpx 16rpx;
  border-radius: 50rpx;
}

/* 教材卡片 */
.study-book-card {
  margin: 0 24rpx 16rpx;
  display: flex;
  gap: 16rpx;
  background: #f9fafb;
  border-radius: 24rpx;
  padding: 16rpx;
}
.book-cover {
  width: 120rpx;
  height: 144rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
}
.book-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.book-top { display: flex; flex-direction: column; gap: 6rpx; }
.book-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}
.book-meta {
  font-size: 20rpx;
  color: #9ca3af;
}
.book-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.book-price {
  font-size: 26rpx;
  font-weight: 700;
  color: #16a34a;
}
.book-price.orange {
  color: #ea580c;
}
.book-btn {
  background: #1f2937;
  color: #fff;
  font-size: 20rpx;
  font-weight: 700;
  padding: 8rpx 24rpx;
  border-radius: 50rpx;
  border: none;
  line-height: 1.8;
}

/* 4. 共享资料 */
.study-doc-section {
  margin: 32rpx 24rpx 0;
}
.study-doc-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.study-doc-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  border: 1px solid #f3f4f6;
  border-radius: 20rpx;
}
.doc-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.doc-icon-pdf { font-size: 48rpx; color: #ef4444; }
.doc-icon-word { font-size: 48rpx; color: #3b82f6; }
.doc-info { display: flex; flex-direction: column; gap: 4rpx; }
.doc-name {
  font-size: 22rpx;
  font-weight: 700;
  color: #374151;
}
.doc-meta {
  font-size: 18rpx;
  color: #9ca3af;
}
.doc-download {
  font-size: 48rpx;
  color: #d1d5db;
}

.study-bottom-spacer { height: 160rpx; }

/* 底部导航 */
.study-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160rpx;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20rpx);
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: 8rpx;
}
.study-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
  color: #94a3b8;
}
.study-nav-item .iconfont {
  font-size: 44rpx;
}
.study-nav-text {
  font-size: 20rpx;
  font-weight: 500;
}
</style>
