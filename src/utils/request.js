/**
 * HTTP 请求封装
 * 基于 uni.request 封装，提供统一的请求拦截和错误处理
 */
import { getBaseUrl } from '../config'
import { getStorage, TOKEN_KEY } from './storage'

// 请求配置
const DEFAULT_CONFIG = {
  timeout: 30000,
  header: {
    'Content-Type': 'application/json'
  }
}

// 响应码
const RESPONSE_CODE = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

class Request {
  constructor() {
    this.baseUrl = getBaseUrl()
    this.interceptors = {
      request: [],
      response: []
    }
  }

  /**
   * 添加请求拦截器
   * @param {Function} interceptor - 拦截器函数
   */
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor)
  }

  /**
   * 添加响应拦截器
   * @param {Function} interceptor - 拦截器函数
   */
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor)
  }

  /**
   * 执行请求拦截器链
   * @param {Array} interceptors - 拦截器列表
   * @param {Object} config - 配置对象
   * @returns {Object} 处理后的配置
   */
  async executeInterceptors(interceptors, config) {
    let result = config
    for (const interceptor of interceptors) {
      result = await interceptor(result)
    }
    return result
  }

  /**
   * 构建完整 URL
   * @param {string} url - 请求路径
   * @returns {string} 完整 URL
   */
  buildUrl(url) {
    if (url.startsWith('http')) {
      return url
    }
    return `${this.baseUrl}${url}`
  }

  /**
   * 构建请求头
   * @param {Object} header - 自定义请求头
   * @returns {Object} 合并后的请求头
   */
  buildHeader(header = {}) {
    const defaultHeader = { ...DEFAULT_CONFIG.header }
    const token = getStorage(TOKEN_KEY)

    if (token) {
      defaultHeader['Authorization'] = `Bearer ${token}`
    }

    return { ...defaultHeader, ...header }
  }

  /**
   * 发起请求
   * @param {Object} config - 请求配置
   * @returns {Promise} 请求结果
   */
  async request(config) {
    // 执行请求拦截器
    let processedConfig = await this.executeInterceptors(
      this.interceptors.request,
      config
    )

    const {
      url,
      method = 'GET',
      data,
      header = {},
      timeout = DEFAULT_CONFIG.timeout
    } = processedConfig

    const fullUrl = this.buildUrl(url)
    const mergedHeader = this.buildHeader(header)

    return new Promise((resolve, reject) => {
      uni.request({
        url: fullUrl,
        method,
        data,
        header: mergedHeader,
        timeout,
        success: async (res) => {
          try {
            // 执行响应拦截器
            const processedResponse = await this.executeInterceptors(
              this.interceptors.response,
              res
            )

            const { statusCode, data: responseData } = processedResponse

            if (statusCode === RESPONSE_CODE.SUCCESS) {
              resolve(responseData)
            } else if (statusCode === RESPONSE_CODE.UNAUTHORIZED) {
              // Token 过期，触发重新登录
              uni.$emit(' unauthorized')
              reject(new Error('登录已过期，请重新登录'))
            } else if (statusCode === RESPONSE_CODE.FORBIDDEN) {
              reject(new Error('无权限访问'))
            } else if (statusCode === RESPONSE_CODE.NOT_FOUND) {
              reject(new Error('请求资源不存在'))
            } else if (statusCode >= RESPONSE_CODE.SERVER_ERROR) {
              reject(new Error('服务器错误'))
            } else {
              // 其他业务错误
              reject(responseData)
            }
          } catch (error) {
            reject(error)
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '网络请求失败',
            icon: 'none'
          })
          reject(err)
        }
      })
    })
  }

  /**
   * GET 请求
   * @param {Object} config - 请求配置
   * @returns {Promise}
   */
  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  /**
   * POST 请求
   * @param {Object} config - 请求配置
   * @returns {Promise}
   */
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  /**
   * PUT 请求
   * @param {Object} config - 请求配置
   * @returns {Promise}
   */
  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }

  /**
   * DELETE 请求
   * @param {Object} config - 请求配置
   * @returns {Promise}
   */
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  /**
   * 上传文件
   * @param {Object} config - 上传配置 { url, filePath, name, formData }
   * @returns {Promise}
   */
  upload(config) {
    const { url, filePath, name = 'file', formData = {} } = config
    const fullUrl = this.buildUrl(url)
    const token = getStorage(TOKEN_KEY)
    const header = token ? { Authorization: `Bearer ${token}` } : {}

    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: fullUrl,
        filePath,
        name,
        formData,
        header,
        success: (res) => {
          const data = JSON.parse(res.data)
          if (res.statusCode === 200) {
            resolve(data)
          } else {
            reject(new Error(data.message || '上传失败'))
          }
        },
        fail: (err) => {
          uni.showToast({
            title: '上传失败',
            icon: 'none'
          })
          reject(err)
        }
      })
    })
  }
}

// 创建单例
const requestInstance = new Request()

// 添加默认请求拦截器
requestInstance.addRequestInterceptor((config) => {
  // 显示加载提示（可配置）
  if (config.showLoading !== false) {
    uni.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  return config
})

// 添加默认响应拦截器
requestInstance.addResponseInterceptor((response) => {
  uni.hideLoading()
  return response
})

export default requestInstance
