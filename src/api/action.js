/**
 * 低碳行为相关 API
 */
import request from '../utils/request'

/**
 * 获取行为分类列表
 */
export function getActionCategories() {
  return request({
    url: '/api/action/categories',
    method: 'GET'
  })
}

/**
 * 获取运动行为列表
 * @param {Object} params - 查询参数
 */
export function getSportActions(params) {
  return request({
    url: '/api/action/sport',
    method: 'GET',
    data: params
  })
}

/**
 * 记录运动行为
 * @param {Object} data - 运动数据
 */
export function recordSportAction(data) {
  return request({
    url: '/api/action/sport/record',
    method: 'POST',
    data
  })
}

/**
 * 获取步数同步状态
 */
export function getStepSyncStatus() {
  return request({
    url: '/api/action/step/sync',
    method: 'GET'
  })
}

/**
 * 同步步数
 * @param {number} steps - 步数
 */
export function syncSteps(steps) {
  return request({
    url: '/api/action/step/sync',
    method: 'POST',
    data: { steps }
  })
}

/**
 * 获取饮食行为列表
 * @param {Object} params - 查询参数
 */
export function getDietActions(params) {
  return request({
    url: '/api/action/diet',
    method: 'GET',
    data: params
  })
}

/**
 * 记录饮食行为
 * @param {Object} data - 饮食数据
 */
export function recordDietAction(data) {
  return request({
    url: '/api/action/diet/record',
    method: 'POST',
    data
  })
}

/**
 * 获取饮食记录列表
 * @param {string} date - 日期 (YYYY-MM-DD)
 */
export function getDietRecords(date) {
  return request({
    url: '/api/action/diet/records',
    method: 'GET',
    data: { date }
  })
}

/**
 * 获取出行行为列表
 */
export function getTravelActions() {
  return request({
    url: '/api/action/travel',
    method: 'GET'
  })
}

/**
 * 记录绿色出行
 * @param {Object} data - 出行数据 { type, distance }
 */
export function recordTravelAction(data) {
  return request({
    url: '/api/action/travel/record',
    method: 'POST',
    data
  })
}

/**
 * 获取生活行为列表
 * @param {Object} params - 查询参数 { category }
 */
export function getLifeActions(params) {
  return request({
    url: '/api/action/life',
    method: 'GET',
    data: params
  })
}

/**
 * 记录生活行为
 * @param {Object} data - 生活行为数据
 */
export function recordLifeAction(data) {
  return request({
    url: '/api/action/life/record',
    method: 'POST',
    data
  })
}

/**
 * AI 验证生活行为
 * @param {Object} data - 图片和类型
 */
export function verifyLifeAction(data) {
  return request({
    url: '/api/action/life/verify',
    method: 'POST',
    data
  })
}

/**
 * 获取行为碳减排量
 * @param {string} date - 日期 (YYYY-MM-DD)
 */
export function getCarbonReduction(date) {
  return request({
    url: '/api/action/carbon/reduction',
    method: 'GET',
    data: { date }
  })
}

/**
 * 获取行为统计
 * @param {Object} params - 查询参数 { type, startDate, endDate }
 */
export function getActionStatistics(params) {
  return request({
    url: '/api/action/statistics',
    method: 'GET',
    data: params
  })
}

/**
 * 获取行为推荐
 */
export function getActionRecommendations() {
  return request({
    url: '/api/action/recommendations',
    method: 'GET'
  })
}
