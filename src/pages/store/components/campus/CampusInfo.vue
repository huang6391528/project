<template>
  <view class="campus-info-card">
    <text class="campus-info-icon">🛡</text>
    <view class="campus-info-content">
      <text class="campus-info-title">如何核销服务？</text>
      <text class="campus-info-desc">兑换成功后，进入"我的-我的卡包"点击对应券码。出示给现场工作人员进行扫描核销。部分优先权益需提前24小时激活。</text>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.campus-info-card { background-color: #1f2937; border-radius: 24rpx; padding: 32rpx; margin-top: 40rpx; margin-bottom: 24rpx; display: flex; align-items: flex-start; gap: 20rpx; position: relative; overflow: hidden; }
.campus-info-icon { font-size: 160rpx; color: rgba(255,255,255,0.08); position: absolute; right: -20rpx; bottom: -20rpx; }
.campus-info-content { flex: 1; }
.campus-info-title { font-size: 26rpx; font-weight: bold; color: #fff; display: block; }
.campus-info-desc { display: block; font-size: 18rpx; color: rgba(255,255,255,0.7); margin-top: 12rpx; line-height: 1.6; }
</style>
