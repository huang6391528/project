<template>
  <view class="page-settings">




    <view class="content">
      <!-- 用户简要信息 -->
      <view class="user-card" @tap="goToProfile">
        <image 
          class="user-avatar" 
          src="/static/tabbar/profile.jpg"
          mode="aspectFill"
        ></image>
        <view class="user-info">
          <text class="user-name">陈同学</text>
          <text class="user-id">贵州大学 · 经济学院</text>
        </view>
        <text class="arrow">›</text>
      </view>

      <!-- 账号安全模块 -->
      <view class="section-label">账号安全</view>
      <view class="settings-card">
        <view class="list-item" @tap="goToSecurity">
          <view class="item-icon bg-blue">
            <text class="icon-emoji">🔐</text>
          </view>
          <view class="item-content">
            <text class="item-title">修改登录密码</text>
            <text class="item-sub">支持原密码验证修改</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="list-item" @tap="goToSecurity">
          <view class="item-icon bg-green">
            <text class="icon-emoji">📱</text>
          </view>
          <view class="item-content">
            <text class="item-title">手机号管理</text>
            <text class="item-sub">138****8888</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="list-item" @tap="goToSecurity">
          <view class="item-icon bg-red">
            <text class="icon-emoji">⚠️</text>
          </view>
          <view class="item-content">
            <text class="item-title danger">账号注销</text>
            <text class="item-sub light">数据与积分永久清空</text>
          </view>
          <text class="arrow light">›</text>
        </view>
      </view>

      <!-- 个人信息管理模块 -->
      <view class="section-label">信息管理</view>
      <view class="settings-card">
        <view class="list-item" @tap="goToProfile">
          <view class="item-icon bg-purple">
            <text class="icon-emoji">✏️</text>
          </view>
          <view class="item-content">
            <text class="item-title">编辑个人资料</text>
            <text class="item-sub">修改头像、昵称、签名</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="list-item" @tap="showToast('校园认证')">
          <view class="item-icon bg-orange">
            <text class="icon-emoji">🎓</text>
          </view>
          <view class="item-content">
            <text class="item-title">校园认证</text>
            <text class="item-sub success">已认证 (贵州大学/20220101)</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="list-item" @tap="showToast('设备与应用绑定')">
          <view class="item-icon bg-cyan">
            <text class="icon-emoji">⌚</text>
          </view>
          <view class="item-content">
            <text class="item-title">设备与应用绑定</text>
            <text class="item-sub">同步运动与健康数据</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 通用设置 -->
      <view class="section-label">通用设置</view>
      <view class="settings-card">
        <view class="list-item" @tap="showToast('隐私设置')">
          <view class="item-icon bg-gray">
            <text class="icon-emoji">👁️</text>
          </view>
          <view class="item-content">
            <text class="item-title">隐私设置</text>
            <text class="item-sub">管理授权与个性化推荐</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="list-item" @tap="showToast('通知设置')">
          <view class="item-icon bg-gray">
            <text class="icon-emoji">🔔</text>
          </view>
          <view class="item-content">
            <text class="item-title">通知设置</text>
            <text class="item-sub">活动通知、账户通知开关</text>
          </view>
          <text class="arrow">›</text>
        </view>
        <view class="list-item" @tap="clearCache">
          <view class="item-icon bg-gray">
            <text class="icon-emoji">🧹</text>
          </view>
          <view class="item-content">
            <text class="item-title">清除缓存</text>
            <text class="item-sub">{{ cacheText }}</text>
          </view>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 关于模块 -->
      <view class="settings-card">
        <view class="list-item" @tap="goToAbout">
          <view class="item-icon bg-gray">
            <text class="icon-emoji">ℹ️</text>
          </view>
          <view class="item-content">
            <text class="item-title">关于平台</text>
            <text class="item-sub">介绍、协议及版本信息</text>
          </view>
          <view class="item-right">
            <text class="version">v2.4.0</text>
            <text class="arrow">›</text>
          </view>
        </view>
      </view>

      <!-- 退出按钮 -->
      <view class="logout-btn" @tap="showLogoutModal">
        <text>退出登录</text>
      </view>
    </view>

    <!-- 退出确认弹窗 -->
    <view class="modal-overlay" v-if="logoutModalVisible" @tap="hideLogoutModal">
      <view class="modal-card" @tap.stop>
        <view class="modal-icon">🚪</view>
        <text class="modal-title">确认退出当前账号？</text>
        <text class="modal-desc">退出后，部分功能将无法使用，你需要重新登录。</text>
        <view class="modal-actions">
          <view class="modal-btn cancel" @tap="hideLogoutModal">取消</view>
          <view class="modal-btn confirm" @tap="confirmLogout">确定退出</view>
        </view>
      </view>
    </view>

    <!-- Toast 提示 -->
    <view class="toast-message" v-if="toastVisible">
      <text class="toast-icon">✓</text>
      <text>{{ toastMsg }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 缓存文本
const cacheText = ref('已使用 128.5 MB')

// 退出弹窗
const logoutModalVisible = ref(false)

// Toast
const toastVisible = ref(false)
const toastMsg = ref('')

// 返回上一页
function goBack() {
  uni.navigateBack()
}



// 跳转安全页面
function goToSecurity() {
  uni.navigateTo({
    url: '/pages/profile/security'
  })
}

// 跳转关于页面
function goToAbout() {
  uni.navigateTo({
    url: '/pages/profile/about'
  })
}

// 显示提示
function showToast(msg) {
  uni.showToast({ title: msg + '开发中', icon: 'none' })
}

// 清除缓存
function clearCache() {
  cacheText.value = '正在清理...'
  setTimeout(() => {
    cacheText.value = '已使用 0 KB'
    showCustomToast('缓存清理成功')
  }, 1500)
}

// 自定义 Toast
function showCustomToast(msg) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

// 显示退出弹窗
function showLogoutModal() {
  logoutModalVisible.value = true
}

// 隐藏退出弹窗
function hideLogoutModal() {
  logoutModalVisible.value = false
}

// 确认退出
function confirmLogout() {
  hideLogoutModal()
  uni.showToast({ title: '已成功退出账号', icon: 'success' })
  // 这里可以添加跳转到登录页的逻辑
  // uni.reLaunch({ url: '/pages/login/login' })
}
</script>

<style scoped>
.page-settings {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 40rpx 10rpx;
  background-color: #f9fafb;
  position: sticky;
  top: 0;
  z-index: 20;
}

.time {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}

.status-icons {
  display: flex;
  gap: 6rpx;
}

/* 导航栏 */
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  background-color: #f9fafb;
  border-bottom: 1rpx solid #f3f4f6;
  position: sticky;
  top: 80rpx;
  z-index: 20;
}

.nav-back {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 48rpx;
  color: #1f2937;
}

.nav-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #1f2937;
}

.nav-placeholder {
  width: 80rpx;
}

/* 内容区 */
.content {
  padding: 16rpx 32rpx 60rpx;
}

/* 用户卡片 */
.user-card {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 32rpx;
  padding: 32rpx;
  margin-bottom: 48rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  transition: transform 0.1s;
}

.user-card:active {
  transform: scale(0.98);
}

.user-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  margin-right: 32rpx;
}

.user-info {
  flex: 1;
}

.user-name {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8rpx;
}

.user-id {
  font-size: 28rpx;
  color: #9ca3af;
}

.arrow {
  font-size: 48rpx;
  color: #d1d5db;
}

/* 分区标签 */
.section-label {
  font-size: 26rpx;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 1rpx;
  margin-bottom: 16rpx;
  margin-left: 8rpx;
  margin-top: 48rpx;
}

.section-label:first-of-type {
  margin-top: 0;
}

/* 设置卡片 */
.settings-card {
  background-color: #ffffff;
  border-radius: 32rpx;
  overflow: hidden;
  margin-bottom: 0;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.list-item {
  display: flex;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f3f4f6;
  transition: background-color 0.15s;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:active {
  background-color: #f3f4f6;
}

.item-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32rpx;
}

.item-icon.bg-blue { background-color: #eff6ff; }
.item-icon.bg-green { background-color: #f0fdf4; }
.item-icon.bg-red { background-color: #fef2f2; }
.item-icon.bg-purple { background-color: #f5f3ff; }
.item-icon.bg-orange { background-color: #fff7ed; }
.item-icon.bg-cyan { background-color: #ecfeff; }
.item-icon.bg-gray { background-color: #f3f4f6; }

.icon-emoji {
  font-size: 40rpx;
}

.item-content {
  flex: 1;
}

.item-title {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 6rpx;
}

.item-title.danger {
  color: #ef4444;
}

.item-sub {
  font-size: 24rpx;
  color: #9ca3af;
}

.item-sub.success {
  color: #10b981;
}

.item-sub.light {
  opacity: 0.6;
}

.arrow.light {
  opacity: 0.3;
}

.item-right {
  display: flex;
  align-items: center;
}

.version {
  font-size: 24rpx;
  color: #d1d5db;
  margin-right: 16rpx;
}

/* 退出按钮 */
.logout-btn {
  background-color: #ffffff;
  border-radius: 32rpx;
  padding: 34rpx;
  text-align: center;
  color: #ef4444;
  font-size: 32rpx;
  font-weight: 700;
  margin-top: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  transition: transform 0.1s;
}

.logout-btn:active {
  transform: scale(0.98);
}

/* 弹窗遮罩 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 64rpx;
}

.modal-card {
  background-color: #ffffff;
  border-radius: 48rpx;
  width: 100%;
  max-width: 600rpx;
  overflow: hidden;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-icon {
  font-size: 64rpx;
  text-align: center;
  margin-top: 64rpx;
  margin-bottom: 32rpx;
}

.modal-title {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 16rpx;
}

.modal-desc {
  display: block;
  font-size: 28rpx;
  color: #6b7280;
  text-align: center;
  padding: 0 32rpx;
  margin-bottom: 48rpx;
}

.modal-actions {
  display: flex;
  border-top: 1rpx solid #f3f4f6;
}

.modal-btn {
  flex: 1;
  padding: 34rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
  transition: background-color 0.15s;
}

.modal-btn.cancel {
  color: #6b7280;
  border-right: 1rpx solid #f3f4f6;
}

.modal-btn.cancel:active {
  background-color: #f9fafb;
}

.modal-btn.confirm {
  color: #ef4444;
  font-weight: 700;
}

.modal-btn.confirm:active {
  background-color: #f9fafb;
}

/* Toast */
.toast-message {
  position: fixed;
  bottom: 160rpx;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1f2937;
  padding: 24rpx 48rpx;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
  z-index: 1100;
  color: #ffffff;
  font-size: 28rpx;
}

.toast-icon {
  color: #4ade80;
  font-size: 32rpx;
  font-weight: 700;
}
</style>