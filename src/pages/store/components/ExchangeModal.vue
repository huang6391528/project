<template>
  <view v-if="show" class="modal-overlay" @click="emit('close')">
    <view class="modal-box" @click.stop>
      <view class="modal-icon-wrap">
        <text class="modal-icon">🌿</text>
      </view>
      <text class="modal-title">兑换确认</text>
      <text class="modal-desc">您将使用 <text class="modal-credits">{{ credits }}</text> 积分兑换</text>
      <text class="modal-item-name">{{ itemName }}</text>
      <view class="modal-btns">
        <view class="modal-btn-cancel" @click="emit('close')">取消</view>
        <view class="modal-btn-confirm" @click="confirm">确认兑换</view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: false },
  itemName: { type: String, default: '' },
  credits: { type: [String, Number], default: 0 },
})

const emit = defineEmits(['close', 'confirm'])

const confirm = () => {
  emit('confirm')
  emit('close')
}
</script>

<style scoped>
.modal-overlay { position: fixed; inset: 0; background-color: rgba(0,0,0,0.6); z-index: 999; display: flex; align-items: center; justify-content: center; padding: 60rpx; }
.modal-box { background-color: #fff; border-radius: 40rpx; padding: 48rpx 40rpx; width: 100%; text-align: center; box-shadow: 0 20rpx 60rpx rgba(0,0,0,0.2); }
.modal-icon-wrap { width: 120rpx; height: 120rpx; background-color: #ecfdf5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24rpx; }
.modal-icon { font-size: 60rpx; }
.modal-title { display: block; font-size: 34rpx; font-weight: bold; color: #1f2937; }
.modal-desc { display: block; font-size: 26rpx; color: #6b7280; margin-top: 12rpx; }
.modal-credits { color: #059669; font-weight: bold; }
.modal-item-name { display: block; font-size: 28rpx; font-weight: 500; color: #111827; margin-top: 8rpx; }
.modal-btns { display: flex; gap: 20rpx; margin-top: 40rpx; }
.modal-btn-cancel { flex: 1; background-color: #f3f4f6; color: #6b7280; font-size: 28rpx; font-weight: bold; padding: 24rpx 0; border-radius: 20rpx; text-align: center; }
.modal-btn-confirm { flex: 1; background-color: #10b981; color: #fff; font-size: 28rpx; font-weight: bold; padding: 24rpx 0; border-radius: 20rpx; text-align: center; }
</style>
