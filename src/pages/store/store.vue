<template>
  <view class="page-store">
    <!-- Points Header -->
    <view class="points-header">
      <view class="points-info">
        <text class="points-label">可用积分</text>
        <text class="points-value">2,480</text>
      </view>
      <view class="rules-btn" @click="showRules">
        <text class="iconfont icon-help"></text>
        <text class="rules-text">积分规则</text>
      </view>
    </view>

    <!-- Category Bar -->
    <view class="category-bar">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        :class="['category-item', { 'cat-active': activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >{{ tab.label }}</view>
    </view>

    <!-- Content -->
    <view class="content">

      <!-- ========== 全部 ========== -->
      <view v-show="activeTab === 'all'">
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

      <!-- ========== 限时抢购 ========== -->
      <view v-show="activeTab === 'flash'" class="tab-flash">
        <!-- Hero Banner -->
        <view class="flash-hero-banner">
          <image class="flash-hero-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-18/766b6334841a449091c89d0075c2fd6e.jpg" mode="aspectFill"></image>
          <view class="flash-hero-overlay">
            <text class="flash-hero-sub">2026年4月特别企划</text>
            <text class="flash-hero-title">春季环保兑换季</text>
          </view>
        </view>

        <!-- Countdown Module -->
        <view class="flash-countdown-bar">
          <view class="flash-countdown-left">
            <text class="iconfont icon-clock-fast"></text>
            <text class="flash-countdown-label">限时秒杀</text>
          </view>
          <view class="flash-countdown-right">
            <text class="flash-countdown-tip">距结束</text>
            <text class="flash-countdown-num">02</text>
            <text class="flash-countdown-sep">:</text>
            <text class="flash-countdown-num">45</text>
            <text class="flash-countdown-sep">:</text>
            <text class="flash-countdown-num">18</text>
          </view>
        </view>

        <!-- Section: 火爆抢购中 -->
        <view class="flash-section-header">
          <text class="flash-section-title">火爆抢购中</text>
          <text class="flash-section-tip">滑动查看更多</text>
        </view>
        <scroll-view class="flash-product-scroll" scroll-x="true">
          <view class="flash-product-list">
            <view
              v-for="item in flashProducts"
              :key="item.id"
              class="flash-product-card"
            >
              <view class="flash-product-img-wrap">
                <image class="flash-product-img" :src="item.img" mode="aspectFill"></image>
                <view class="flash-product-tag">{{ item.tag }}</view>
              </view>
              <view class="flash-product-info">
                <text class="flash-product-name">{{ item.name }}</text>
                <view class="flash-product-bottom">
                  <view class="flash-product-price">
                    <text class="flash-price-num">{{ item.credits }}</text>
                    <text class="flash-price-unit">积分</text>
                  </view>
                  <view class="flash-exchange-btn" @click="openModal(item.name, item.credits)">抢兑</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- Section: 为你推荐 -->
        <view class="flash-recommend-section">
          <text class="flash-section-title">为你推荐</text>
          <view class="flash-recommend-list">
            <view
              v-for="item in recommendProducts"
              :key="item.id"
              class="flash-recommend-card"
            >
              <image class="flash-recommend-img" :src="item.img" mode="aspectFill"></image>
              <view class="flash-recommend-info">
                <text class="flash-recommend-name">{{ item.name }}</text>
                <text class="flash-recommend-expire">{{ item.expire }}</text>
                <view class="flash-recommend-bottom">
                  <text class="flash-recommend-price">{{ item.credits }} 积分</text>
                  <view class="flash-recommend-btn" @click="openModal(item.name, item.credits)">立即兑换</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- ========== 虚拟权益 ========== -->
      <view v-show="activeTab === 'virtual'" class="tab-virtual">
        <view class="virtual-placeholder">
          <text class="iconfont icon-lock virtual-icon"></text>
          <text class="virtual-title">功能暂未开放</text>
          <text class="virtual-desc">虚拟权益模块正在开发中，敬请期待</text>
        </view>
      </view>

      <!-- ========== 校园服务 ========== -->
      <view v-show="activeTab === 'campus'" class="tab-campus">
        <!-- Search Bar -->
        <view class="campus-search-bar">
          <text class="iconfont icon-search campus-search-icon"></text>
          <input class="campus-search-input" type="text" placeholder="搜索校内特权服务..." />
        </view>

        <!-- Section: 校内专属特权 -->
        <view class="campus-section">
          <view class="campus-section-header">
            <text class="iconfont icon-map campus-section-icon"></text>
            <text class="campus-section-title">校内专属特权</text>
          </view>
          <view class="campus-service-list">
            <view
              v-for="item in campusServices"
              :key="item.id"
              class="campus-service-card"
            >
              <view class="campus-service-icon-wrap" :style="{ backgroundColor: item.bgColor }">
                <text class="iconfont" :class="item.icon" :style="{ color: item.iconColor }"></text>
              </view>
              <view class="campus-service-info">
                <view class="campus-service-name-row">
                  <text class="campus-service-name">{{ item.name }}</text>
                  <view v-if="item.badge" class="campus-service-badge">{{ item.badge }}</view>
                </view>
                <view class="campus-service-location">
                  <text class="iconfont icon-location-sm"></text>
                  <text class="campus-service-location-text">{{ item.location }}</text>
                </view>
                <view class="campus-service-bottom">
                  <text class="campus-service-price">{{ item.credits }} 积分</text>
                  <view class="campus-exchange-btn" @click="openModal(item.name, item.credits)">立即领用</view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- How to Redeem Info -->
        <view class="campus-info-card">
          <text class="iconfont icon-shield campus-info-icon"></text>
          <view class="campus-info-content">
            <text class="campus-info-title">如何核销服务？</text>
            <text class="campus-info-desc">兑换成功后，进入"我的-我的卡包"点击对应券码。出示给现场工作人员进行扫描核销。部分优先权益需提前24小时激活。</text>
          </view>
        </view>
      </view>

      <!-- ========== 环保好物 ========== -->
      <view v-show="activeTab === 'goods'" class="tab-goods">
        <!-- Hero Banner -->
        <view class="goods-hero-banner">
          <image class="goods-hero-img" src="https://modao.cc/agent-py/media/generated_images/2026-04-18/206c25109e6a4d61ab018c54f765d716.jpg" mode="aspectFill"></image>
          <view class="goods-hero-overlay">
            <text class="goods-hero-title">把绿色带回家</text>
            <text class="goods-hero-sub">每一件商品都记录着您的减碳贡献</text>
          </view>
        </view>

        <!-- Goods Grid -->
        <view class="goods-grid">
          <view
            v-for="item in ecoGoods"
            :key="item.id"
            class="goods-card"
          >
            <view class="goods-img-wrap">
              <image class="goods-img" :src="item.img" mode="aspectFill"></image>
              <view v-if="item.tag" class="goods-tag" :class="'goods-tag-' + item.tagType">{{ item.tag }}</view>
            </view>
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-meta">{{ item.meta }}</text>
            <view class="goods-bottom">
              <view class="goods-price-wrap">
                <text class="goods-price">{{ item.credits }} 积分</text>
                <text v-if="item.originalCredits" class="goods-price-original">{{ item.originalCredits }} 积分</text>
              </view>
              <view class="goods-add-btn" @click="openModal(item.name, item.credits)">
                <text class="iconfont icon-plus"></text>
              </view>
            </view>
          </view>
        </view>

        <!-- Eco Tips -->
        <view class="eco-tips-card">
          <view class="eco-tips-header">
            <text class="iconfont icon-lightbulb eco-tips-icon"></text>
            <text class="eco-tips-title">减碳小知识</text>
          </view>
          <text class="eco-tips-desc">兑换并使用一件环保帆布包，预计每年可减少使用约 150 个一次性塑料袋。您的每一次积分兑换，都在为地球减负。</text>
          <view class="eco-tips-footer">
            <text class="eco-tips-link">如何获取更多积分？</text>
            <text class="iconfont icon-arrow-right eco-tips-arrow"></text>
          </view>
        </view>
      </view>

    </view>

    <!-- ========== 兑换确认弹窗 ========== -->
    <view v-show="showModal" class="modal-overlay" @click="closeModal">
      <view class="modal-box" @click.stop>
        <view class="modal-icon-wrap">
          <text class="iconfont icon-leaf modal-icon"></text>
        </view>
        <text class="modal-title">兑换确认</text>
        <text class="modal-desc">您将使用 <text class="modal-credits">{{ modalCredits }}</text> 积分兑换</text>
        <text class="modal-item-name">{{ modalItem }}</text>
        <view class="modal-btns">
          <view class="modal-btn-cancel" @click="closeModal">我再想想</view>
          <view class="modal-btn-confirm" @click="confirmExchange">确认兑换</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'flash', label: '限时抢购' },
  { key: 'virtual', label: '虚拟权益' },
  { key: 'campus', label: '校园服务' },
  { key: 'goods', label: '环保好物' },
]

// Modal state
const showModal = ref(false)
const modalItem = ref('')
const modalCredits = ref(0)

// Flash sale products
const flashProducts = [
  {
    id: 1,
    name: '食堂5元全场抵用券',
    credits: 100,
    tag: '限量50份',
    img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/2c76498322c947e29dc317cf8418ccfc.jpg',
  },
  {
    id: 2,
    name: '图书馆咖啡屋单品券',
    credits: 250,
    tag: '限量100份',
    img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/a5f990fdc25e4ace92bfa20845beefff.jpg',
  },
  {
    id: 3,
    name: '校园网畅快包月卡',
    credits: 500,
    tag: '限量30份',
    img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/4175e7c4bb0b466ab29dd7d348118202.jpg',
  },
]

// Recommend products
const recommendProducts = [
  {
    id: 1,
    name: '校内超市3元代金券',
    expire: '有效期至 2026-05-30',
    credits: 60,
    img: '/static/placeholder.png',
  },
  {
    id: 2,
    name: '体育馆羽毛球场租抵扣',
    expire: '全时段通用，仅限本周',
    credits: 300,
    img: '/static/placeholder.png',
  },
]

// Campus services
const campusServices = [
  {
    id: 1,
    name: '黑白打印3折券',
    location: '校内各大文印室',
    credits: 50,
    bgColor: '#ecfdf5',
    iconColor: '#10b981',
    icon: 'icon-printer',
    badge: '',
  },
  {
    id: 2,
    name: '图书馆座次优先权',
    location: '考试周专用，限领1次',
    credits: 300,
    bgColor: '#eff6ff',
    iconColor: '#3b82f6',
    icon: 'icon-chair',
    badge: '需核销',
  },
  {
    id: 3,
    name: '校园歌手大赛决赛门票',
    location: '学校大礼堂',
    credits: 1500,
    bgColor: '#fff7ed',
    iconColor: '#f97316',
    icon: 'icon-ticket',
    badge: '',
  },
  {
    id: 4,
    name: '健身房单次体验券',
    location: '体育活动中心2楼',
    credits: 450,
    bgColor: '#f5f3ff',
    iconColor: '#8b5cf6',
    icon: 'icon-dumbbell',
    badge: '',
  },
]

// Eco goods
const ecoGoods = [
  {
    id: 1,
    name: '定制环保帆布包-自然款',
    meta: '校内自提 | 100%有机棉',
    credits: 1800,
    originalCredits: null,
    tag: 'HOT',
    tagType: 'orange',
    img: '/static/placeholder.png',
  },
  {
    id: 2,
    name: '可降解餐具三件套',
    meta: '快递配送 | 麦秆材质',
    credits: 650,
    originalCredits: null,
    tag: '低碳',
    tagType: 'green',
    img: '/static/placeholder.png',
  },
  {
    id: 3,
    name: '再生纸A5笔记本',
    meta: '校内自提 | 80张/本',
    credits: 300,
    originalCredits: null,
    tag: '',
    tagType: '',
    img: '/static/placeholder.png',
  },
  {
    id: 4,
    name: '竹纤维可折叠水杯',
    meta: '快递配送 | 350ml',
    credits: 1200,
    originalCredits: 1500,
    tag: '限时折扣',
    tagType: 'red',
    img: '/static/placeholder.png',
  },
]

function openModal(name, credits) {
  modalItem.value = name
  modalCredits.value = credits
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function confirmExchange() {
  closeModal()
}

function showRules() {
  uni.showToast({ title: '积分规则说明', icon: 'none' })
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

/* ==== 全部 Tab (original) ==== */
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
  top: 0; left: 0;
  width: 100%; height: 100%;
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
.flash-scroll { white-space: nowrap; }
.flash-list { display: flex; gap: 24rpx; }
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
.price-unit { font-size: 16rpx; }
.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 48rpx;
  margin-bottom: 24rpx;
  padding-left: 8rpx;
}
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
.product-info { padding: 24rpx; }
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
.exchange-btn:active { transform: scale(0.95); }
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
.certificate-card text:first-child {
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
.record-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64rpx;
  padding-bottom: 40rpx;
}
.record-text { font-size: 24rpx; color: #9ca3af; }

/* ==== 限时抢购 Tab ==== */
.tab-flash { padding-top: 24rpx; }
.flash-hero-banner {
  position: relative;
  width: 100%;
  height: 256rpx;
  border-radius: 24rpx;
  overflow: hidden;
}
.flash-hero-img { width: 100%; height: 100%; }
.flash-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.5), transparent);
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flash-hero-sub {
  font-size: 20rpx;
  color: rgba(255,255,255,0.8);
  margin-bottom: 8rpx;
}
.flash-hero-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
}
.flash-countdown-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff7ed;
  border: 2rpx solid #fed7aa;
  border-radius: 20rpx;
  padding: 24rpx 24rpx;
  margin-top: 32rpx;
}
.flash-countdown-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.icon-clock-fast { color: #f97316; font-size: 36rpx; }
.flash-countdown-label {
  font-size: 28rpx;
  font-weight: bold;
  color: #7c2d12;
}
.flash-countdown-right {
  display: flex;
  align-items: center;
  gap: 6rpx;
}
.flash-countdown-tip {
  font-size: 22rpx;
  color: #9a3412;
  margin-right: 8rpx;
}
.flash-countdown-num {
  background-color: #ea580c;
  color: #fff;
  font-size: 22rpx;
  font-weight: bold;
  font-family: monospace;
  padding: 6rpx 10rpx;
  border-radius: 8rpx;
}
.flash-countdown-sep {
  color: #ea580c;
  font-weight: bold;
  font-size: 22rpx;
}
.flash-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40rpx;
  margin-bottom: 20rpx;
}
.flash-section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #1f2937;
}
.flash-section-tip {
  font-size: 20rpx;
  color: #9ca3af;
}
.flash-product-scroll { white-space: nowrap; }
.flash-product-list { display: flex; gap: 20rpx; padding-bottom: 16rpx; }
.flash-product-card {
  min-width: 240rpx;
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  border: 2rpx solid #f3f4f6;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.flash-product-img-wrap {
  position: relative;
  height: 200rpx;
  background-color: #f9fafb;
}
.flash-product-img { width: 100%; height: 100%; }
.flash-product-tag {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
  background-color: #ef4444;
  color: #fff;
  font-size: 18rpx;
  font-weight: bold;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}
.flash-product-info { padding: 20rpx; }
.flash-product-name {
  display: block;
  font-size: 26rpx;
  font-weight: bold;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flash-product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
}
.flash-product-price {
  display: flex;
  align-items: baseline;
  gap: 4rpx;
  color: #059669;
}
.flash-price-num {
  font-size: 32rpx;
  font-weight: bold;
}
.flash-price-unit {
  font-size: 18rpx;
}
.flash-exchange-btn {
  background-color: #10b981;
  color: #fff;
  font-size: 22rpx;
  font-weight: bold;
  padding: 8rpx 20rpx;
  border-radius: 12rpx;
}
.flash-exchange-btn:active { transform: scale(0.95); }
.flash-recommend-section { margin-top: 32rpx; padding-bottom: 24rpx; }
.flash-recommend-list { margin-top: 20rpx; display: flex; flex-direction: column; gap: 20rpx; }
.flash-recommend-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  background-color: #f9fafb;
  border-radius: 20rpx;
  padding: 20rpx;
  border: 2rpx solid #f3f4f6;
}
.flash-recommend-img {
  width: 128rpx;
  height: 128rpx;
  border-radius: 16rpx;
  background-color: #e5e7eb;
  flex-shrink: 0;
}
.flash-recommend-info { flex: 1; }
.flash-recommend-name {
  display: block;
  font-size: 26rpx;
  font-weight: bold;
  color: #374151;
}
.flash-recommend-expire {
  display: block;
  font-size: 18rpx;
  color: #9ca3af;
  margin-top: 6rpx;
}
.flash-recommend-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
}
.flash-recommend-price {
  font-size: 26rpx;
  font-weight: bold;
  color: #059669;
}
.flash-recommend-btn {
  background-color: #fff;
  border: 2rpx solid #10b981;
  color: #10b981;
  font-size: 18rpx;
  font-weight: bold;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}

/* ==== 虚拟权益 Tab ==== */
.tab-virtual { padding-top: 80rpx; }
.virtual-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 0;
}
.virtual-icon {
  font-size: 120rpx;
  color: #d1d5db;
  margin-bottom: 24rpx;
}
.virtual-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #6b7280;
  margin-bottom: 12rpx;
}
.virtual-desc {
  font-size: 24rpx;
  color: #9ca3af;
}

/* ==== 校园服务 Tab ==== */
.tab-campus { padding-top: 24rpx; }
.campus-search-bar {
  display: flex;
  align-items: center;
  gap: 12rpx;
  background-color: #f3f4f6;
  border-radius: 20rpx;
  padding: 16rpx 24rpx;
}
.campus-search-icon {
  color: #9ca3af;
  font-size: 28rpx;
}
.campus-search-input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 24rpx;
  color: #374151;
  width: 100%;
}
.campus-section { margin-top: 40rpx; }
.campus-section-header {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 24rpx;
}
.campus-section-icon { color: #10b981; font-size: 28rpx; }
.campus-section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #1f2937;
}
.campus-service-list { display: flex; flex-direction: column; gap: 24rpx; }
.campus-service-card {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  border: 2rpx solid #f3f4f6;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}
.campus-service-icon-wrap {
  width: 160rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
  flex-shrink: 0;
}
.campus-service-icon-wrap text {
  font-size: 60rpx;
}
.campus-service-info {
  flex: 1;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.campus-service-name-row {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
.campus-service-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #374151;
}
.campus-service-badge {
  background-color: #dbeafe;
  color: #2563eb;
  font-size: 16rpx;
  font-weight: bold;
  padding: 2rpx 10rpx;
  border-radius: 8rpx;
}
.campus-service-location {
  display: flex;
  align-items: center;
  gap: 4rpx;
  margin-top: 8rpx;
}
.icon-location-sm {
  font-size: 16rpx;
  color: #9ca3af;
}
.campus-service-location-text {
  font-size: 18rpx;
  color: #9ca3af;
}
.campus-service-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}
.campus-service-price {
  font-size: 26rpx;
  font-weight: bold;
  color: #059669;
}
.campus-exchange-btn {
  background-color: #10b981;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 10rpx 20rpx;
  border-radius: 12rpx;
}
.campus-exchange-btn:active { transform: scale(0.95); }
.campus-info-card {
  background-color: #1f2937;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-top: 40rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  position: relative;
  overflow: hidden;
}
.icon-shield { font-size: 160rpx; color: rgba(255,255,255,0.08); position: absolute; right: -20rpx; bottom: -20rpx; }
.campus-info-content { flex: 1; }
.campus-info-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #fff;
}
.campus-info-desc {
  display: block;
  font-size: 18rpx;
  color: rgba(255,255,255,0.7);
  margin-top: 12rpx;
  line-height: 1.6;
}

/* ==== 环保好物 Tab ==== */
.tab-goods { padding-top: 24rpx; }
.goods-hero-banner {
  position: relative;
  width: 100%;
  height: 320rpx;
  border-radius: 32rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
}
.goods-hero-img { width: 100%; height: 100%; }
.goods-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 78, 59, 0.4);
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.goods-hero-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
}
.goods-hero-sub {
  font-size: 20rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 8rpx;
}
.goods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 40rpx;
}
.goods-card { display: flex; flex-direction: column; }
.goods-img-wrap {
  position: relative;
  aspect-ratio: 1;
  background-color: #f3f4f6;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 12rpx;
}
.goods-img { width: 100%; height: 100%; }
.goods-tag {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  font-size: 16rpx;
  font-weight: bold;
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
  color: #fff;
}
.goods-tag-orange { background-color: #f97316; }
.goods-tag-green { background-color: #10b981; }
.goods-tag-red { background-color: #ef4444; }
.goods-name {
  display: block;
  font-size: 24rpx;
  font-weight: bold;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-meta {
  display: block;
  font-size: 18rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}
.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12rpx;
}
.goods-price-wrap { display: flex; flex-direction: column; }
.goods-price {
  font-size: 26rpx;
  font-weight: bold;
  color: #059669;
}
.goods-price-original {
  font-size: 18rpx;
  color: #9ca3af;
  text-decoration: line-through;
}
.goods-add-btn {
  background-color: #f3f4f6;
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.goods-add-btn text { font-size: 28rpx; color: #6b7280; }
.goods-add-btn:active { transform: scale(0.9); }
.eco-tips-card {
  background-color: #ecfdf5;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-top: 60rpx;
  border: 2rpx solid #a7f3f3;
}
.eco-tips-header {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 16rpx;
}
.icon-lightbulb { font-size: 28rpx; color: #f59e0b; }
.eco-tips-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #064e3b;
}
.eco-tips-desc {
  display: block;
  font-size: 20rpx;
  color: rgba(6, 78, 59, 0.8);
  line-height: 1.7;
}
.eco-tips-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20rpx;
}
.eco-tips-link {
  font-size: 18rpx;
  font-weight: bold;
  color: #059669;
}
.eco-tips-arrow { font-size: 18rpx; color: #059669; margin-left: 4rpx; }

/* ==== Modal ==== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60rpx;
}
.modal-box {
  background-color: #fff;
  border-radius: 40rpx;
  padding: 48rpx 40rpx;
  width: 100%;
  text-align: center;
  box-shadow: 0 20rpx 60rpx rgba(0,0,0,0.2);
}
.modal-icon-wrap {
  width: 120rpx;
  height: 120rpx;
  background-color: #ecfdf5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24rpx;
}
.modal-icon { font-size: 60rpx; color: #10b981; }
.modal-title {
  display: block;
  font-size: 34rpx;
  font-weight: bold;
  color: #1f2937;
}
.modal-desc {
  display: block;
  font-size: 26rpx;
  color: #6b7280;
  margin-top: 12rpx;
}
.modal-credits {
  color: #059669;
  font-weight: bold;
}
.modal-item-name {
  display: block;
  font-size: 28rpx;
  font-weight: 500;
  color: #111827;
  margin-top: 8rpx;
}
.modal-btns {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}
.modal-btn-cancel {
  flex: 1;
  background-color: #f3f4f6;
  color: #6b7280;
  font-size: 28rpx;
  font-weight: bold;
  padding: 24rpx 0;
  border-radius: 20rpx;
  text-align: center;
}
.modal-btn-confirm {
  flex: 1;
  background-color: #10b981;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  padding: 24rpx 0;
  border-radius: 20rpx;
  text-align: center;
}
</style>
