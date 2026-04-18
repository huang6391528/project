<template>
  <view class="study-grid">
    <view v-for="item in items" :key="item.name" class="study-grid-card">
      <view class="study-grid-icon" :class="item.colorClass">
        <text class="iconfont" :class="item.icon"></text>
      </view>
      <text class="study-grid-name">{{ item.name }}</text>
      <text class="study-grid-desc">{{ item.desc }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { icon: 'icon-tablet', name: '无纸化笔记', desc: '使用平板/电脑记录', colorClass: 'green' },
      { icon: 'icon-recycle', name: '草稿纸回收', desc: '废旧纸张定点回收', colorClass: 'blue' },
      { icon: 'icon-share', name: '电子共享', desc: '云端传资料免打印', colorClass: 'purple' },
      { icon: 'icon-book-refresh', name: '二手教材', desc: '学长学姐课本转借', colorClass: 'amber' },
    ]
  }
})
</script>

<style scoped>
.study-grid {
  margin: 0 24rpx 24rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.study-grid-card {
  background: #f9fafb;
  border-radius: 24rpx;
  padding: 28rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #f3f4f6;
}

.study-grid-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.study-grid-icon .iconfont { font-size: 36rpx; }

.study-grid-icon.green { background: #f0fdf4; }
.study-grid-icon.green .iconfont { color: #16a34a; }
.study-grid-icon.blue { background: #eff6ff; }
.study-grid-icon.blue .iconfont { color: #2563eb; }
.study-grid-icon.purple { background: #faf5ff; }
.study-grid-icon.purple .iconfont { color: #9333ea; }
.study-grid-icon.amber { background: #fffbeb; }
.study-grid-icon.amber .iconfont { color: #d97706; }

.study-grid-name {
  font-size: 26rpx;
  font-weight: 700;
  color: #374151;
  margin-bottom: 4rpx;
  text-align: center;
}

.study-grid-desc { font-size: 18rpx; color: #9ca3af; text-align: center; }
</style>
