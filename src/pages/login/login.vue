<template>
  <view class="login-page">
    <view class="login-body">
      <!-- 品牌区 -->
      <view class="brand">
        <view class="brand-icon-wrap">
          <text class="iconfont icon-leaf brand-leaf"></text>
        </view>
        <text class="brand-title">绿动校园</text>
        <text class="brand-sub">绿色校园、低碳生活</text>
      </view>

      <!-- 表单 -->
      <view class="form-block">
        <text class="field-label">手机号码</text>
        <input
          class="field-input field-input-gray"
          type="number"
          maxlength="11"
          placeholder="+86 输入手机号"
          placeholder-class="ph"
          v-model="phone"
        />

        <text class="field-label">验证码</text>
        <view class="code-row">
          <input
            class="field-input field-input-code"
            type="number"
            maxlength="6"
            placeholder="输入6位验证码"
            placeholder-class="ph"
            v-model="code"
          />
          <button
            class="send-btn"
            :disabled="countdown > 0"
            hover-class="send-btn-hover"
            @click="onSendCode"
          >
            {{ countdown > 0 ? countdown + 's' : '发送验证码' }}
          </button>
        </view>

        <button class="login-btn" hover-class="login-btn-hover" @click="onLogin">
          立即登录
        </button>
      </view>

      <!-- 校园认证卡片 -->
      <view class="campus-card">
        <view class="campus-card-head">
          <text class="campus-card-title">校园实名认证</text>
          <text class="campus-tag">未认证</text>
        </view>
        <text class="campus-desc">
          认证学生身份，解锁专属碳积分加成、校园竞赛及奖学金兑换资格。
        </text>
        <view class="agree-row" @click="toggleAgree">
          <view class="checkbox" :class="{ checked: agreed }">
            <text v-if="agreed" class="check-mark">✓</text>
          </view>
          <text class="agree-text">
            我已阅读并同意《用户服务协议》与《隐私保护政策》
          </text>
        </view>
        <button class="auth-btn" hover-class="auth-btn-hover" @click="onCampusAuth">
          立即认证
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { STORAGE_LOGGED_IN } from '@/constants.js'

let phone = ref('12345600000')
let code = ref('123456')
let countdown = ref(0)
let timer = null
let agreed = ref(false)

onLoad(() => {
  if (uni.getStorageSync(STORAGE_LOGGED_IN)) {
    uni.reLaunch({ url: '/pages/index/index' })
  }
})

onUnload(() => {
  clearTimer()
})

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function onSendCode() {
  if (countdown.value > 0) return
  const p = String(phone.value || '').trim()
  if (!/^1\d{10}$/.test(p)) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }
  uni.showToast({ title: '验证码已发送', icon: 'success', duration: 1200 })
  countdown.value = 60
  clearTimer()
  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearTimer()
    }
  }, 1000)
}

function toggleAgree() {
  agreed.value = !agreed.value
}

function onLogin() {
  if (!agreed.value) {
    uni.showToast({ title: '请先勾选用户协议', icon: 'none' })
    return
  }
  const p = String(phone.value || '').trim()
  const c = String(code.value || '').trim()
  if (p !== '12345600000') {
    uni.showToast({ title: '手机号不正确', icon: 'none' })
    return
  }
  if (c !== '123456') {
    uni.showToast({ title: '验证码不正确', icon: 'none' })
    return
  }
  uni.setStorageSync(STORAGE_LOGGED_IN, true)
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => {
    uni.reLaunch({ url: '/pages/index/index' })
  }, 400)
}

function onCampusAuth() {
  uni.showToast({ title: '校园认证即将开放', icon: 'none' })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f8fafc;
  box-sizing: border-box;
}

.login-body {
  padding: 80rpx 48rpx 80rpx;
}

/* 品牌 */
.brand {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 72rpx;
}

.brand-icon-wrap {
  width: 120rpx;
  height: 120rpx;
  border-radius: 28rpx;
  background: linear-gradient(145deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpx 40rpx rgba(16, 185, 129, 0.35);
  margin-bottom: 32rpx;
}

.brand-leaf {
  font-size: 64rpx;
  color: #fff;
}

.brand-title {
  font-size: 44rpx;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12rpx;
}

.brand-sub {
  font-size: 26rpx;
  color: #6b7280;
}

/* 表单 */
.form-block {
  margin-bottom: 48rpx;
}

.field-label {
  display: block;
  font-size: 24rpx;
  color: #9ca3af;
  margin-bottom: 16rpx;
  margin-top: 28rpx;
}

.field-label:first-of-type {
  margin-top: 0;
}

.field-input {
  width: 100%;
  height: 96rpx;
  border-radius: 24rpx;
  padding: 0 28rpx;
  font-size: 30rpx;
  color: #111827;
  box-sizing: border-box;
}

.field-input-gray {
  background: #f3f4f6;
  border: 2rpx solid transparent;
}

.field-input-code {
  flex: 1;
  min-width: 0;
  background: #fff;
  border: 2rpx solid #10b981;
  margin-right: 20rpx;
}

.ph {
  color: #9ca3af;
}

.code-row {
  display: flex;
  align-items: center;
}

.send-btn {
  flex-shrink: 0;
  height: 96rpx;
  line-height: 96rpx;
  padding: 0 28rpx;
  font-size: 26rpx;
  color: #10b981;
  background: #ecfdf5;
  border-radius: 24rpx;
  border: none;
  margin: 0;
}

.send-btn::after {
  border: none;
}

.send-btn[disabled] {
  color: #6ee7b7;
  background: #f0fdf4;
}

.send-btn-hover {
  opacity: 0.88;
}

.login-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  margin-top: 56rpx;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  font-size: 32rpx;
  font-weight: 600;
  border-radius: 48rpx;
  border: none;
  box-shadow: 0 12rpx 32rpx rgba(16, 185, 129, 0.35);
}

.login-btn::after {
  border: none;
}

.login-btn-hover {
  opacity: 0.92;
}

/* 校园认证卡片 */
.campus-card {
  background: linear-gradient(180deg, #ecfdf5 0%, #f0fdf4 100%);
  border-radius: 32rpx;
  padding: 36rpx 32rpx 40rpx;
  border: 2rpx solid #a7f3d0;
}

.campus-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.campus-card-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #065f46;
}

.campus-tag {
  font-size: 22rpx;
  color: #059669;
  background: rgba(16, 185, 129, 0.15);
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
}

.campus-desc {
  display: block;
  font-size: 24rpx;
  color: #047857;
  line-height: 1.55;
  margin-bottom: 28rpx;
}

.agree-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 32rpx;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border-radius: 8rpx;
  border: 2rpx solid #10b981;
  margin-right: 16rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.checkbox.checked {
  background: #10b981;
}

.check-mark {
  color: #fff;
  font-size: 22rpx;
  font-weight: bold;
  line-height: 1;
}

.agree-text {
  flex: 1;
  font-size: 24rpx;
  color: #6b7280;
  line-height: 1.5;
}

.auth-btn {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #10b981;
  color: #fff;
  font-size: 28rpx;
  font-weight: 600;
  border-radius: 44rpx;
  border: none;
}

.auth-btn::after {
  border: none;
}

.auth-btn-hover {
  opacity: 0.9;
}
</style>
