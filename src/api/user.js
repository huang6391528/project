/**
 * 用户相关 API
 */
import request from '../utils/request'

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'GET'
  })
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 */
export function updateUserInfo(data) {
  return request({
    url: '/api/user/info',
    method: 'PUT',
    data
  })
}

/**
 * 用户登录
 * @param {Object} data - 登录参数 { code, encryptedData, iv }
 */
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户碳积分
 */
export function getUserCarbon() {
  return request({
    url: '/api/user/carbon',
    method: 'GET'
  })
}

/**
 * 获取用户成就
 */
export function getUserAchievements() {
  return request({
    url: '/api/user/achievements',
    method: 'GET'
  })
}

/**
 * 获取用户运动数据
 * @param {string} date - 日期 (YYYY-MM-DD)
 */
export function getUserSportData(date) {
  return request({
    url: '/api/user/sport',
    method: 'GET',
    data: { date }
  })
}

/**
 * 获取用户饮食数据
 * @param {string} date - 日期 (YYYY-MM-DD)
 */
export function getUserDietData(date) {
  return request({
    url: '/api/user/diet',
    method: 'GET',
    data: { date }
  })
}

/**
 * 绑定设备
 * @param {string} deviceId - 设备ID
 */
export function bindDevice(deviceId) {
  return request({
    url: '/api/user/device/bind',
    method: 'POST',
    data: { deviceId }
  })
}

/**
 * 解绑设备
 * @param {string} deviceId - 设备ID
 */
export function unbindDevice(deviceId) {
  return request({
    url: '/api/user/device/unbind',
    method: 'POST',
    data: { deviceId }
  })
}
