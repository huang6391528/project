/**
 * 商城服务层
 * 封装积分商城相关的业务逻辑
 */
import * as storeApi from '../api/store'
import { formatNumber } from '../utils/format'

class StoreService {
  constructor() {
    this.userPoints = 0
    this.exchangeHistory = []
  }

  /**
   * 获取商品分类
   * @returns {Promise<Array>}
   */
  async getGoodsCategories() {
    try {
      return await storeApi.getGoodsCategories()
    } catch (error) {
      console.error('[StoreService] GetGoodsCategories failed:', error)
      throw error
    }
  }

  /**
   * 获取商品列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Object>}
   */
  async getGoodsList(params = {}) {
    try {
      return await storeApi.getGoodsList(params)
    } catch (error) {
      console.error('[StoreService] GetGoodsList failed:', error)
      throw error
    }
  }

  /**
   * 获取商品详情
   * @param {string} id - 商品ID
   * @returns {Promise<Object>}
   */
  async getGoodsDetail(id) {
    try {
      return await storeApi.getGoodsDetail(id)
    } catch (error) {
      console.error('[StoreService] GetGoodsDetail failed:', error)
      throw error
    }
  }

  /**
   * 获取秒杀商品
   * @returns {Promise<Array>}
   */
  async getFlashSaleGoods() {
    try {
      return await storeApi.getFlashSaleGoods()
    } catch (error) {
      console.error('[StoreService] GetFlashSaleGoods failed:', error)
      throw error
    }
  }

  /**
   * 获取秒杀活动信息
   * @returns {Promise<Object>}
   */
  async getFlashSaleInfo() {
    try {
      return await storeApi.getFlashSaleInfo()
    } catch (error) {
      console.error('[StoreService] GetFlashSaleInfo failed:', error)
      throw error
    }
  }

  /**
   * 兑换商品
   * @param {Object} data - 兑换数据
   * @returns {Promise<Object>}
   */
  async exchangeGoods(data) {
    try {
      // 检查积分是否足够
      if (this.userPoints < data.points) {
        throw new Error('积分不足')
      }

      const res = await storeApi.exchangeGoods(data)

      // 更新本地积分
      this.userPoints -= data.points

      // 添加到历史记录
      this.exchangeHistory.unshift(res)

      return res
    } catch (error) {
      console.error('[StoreService] ExchangeGoods failed:', error)
      throw error
    }
  }

  /**
   * 获取兑换记录
   * @param {Object} params - 查询参数
   * @returns {Promise<Object>}
   */
  async getExchangeRecords(params = {}) {
    try {
      const res = await storeApi.getExchangeRecords(params)
      return res
    } catch (error) {
      console.error('[StoreService] GetExchangeRecords failed:', error)
      throw error
    }
  }

  /**
   * 获取用户积分
   * @param {boolean} forceRefresh - 是否强制刷新
   * @returns {Promise<number>}
   */
  async getUserPoints(forceRefresh = false) {
    try {
      if (!forceRefresh && this.userPoints > 0) {
        return this.userPoints
      }

      const res = await storeApi.getUserPoints()
      this.userPoints = res.points || 0
      return this.userPoints
    } catch (error) {
      console.error('[StoreService] GetUserPoints failed:', error)
      throw error
    }
  }

  /**
   * 获取积分记录
   * @param {Object} params - 查询参数
   * @returns {Promise<Object>}
   */
  async getPointsRecords(params = {}) {
    try {
      return await storeApi.getPointsRecords(params)
    } catch (error) {
      console.error('[StoreService] GetPointsRecords failed:', error)
      throw error
    }
  }

  /**
   * 获取校园服务列表
   * @returns {Promise<Array>}
   */
  async getCampusServices() {
    try {
      return await storeApi.getCampusServices()
    } catch (error) {
      console.error('[StoreService] GetCampusServices failed:', error)
      throw error
    }
  }

  /**
   * 获取虚拟商品
   * @returns {Promise<Array>}
   */
  async getVirtualGoods() {
    try {
      return await storeApi.getVirtualGoods()
    } catch (error) {
      console.error('[StoreService] GetVirtualGoods failed:', error)
      throw error
    }
  }

  /**
   * 领取虚拟商品
   * @param {string} goodsId - 商品ID
   * @returns {Promise<Object>}
   */
  async claimVirtualGoods(goodsId) {
    try {
      return await storeApi.claimVirtualGoods(goodsId)
    } catch (error) {
      console.error('[StoreService] ClaimVirtualGoods failed:', error)
      throw error
    }
  }

  /**
   * 获取环保证书
   * @returns {Promise<Array>}
   */
  async getCertificates() {
    try {
      return await storeApi.getCertificates()
    } catch (error) {
      console.error('[StoreService] GetCertificates failed:', error)
      throw error
    }
  }

  /**
   * 领取环保证书
   * @param {Object} data - 领取数据
   * @returns {Promise<Object>}
   */
  async claimCertificate(data) {
    try {
      return await storeApi.claimCertificate(data)
    } catch (error) {
      console.error('[StoreService] ClaimCertificate failed:', error)
      throw error
    }
  }

  /**
   * 检查是否可以兑换
   * @param {number} points - 所需积分
   * @returns {boolean}
   */
  canExchange(points) {
    return this.userPoints >= points
  }

  /**
   * 获取剩余积分
   * @returns {number}
   */
  getRemainingPoints() {
    return this.userPoints
  }

  /**
   * 设置用户积分
   * @param {number} points
   */
  setUserPoints(points) {
    this.userPoints = points
  }

  /**
   * 格式化积分
   * @param {number} points
   * @returns {string}
   */
  formatPoints(points) {
    return formatNumber(points)
  }

  /**
   * 获取兑换历史
   * @returns {Array}
   */
  getExchangeHistory() {
    return this.exchangeHistory
  }
}

// 导出单例
export default new StoreService()
