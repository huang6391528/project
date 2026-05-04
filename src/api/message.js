/**
 * 消息相关 API
 */
import request from '../utils/request'

/**
 * 获取消息列表
 * @param {Object} params - 查询参数 { page, limit, type }
 */
export function getMessageList(params) {
  return request({
    url: '/api/message/list',
    method: 'GET',
    data: params
  })
}

/**
 * 获取消息详情
 * @param {string} id - 消息ID
 */
export function getMessageDetail(id) {
  return request({
    url: `/api/message/${id}`,
    method: 'GET'
  })
}

/**
 * 标记消息已读
 * @param {string} id - 消息ID
 */
export function markMessageRead(id) {
  return request({
    url: `/api/message/${id}/read`,
    method: 'PUT'
  })
}

/**
 * 标记全部消息已读
 */
export function markAllMessagesRead() {
  return request({
    url: '/api/message/read/all',
    method: 'PUT'
  })
}

/**
 * 删除消息
 * @param {string} id - 消息ID
 */
export function deleteMessage(id) {
  return request({
    url: `/api/message/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取未读消息数量
 */
export function getUnreadCount() {
  return request({
    url: '/api/message/unread/count',
    method: 'GET'
  })
}

/**
 * 订阅消息
 * @param {string} type - 消息类型
 */
export function subscribeMessage(type) {
  return request({
    url: '/api/message/subscribe',
    method: 'POST',
    data: { type }
  })
}
