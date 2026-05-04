/**
 * 社区相关 API
 */
import request from '../utils/request'

/**
 * 获取好友列表
 */
export function getFriendsList() {
  return request({
    url: '/api/social/friends',
    method: 'GET'
  })
}

/**
 * 搜索用户
 * @param {string} keyword - 搜索关键词
 */
export function searchUsers(keyword) {
  return request({
    url: '/api/social/users/search',
    method: 'GET',
    data: { keyword }
  })
}

/**
 * 添加好友
 * @param {string} userId - 用户ID
 */
export function addFriend(userId) {
  return request({
    url: '/api/social/friend/add',
    method: 'POST',
    data: { userId }
  })
}

/**
 * 删除好友
 * @param {string} userId - 用户ID
 */
export function deleteFriend(userId) {
  return request({
    url: `/api/social/friend/${userId}`,
    method: 'DELETE'
  })
}

/**
 * 获取好友申请列表
 */
export function getFriendRequests() {
  return request({
    url: '/api/social/friend/requests',
    method: 'GET'
  })
}

/**
 * 处理好友申请
 * @param {Object} data - { requestId, action: 'accept' | 'reject' }
 */
export function handleFriendRequest(data) {
  return request({
    url: '/api/social/friend/request/handle',
    method: 'POST',
    data
  })
}

/**
 * 获取动态列表
 * @param {Object} params - 查询参数 { page, limit, type }
 */
export function getMomentsList(params) {
  return request({
    url: '/api/social/moments',
    method: 'GET',
    data: params
  })
}

/**
 * 发布动态
 * @param {Object} data - 动态数据 { content, images, type }
 */
export function publishMoment(data) {
  return request({
    url: '/api/social/moment',
    method: 'POST',
    data
  })
}

/**
 * 删除动态
 * @param {string} id - 动态ID
 */
export function deleteMoment(id) {
  return request({
    url: `/api/social/moment/${id}`,
    method: 'DELETE'
  })
}

/**
 * 点赞动态
 * @param {string} momentId - 动态ID
 */
export function likeMoment(momentId) {
  return request({
    url: `/api/social/moment/${momentId}/like`,
    method: 'POST'
  })
}

/**
 * 评论动态
 * @param {Object} data - { momentId, content, parentId? }
 */
export function commentMoment(data) {
  return request({
    url: '/api/social/moment/comment',
    method: 'POST',
    data
  })
}

/**
 * 获取打卡团列表
 */
export function getCheckinGroups() {
  return request({
    url: '/api/social/groups',
    method: 'GET'
  })
}

/**
 * 加入打卡团
 * @param {string} groupId - 团ID
 */
export function joinCheckinGroup(groupId) {
  return request({
    url: '/api/social/group/join',
    method: 'POST',
    data: { groupId }
  })
}

/**
 * 退出打卡团
 * @param {string} groupId - 团ID
 */
export function leaveCheckinGroup(groupId) {
  return request({
    url: '/api/social/group/leave',
    method: 'POST',
    data: { groupId }
  })
}

/**
 * 获取班级列表
 */
export function getClassList() {
  return request({
    url: '/api/social/classes',
    method: 'GET'
  })
}
