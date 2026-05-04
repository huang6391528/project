/**
 * 绿动校园 - 前端入口
 *
 * 低碳环保的校园生活应用
 */

// 引入 Vue
import { createSSRApp } from 'vue'
import App from './App.vue'

// 引入 Pinia
import { createPinia } from 'pinia'
import pinia, { useUserStore } from './stores'

// 引入全局样式
import './static/iconfont.css'

// 创建应用实例
export function createApp() {
  const app = createSSRApp(App)

  // 安装 Pinia
  app.use(pinia)

// 初始化用户状态
const userStore = useUserStore()
userStore.init()

  return {
    app
  }
}
