/**
 * 配置统一导出
 */
import envConfig from './env'
import apiConfig from './api'

export const getBaseUrl = () => envConfig.apiBaseUrl

export { envConfig, apiConfig }

export default {
  ...envConfig,
  ...apiConfig
}
