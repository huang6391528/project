<template>
  <view class="diet-list">
    <view v-for="item in items" :key="item.name" class="diet-item">
      <view class="diet-left">
        <view class="diet-icon" :class="item.iconClass">
          <text class="iconfont" :class="item.icon"></text>
        </view>
        <view class="diet-info">
          <text class="diet-name">{{ item.name }}</text>
          <text class="diet-desc">{{ item.desc }}</text>
        </view>
      </view>
      <button v-if="item.btnText && !item.done" class="diet-btn" :class="item.btnClass">{{ item.btnText }}</button>
      <view v-else-if="item.done" class="diet-check-done">
        <text class="check-mark">✓</text>
      </view>
      <view v-else class="diet-check"></view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { name: '光盘行动', desc: 'AI 拍照识别剩餐情况', icon: 'icon-camera', iconClass: 'orange-icon', btnText: 'AI 拍照', btnClass: '', done: false },
      { name: '低碳套餐', desc: '选择本周推荐的低碳餐品', icon: 'icon-leaf', iconClass: 'green-icon', btnText: null, btnClass: '', done: true },
      { name: '外卖减塑', desc: '减少一次性餐具与塑料袋', icon: 'icon-no-plastic', iconClass: 'rose-icon', btnText: null, btnClass: '', done: true },
      { name: '自带水杯', desc: '咖啡、饮品窗口可认证', icon: 'icon-cup', iconClass: 'blue-icon', btnText: '去认证', btnClass: 'diet-btn-gray', done: false },
      { name: '饮水补给', desc: '记录校园直饮水使用', icon: 'icon-water', iconClass: 'cyan-icon', btnText: '记录', btnClass: 'diet-btn-blue', done: false },
    ]
  }
})
</script>

<style scoped>
.diet-list { display: flex; flex-direction: column; gap: 16rpx; }

.diet-item {
  background: rgba(255,255,255,0.88);
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid rgba(255,255,255,0.82);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 12rpx 30rpx rgba(4,47,36,0.08);
}

.diet-left { display: flex; align-items: center; gap: 24rpx; flex: 1; min-width: 0; }

.diet-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 22rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diet-icon .iconfont { font-size: 36rpx; }

.orange-icon { background: #fff7ed; }
.orange-icon .iconfont { color: #ea580c; }
.green-icon { background: #ecfdf5; }
.green-icon .iconfont { color: #059669; }
.rose-icon { background: #fff1f2; }
.rose-icon .iconfont { color: #e11d48; }
.blue-icon { background: #eff6ff; }
.blue-icon .iconfont { color: #3b82f6; }
.cyan-icon { background: #ecfeff; }
.cyan-icon .iconfont { color: #0891b2; }

.diet-info { flex: 1; min-width: 0; }

.diet-name {
  display: block;
  font-size: 28rpx;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.diet-desc {
  display: block;
  font-size: 20rpx;
  color: #7c8791;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.diet-btn {
  background: #f97316;
  color: #fff;
  font-size: 20rpx;
  font-weight: 900;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-btn-gray {
  background: #f3f4f6;
  color: #7c8791;
}

.diet-btn-blue {
  background: #3b82f6;
  color: #fff;
}

.diet-check {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #10b981;
  flex-shrink: 0;
}

.diet-check-done {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-mark {
  font-size: 28rpx;
  color: #fff;
  font-weight: 900;
}
</style>
