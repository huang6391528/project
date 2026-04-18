<template>
  <view v-if="show" class="invite-modal-mask" @click="emit('close')">
    <view class="invite-modal-box" @click.stop>
      <view class="invite-modal-header">
        <text class="invite-modal-title">邀请码</text>
        <view class="invite-close-btn" @click="emit('close')">✕</view>
      </view>
      <text class="invite-modal-desc">输入好友邀请码，加入班级或打卡团</text>
      <view class="invite-input-wrap">
        <input
          class="invite-input"
          v-model="code"
          placeholder="请输入邀请码"
          placeholder-class="invite-placeholder"
          maxlength="20"
          focus
        />
      </view>
      <view class="invite-modal-actions">
        <view class="invite-btn invite-btn-cancel" @click="emit('close')">取消</view>
        <view class="invite-btn invite-btn-confirm" @click="confirm">确认</view>
      </view>
    </view>
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

const emit = defineEmits(['close', 'confirm'])

const code = ref('')

const confirm = () => {
  if (!code.value.trim()) {
    uni.showToast({ title: '请输入邀请码', icon: 'none' })
    return
  }
  emit('confirm', code.value.trim())
  emit('close')
}
</script>

<style scoped>
.invite-modal-mask {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invite-modal-box {
  width: 560rpx;
  background-color: #fff;
  border-radius: 40rpx;
  padding: 52rpx 44rpx 44rpx;
  animation: fadeInUp 0.22s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30rpx); }
  to   { opacity: 1; transform: translateY(0); }
}

.invite-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14rpx;
}

.invite-modal-title {
  font-size: 38rpx;
  font-weight: 700;
  color: #111827;
  letter-spacing: 1rpx;
}

.invite-close-btn {
  width: 52rpx; height: 52rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  color: #9ca3af;
  cursor: pointer;
}

.invite-modal-desc {
  font-size: 24rpx;
  color: #9ca3af;
  display: block;
  margin-bottom: 40rpx;
}

.invite-input-wrap {
  background-color: #f9fafb;
  border: 1.5rpx solid #e5e7eb;
  border-radius: 20rpx;
  padding: 0 28rpx;
  height: 92rpx;
  display: flex;
  align-items: center;
  margin-bottom: 44rpx;
  transition: border-color 0.15s;
}

.invite-input-wrap:focus-within {
  border-color: #10b981;
}

.invite-input {
  flex: 1;
  height: 100%;
  font-size: 32rpx;
  color: #111827;
  background-color: transparent;
  letter-spacing: 2rpx;
}

.invite-placeholder { color: #d1d5db; }

.invite-modal-actions {
  display: flex;
  gap: 20rpx;
}

.invite-btn {
  flex: 1;
  height: 92rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 46rpx;
  font-size: 30rpx;
  font-weight: 600;
  cursor: pointer;
}

.invite-btn-cancel {
  background-color: #f3f4f6;
  color: #6b7280;
}

.invite-btn-confirm {
  background-color: #10b981;
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.38);
}

.invite-btn-confirm:active {
  background-color: #059669;
}
</style>
