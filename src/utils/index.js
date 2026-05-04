/**
 * 工具函数统一导出
 */
export { default as request } from './request'
export * from './storage'
export * from './validate'
export * from './format'

/**
 * 防抖函数
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} fn - 要节流的函数
 * @param {number} delay - 间隔时间(ms)
 * @returns {Function}
 */
export function throttle(fn, delay = 300) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 深拷贝
 * @param {*} obj - 要拷贝的对象
 * @returns {*}
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  }

  const cloned = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

/**
 * 判断是否为对象
 * @param {*} obj - 要检查的值
 * @returns {boolean}
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * 生成随机字符串
 * @param {number} length - 长度
 * @returns {string}
 */
export function randomString(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成 UUID
 * @returns {string}
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 等待指定时间
 * @param {number} ms - 毫秒
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 获取操作系统类型
 * @returns {string}
 */
export function getOS() {
  const ua = uni.getSystemInfoSync().platform.toLowerCase()
  if (ua.includes('android')) return 'android'
  if (ua.includes('ios')) return 'ios'
  if (ua.includes('windows')) return 'windows'
  if (ua.includes('mac')) return 'mac'
  return 'other'
}

/**
 * 获取平台类型
 * @returns {string}
 */
export function getPlatform() {
  // #ifdef H5
  return 'h5'
  // #endif
  // #ifdef MP-WEIXIN
  return 'mp-weixin'
  // #endif
  // #ifdef APP-PLUS
  return 'app-plus'
  // #endif
  return 'unknown'
}

/**
 * 检查是否为生产环境
 * @returns {boolean}
 */
export function isProd() {
  return process.env.NODE_ENV === 'production'
}

/**
 * 安全地解析 JSON
 * @param {string} str - JSON 字符串
 * @param {*} defaultValue - 默认值
 * @returns {*}
 */
export function safeJsonParse(str, defaultValue = null) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return defaultValue
  }
}

/**
 * 安全地获取对象属性
 * @param {Object} obj - 对象
 * @param {string} path - 属性路径
 * @param {*} defaultValue - 默认值
 * @returns {*}
 */
export function get(obj, path, defaultValue = undefined) {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue
    }
    result = result[key]
  }

  return result ?? defaultValue
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 文本
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    // #ifdef H5
    await navigator.clipboard.writeText(text)
    // #endif
    // #ifdef MP-WEIXIN
    uni.setClipboardData({
      data: text
    })
    // #endif
    return true
  } catch (e) {
    console.error('[Utils] Copy to clipboard failed:', e)
    return false
  }
}
