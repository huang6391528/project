/**
 * 跑步相关 API
 */
import request from '../utils/request'

/**
 * 获取跑步记录列表
 * @param {Object} params - 查询参数 { page, limit, type, startDate, endDate }
 */
export function getRunRecords(params) {
  return request({
    url: '/api/run/records',
    method: 'GET',
    data: params
  })
}

/**
 * 获取跑步详情
 * @param {string} id - 记录ID
 */
export function getRunDetail(id) {
  return request({
    url: `/api/run/record/${id}`,
    method: 'GET'
  })
}

/**
 * 创建跑步记录
 * @param {Object} data - 跑步数据
 */
export function createRunRecord(data) {
  return request({
    url: '/api/run/record',
    method: 'POST',
    data
  })
}

/**
 * 更新跑步记录
 * @param {string} id - 记录ID
 * @param {Object} data - 更新的数据
 */
export function updateRunRecord(id, data) {
  return request({
    url: `/api/run/record/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除跑步记录
 * @param {string} id - 记录ID
 */
export function deleteRunRecord(id) {
  return request({
    url: `/api/run/record/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取跑步统计数据
 * @param {string} type - 统计类型 (week/month/year)
 */
export function getRunStatistics(type) {
  return request({
    url: '/api/run/statistics',
    method: 'GET',
    data: { type }
  })
}

/**
 * 获取跑步里程排行榜
 * @param {Object} params - 查询参数 { type, limit }
 */
export function getRunLeaderboard(params) {
  return request({
    url: '/api/run/leaderboard',
    method: 'GET',
    data: params
  })
}

/**
 * 获取晨跑打卡状态
 * @param {string} date - 日期 (YYYY-MM-DD)
 */
export function getMorningRunStatus(date) {
  return request({
    url: '/api/run/morning/status',
    method: 'GET',
    data: { date }
  })
}

/**
 * 晨跑打卡
 * @param {Object} data - 打卡数据 { location, distance, duration }
 */
export function morningRunCheckin(data) {
  return request({
    url: '/api/run/morning/checkin',
    method: 'POST',
    data
  })
}

/**
 * 获取马拉松活动列表
 */
export function getMarathonList() {
  return request({
    url: '/api/run/marathon/list',
    method: 'GET'
  })
}

/**
 * 加入马拉松
 * @param {string} marathonId - 马拉松ID
 */
export function joinMarathon(marathonId) {
  return request({
    url: '/api/run/marathon/join',
    method: 'POST',
    data: { marathonId }
  })
}

/**
 * 上传跑步轨迹
 * @param {Object} data - 轨迹数据 { recordId, points }
 */
export function uploadRunTrack(data) {
  return request({
    url: '/api/run/track/upload',
    method: 'POST',
    data
  })
}
