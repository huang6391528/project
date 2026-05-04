/**
 * 通用类型定义
 */

/**
 * @typedef {Object} ApiResponse
 * @property {number} code - 状态码
 * @property {string} message - 消息
 * @property {*} data - 数据
 */

/**
 * @typedef {Object} PageResult
 * @property {Array} list - 数据列表
 * @property {number} total - 总数
 * @property {number} page - 当前页
 * @property {number} limit - 每页条数
 */

/**
 * @typedef {Object} CarbonReduction
 * @property {number} total - 今日总减排量
 * @property {number} sport - 运动减排
 * @property {number} diet - 饮食减排
 * @property {number} travel - 出行减排
 * @property {number} life - 生活减排
 */

/**
 * @typedef {Object} ActionRecord
 * @property {string} id - 记录ID
 * @property {string} type - 行为类型
 * @property {string} subType - 子类型
 * @property {number} carbon - 碳减排量
 * @property {number} points - 积分
 * @property {string} date - 日期
 * @property {string} createTime - 创建时间
 */

/**
 * @typedef {Object} Goods
 * @property {string} id - 商品ID
 * @property {string} name - 商品名称
 * @property {string} description - 描述
 * @property {string} image - 图片
 * @property {number} points - 所需积分
 * @property {number} stock - 库存
 * @property {string} category - 分类
 * @property {string} type - 类型 (physical/virtual)
 */

/**
 * @typedef {Object} ExchangeOrder
 * @property {string} id - 订单ID
 * @property {string} goodsId - 商品ID
 * @property {Goods} goods - 商品信息
 * @property {number} points - 消耗积分
 * @property {string} status - 状态
 * @property {string} address - 收货地址
 * @property {string} createTime - 创建时间
 */

/**
 * @typedef {'pending' | 'success' | 'failed'} OrderStatus
 * @typedef {'sport' | 'diet' | 'travel' | 'life'} ActionCategory
 * @typedef {'light' | 'dark'} Theme
 * @typedef {'h5' | 'mp-weixin' | 'app-plus'} Platform

export {}
