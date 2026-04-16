<template>
  <view class="page-low-carbon">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="sport-back-btn" @tap="goBack">
        <text class="iconfont icon-chevron-left"></text>
      </view>
      <text class="lc-logo">Life<text class="lc-logo-accent">Eco</text></text>
      <text class="lc-date">2026.04.11</text>
    </view>

    <view class="page-content">
      <!-- 低碳等级卡片 -->
      <view class="lc-asset-card life-asset">
        <view class="asset-inner">
          <view class="asset-left">
            <text class="asset-label">学习生活低碳等级</text>
            <text class="asset-value">LV.5</text>
            <text class="life-recycle-tag">已回收旧物约 24.5kg</text>
          </view>
        </view>
      </view>

      <!-- 子功能页签 -->
      <view class="life-tabs">
        <view
          class="life-tab"
          :class="activeTab === 'home' ? 'life-tab-active' : 'life-tab-inactive'"
          @tap="switchTab('home')"
        >推荐</view>
        <text class="life-tab-divider">|</text>
        <view
          class="life-tab"
          :class="activeTab === 'dorm' ? 'life-tab-active' : 'life-tab-inactive'"
          @tap="switchTab('dorm')"
        >宿舍节能</view>
        <text class="life-tab-divider">|</text>
        <view
          class="life-tab"
          :class="activeTab === 'study' ? 'life-tab-active' : 'life-tab-inactive'"
          @tap="switchTab('study')"
        >低碳学习</view>
      </view>

      <!-- 推荐 Tab 内容 -->
      <view v-if="activeTab === 'home'">
        <view class="life-grid">
          <view class="life-card">
            <text class="iconfont icon-gift life-card-icon indigo"></text>
            <text class="life-card-name">旧物捐赠</text>
            <text class="life-card-desc">旧书/衣/家电上传</text>
            <button class="life-card-btn">去捐赠</button>
          </view>
          <view class="life-card">
            <text class="iconfont icon-shopping-bag life-card-icon emerald"></text>
            <text class="life-card-name">环保购物</text>
            <text class="life-card-desc">自带布袋/无包装</text>
            <button class="life-card-btn green-btn">打卡</button>
          </view>
          <view class="life-card">
            <text class="iconfont icon-flower life-card-icon green"></text>
            <text class="life-card-name">绿植养护</text>
            <text class="life-card-desc">碳吸附实时记录</text>
            <button class="life-card-btn green-btn">记录</button>
          </view>
          <view class="life-card">
            <text class="iconfont icon-book life-card-icon blue"></text>
            <text class="life-card-name">低碳学习</text>
            <text class="life-card-desc">无纸化/二手教材</text>
            <button class="life-card-btn blue-btn-sm">上传</button>
          </view>
          <view class="life-card life-card-dark">
            <view class="dark-inner">
              <text class="dark-title">宿舍节能看板</text>
              <view class="dark-tags">
                <view class="dark-tag">
                  <text class="iconfont icon-temp"></text>
                  <text class="dark-tag-text">空调温控自律</text>
                </view>
                <view class="dark-tag">
                  <text class="iconfont icon-night"></text>
                  <text class="dark-tag-text">熄灯打卡</text>
                </view>
              </view>
            </view>
            <button class="dark-btn">节能打卡</button>
          </view>
          <view class="life-card life-card-wide">
            <view class="wide-icon-wrap">
              <text class="iconfont icon-no-plastic"></text>
            </view>
            <view class="wide-info">
              <text class="life-card-name">无塑日常</text>
              <text class="life-card-desc">拒绝一次性吸管、水杯记录</text>
            </view>
            <view class="wide-check"></view>
          </view>
        </view>
      </view>

      <!-- 宿舍节能 Tab 内容 -->
      <view v-if="activeTab === 'dorm'">
        <view class="dorm-room-card">
          <view class="room-info">
            <text class="room-label">我的寝室</text>
            <text class="room-name">C 栋 502</text>
          </view>
          <view class="room-rank">
            <text class="iconfont icon-leaf rank-icon"></text>
            <text class="rank-text">领先 92% 寝室</text>
          </view>
        </view>
        <view class="dorm-ac-card">
          <view class="ac-top">
            <view class="ac-left">
              <view class="ac-icon-wrap"><text class="iconfont icon-ac"></text></view>
              <text class="ac-label">空调温控</text>
            </view>
          </view>
          <view class="ac-dial-wrap">
            <view class="ac-dial">
              <text class="ac-temp-num">26</text>
              <text class="ac-temp-unit">°C</text>
              <text class="ac-temp-sub">当前节能温度</text>
            </view>
          </view>
          <view class="ac-hint">
            <text class="iconfont icon-info ac-hint-icon"></text>
            <text class="ac-hint-text">已保持节能运行 4.5 小时，预计减碳 120g</text>
          </view>
        </view>
        <text class="dorm-section-title">每日节能打卡</text>
        <view class="dorm-checkin-card">
          <view class="checkin-left">
            <view class="checkin-icon-wrap yellow"><text class="iconfont icon-lightbulb"></text></view>
            <view class="checkin-info">
              <text class="checkin-title">离开寝室关灯</text>
              <text class="checkin-desc">杜绝长明灯，从我做起</text>
            </view>
          </view>
          <button class="checkin-btn-active">打卡</button>
        </view>
        <view class="dorm-checkin-card done">
          <view class="checkin-left">
            <view class="checkin-icon-wrap blue"><text class="iconfont icon-water"></text></view>
            <view class="checkin-info">
              <text class="checkin-title">洗漱关水龙头</text>
              <text class="checkin-desc">已完成 1/1 次打卡</text>
            </view>
          </view>
          <view class="checkin-btn-done">已达成</view>
        </view>
        <view class="dorm-checkin-card">
          <view class="checkin-left">
            <view class="checkin-icon-wrap rose"><text class="iconfont icon-power-off"></text></view>
            <view class="checkin-info">
              <text class="checkin-title">拔掉闲置充电器</text>
              <text class="checkin-desc">减少隐性电耗</text>
            </view>
          </view>
          <button class="checkin-btn-active">打卡</button>
        </view>
      </view>

      <!-- 低碳学习 Tab 内容 -->
      <view v-if="activeTab === 'study'">
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
        <view class="study-grid">
          <view class="study-grid-card">
            <view class="study-grid-icon green"><text class="iconfont icon-tablet"></text></view>
            <text class="study-grid-name">无纸化笔记</text>
            <text class="study-grid-desc">使用平板/电脑记录</text>
          </view>
          <view class="study-grid-card">
            <view class="study-grid-icon blue"><text class="iconfont icon-recycle"></text></view>
            <text class="study-grid-name">草稿纸回收</text>
            <text class="study-grid-desc">废旧纸张定点回收</text>
          </view>
          <view class="study-grid-card">
            <view class="study-grid-icon purple"><text class="iconfont icon-share"></text></view>
            <text class="study-grid-name">电子共享</text>
            <text class="study-grid-desc">云端传资料免打印</text>
          </view>
          <view class="study-grid-card">
            <view class="study-grid-icon amber"><text class="iconfont icon-book-refresh"></text></view>
            <text class="study-grid-name">二手教材</text>
            <text class="study-grid-desc">学长学姐课本转借</text>
          </view>
        </view>
        <view class="study-section-header">
          <text class="study-section-title">二手教材市场</text>
          <view class="study-tag-group">
            <text class="study-tag-active">求购</text>
            <text class="study-tag">转让</text>
          </view>
        </view>
        <view class="study-book-card">
          <image class="book-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg" mode="aspectFill"></image>
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
        <view class="study-book-card">
          <image class="book-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg" mode="aspectFill"></image>
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
      </view>

    </view>

    <!-- 底部 Tab 导航 -->
    <view class="lc-bottom-nav">
      <view class="lc-nav-item" @tap="switchTab('sport')">
        <text class="iconfont icon-run"></text>
        <text class="nav-text">运动</text>
      </view>
      <view class="lc-nav-item" @tap="switchTab('travel')">
        <text class="iconfont icon-bus"></text>
        <text class="nav-text">出行</text>
      </view>
      <view class="lc-nav-item" @tap="switchTab('diet')">
        <text class="iconfont icon-meal"></text>
        <text class="nav-text">饮食</text>
      </view>
      <view class="lc-nav-item active">
        <text class="iconfont icon-home"></text>
        <text class="nav-text">生活</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('home')
const goBack = () => uni.switchTab({ url: '/pages/action/action' })
const switchTab = (tab) => {
  activeTab.value = tab
}
</script>

<style scoped>
@import url('../../static/iconfont.css');

.page-low-carbon { background-color: #fafafa; min-height: 100vh; }

.lc-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 80rpx 24rpx 24rpx 16rpx; background: #fff; gap: 16rpx;
}
.sport-back-btn {
  width: 64rpx; height: 64rpx; border-radius: 16rpx; background: #f3f4f6;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sport-back-btn .iconfont { font-size: 34rpx; color: #1f2937; }
.lc-logo { font-size: 40rpx; font-weight: 900; color: #1f2937; }
.lc-logo-accent { color: #8b5cf6; }
.lc-date { font-size: 20rpx; color: #9ca3af; font-weight: bold; }

.page-content { padding: 0 24rpx 200rpx; }

.lc-asset-card {
  border-radius: 32rpx; padding: 40rpx; color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1); margin-bottom: 24rpx;
}
.life-asset { background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%); }
.asset-left { display: flex; flex-direction: column; }
.asset-label { font-size: 20rpx; opacity: 0.7; }
.asset-value { font-size: 60rpx; font-weight: 900; margin-top: 4rpx; line-height: 1; }
.life-recycle-tag {
  display: inline-block; margin-top: 16rpx; background: rgba(255,255,255,0.2);
  padding: 6rpx 16rpx; border-radius: 16rpx; font-size: 20rpx;
}

/* Tab bar */
.life-tabs {
  display: flex; flex-direction: row; align-items: center;
  justify-content: center; margin-bottom: 24rpx;
  background: #fff; border-radius: 50rpx; padding: 8rpx 16rpx;
  border: 1rpx solid #f0f0f0;
}
.life-tab {
  flex: 1; text-align: center; font-size: 26rpx; font-weight: bold;
  padding: 12rpx 0; border-radius: 40rpx; color: #9ca3af;
}
.life-tab-active { color: #7c3aed; }
.life-tab-inactive { color: #9ca3af; }
.life-tab-divider { color: #e5e7eb; font-size: 28rpx; flex-shrink: 0; }

/* Home grid */
.life-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12rpx; }
.life-card {
  background: #fff; border-radius: 24rpx; padding: 24rpx;
  border: 1rpx solid #f0f0f0; display: flex; flex-direction: column;
}
.life-card-icon { font-size: 48rpx; margin-bottom: 12rpx; }
.life-card-icon.indigo { color: #4f46e5; }
.life-card-icon.emerald { color: #059669; }
.life-card-icon.green { color: #22c55e; }
.life-card-icon.blue { color: #3b82f6; }
.life-card-name { font-size: 24rpx; font-weight: bold; color: #1f2937; margin-bottom: 4rpx; }
.life-card-desc { font-size: 18rpx; color: #9ca3af; margin-bottom: 16rpx; }
.life-card-btn {
  width: 100%; border: 2rpx solid #e0e7ff; color: #4f46e5;
  font-size: 18rpx; font-weight: bold; padding: 12rpx; border-radius: 12rpx;
  background: none; margin-top: auto;
}
.green-btn { border-color: #d1fae5; color: #059669; }
.blue-btn-sm { border-color: #dbeafe; color: #3b82f6; }
.life-card-dark {
  background: #1f2937; color: #fff; flex-direction: row;
  align-items: center; justify-content: space-between; grid-column: span 2;
}
.dark-inner { flex: 1; }
.dark-title { display: block; font-size: 28rpx; font-weight: bold; margin-bottom: 12rpx; }
.dark-tags { display: flex; gap: 24rpx; }
.dark-tag { display: flex; align-items: center; gap: 6rpx; }
.dark-tag .iconfont { font-size: 24rpx; color: #60a5fa; }
.dark-tag-text { font-size: 20rpx; color: #d1d5db; }
.dark-btn {
  background: #7c3aed; color: #fff; font-size: 18rpx; font-weight: bold;
  padding: 12rpx 24rpx; border-radius: 16rpx; border: none; flex-shrink: 0;
}
.life-card-wide {
  flex-direction: row; align-items: center;
  justify-content: space-between; grid-column: span 2;
}
.wide-icon-wrap {
  width: 80rpx; height: 80rpx; background: #f3f4f6; border-radius: 20rpx;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.wide-icon-wrap .iconfont { font-size: 36rpx; color: #9ca3af; }
.wide-info { flex: 1; margin-left: 16rpx; }
.wide-check { width: 40rpx; height: 40rpx; border-radius: 50%; border: 4rpx solid #8b5cf6; flex-shrink: 0; }

/* Dorm tab */
.dorm-room-card {
  background: #fff; border-radius: 32rpx; padding: 32rpx; margin-bottom: 16rpx;
  display: flex; justify-content: space-between; align-items: flex-end;
}
.room-label { display: block; font-size: 24rpx; color: #94a3b8; margin-bottom: 8rpx; }
.room-name { display: block; font-size: 48rpx; font-weight: 900; color: #1f2937; }
.room-rank { display: flex; align-items: center; gap: 6rpx; }
.rank-icon { font-size: 28rpx; color: #22c55e; }
.rank-text { font-size: 24rpx; font-weight: 700; color: #22c55e; }
.dorm-ac-card {
  background: #eff6ff; border-radius: 32rpx; padding: 32rpx; margin-bottom: 16rpx;
}
.ac-top { display: flex; align-items: center; margin-bottom: 32rpx; }
.ac-left { display: flex; align-items: center; gap: 16rpx; }
.ac-icon-wrap {
  width: 64rpx; height: 64rpx; background: #3b82f6; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.ac-icon-wrap .iconfont { font-size: 32rpx; color: #fff; }
.ac-label { font-size: 28rpx; font-weight: 700; color: #374151; }
.ac-dial-wrap { display: flex; justify-content: center; margin-bottom: 24rpx; }
.ac-dial {
  width: 200rpx; height: 200rpx; border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #f59e0b);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.ac-temp-num { font-size: 72rpx; font-weight: 900; color: #1d4ed8; }
.ac-temp-unit { font-size: 28rpx; color: #1d4ed8; }
.ac-temp-sub { font-size: 20rpx; color: #93c5fd; }
.ac-hint {
  background: rgba(59,130,246,0.1); border-radius: 24rpx; padding: 20rpx 24rpx;
  display: flex; align-items: center; gap: 12rpx;
}
.ac-hint-icon { font-size: 28rpx; color: #3b82f6; }
.ac-hint-text { font-size: 20rpx; color: #1e40af; }
.dorm-section-title { display: block; margin: 16rpx 0; font-size: 28rpx; font-weight: 700; color: #1f2937; }
.dorm-checkin-card {
  background: #fff; border-radius: 24rpx; padding: 24rpx; margin-bottom: 12rpx;
  display: flex; align-items: center; justify-content: space-between; border: 1rpx solid #f9fafb;
}
.dorm-checkin-card.done { opacity: 0.6; }
.checkin-left { display: flex; align-items: center; gap: 20rpx; }
.checkin-icon-wrap {
  width: 80rpx; height: 80rpx; border-radius: 16rpx;
  display: flex; align-items: center; justify-content: center;
}
.checkin-icon-wrap .iconfont { font-size: 36rpx; }
.checkin-icon-wrap.yellow { background: #fefce8; }
.checkin-icon-wrap.yellow .iconfont { color: #eab308; }
.checkin-icon-wrap.blue { background: #eff6ff; }
.checkin-icon-wrap.blue .iconfont { color: #3b82f6; }
.checkin-icon-wrap.rose { background: #fff1f2; }
.checkin-icon-wrap.rose .iconfont { color: #f43f5e; }
.checkin-info { display: flex; flex-direction: column; gap: 4rpx; }
.checkin-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.checkin-desc { font-size: 20rpx; color: #9ca3af; }
.checkin-btn-active {
  background: #22c55e; color: #fff; font-size: 22rpx; font-weight: 700;
  padding: 12rpx 28rpx; border-radius: 50rpx; border: none;
}
.checkin-btn-done {
  background: #f3f4f6; color: #9ca3af; font-size: 22rpx; font-weight: 700;
  padding: 12rpx 28rpx; border-radius: 50rpx;
}

/* Study tab */
.study-achievement-card {
  background: linear-gradient(135deg, #fb923c, #f97316); border-radius: 32rpx;
  padding: 32rpx; color: #fff; margin-bottom: 16rpx;
}
.achievement-header { display: flex; align-items: center; gap: 12rpx; margin-bottom: 16rpx; }
.achievement-icon { font-size: 32rpx; }
.achievement-label { font-size: 26rpx; font-weight: 500; opacity: 0.9; }
.achievement-num { display: flex; align-items: baseline; gap: 12rpx; margin-bottom: 16rpx; }
.achievement-big { font-size: 80rpx; font-weight: 900; }
.achievement-unit { font-size: 26rpx; opacity: 0.9; }
.achievement-sub { font-size: 22rpx; opacity: 0.75; }
.study-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16rpx; margin-bottom: 24rpx;
}
.study-grid-card {
  background: #f9fafb; border-radius: 24rpx; padding: 28rpx;
  display: flex; flex-direction: column; align-items: center; border: 1rpx solid #f3f4f6;
}
.study-grid-icon {
  width: 80rpx; height: 80rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin-bottom: 12rpx;
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
.study-grid-name { font-size: 26rpx; font-weight: 700; color: #374151; margin-bottom: 4rpx; }
.study-grid-desc { font-size: 18rpx; color: #9ca3af; }
.study-section-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;
}
.study-section-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.study-tag-group { display: flex; gap: 8rpx; }
.study-tag-active {
  background: #22c55e; color: #fff; font-size: 20rpx; font-weight: 700;
  padding: 6rpx 16rpx; border-radius: 50rpx;
}
.study-tag {
  background: #f3f4f6; color: #9ca3af; font-size: 20rpx; font-weight: 700;
  padding: 6rpx 16rpx; border-radius: 50rpx;
}
.study-book-card {
  display: flex; gap: 16rpx; background: #f9fafb;
  border-radius: 24rpx; padding: 16rpx; margin-bottom: 12rpx;
}
.book-cover { width: 120rpx; height: 144rpx; border-radius: 16rpx; flex-shrink: 0; }
.book-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.book-top { display: flex; flex-direction: column; gap: 6rpx; }
.book-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.book-meta { font-size: 20rpx; color: #9ca3af; }
.book-bottom { display: flex; justify-content: space-between; align-items: center; }
.book-price { font-size: 26rpx; font-weight: 700; color: #16a34a; }
.book-price.orange { color: #ea580c; }
.book-btn {
  background: #1f2937; color: #fff; font-size: 20rpx; font-weight: 700;
  padding: 8rpx 24rpx; border-radius: 50rpx; border: none; line-height: 1.8;
}

/* Bottom nav */
.lc-bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0; height: 160rpx;
  background: rgba(255,255,255,0.92); backdrop-filter: blur(20px);
  border-top: 1rpx solid #f0f0f0; display: flex; justify-content: space-around;
  align-items: flex-start; padding-top: 20rpx;
  padding-bottom: env(safe-area-inset-bottom); z-index: 100;
}
.lc-nav-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 4rpx; color: #94a3b8; padding: 0 16rpx;
}
.lc-nav-item .iconfont { font-size: 48rpx; }
.nav-text { font-size: 20rpx; font-weight: bold; }
.lc-nav-item.active { color: #7c3aed; transform: translateY(-6rpx); }
</style>
