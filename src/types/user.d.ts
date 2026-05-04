/**
 * 用户相关类型定义
 */

/**
 * @typedef {Object} UserInfo
 * @property {string} id - 用户ID
 * @property {string} nickname - 昵称
 * @property {string} avatar - 头像URL
 * @property {string} phone - 手机号
 * @property {string} email - 邮箱
 * @property {number} carbon - 碳积分
 * @property {string} gender - 性别
 * @property {string} birthday - 生日
 * @property {string} school - 学校
 * @property {string} classId - 班级ID
 * @property {Array<string>} achievements - 成就列表
 * @property {number} level - 等级
 * @property {number} exp - 经验值
 * @property {string} createTime - 创建时间
 */

/**
 * @typedef {Object} LoginParams
 * @property {string} [code] - 微信授权码
 * @property {string} [encryptedData] - 加密数据
 * @property {string} [iv] - 初始向量
 * @property {string} [username] - 用户名
 * @property {string} [password] - 密码
 */

/**
 * @typedef {Object} LoginResult
 * @property {string} token - 登录令牌
 * @property {UserInfo} userInfo - 用户信息
 * @property {number} expiresIn - 过期时间(秒)
 */

export {}
