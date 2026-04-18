<template>
  <view class="dorm-pk-card">
    <text class="dorm-pk-title">节能寝室 PK 赛</text>
    <view class="dorm-pk-row">
      <view>
        <text class="dorm-pk-hint">本楼栋排名</text>
        <text class="dorm-pk-rank">No.12</text>
      </view>
      <button class="dorm-pk-btn">查看对比</button>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.dorm-pk-card {
  margin: 0 24rpx 16rpx;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border-radius: 32rpx;
  padding: 24rpx;
  color: #fff;
}

.dorm-pk-title {
  font-size: 22rpx;
  font-weight: 700;
  margin-bottom: 16rpx;
  display: block;
}

.dorm-pk-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.dorm-pk-hint {
  font-size: 18rpx;
  opacity: 0.7;
  margin-bottom: 4rpx;
  display: block;
}

.dorm-pk-rank {
  font-size: 36rpx;
  font-weight: 900;
  font-style: italic;
  display: block;
}

.dorm-pk-btn {
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size: 18rpx;
  font-weight: 700;
  padding: 8rpx 20rpx;
  border-radius: 50rpx;
  border: none;
}
</style>
