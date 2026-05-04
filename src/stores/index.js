/**
 * Store 统一导出
 */
import { createPinia } from 'pinia'

// 创建 Pinia 实例
const pinia = createPinia()

// 安装 Pinia
export function setupPinia(app) {
  app.use(pinia)
}

// 导出各 Store
export { useUserStore } from './user'
export { useAppStore } from './app'

export default pinia
