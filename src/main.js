import { createSSRApp } from 'vue'
import App from './App'
import './static/iconfont.css'

export function createApp() {
  const app = createSSRApp(App)
  app.config.productionTip = false
  return {
    app
  }
}
