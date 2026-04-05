<template>
  <view class="custom-tabbar">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      :class="{ active: currentIndex === index }"
      @tap="switchTab(index)"
    >
      <text class="iconfont" :class="currentIndex === index ? item.activeIcon : item.icon"></text>
      <text class="tab-text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabList: [
        { text: '首页', icon: 'icon-home', activeIcon: 'icon-home' },
        { text: '校园跑', icon: 'icon-run', activeIcon: 'icon-run' },
        { text: '低碳', icon: 'icon-leaf', activeIcon: 'icon-leaf' },
        { text: '商城', icon: 'icon-shopping', activeIcon: 'icon-shopping' },
        { text: '我的', icon: 'icon-account', activeIcon: 'icon-account' }
      ]
    }
  },
  methods: {
    switchTab(index) {
      const routes = [
        '/pages/index/index',
        '/pages/run/run',
        '/pages/action/action',
        '/pages/store/store',
        '/pages/profile/profile'
      ]
      uni.switchTab({
        url: routes[index]
      })
    }
  }
}
</script>

<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #ffffff;
  border-top: 2rpx solid #f3f4f6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20rpx;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 8rpx 0;
}

.tab-item .iconfont {
  font-size: 48rpx;
  color: #999999;
  line-height: 1.2;
}

.tab-item.active .iconfont {
  color: #10b981;
}

.tab-text {
  font-size: 20rpx;
  font-weight: bold;
  color: #999999;
  margin-top: 4rpx;
}

.tab-item.active .tab-text {
  color: #10b981;
}
</style>
