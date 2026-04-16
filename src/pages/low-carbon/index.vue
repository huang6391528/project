<template>
  <view class="page-low-carbon-main">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="sport-back-btn" @tap="goBack">
        <text class="iconfont icon-chevron-left"></text>
      </view>
      <text class="lc-logo">Life<text class="lc-logo-accent">Eco</text></text>
      <text class="lc-date">{{ currentDate }}</text>
    </view>

    <!-- 中级标签页导航 -->
    <view class="lc-tabs-nav">
      <view 
        v-for="tab in tabs" 
        :key="tab.id"
        class="lc-tab-item"
        :class="{ 'lc-tab-active': currentTab === tab.id }"
        @tap="switchModule(tab.id)"
      >
        <text class="tab-label">{{ tab.label }}</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="lc-content-wrapper">
      <!-- 首页（生活）模块 -->
      <view v-if="currentTab === 'index'" class="lc-module">
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
            <view class="life-tab life-tab-active">首页</view>
            <view class="life-tab" @tap="goTab('dorm')">宿舍节能</view>
            <view class="life-tab" @tap="goTab('study')">低碳学习</view>
          </view>

          <!-- 功能网格 -->
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
            <!-- 宿舍节能看板（跨列） -->
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
            <!-- 无塑日常（跨列） -->
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
      </view>

      <!-- 运动模块 -->
      <view v-if="currentTab === 'sport'" class="lc-module">
        <view class="page-content">
          <view class="sport-sync-card">
            <view class="sync-left">
              <view class="sync-dot-wrap">
                <view class="sync-dot"></view>
                <text class="sync-label">STEP SYNC ACTIVE</text>
              </view>
              <text class="sync-value">8,432<span class="sync-unit">/10000</span></text>
              <text class="sync-desc">今日步数已同步 · 产出碳汇 +0.84 kg</text>
            </view>
            <view class="sync-icon-wrap">
              <text class="iconfont icon-footprint"></text>
            </view>
          </view>

          <view class="lc-section">
            <view class="lc-section-header">
              <text class="section-title">运动场景打卡</text>
              <text class="section-hint">滑动查看更多</text>
            </view>
            <view class="sport-grid">
              <view class="sport-card blue-card">
                <view class="sport-icon blue-icon">
                  <text class="iconfont icon-run"></text>
                </view>
                <text class="sport-name">户外跑步</text>
                <text class="sport-desc">每公里产出 +5 积分</text>
              </view>
              <view class="sport-card orange-card">
                <view class="sport-badge-wrap"><text class="sport-badge">专属审核</text></view>
                <view class="sport-icon orange-icon">
                  <text class="iconfont icon-school"></text>
                </view>
                <text class="sport-name">体育课运动</text>
                <text class="sport-desc">积分上浮 20%</text>
              </view>
              <view class="sport-card purple-card">
                <view class="sport-icon purple-icon">
                  <text class="iconfont icon-dumbbell"></text>
                </view>
                <text class="sport-name">健身塑形</text>
                <text class="sport-desc">瑜伽/跳绳/HIIT录入</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 出行模块 -->
      <view v-if="currentTab === 'travel'" class="lc-module">
        <view class="page-content">
          <view class="lc-asset-card travel-asset">
            <view class="asset-inner">
              <view class="asset-left">
                <text class="asset-label">本月出行减碳量</text>
                <text class="asset-value">42.8 kg</text>
              </view>
            </view>
            <text class="travel-rank-tag">里程超越 92% 同学</text>
          </view>

          <view class="lc-section">
            <view class="lc-section-header">
              <text class="section-title">出行打卡选项</text>
              <text class="iconfont icon-info"></text>
            </view>
            <view class="travel-list">
              <view class="travel-item">
                <view class="travel-icon indigo-icon">
                  <text class="iconfont icon-bus"></text>
                </view>
                <view class="travel-info">
                  <text class="travel-name">公交地铁</text>
                  <text class="travel-desc">线路选择 · 乘车次数凭证</text>
                </view>
              </view>
              <view class="travel-item">
                <view class="travel-icon green-icon">
                  <text class="iconfont icon-bike"></text>
                </view>
                <view class="travel-info">
                  <text class="travel-name">共享单车/私车</text>
                  <text class="travel-desc">扫码自动记录公里数</text>
                </view>
              </view>
              <view class="travel-item">
                <view class="travel-icon orange-icon-sm">
                  <text class="iconfont icon-walk"></text>
                </view>
                <view class="travel-info">
                  <text class="travel-name">步行通勤</text>
                  <text class="travel-desc">上下学通勤路径校验</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 饮食模块 -->
      <view v-if="currentTab === 'diet'" class="lc-module">
        <view class="page-content">
          <view class="diet-map-card">
            <view class="diet-map-overlay">
              <view class="diet-map-pin">
                <text class="iconfont icon-location pin-icon"></text>
              </view>
              <view class="diet-map-info">
                <text class="diet-map-name">第一学生食堂</text>
                <text class="diet-map-hint">请确保您在食堂范围内打卡</text>
              </view>
              <button class="diet-map-btn">一键签到</button>
            </view>
          </view>

          <view class="lc-section">
            <view class="lc-section-header">
              <text class="section-title">饮食场景打卡</text>
            </view>
            <view class="diet-list">
              <view class="diet-item">
                <view class="diet-left">
                  <view class="diet-icon orange-icon">
                    <text class="iconfont icon-camera"></text>
                  </view>
                  <view class="diet-info">
                    <text class="diet-name">光盘行动</text>
                    <text class="diet-desc">AI拍照识别识别空盘情况</text>
                  </view>
                </view>
                <button class="diet-btn">AI拍摄</button>
              </view>
              <view class="diet-item">
                <view class="diet-left">
                  <view class="diet-icon green-icon">
                    <text class="iconfont icon-leaf"></text>
                  </view>
                  <view class="diet-info">
                    <text class="diet-name">低碳素食</text>
                    <text class="diet-desc">选择全素餐/本地时令餐</text>
                  </view>
                </view>
                <view class="diet-check"></view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 生活模块 -->
      <view v-if="currentTab === 'life'" class="lc-module">
        <view class="page-content">
          <view class="lc-asset-card life-asset">
            <view class="asset-inner">
              <view class="asset-left">
                <text class="asset-label">学习生活低碳等级</text>
                <text class="asset-value">LV.5</text>
                <text class="life-recycle-tag">已回收旧物约 24.5kg</text>
              </view>
            </view>
          </view>

          <view class="life-tabs">
            <view class="life-tab life-tab-active">首页</view>
            <view class="life-tab" @tap="goTab('dorm')">宿舍节能</view>
            <view class="life-tab" @tap="goTab('study')">低碳学习</view>
          </view>

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
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const currentTab = ref('index')
const tabs = [
  { id: 'index', label: '首页' },
  { id: 'sport', label: '运动' },
  { id: 'travel', label: '出行' },
  { id: 'diet', label: '饮食' },
  { id: 'life', label: '生活' }
]

const currentDate = computed(() => {
  const date = new Date()
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
})

const switchModule = (tabId) => {
  currentTab.value = tabId
}

const goBack = () => uni.switchTab({ url: '/pages/action/action' })

const goTab = (tab) => {
  if (tab === 'dorm') uni.navigateTo({ url: '/pages/low-carbon/dorm-energy' })
  if (tab === 'study') uni.navigateTo({ url: '/pages/low-carbon/low-carbon-study' })
}

// 在页面加载时读取URL参数并切换到对应的标签
onMounted(() => {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    if (currentPage && currentPage.options && currentPage.options.tab) {
      const tabId = currentPage.options.tab
      // 检查这个tab是否存在
      if (tabs.some(t => t.id === tabId)) {
        currentTab.value = tabId
      }
    }
  }
})

import { getCurrentPages } from 'vue'

</script>

<style scoped>
@import url('../../static/iconfont.css');

.page-low-carbon-main {
  background-color: #fafafa;
  min-height: 100vh;
}

.lc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80rpx 24rpx 24rpx 16rpx;
  background: #fff;
  gap: 16rpx;
}

.sport-back-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sport-back-btn .iconfont {
  font-size: 34rpx;
  color: #1f2937;
}

.lc-logo {
  font-size: 40rpx;
  font-weight: 900;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.lc-logo-accent { color: #8b5cf6; }

.lc-date {
  font-size: 20rpx;
  color: #9ca3af;
  font-weight: bold;
}

/* 标签页导航 */
.lc-tabs-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f3f4f6;
  overflow-x: auto;
}

.lc-tab-item {
  padding: 12rpx 24rpx;
  font-size: 28rpx;
  color: #9ca3af;
  white-space: nowrap;
  border-bottom: 4rpx solid transparent;
  transition: all 0.3s ease;
}

.lc-tab-item.lc-tab-active {
  color: #10b981;
  border-bottom-color: #10b981;
  font-weight: 600;
}

.tab-label {
  display: inline-block;
}

/* 内容区域 */
.lc-content-wrapper {
  overflow: hidden;
}

.lc-module {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}

.page-content {
  padding: 0 24rpx 200rpx;
}

/* 碳资产卡片 */
.lc-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
  margin-top: 24rpx;
}

.life-asset { background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%); }
.travel-asset { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); }

.asset-inner {
  position: relative;
  z-index: 1;
}

.asset-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.asset-label {
  font-size: 24rpx;
  opacity: 0.9;
}

.asset-value {
  font-size: 48rpx;
  font-weight: 900;
}

.life-recycle-tag {
  font-size: 20rpx;
  opacity: 0.85;
}

.travel-rank-tag {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  background: rgba(255,255,255,0.2);
  color: #fff;
  padding: 8rpx 16rpx;
  border-radius: 32rpx;
  font-size: 20rpx;
  backdrop-filter: blur(10px);
}

/* 生活页签 */
.life-tabs {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
  overflow-x: auto;
  padding-bottom: 8rpx;
}

.life-tab {
  padding: 12rpx 24rpx;
  background: #f3f4f6;
  border-radius: 24rpx;
  font-size: 24rpx;
  color: #6b7280;
  white-space: nowrap;
}

.life-tab-active {
  background: #10b981;
  color: #fff;
  font-weight: 600;
}

/* 生活网格 */
.life-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.life-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.life-card-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.life-card-name {
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 600;
  text-align: center;
}

.life-card-desc {
  font-size: 20rpx;
  color: #9ca3af;
  text-align: center;
}

.life-card-btn {
  margin-top: 12rpx;
  background: #f3f4f6;
  border: none;
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  font-size: 20rpx;
  color: #6b7280;
}

.green-btn { background: #d1fae5; color: #047857; }
.blue-btn-sm { background: #dbeafe; color: #1e40af; }

/* 运动模块 */
.sport-sync-card {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24rpx 0;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.2);
}

.sync-left {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.sync-dot-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.sync-dot {
  width: 8rpx;
  height: 8rpx;
  background: #fff;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.sync-label {
  font-size: 20rpx;
  letter-spacing: 2rpx;
}

.sync-value {
  font-size: 44rpx;
  font-weight: 900;
}

.sync-unit {
  font-size: 28rpx;
}

.sync-desc {
  font-size: 20rpx;
  opacity: 0.9;
}

.sync-icon-wrap {
  font-size: 80rpx;
  opacity: 0.2;
}

.lc-section {
  margin-bottom: 24rpx;
}

.lc-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.section-hint {
  font-size: 20rpx;
  color: #9ca3af;
}

.sport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.sport-card {
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  color: #fff;
  position: relative;
}

.blue-card { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.orange-card { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
.purple-card { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }

.sport-badge-wrap {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
}

.sport-badge {
  background: rgba(255,255,255,0.3);
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 16rpx;
  font-size: 18rpx;
  font-weight: 600;
}

.sport-icon {
  font-size: 48rpx;
}

.sport-name {
  font-size: 26rpx;
  font-weight: 600;
}

.sport-desc {
  font-size: 20rpx;
  opacity: 0.9;
}

/* 出行模块 */
.travel-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.travel-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.travel-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
}

.indigo-icon { background: #6366f1; }
.green-icon { background: #10b981; }
.orange-icon-sm { background: #f97316; }
.rose-icon-sm { background: #f43f5e; }

.travel-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.travel-name {
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 600;
}

.travel-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

/* 饮食模块 */
.diet-map-card {
  position: relative;
  height: 300rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: #f3f4f6;
  margin: 24rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.diet-map-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.diet-map-pin {
  width: 80rpx;
  height: 80rpx;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
}

.pin-icon {
  font-size: 40rpx;
}

.diet-map-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.diet-map-name {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 600;
}

.diet-map-hint {
  font-size: 20rpx;
  color: #6b7280;
}

.diet-map-btn {
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 20rpx;
  padding: 12rpx 24rpx;
  font-size: 24rpx;
  font-weight: 600;
  margin-top: 8rpx;
}

.diet-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.diet-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.diet-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex: 1;
}

.diet-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
}

.orange-icon { background: #f97316; }

.diet-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.diet-name {
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 600;
}

.diet-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

.diet-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  font-size: 20rpx;
  white-space: nowrap;
}

.diet-check,
.diet-check-done {
  width: 24rpx;
  height: 24rpx;
  border: 2rpx solid #d1d5db;
  border-radius: 50%;
}

.diet-check-done {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16rpx;
}
</style>
