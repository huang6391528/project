<script setup>
const STORAGE_LOGGED_IN = 'CARBON_CAMPUS_LOGGED_IN'

onLaunch(() => {
  console.log('App Launch')
  if (uni.getStorageSync(STORAGE_LOGGED_IN)) {
    uni.reLaunch({ url: '/pages/index/index' })
  } else {
    uni.reLaunch({ url: '/pages/login/login' })
  }
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
@import url('./static/iconfont.css');

page {
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.no-scrollbar ::-webkit-scrollbar {
  display: none;
}

.tree-anim {
  animation: tree-sway 3s ease-in-out infinite;
}

@keyframes tree-sway {
  0%, 100% { transform: rotate(-2deg) scale(1); }
  50% { transform: rotate(2deg) scale(1.05); }
}

.fire-anim {
  animation: fire-flicker 1s ease-in-out infinite;
}

@keyframes fire-flicker {
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.2); }
}

.path-anim {
  stroke-dasharray: 1000;
  animation: dash 5s linear infinite;
}

@keyframes dash {
  to { stroke-dashoffset: 0; }
}

.action-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 1) 100%);
}
</style>
