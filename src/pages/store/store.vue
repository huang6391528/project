<template>
  <view class="page-store">
    <!-- Points Header -->
    <view class="points-header">
      <view class="points-info">
        <text class="points-label">可用积分</text>
        <text class="points-value">2,480</text>
      </view>
      <view class="rules-btn" @click="showRules">
        <text class="rules-text">积分规则</text>
      </view>
    </view>

    <!-- Tab Bar -->
    <StoreTabNav :activeTab="activeTab" @change="activeTab = $event" />

    <!-- Content -->
    <view class="content">
      <StoreAll v-if="activeTab === 'all'" />
      <StoreFlash
        v-else-if="activeTab === 'flash'"
        :products="flashProducts"
        :recommendProducts="recommendProducts"
        @exchange="openModal"
      />
      <StoreVirtual v-else-if="activeTab === 'virtual'" />
      <StoreCampus
        v-else-if="activeTab === 'campus'"
        :services="campusServices"
        @exchange="openModal"
      />
      <StoreGoods
        v-else-if="activeTab === 'goods'"
        :goods="ecoGoods"
        @exchange="openModal"
      />
    </view>

    <!-- Exchange Modal -->
    <ExchangeModal
      :show="showModal"
      :itemName="modalItem"
      :credits="modalCredits"
      @close="closeModal"
      @confirm="confirmExchange"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import StoreTabNav from './components/StoreTabNav.vue'
import StoreAll from './components/all/StoreAll.vue'
import StoreFlash from './components/flash/StoreFlash.vue'
import StoreVirtual from './components/StoreVirtual.vue'
import StoreCampus from './components/campus/StoreCampus.vue'
import StoreGoods from './components/goods/StoreGoods.vue'
import ExchangeModal from './components/ExchangeModal.vue'

const activeTab = ref('all')

const flashProducts = [
  { id: 1, name: '食堂5元全场抵用券', credits: 100, tag: '限量50份', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/2c76498322c947e29dc317cf8418ccfc.jpg' },
  { id: 2, name: '图书馆咖啡屋单品券', credits: 250, tag: '限量100份', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/a5f990fdc25e4ace92bfa20845beefff.jpg' },
  { id: 3, name: '校园网畅快包月卡', credits: 500, tag: '限量30份', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-18/4175e7c4bb0b466ab29dd7d348118202.jpg' },
]

const recommendProducts = [
  { id: 1, name: '校内超市3元代金券', expire: '有效期至 2026-05-30', credits: 60, img: '/static/placeholder.png' },
  { id: 2, name: '体育馆羽毛球场租抵扣', expire: '全时段通用，仅限本周', credits: 300, img: '/static/placeholder.png' },
]

const campusServices = [
  { name: '黑白打印3折券', location: '校内各大文印室', credits: 50, bgColor: '#ecfdf5', iconColor: '#10b981', iconText: '🖨', badge: '' },
  { name: '图书馆座次优先权', location: '考试周专用，限领1次', credits: 300, bgColor: '#eff6ff', iconColor: '#3b82f6', iconText: '🪑', badge: '需核销' },
  { name: '校园歌手大赛决赛门票', location: '学校大礼堂', credits: 1500, bgColor: '#fff7ed', iconColor: '#f97316', iconText: '🎫', badge: '' },
  { name: '健身房单次体验券', location: '体育活动中心2楼', credits: 450, bgColor: '#f5f3ff', iconColor: '#8b5cf6', iconText: '🏋', badge: '' },
]

const ecoGoods = [
  { id: 1, name: '定制环保帆布包-自然款', meta: '校内自提 | 100%有机棉', credits: 1800, originalCredits: null, tag: 'HOT', tagType: 'orange', img: '/static/placeholder.png' },
  { id: 2, name: '可降解餐具三件套', meta: '快递配送 | 麦秆材质', credits: 650, originalCredits: null, tag: '低碳', tagType: 'green', img: '/static/placeholder.png' },
  { id: 3, name: '再生纸A5笔记本', meta: '校内自提 | 80张/本', credits: 300, originalCredits: null, tag: '', tagType: '', img: '/static/placeholder.png' },
  { id: 4, name: '竹纤维可折叠水杯', meta: '快递配送 | 350ml', credits: 1200, originalCredits: 1500, tag: '限时折扣', tagType: 'red', img: '/static/placeholder.png' },
]

const showModal = ref(false)
const modalItem = ref('')
const modalCredits = ref(0)

function openModal(item) {
  modalItem.value = item.name
  modalCredits.value = item.credits
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function confirmExchange() {
  uni.showToast({ title: '兑换成功', icon: 'success' })
}

function showRules() {
  uni.showToast({ title: '积分规则说明', icon: 'none' })
}
</script>

<style scoped>
.page-store { background-color: #fff; min-height: 100vh; padding-bottom: 120rpx; }

.points-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 32rpx 30rpx 24rpx; }
.points-label { display: block; font-size: 24rpx; color: #9ca3af; }
.points-value { display: block; font-size: 72rpx; font-weight: 800; color: #1f2937; line-height: 1.2; }
.rules-btn { display: flex; align-items: center; background-color: #f3f4f6; padding: 12rpx 24rpx; border-radius: 50rpx; margin-top: 16rpx; }
.rules-icon { font-size: 20rpx; color: #6b7280; }
.rules-text { font-size: 22rpx; color: #6b7280; margin-left: 8rpx; }

.content { padding: 0 30rpx; }
</style>
