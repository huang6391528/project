/**
 * 环境配置
 * 根据不同环境导出对应的配置
 */

// 开发环境配置
const devConfig = {
  env: 'development',
  apiBaseUrl: 'http://localhost:3000/api',
  uploadUrl: 'http://localhost:3000/upload',
  websocketUrl: 'ws://localhost:3000/ws',
  enableLog: true,
  mock: false
}

// 生产环境配置
const prodConfig = {
  env: 'production',
  apiBaseUrl: 'https://api.carbon-campus.com/api',
  uploadUrl: 'https://api.carbon-campus.com/upload',
  websocketUrl: 'wss://api.carbon-campus.com/ws',
  enableLog: false,
  mock: false
}

// 当前环境配置
const currentConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

export default currentConfig

// 各环境的 API 地址
export const API_BASE_URL = currentConfig.apiBaseUrl
export const UPLOAD_URL = currentConfig.uploadUrl
export const WEBSOCKET_URL = currentConfig.websocketUrl

// 是否启用日志
export const ENABLE_LOG = currentConfig.enableLog

// 是否使用 Mock 数据
export const USE_MOCK = currentConfig.mock

// 环境名称
export const ENV = currentConfig.env

// 是否为开发环境
export const IS_DEV = ENV === 'development'

// 是否为生产环境
export const IS_PROD = ENV === 'production'
