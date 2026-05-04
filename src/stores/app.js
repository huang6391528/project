/**
 * 应用状态管理
 * 管理全局应用状态
 */
import { defineStore } from 'pinia'
import { getStorage, setStorage } from '../utils/storage'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 主题
    theme: getStorage('app_theme') || 'light',

    // 是否有新版本
    hasNewVersion: false,

    // 全局加载状态
    loading: false,

    // 全局错误信息
    error: null,

    // TabBar 当前索引
    tabBarIndex: 0,

    // 是否有网络连接
    isOnline: true,

    // 设备信息
    deviceInfo: uni.getSystemInfoSync(),

    // 应用信息
    appInfo: {
      name: '绿动校园',
      version: '1.0.0',
      build: 1
    }
  }),

  getters: {
    // 是否为深色主题
    isDark: (state) => state.theme === 'dark',

    // 是否为浅色主题
    isLight: (state) => state.theme === 'light',

    // 系统平台
    platform: (state) => state.deviceInfo.platform,

    // 系统信息
    systemInfo: (state) => state.deviceInfo,

    // 是否显示错误
    hasError: (state) => !!state.error
  },

  actions: {
    /**
     * 设置主题
     */
    setTheme(theme) {
      this.theme = theme
      setStorage('app_theme', theme)

      // 应用主题
      uni.setStorageSync('app_theme', theme)
    },

    /**
     * 切换主题
     */
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },

    /**
     * 设置加载状态
     */
    setLoading(loading) {
      this.loading = loading
    },

    /**
     * 设置错误信息
     */
    setError(error) {
      this.error = error
    },

    /**
     * 清除错误
     */
    clearError() {
      this.error = null
    },

    /**
     * 设置 TabBar 索引
     */
    setTabBarIndex(index) {
      this.tabBarIndex = index
    },

    /**
     * 设置网络状态
     */
    setOnlineStatus(isOnline) {
      this.isOnline = isOnline
    },

    /**
     * 检查新版本
     */
    checkNewVersion() {
      // #ifdef MP-WEIXIN
      const updateManager = uni.getUpdateManager()

      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          this.hasNewVersion = true
        }
      })

      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
      // #endif
    },

    /**
     * 初始化应用
     */
    init() {
      // 检查网络状态
      uni.onNetworkStatusChange((res) => {
        this.setOnlineStatus(res.isConnected)
      })

      // 检查新版本
      this.checkNewVersion()

      // 获取设备信息
      this.deviceInfo = uni.getSystemInfoSync()
    },

    /**
     * 重置应用状态
     */
    reset() {
      this.error = null
      this.loading = false
    }
  },

  // 持久化配置
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app',
        storage: localStorage,
        paths: ['theme']
      }
    ]
  }
})
