<template>
  <view class="tab-campus">
    <CampusSearch />
    <view class="campus-section">
      <view class="campus-section-header">
        <view class="campus-header-left">
          <text class="campus-section-icon">🗺</text>
          <text class="campus-section-title">校内专属特权</text>
        </view>
        <text class="campus-all-btn" @tap="onToggleAll">
          {{ isAllExpanded ? '收起' : '全部' }} &gt;
        </text>
      </view>
      <CampusServiceList ref="serviceListRef" :items="services" @exchange="emit('exchange', $event)" />
    </view>
    <CampusInfo />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import CampusSearch from './CampusSearch.vue'
import CampusServiceList from './CampusServiceList.vue'
import CampusInfo from './CampusInfo.vue'

defineProps({
  services: { type: Array, default: () => [] }
})

const emit = defineEmits(['exchange'])

const serviceListRef = ref(null)
const isAllExpanded = ref(false)

function onToggleAll() {
  if (serviceListRef.value) {
    serviceListRef.value.toggleAll()
    isAllExpanded.value = !isAllExpanded.value
  }
}
</script>

<style scoped>
.tab-campus { padding-top: 24rpx; }
.campus-section { margin-top: 40rpx; }
.campus-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}
.campus-header-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.campus-section-icon { font-size: 28rpx; }
.campus-section-title { font-size: 30rpx; font-weight: bold; color: #1f2937; }
.campus-all-btn {
  font-size: 24rpx;
  color: #9ca3af;
  font-weight: 500;
}
</style>
