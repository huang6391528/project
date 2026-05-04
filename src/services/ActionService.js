/**
 * 低碳行为服务层
 * 封装低碳行为相关的业务逻辑
 */
import * as actionApi from '../api/action'
import { formatCarbon } from '../utils/format'

class ActionService {
  constructor() {
    this.categories = []
    this.todayActions = []
  }

  /**
   * 获取行为分类
   * @returns {Promise<Array>}
   */
  async getCategories() {
    try {
      if (this.categories.length) {
        return this.categories
      }
      const res = await actionApi.getActionCategories()
      this.categories = res
      return res
    } catch (error) {
      console.error('[ActionService] GetCategories failed:', error)
      throw error
    }
  }

  /**
   * 获取运动行为列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  async getSportActions(params = {}) {
    try {
      return await actionApi.getSportActions(params)
    } catch (error) {
      console.error('[ActionService] GetSportActions failed:', error)
      throw error
    }
  }

  /**
   * 记录运动行为
   * @param {Object} data - 运动数据
   * @returns {Promise<Object>}
   */
  async recordSportAction(data) {
    try {
      const res = await actionApi.recordSportAction(data)
      this.todayActions.push(res)
      return res
    } catch (error) {
      console.error('[ActionService] RecordSportAction failed:', error)
      throw error
    }
  }

  /**
   * 获取步数同步状态
   * @returns {Promise<Object>}
   */
  async getStepSyncStatus() {
    try {
      return await actionApi.getStepSyncStatus()
    } catch (error) {
      console.error('[ActionService] GetStepSyncStatus failed:', error)
      throw error
    }
  }

  /**
   * 同步步数
   * @param {number} steps - 步数
   * @returns {Promise<Object>}
   */
  async syncSteps(steps) {
    try {
      return await actionApi.syncSteps(steps)
    } catch (error) {
      console.error('[ActionService] SyncSteps failed:', error)
      throw error
    }
  }

  /**
   * 获取饮食行为列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  async getDietActions(params = {}) {
    try {
      return await actionApi.getDietActions(params)
    } catch (error) {
      console.error('[ActionService] GetDietActions failed:', error)
      throw error
    }
  }

  /**
   * 记录饮食行为
   * @param {Object} data - 饮食数据
   * @returns {Promise<Object>}
   */
  async recordDietAction(data) {
    try {
      const res = await actionApi.recordDietAction(data)
      this.todayActions.push(res)
      return res
    } catch (error) {
      console.error('[ActionService] RecordDietAction failed:', error)
      throw error
    }
  }

  /**
   * 获取饮食记录
   * @param {string} date - 日期
   * @returns {Promise<Array>}
   */
  async getDietRecords(date) {
    try {
      return await actionApi.getDietRecords(date)
    } catch (error) {
      console.error('[ActionService] GetDietRecords failed:', error)
      throw error
    }
  }

  /**
   * 获取出行行为列表
   * @returns {Promise<Array>}
   */
  async getTravelActions() {
    try {
      return await actionApi.getTravelActions()
    } catch (error) {
      console.error('[ActionService] GetTravelActions failed:', error)
      throw error
    }
  }

  /**
   * 记录绿色出行
   * @param {Object} data - 出行数据
   * @returns {Promise<Object>}
   */
  async recordTravelAction(data) {
    try {
      const res = await actionApi.recordTravelAction(data)
      this.todayActions.push(res)
      return res
    } catch (error) {
      console.error('[ActionService] RecordTravelAction failed:', error)
      throw error
    }
  }

  /**
   * 获取生活行为列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  async getLifeActions(params = {}) {
    try {
      return await actionApi.getLifeActions(params)
    } catch (error) {
      console.error('[ActionService] GetLifeActions failed:', error)
      throw error
    }
  }

  /**
   * 记录生活行为
   * @param {Object} data - 生活行为数据
   * @returns {Promise<Object>}
   */
  async recordLifeAction(data) {
    try {
      const res = await actionApi.recordLifeAction(data)
      this.todayActions.push(res)
      return res
    } catch (error) {
      console.error('[ActionService] RecordLifeAction failed:', error)
      throw error
    }
  }

  /**
   * AI 验证生活行为
   * @param {Object} data - 图片和类型
   * @returns {Promise<Object>}
   */
  async verifyLifeAction(data) {
    try {
      return await actionApi.verifyLifeAction(data)
    } catch (error) {
      console.error('[ActionService] VerifyLifeAction failed:', error)
      throw error
    }
  }

  /**
   * 获取碳减排量
   * @param {string} date - 日期
   * @returns {Promise<Object>}
   */
  async getCarbonReduction(date) {
    try {
      return await actionApi.getCarbonReduction(date)
    } catch (error) {
      console.error('[ActionService] GetCarbonReduction failed:', error)
      throw error
    }
  }

  /**
   * 获取行为统计
   * @param {Object} params - 查询参数
   * @returns {Promise<Object>}
   */
  async getActionStatistics(params = {}) {
    try {
      return await actionApi.getActionStatistics(params)
    } catch (error) {
      console.error('[ActionService] GetActionStatistics failed:', error)
      throw error
    }
  }

  /**
   * 获取行为推荐
   * @returns {Promise<Array>}
   */
  async getActionRecommendations() {
    try {
      return await actionApi.getActionRecommendations()
    } catch (error) {
      console.error('[ActionService] GetActionRecommendations failed:', error)
      throw error
    }
  }

  /**
   * 计算步数碳减排量
   * @param {number} steps - 步数
   * @returns {number} 碳减排量(kg)
   */
  calculateStepsCarbon(steps) {
    // 步行每公里减少碳排放约 0.2kg
    // 假设平均每步 0.5 米
    const distance = steps * 0.5 / 1000
    return distance * 0.2
  }

  /**
   * 计算出行碳减排量
   * @param {string} travelType - 出行类型
   * @param {number} distance - 距离(km)
   * @returns {number} 碳减排量(kg)
   */
  calculateTravelCarbon(travelType, distance) {
    // 不同出行方式相对开车的碳减排系数
    const carbonFactors = {
      walk: 0.21,    // 步行
      bike: 0.18,    // 骑行
      bus: 0.12,     // 公交
      subway: 0.08   // 地铁
    }

    const factor = carbonFactors[travelType] || 0.21
    // 假设开车每公里碳排放 0.21kg
    return distance * 0.21 * factor
  }

  /**
   * 格式化碳减排量
   * @param {number} kg - 千克
   * @returns {string}
   */
  formatCarbon(kg) {
    return formatCarbon(kg)
  }

  /**
   * 获取今日行为列表
   * @returns {Array}
   */
  getTodayActions() {
    return this.todayActions
  }

  /**
   * 清空今日行为列表
   */
  clearTodayActions() {
    this.todayActions = []
  }
}

// 导出单例
export default new ActionService()
