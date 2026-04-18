<template>
  <view class="sidebar" :class="{ 'sidebar-show': show }">
    <!-- 用户资料区 -->
    <view class="sidebar-profile">
      <view class="sidebar-profile-main">
        <image class="sidebar-avatar" src="@/static/tabbar/profile_photo.jpg" mode="aspectFill"></image>
        <view class="sidebar-profile-info">
          <text class="sidebar-name">陈同学</text>
          <text class="sidebar-meta">经济学院</text>
          <text class="sidebar-class">2023级经济一班</text>
        </view>
      </view>
      <view class="sidebar-follow-row">
        <view class="follow-item">
          <text class="follow-num">12</text>
          <text class="follow-label">关注</text>
        </view>
        <view class="follow-divider"></view>
        <view class="follow-item">
          <text class="follow-num">38</text>
          <text class="follow-label">粉丝</text>
        </view>
      </view>
    </view>

    <!-- 菜单列表 -->
    <scroll-view class="sidebar-menu" scroll-y>
      <view class="menu-group">
        <view class="menu-item parent-item" @click="toggleJoinedClass">
          <text class="menu-icon">🏫</text>
          <text class="menu-label">已加入班级</text>
          <text class="menu-arrow">{{ joinedClassExpanded ? '▼' : '▶' }}</text>
        </view>
        <view v-if="joinedClassExpanded" class="sub-menu">
          <view class="menu-item sub-item" @click.stop="navigateTo('/pages/class-list/class-list?type=major')">
            <text class="menu-label">专业班级</text>
          </view>
          <view class="menu-item sub-item" @click.stop="navigateTo('/pages/class-list/class-list?type=course')">
            <text class="menu-label">课程班级</text>
          </view>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item parent-item" @click="toggleCheckinGroup">
          <text class="menu-icon">🤝</text>
          <text class="menu-label">我的打卡团</text>
          <text class="menu-arrow">{{ checkinGroupExpanded ? '▼' : '▶' }}</text>
        </view>
        <view v-if="checkinGroupExpanded" class="sub-menu">
          <view class="menu-item sub-item" @click.stop="navigateTo('/pages/checkin-group/checkin-group?status=joined')">
            <text class="menu-label">已加入</text>
          </view>
          <view class="menu-item sub-item" @click.stop="navigateTo('/pages/checkin-group/checkin-group?status=pending')">
            <text class="menu-label">未通过</text>
          </view>
        </view>
      </view>

      <view class="menu-item direct-item" @click="navigateTo('/pages/message/message')">
        <text class="menu-icon">💬</text>
        <text class="menu-label">消息</text>
      </view>
      <view class="menu-item direct-item" @click="navigateTo('/pages/friends/friends')">
        <text class="menu-icon">❤️</text>
        <text class="menu-label">关注好友</text>
      </view>
      <view class="menu-item direct-item" @click="navigateTo('/pages/moments/moments')">
        <text class="menu-icon">📝</text>
        <text class="menu-label">我的动态</text>
      </view>
      <view class="menu-item direct-item" @click="navigateTo('/pages/low-carbon-circle')">
        <text class="menu-icon">🌿</text>
        <text class="menu-label">低碳圈</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const joinedClassExpanded = ref(false)
const checkinGroupExpanded = ref(false)

const emit = defineEmits(['close'])

const toggleJoinedClass = () => {
  joinedClassExpanded.value = !joinedClassExpanded.value
}

const toggleCheckinGroup = () => {
  checkinGroupExpanded.value = !checkinGroupExpanded.value
}

const navigateTo = (url) => {
  emit('close')
  uni.navigateTo({ url })
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0; left: 0;
  width: 33.33vw;
  max-width: 320rpx;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.sidebar-show {
  transform: translateX(0);
}

.sidebar-profile {
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  margin-bottom: 16rpx;
  flex-shrink: 0;
}
.sidebar-profile-main {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}
.sidebar-avatar {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  flex-shrink: 0;
}
.sidebar-profile-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.sidebar-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}
.sidebar-meta {
  font-size: 22rpx;
  color: #666;
  line-height: 1.4;
}
.sidebar-class {
  font-size: 20rpx;
  color: #999;
  line-height: 1.4;
}
.sidebar-follow-row {
  display: flex;
  align-items: center;
}
.follow-item {
  display: flex;
  align-items: center;
  gap: 6rpx;
}
.follow-num {
  font-size: 24rpx;
  font-weight: 600;
  color: #10b981;
}
.follow-label {
  font-size: 22rpx;
  color: #666;
}
.follow-divider {
  width: 1rpx;
  height: 24rpx;
  background-color: #e0e0e0;
  margin: 0 20rpx;
}

.sidebar-menu {
  flex: 1;
  width: 100%;
  height: calc(100vh - 200rpx);
}
.menu-group { margin-bottom: 8rpx; }
.menu-item {
  display: flex;
  align-items: center;
  padding: 16rpx 8rpx;
  border-radius: 12rpx;
  gap: 12rpx;
  transition: background-color 0.15s;
}
.menu-item:active { background-color: #f0f0f0; }
.menu-icon {
  font-size: 28rpx;
  flex-shrink: 0;
}
.menu-label {
  font-size: 26rpx;
  color: #333;
  flex: 1;
}
.menu-arrow {
  font-size: 20rpx;
  color: #999;
  flex-shrink: 0;
}
.sub-menu { padding-left: 16rpx; }
.sub-item { padding: 12rpx 8rpx; }
.sub-item .menu-label { font-size: 24rpx; color: #555; }
</style>
