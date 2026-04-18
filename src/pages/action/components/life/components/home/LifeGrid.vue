<template>
  <view class="life-grid">
    <view v-for="item in cards" :key="item.name" class="life-card" :class="item.cardClass">
      <template v-if="item.type === 'normal'">
        <text class="iconfont" :class="[item.icon, 'life-card-icon', item.iconColor]"></text>
        <text class="life-card-name">{{ item.name }}</text>
        <text class="life-card-desc">{{ item.desc }}</text>
        <button class="life-card-btn" :class="item.btnClass">{{ item.btnText }}</button>
      </template>
      <template v-else-if="item.type === 'dark'">
        <view class="dark-inner">
          <text class="dark-title">{{ item.name }}</text>
          <view class="dark-tags">
            <view v-for="tag in item.tags" :key="tag.label" class="dark-tag">
              <text class="iconfont" :class="tag.icon"></text>
              <text class="dark-tag-text">{{ tag.label }}</text>
            </view>
          </view>
        </view>
        <button class="dark-btn">{{ item.btnText }}</button>
      </template>
      <template v-else-if="item.type === 'wide'">
        <view class="wide-icon-wrap">
          <text class="iconfont" :class="item.icon"></text>
        </view>
        <view class="wide-info">
          <text class="life-card-name">{{ item.name }}</text>
          <text class="life-card-desc">{{ item.desc }}</text>
        </view>
        <view class="wide-check"></view>
      </template>
    </view>
  </view>
</template>

<script setup>
const cards = [
  { type: 'normal', icon: 'icon-gift', name: '旧物捐赠', desc: '旧书/衣/家电上传', btnText: '去捐赠', iconColor: 'indigo', btnClass: '' },
  { type: 'normal', icon: 'icon-shopping-bag', name: '环保购物', desc: '自带布袋/无包装', btnText: '打卡', iconColor: 'emerald', btnClass: 'green-btn' },
  { type: 'normal', icon: 'icon-flower', name: '绿植养护', desc: '碳吸附实时记录', btnText: '记录', iconColor: 'green', btnClass: 'green-btn' },
  { type: 'normal', icon: 'icon-book', name: '低碳学习', desc: '无纸化/二手教材', btnText: '上传', iconColor: 'blue', btnClass: 'blue-btn-sm' },
  {
    type: 'dark',
    name: '宿舍节能看板',
    tags: [
      { icon: 'icon-temp', label: '空调温控自律' },
      { icon: 'icon-night', label: '熄灯打卡' },
    ],
    btnText: '节能打卡',
    cardClass: 'life-card-dark',
  },
  {
    type: 'wide',
    icon: 'icon-no-plastic',
    name: '无塑日常',
    desc: '拒绝一次性吸管、水杯记录',
    cardClass: 'life-card-wide',
  },
]
</script>

<style scoped>
.life-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
  padding: 0 30rpx;
}

.life-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  flex-direction: column;
}

.life-card-icon { font-size: 48rpx; margin-bottom: 12rpx; }
.life-card-icon.indigo { color: #4f46e5; }
.life-card-icon.emerald { color: #059669; }
.life-card-icon.green { color: #22c55e; }
.life-card-icon.blue { color: #3b82f6; }

.life-card-name {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.life-card-desc {
  font-size: 18rpx;
  color: #9ca3af;
  margin-bottom: 16rpx;
}

.life-card-btn {
  width: 100%;
  border: 2rpx solid #e0e7ff;
  color: #4f46e5;
  font-size: 18rpx;
  font-weight: bold;
  padding: 12rpx;
  border-radius: 12rpx;
  background: none;
  margin-top: auto;
}

.green-btn { border-color: #d1fae5; color: #059669; }
.blue-btn-sm { border-color: #dbeafe; color: #3b82f6; }

/* 宿舍节能横卡 */
.life-card-dark {
  background: #1f2937;
  color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
}

.dark-inner { flex: 1; }

.dark-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
}

.dark-tags { display: flex; gap: 24rpx; }

.dark-tag {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.dark-tag .iconfont { font-size: 24rpx; }
.dark-tag .icon-temp { color: #60a5fa; }
.dark-tag .icon-night { color: #fbbf24; }
.dark-tag-text { font-size: 20rpx; color: #d1d5db; }

.dark-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 18rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

/* 无塑日常横卡 */
.life-card-wide {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
}

.wide-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wide-icon-wrap .iconfont { font-size: 36rpx; color: #9ca3af; }

.wide-info { flex: 1; margin-left: 16rpx; }

.wide-check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 4rpx solid #8b5cf6;
  flex-shrink: 0;
}
</style>
