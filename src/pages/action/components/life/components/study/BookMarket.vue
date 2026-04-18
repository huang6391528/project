<template>
  <view>
    <view class="study-section-header">
      <text class="study-section-title">二手教材市场</text>
      <view class="study-tag-group">
        <text class="study-tag-active">求购</text>
        <text class="study-tag">转让</text>
      </view>
    </view>
    <view v-for="book in books" :key="book.title" class="study-book-card">
      <image class="book-cover" :src="book.cover" mode="aspectFill"></image>
      <view class="book-info">
        <view class="book-top">
          <text class="book-title">{{ book.title }}</text>
          <text class="book-meta">{{ book.meta }}</text>
        </view>
        <view class="book-bottom">
          <text class="book-price" :class="{ orange: book.priceType === 'points' }">{{ book.price }}</text>
          <button class="book-btn">{{ book.priceType === 'free' ? '联系他' : '立即兑换' }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  books: {
    type: Array,
    default: () => [
      {
        cover: 'https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg',
        title: '《高等数学（下）》',
        meta: '发布者：23级张同学 · 9成新',
        price: '免费转借',
        priceType: 'free',
      },
      {
        cover: 'https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg',
        title: '《计算机组成原理》',
        meta: '发布者：王学姐 · 含有精美笔记',
        price: '50 碳汇分',
        priceType: 'points',
      },
    ]
  }
})
</script>

<style scoped>
.study-section-header {
  margin: 0 24rpx 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.study-section-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}

.study-tag-group { display: flex; gap: 8rpx; }

.study-tag-active {
  background: #22c55e;
  color: #fff;
  font-size: 20rpx;
  font-weight: 700;
  padding: 6rpx 16rpx;
  border-radius: 50rpx;
}

.study-tag {
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 20rpx;
  font-weight: 700;
  padding: 6rpx 16rpx;
  border-radius: 50rpx;
}

.study-book-card {
  margin: 0 24rpx 16rpx;
  display: flex;
  gap: 16rpx;
  background: #f9fafb;
  border-radius: 24rpx;
  padding: 16rpx;
}

.book-cover {
  width: 120rpx;
  height: 144rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
}

.book-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-top { display: flex; flex-direction: column; gap: 6rpx; }
.book-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.book-meta { font-size: 20rpx; color: #9ca3af; }

.book-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-price {
  font-size: 26rpx;
  font-weight: 700;
  color: #16a34a;
}

.book-price.orange { color: #ea580c; }

.book-btn {
  background: #1f2937;
  color: #fff;
  font-size: 20rpx;
  font-weight: 700;
  padding: 8rpx 24rpx;
  border-radius: 50rpx;
  border: none;
  line-height: 1.8;
}
</style>
