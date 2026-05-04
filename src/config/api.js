/**
 * API 配置
 * 定义各模块的 API 端点
 */

export default {
  // API 版本
  version: 'v1',

  // API 前缀
  prefix: '/api',

  // 各模块端点
  endpoints: {
    // 用户模块
    user: {
      login: '/user/login',
      info: '/user/info',
      update: '/user/info',
      carbon: '/user/carbon',
      achievements: '/user/achievements',
      sport: '/user/sport',
      diet: '/user/diet',
      deviceBind: '/user/device/bind',
      deviceUnbind: '/user/device/unbind'
    },

    // 跑步模块
    run: {
      records: '/run/records',
      record: '/run/record',
      statistics: '/run/statistics',
      leaderboard: '/run/leaderboard',
      morningStatus: '/run/morning/status',
      morningCheckin: '/run/morning/checkin',
      marathonList: '/run/marathon/list',
      marathonJoin: '/run/marathon/join',
      trackUpload: '/run/track/upload'
    },

    // 行为模块
    action: {
      categories: '/action/categories',
      sport: '/action/sport',
      sportRecord: '/action/sport/record',
      stepSync: '/action/step/sync',
      diet: '/action/diet',
      dietRecord: '/action/diet/record',
      dietRecords: '/action/diet/records',
      travel: '/action/travel',
      travelRecord: '/action/travel/record',
      life: '/action/life',
      lifeRecord: '/action/life/record',
      lifeVerify: '/action/life/verify',
      carbonReduction: '/action/carbon/reduction',
      statistics: '/action/statistics',
      recommendations: '/action/recommendations'
    },

    // 商城模块
    store: {
      categories: '/store/categories',
      goods: '/store/goods',
      flash: '/store/flash',
      exchange: '/store/exchange',
      exchangeRecords: '/store/exchange/records',
      points: '/store/points',
      pointsRecords: '/store/points/records',
      campusServices: '/store/campus/services',
      virtual: '/store/virtual',
      certificates: '/store/certificates'
    },

    // 消息模块
    message: {
      list: '/message/list',
      unreadCount: '/message/unread/count',
      subscribe: '/message/subscribe'
    },

    // 社交模块
    social: {
      friends: '/social/friends',
      searchUsers: '/social/users/search',
      addFriend: '/social/friend/add',
      friendRequests: '/social/friend/requests',
      moments: '/social/moments',
      publishMoment: '/social/moment',
      groups: '/social/groups',
      classes: '/social/classes'
    }
  }
}
