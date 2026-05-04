/**
 * src/index.js - 统一导出入口
 *
 * 本文件提供对各模块的统一导入
 * 使用方式：
 * import { UserService, RunService } from '@/index'
 */

// 服务层
export { default as UserService } from './services/UserService'
export { default as RunService } from './services/RunService'
export { default as ActionService } from './services/ActionService'
export { default as StoreService } from './services/StoreService'

// API 层
export * from './api'

// Store
export { useUserStore, useAppStore } from './stores'

// 工具函数
export {
  request,
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  getToken,
  setToken,
  removeToken,
  validate,
  validateField,
  validateAsync,
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatDistance,
  formatDuration,
  formatCarbon,
  formatPhone,
  truncate,
  debounce,
  throttle,
  deepClone,
  uuid,
  sleep,
  getOS,
  getPlatform,
  isProd,
  safeJsonParse,
  get as getValue,
  copyToClipboard
} from './utils'

// 配置
export { default as envConfig, apiConfig } from './config'
export { getBaseUrl } from './config'
