/**
 * 本地存储工具
 */

// 存储 Keys
export const TOKEN_KEY = 'app_token'
export const USER_INFO_KEY = 'user_info'
export const SETTINGS_KEY = 'app_settings'
export const SEARCH_HISTORY_KEY = 'search_history'

/**
 * 获取存储数据
 * @param {string} key - 键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 存储的数据
 */
export function getStorage(key, defaultValue = null) {
  try {
    const value = uni.getStorageSync(key)
    return value !== '' ? value : defaultValue
  } catch (e) {
    console.error(`[Storage] Get ${key} error:`, e)
    return defaultValue
  }
}

/**
 * 设置存储数据
 * @param {string} key - 键名
 * @param {*} value - 值
 * @returns {boolean} 是否成功
 */
export function setStorage(key, value) {
  try {
    uni.setStorageSync(key, value)
    return true
  } catch (e) {
    console.error(`[Storage] Set ${key} error:`, e)
    return false
  }
}

/**
 * 移除存储数据
 * @param {string} key - 键名
 * @returns {boolean} 是否成功
 */
export function removeStorage(key) {
  try {
    uni.removeStorageSync(key)
    return true
  } catch (e) {
    console.error(`[Storage] Remove ${key} error:`, e)
    return false
  }
}

/**
 * 清空所有存储数据
 * @returns {boolean} 是否成功
 */
export function clearStorage() {
  try {
    uni.clearStorageSync()
    return true
  } catch (e) {
    console.error('[Storage] Clear error:', e)
    return false
  }
}

/**
 * 获取存储信息
 * @returns {Object} 存储信息
 */
export function getStorageInfo() {
  try {
    return uni.getStorageInfoSync()
  } catch (e) {
    console.error('[Storage] GetInfo error:', e)
    return null
  }
}

/**
 * 存储 Token
 * @param {string} token - Token
 */
export function setToken(token) {
  setStorage(TOKEN_KEY, token)
}

/**
 * 获取 Token
 * @returns {string|null}
 */
export function getToken() {
  return getStorage(TOKEN_KEY)
}

/**
 * 移除 Token
 */
export function removeToken() {
  removeStorage(TOKEN_KEY)
}

/**
 * 存储用户信息
 * @param {Object} userInfo - 用户信息
 */
export function setUserInfo(userInfo) {
  setStorage(USER_INFO_KEY, userInfo)
}

/**
 * 获取用户信息
 * @returns {Object|null}
 */
export function getUserInfo() {
  return getStorage(USER_INFO_KEY)
}

/**
 * 移除用户信息
 */
export function removeUserInfo() {
  removeStorage(USER_INFO_KEY)
}

/**
 * 获取搜索历史
 * @param {number} limit - 最大数量
 * @returns {Array}
 */
export function getSearchHistory(limit = 20) {
  const history = getStorage(SEARCH_HISTORY_KEY, [])
  return history.slice(0, limit)
}

/**
 * 添加搜索历史
 * @param {string} keyword - 关键词
 * @param {number} maxLength - 最大数量
 */
export function addSearchHistory(keyword, maxLength = 20) {
  if (!keyword) return

  let history = getStorage(SEARCH_HISTORY_KEY, [])

  // 去除重复项
  history = history.filter((item) => item !== keyword)

  // 添加到开头
  history.unshift(keyword)

  // 限制长度
  if (history.length > maxLength) {
    history = history.slice(0, maxLength)
  }

  setStorage(SEARCH_HISTORY_KEY, history)
}

/**
 * 清除搜索历史
 */
export function clearSearchHistory() {
  removeStorage(SEARCH_HISTORY_KEY)
}

export default {
  getStorage,
  setStorage,
  removeStorage,
  clearStorage,
  getStorageInfo,
  setToken,
  getToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  getSearchHistory,
  addSearchHistory,
  clearSearchHistory,
  TOKEN_KEY,
  USER_INFO_KEY,
  SETTINGS_KEY,
  SEARCH_HISTORY_KEY
}
