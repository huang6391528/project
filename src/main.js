import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia, { useUserStore } from './stores'

import './static/iconfont.css'
import './styles/theme.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)

  const userStore = useUserStore()
  userStore.init()

  return {
    app
  }
}
