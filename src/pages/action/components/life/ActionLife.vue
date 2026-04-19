<template>
  <view>
    <LifeAssetCard label="学习生活低碳等级" value="LV.5" subLabel="已回收旧物约 24.5kg" />
    <LifeSubTabs :activeTab="subTab" @change="subTab = $event" />
  
    <template v-if="subTab === 'home'">
      <LifeSubHome />
    </template>
    <template v-else-if="subTab === 'dorm'">
      <EnergyChart />
      <LifeSubDorm />
    </template>
    <template v-else-if="subTab === 'study'">
      <LifeSubStudy />
    </template>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import LifeAssetCard from './components/LifeAssetCard.vue'
import LifeSubTabs from './components/LifeSubTabs.vue'
import LifeSubHome from './components/home/LifeSubHome.vue'
import EnergyChart from './components/dorm/EnergyChart.vue'
import LifeSubDorm from './components/dorm/LifeSubDorm.vue'
import LifeSubStudy from './components/study/LifeSubStudy.vue'

const subTab = ref('home')
</script>
