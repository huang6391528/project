/**
 * 格式化工具函数
 */

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化日期（相对时间）
 * @param {Date|string|number} date - 日期
 * @returns {string} 相对时间字符串
 */
export function formatRelativeTime(date) {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const now = new Date()
  const diff = now - d

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  if (days < 30) return `${Math.floor(days / 7)}周前`
  if (days < 365) return `${Math.floor(days / 30)}个月前`

  return formatDate(date, 'YYYY-MM-DD')
}

/**
 * 格式化数字（添加千分位）
 * @param {number} num - 数字
 * @param {number} decimals - 小数位数
 * @returns {string}
 */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return ''

  const n = Number(num)
  if (isNaN(n)) return ''

  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

/**
 * 格式化距离
 * @param {number} meters - 米
 * @returns {string}
 */
export function formatDistance(meters) {
  if (meters < 1000) {
    return `${Math.round(meters)}m`
  }
  return `${(meters / 1000).toFixed(2)}km`
}

/**
 * 格式化时长
 * @param {number} seconds - 秒数
 * @returns {string}
 */
export function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds}秒`
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes < 60) {
    return remainingSeconds > 0
      ? `${minutes}分${remainingSeconds}秒`
      : `${minutes}分钟`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes > 0) {
    return `${hours}小时${remainingMinutes}分钟`
  }
  return `${hours}小时`
}

/**
 * 格式化时长（时分秒）
 * @param {number} seconds - 秒数
 * @returns {string} HH:MM:SS 格式
 */
export function formatDurationHMS(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  return [h, m, s]
    .map((v) => String(v).padStart(2, '0'))
    .join(':')
}

/**
 * 格式化碳减排量
 * @param {number} kg - 千克
 * @returns {string}
 */
export function formatCarbon(kg) {
  if (kg < 1) {
    return `${Math.round(kg * 1000)}g`
  }
  if (kg < 1000) {
    return `${kg.toFixed(2)}kg`
  }
  return `${(kg / 1000).toFixed(2)}t`
}

/**
 * 格式化手机号（中间加密）
 * @param {string} phone - 手机号
 * @returns {string}
 */
export function formatPhone(phone) {
  if (!phone) return ''
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化昵称（中间加密）
 * @param {string} name - 昵称
 * @returns {string}
 */
export function formatName(name) {
  if (!name) return ''
  if (name.length <= 1) return name
  if (name.length === 2) return `${name[0]}*`
  return `${name.slice(0, 1)}${'*'.repeat(name.length - 2)}${name.slice(-1)}`
}

/**
 * 截断文本
 * @param {string} text - 文本
 * @param {number} length - 最大长度
 * @param {string} suffix - 后缀
 * @returns {string}
 */
export function truncate(text, length = 50, suffix = '...') {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + suffix
}

/**
 * 首字母大写
 * @param {string} str - 字符串
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 转换驼峰命名
 * @param {string} str - 下划线字符串
 * @returns {string}
 */
export function camelCase(str) {
  if (!str) return ''
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 转换下划线命名
 * @param {string} str - 驼峰字符串
 * @returns {string}
 */
export function snakeCase(str) {
  if (!str) return ''
  return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '')
}

export default {
  formatDate,
  formatRelativeTime,
  formatNumber,
  formatFileSize,
  formatDistance,
  formatDuration,
  formatDurationHMS,
  formatCarbon,
  formatPhone,
  formatName,
  truncate,
  capitalize,
  camelCase,
  snakeCase
}
