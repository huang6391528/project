/**
 * 跑步服务层
 * 封装跑步相关的业务逻辑
 */
import * as runApi from '../api/run'
import { formatDistance, formatDuration } from '../utils/format'

class RunService {
  constructor() {
    this.currentRun = null
    this.runHistory = []
  }

  /**
   * 获取跑步记录列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  async getRunRecords(params = {}) {
    try {
      const res = await runApi.getRunRecords(params)
      return res.list || res
    } catch (error) {
      console.error('[RunService] GetRunRecords failed:', error)
      throw error
    }
  }

  /**
   * 获取跑步详情
   * @param {string} id - 记录ID
   * @returns {Promise<Object>}
   */
  async getRunDetail(id) {
    try {
      return await runApi.getRunDetail(id)
    } catch (error) {
      console.error('[RunService] GetRunDetail failed:', error)
      throw error
    }
  }

  /**
   * 创建跑步记录
   * @param {Object} data - 跑步数据
   * @returns {Promise<Object>}
   */
  async createRunRecord(data) {
    try {
      const res = await runApi.createRunRecord(data)
      this.runHistory.unshift(res)
      return res
    } catch (error) {
      console.error('[RunService] CreateRunRecord failed:', error)
      throw error
    }
  }

  /**
   * 更新跑步记录
   * @param {string} id - 记录ID
   * @param {Object} data - 更新的数据
   * @returns {Promise<Object>}
   */
  async updateRunRecord(id, data) {
    try {
      const res = await runApi.updateRunRecord(id, data)
      const index = this.runHistory.findIndex((item) => item.id === id)
      if (index !== -1) {
        this.runHistory[index] = res
      }
      return res
    } catch (error) {
      console.error('[RunService] UpdateRunRecord failed:', error)
      throw error
    }
  }

  /**
   * 删除跑步记录
   * @param {string} id - 记录ID
   * @returns {Promise}
   */
  async deleteRunRecord(id) {
    try {
      await runApi.deleteRunRecord(id)
      this.runHistory = this.runHistory.filter((item) => item.id !== id)
    } catch (error) {
      console.error('[RunService] DeleteRunRecord failed:', error)
      throw error
    }
  }

  /**
   * 获取跑步统计数据
   * @param {string} type - 统计类型
   * @returns {Promise<Object>}
   */
  async getRunStatistics(type = 'week') {
    try {
      return await runApi.getRunStatistics(type)
    } catch (error) {
      console.error('[RunService] GetRunStatistics failed:', error)
      throw error
    }
  }

  /**
   * 获取跑步排行榜
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  async getRunLeaderboard(params = {}) {
    try {
      const res = await runApi.getRunLeaderboard(params)
      return res.list || res
    } catch (error) {
      console.error('[RunService] GetRunLeaderboard failed:', error)
      throw error
    }
  }

  /**
   * 获取晨跑打卡状态
   * @param {string} date - 日期
   * @returns {Promise<Object>}
   */
  async getMorningRunStatus(date) {
    try {
      return await runApi.getMorningRunStatus(date)
    } catch (error) {
      console.error('[RunService] GetMorningRunStatus failed:', error)
      throw error
    }
  }

  /**
   * 晨跑打卡
   * @param {Object} data - 打卡数据
   * @returns {Promise<Object>}
   */
  async morningRunCheckin(data) {
    try {
      return await runApi.morningRunCheckin(data)
    } catch (error) {
      console.error('[RunService] MorningRunCheckin failed:', error)
      throw error
    }
  }

  /**
   * 获取马拉松列表
   * @returns {Promise<Array>}
   */
  async getMarathonList() {
    try {
      return await runApi.getMarathonList()
    } catch (error) {
      console.error('[RunService] GetMarathonList failed:', error)
      throw error
    }
  }

  /**
   * 加入马拉松
   * @param {string} marathonId - 马拉松ID
   * @returns {Promise}
   */
  async joinMarathon(marathonId) {
    try {
      return await runApi.joinMarathon(marathonId)
    } catch (error) {
      console.error('[RunService] JoinMarathon failed:', error)
      throw error
    }
  }

  /**
   * 上传跑步轨迹
   * @param {Object} data - 轨迹数据
   * @returns {Promise}
   */
  async uploadRunTrack(data) {
    try {
      return await runApi.uploadRunTrack(data)
    } catch (error) {
      console.error('[RunService] UploadRunTrack failed:', error)
      throw error
    }
  }

  /**
   * 开始跑步
   * @param {Object} options - 跑步选项
   */
  startRun(options = {}) {
    this.currentRun = {
      id: null,
      startTime: Date.now(),
      type: options.type || 'free',
      points: [],
      distance: 0,
      duration: 0,
      pace: 0,
      status: 'running'
    }
  }

  /**
   * 更新跑步数据
   * @param {Object} data - 新数据
   */
  updateRunData(data) {
    if (this.currentRun) {
      this.currentRun = { ...this.currentRun, ...data }
    }
  }

  /**
   * 结束跑步
   * @returns {Object}
   */
  endRun() {
    if (!this.currentRun) return null

    this.currentRun.endTime = Date.now()
    this.currentRun.status = 'completed'
    this.currentRun.duration = Math.floor(
      (this.currentRun.endTime - this.currentRun.startTime) / 1000
    )

    const result = { ...this.currentRun }
    this.currentRun = null
    return result
  }

  /**
   * 获取当前跑步数据
   * @returns {Object|null}
   */
  getCurrentRun() {
    return this.currentRun
  }

  /**
   * 计算跑步配速
   * @param {number} distance - 距离(米)
   * @param {number} duration - 时长(秒)
   * @returns {string}
   */
  calculatePace(distance, duration) {
    if (!distance || !duration) return '0:00'

    const paceSeconds = duration / (distance / 1000)
    const minutes = Math.floor(paceSeconds / 60)
    const seconds = Math.floor(paceSeconds % 60)

    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }

  /**
   * 计算碳减排量
   * @param {number} distance - 距离(米)
   * @returns {number} 碳减排量(kg)
   */
  calculateCarbonReduction(distance) {
    // 假设每公里减少碳排放约 0.2kg
    return (distance / 1000) * 0.2
  }

  /**
   * 格式化跑步距离
   * @param {number} meters - 米
   * @returns {string}
   */
  formatDistance(meters) {
    return formatDistance(meters)
  }

  /**
   * 格式化跑步时长
   * @param {number} seconds - 秒
   * @returns {string}
   */
  formatDuration(seconds) {
    return formatDuration(seconds)
  }
}

// 导出单例
export default new RunService()
