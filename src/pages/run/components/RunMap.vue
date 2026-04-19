<template>
  <view class="map-container">
    <map
      id="runMap"
      class="map-bg"
      :latitude="schoolLat"
      :longitude="schoolLng"
      :scale="16"
      :markers="markers"
      :polyline="routePolyline"
      :show-location="true"
      :enable-satellite="false"
    ></map>
    <slot></slot>
  </view>
</template>

<script setup>
defineProps({
  schoolLat: { type: Number, required: true },
  schoolLng: { type: Number, required: true },
  markers: { type: Array, required: true },
  routePolyline: { type: Array, required: true },
  height: { type: String, default: '320px' },
})
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: v-bind(height);
  background-color: #f1f5f9;
  overflow: visible;
}

.map-bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0;
}
</style>
