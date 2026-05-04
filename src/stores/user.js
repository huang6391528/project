/**
 * 用户状态管理
 * 使用 Pinia 管理用户相关状态
 */
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken, setUserInfo, getUserInfo, removeUserInfo } from '../utils/storage'
import UserService from '../services/UserService'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || '',
    userInfo: getUserInfo() || null,
    isLoggedIn: !!getToken(),
   碳积分: 0,
    achievements: [],
    loading: false
  }),

  getters: {
    // 获取用户昵称
    nickname: (state) => state.userInfo?.nickname || '未登录',

    // 获取用户头像
    avatar: (state) => state.userInfo?.avatar || '/static/avatar.png',

    // 获取用户ID
    userId: (state) => state.userInfo?.id || null,

    // 是否已登录
    isLogin: (state) => !!state.token
  },

  actions: {
    /**
     * 设置 Token
     */
    setToken(token) {
      this.token = token
      this.isLoggedIn = !!token
      setToken(token)
    },

    /**
     * 设置用户信息
     */
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      setUserInfo(userInfo)
    },

    /**
     * 设置碳积分
     */
    setCarbon(carbon) {
      this.碳积分 = carbon
    },

    /**
     * 设置成就列表
     */
    setAchievements(achievements) {
      this.achievements = achievements
    },

    /**
     * 用户登录
     */
    async login(loginData) {
      this.loading = true
      try {
        const res = await UserService.login(loginData)

        if (res.token) {
          this.setToken(res.token)
        }

        if (res.userInfo) {
          this.setUserInfo(res.userInfo)
        }

        if (res.碳积分 !== undefined) {
          this.setCarbon(res.碳积分)
        }

        return res
      } finally {
        this.loading = false
      }
    },

    /**
     * 微信登录
     */
    async wxLogin() {
      this.loading = true
      try {
        return await this.login({ wxLogin: true })
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取用户信息
     */
    async fetchUserInfo(forceRefresh = false) {
      if (!forceRefresh && this.userInfo) {
        return this.userInfo
      }

      this.loading = true
      try {
        const userInfo = await UserService.getUserInfo(forceRefresh)
        this.setUserInfo(userInfo)
        return userInfo
      } finally {
        this.loading = false
      }
    },

    /**
     * 更新用户信息
     */
    async updateUserInfo(data) {
      this.loading = true
      try {
        const userInfo = await UserService.updateUserInfo(data)
        this.setUserInfo(userInfo)
        return userInfo
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取碳积分
     */
    async fetchCarbon() {
      try {
        const carbon = await UserService.getUserCarbon()
        this.setCarbon(carbon)
        return carbon
      } catch (error) {
        console.error('[UserStore] FetchCarbon failed:', error)
        throw error
      }
    },

    /**
     * 获取成就列表
     */
    async fetchAchievements() {
      try {
        const achievements = await UserService.getUserAchievements()
        this.setAchievements(achievements)
        return achievements
      } catch (error) {
        console.error('[UserStore] FetchAchievements failed:', error)
        throw error
      }
    },

    /**
     * 登出
     */
    logout() {
      this.token = ''
      this.userInfo = null
      this.isLoggedIn = false
      this.碳积分 = 0
      this.achievements = []
      removeToken()
      removeUserInfo()
    },

    /**
     * 初始化用户状态
     */
    init() {
      const storedToken = getToken()
      const storedUserInfo = getUserInfo()

      if (storedToken) {
        this.token = storedToken
        this.isLoggedIn = true
      }

      if (storedUserInfo) {
        this.userInfo = storedUserInfo
      }
    }
  },

  // 持久化配置
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
        paths: ['token', 'userInfo', '碳积分']
      }
    ]
  }
})
