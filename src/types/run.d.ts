/**
 * 跑步相关类型定义
 */

/**
 * @typedef {Object} RunRecord
 * @property {string} id - 记录ID
 * @property {string} userId - 用户ID
 * @property {string} type - 跑步类型 (free/morning/marathon)
 * @property {number} distance - 距离(米)
 * @property {number} duration - 时长(秒)
 * @property {number} pace - 配速(秒/公里)
 * @property {number} calories - 消耗卡路里
 * @property {number} carbon - 碳减排量(kg)
 * @property {Array<{lat: number, lng: number, time: number}>} track - 轨迹点
 * @property {string} startTime - 开始时间
 * @property {string} endTime - 结束时间
 * @property {string} status - 状态 (pending/completed/cancelled)
 */

/**
 * @typedef {Object} RunStatistics
 * @property {number} totalDistance - 总距离
 * @property {number} totalDuration - 总时长
 * @property {number} totalCalories - 总卡路里
 * @property {number} totalCarbon - 总碳减排量
 * @property {number} runCount - 跑步次数
 * @property {number} avgPace - 平均配速
 */

/**
 * @typedef {Object} MorningRunStatus
 * @property {boolean} checked - 是否已打卡
 * @property {string} date - 日期
 * @property {string} checkinTime - 打卡时间
 * @property {number} distance - 打卡距离
 */

/**
 * @typedef {Object} MarathonInfo
 * @property {string} id - 马拉松ID
 * @property {string} title - 标题
 * @property {string} description - 描述
 * @property {string} startTime - 开始时间
 * @property {string} endTime - 结束时间
 * @property {number} targetDistance - 目标距离
 * @property {number} joinedCount - 已参加人数
 * @property {boolean} isJoined - 是否已参加
 * @property {number} progress - 完成进度
 */

export {}
