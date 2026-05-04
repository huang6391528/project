/**
 * 用户服务层
 * 封装用户相关的业务逻辑
 */
import * as userApi from '../api/user'
import { setUserInfo, setToken, removeToken, removeUserInfo, getToken, getUserInfo as getStoredUserInfo } from '../utils/storage'

class UserService {
  constructor() {
    this.userInfo = null
  }

  /**
   * 用户登录
   * @param {Object} loginData - 登录数据
   * @returns {Promise<Object>} 用户信息
   */
  async login(loginData) {
    try {
      const res = await userApi.login(loginData)

      if (res.token) {
        setToken(res.token)
      }

      if (res.userInfo) {
        this.setUserInfo(res.userInfo)
        setUserInfo(res.userInfo)
      }

      return res
    } catch (error) {
      console.error('[UserService] Login failed:', error)
      throw error
    }
  }

  /**
   * 微信小程序登录
   * @returns {Promise<Object>}
   */
  async wxLogin() {
    try {
      // 获取微信登录凭证
      const { code } = await uni.login({ provider: 'weixin' })

      if (!code) {
        throw new Error('获取登录凭证失败')
      }

      // 调用后端接口
      return await this.login({ code })
    } catch (error) {
      console.error('[UserService] WxLogin failed:', error)
      throw error
    }
  }

  /**
   * 获取用户信息
   * @param {boolean} forceRefresh - 是否强制从服务器获取
   * @returns {Promise<Object>}
   */
  async getUserInfo(forceRefresh = false) {
    if (!forceRefresh && this.userInfo) {
      return this.userInfo
    }

    try {
      const res = await userApi.getUserInfo()
      this.setUserInfo(res)
      setUserInfo(res)
      return res
    } catch (error) {
      console.error('[UserService] GetUserInfo failed:', error)
      throw error
    }
  }

  /**
   * 更新用户信息
   * @param {Object} data - 用户信息
   * @returns {Promise<Object>}
   */
  async updateUserInfo(data) {
    try {
      const res = await userApi.updateUserInfo(data)
      this.setUserInfo(res)
      setUserInfo(res)
      return res
    } catch (error) {
      console.error('[UserService] UpdateUserInfo failed:', error)
      throw error
    }
  }

  /**
   * 获取用户碳积分
   * @returns {Promise<Object>}
   */
  async getUserCarbon() {
    try {
      return await userApi.getUserCarbon()
    } catch (error) {
      console.error('[UserService] GetUserCarbon failed:', error)
      throw error
    }
  }

  /**
   * 获取用户成就
   * @returns {Promise<Array>}
   */
  async getUserAchievements() {
    try {
      return await userApi.getUserAchievements()
    } catch (error) {
      console.error('[UserService] GetUserAchievements failed:', error)
      throw error
    }
  }

  /**
   * 获取用户运动数据
   * @param {string} date - 日期
   * @returns {Promise<Object>}
   */
  async getUserSportData(date) {
    try {
      return await userApi.getUserSportData(date)
    } catch (error) {
      console.error('[UserService] GetUserSportData failed:', error)
      throw error
    }
  }

  /**
   * 获取用户饮食数据
   * @param {string} date - 日期
   * @returns {Promise<Object>}
   */
  async getUserDietData(date) {
    try {
      return await userApi.getUserDietData(date)
    } catch (error) {
      console.error('[UserService] GetUserDietData failed:', error)
      throw error
    }
  }

  /**
   * 绑定设备
   * @param {string} deviceId - 设备ID
   * @returns {Promise}
   */
  async bindDevice(deviceId) {
    try {
      return await userApi.bindDevice(deviceId)
    } catch (error) {
      console.error('[UserService] BindDevice failed:', error)
      throw error
    }
  }

  /**
   * 解绑设备
   * @param {string} deviceId - 设备ID
   * @returns {Promise}
   */
  async unbindDevice(deviceId) {
    try {
      return await userApi.unbindDevice(deviceId)
    } catch (error) {
      console.error('[UserService] UnbindDevice failed:', error)
      throw error
    }
  }

  /**
   * 设置用户信息
   * @param {Object} userInfo
   */
  setUserInfo(userInfo) {
    this.userInfo = userInfo
  }

  /**
   * 获取本地缓存的用户信息
   * @returns {Object|null}
   */
  getStoredUserInfo() {
    if (!this.userInfo) {
      this.userInfo = getStoredUserInfo()
    }
    return this.userInfo
  }

  /**
   * 检查是否已登录
   * @returns {boolean}
   */
  isLoggedIn() {
    return !!getToken()
  }

  /**
   * 登出
   */
  logout() {
    this.userInfo = null
    removeToken()
    removeUserInfo()
  }

  /**
   * 初始化用户服务
   * 从本地存储恢复用户信息
   */
  init() {
    const storedUserInfo = getStoredUserInfo()
    if (storedUserInfo) {
      this.userInfo = storedUserInfo
    }
  }
}

// 导出单例
export default new UserService()
