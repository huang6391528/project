/**
 * 用户服务层
 */
const UserModel = require('../model/UserModel')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { WechatService } = require('../utils/WechatService')

class UserService {
  constructor() {
    this.userModel = new UserModel()
    this.wechatService = new WechatService()
  }

  /**
   * 用户登录
   */
  async login(params) {
    const { code, encryptedData, iv } = params

    // 微信小程序登录
    if (code) {
      // 获取 openid
      const { openid, session_key } = await this.wechatService.code2Session(code)

      // 查找或创建用户
      let user = await this.userModel.findByOpenid(openid)

      if (!user) {
        // 解密用户数据
        if (encryptedData && iv) {
          const userInfo = await this.wechatService.decryptData(
            session_key,
            encryptedData,
            iv
          )
          user = await this.userModel.create({
            openid,
            nickname: userInfo.nickname,
            avatar: userInfo.avatarUrl,
            gender: userInfo.gender
          })
        } else {
          user = await this.userModel.create({ openid })
        }
      }

      // 生成 Token
      const token = jwt.sign(
        { id: user.id, openid },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      )

      return {
        token,
        userInfo: this.formatUserInfo(user),
        expiresIn: config.jwt.expiresIn
      }
    }

    throw new Error('登录参数不完整')
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(userId) {
    const user = await this.userModel.findById(userId)
    if (!user) {
      const error = new Error('用户不存在')
      error.status = 404
      throw error
    }
    return this.formatUserInfo(user)
  }

  /**
   * 更新用户信息
   */
  async updateUserInfo(userId, data) {
    const user = await this.userModel.update(userId, data)
    return this.formatUserInfo(user)
  }

  /**
   * 获取用户碳积分
   */
  async getUserCarbon(userId) {
    const carbon = await this.userModel.getCarbon(userId)
    return { carbon }
  }

  /**
   * 格式化用户信息
   */
  formatUserInfo(user) {
    return {
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
      phone: user.phone,
      email: user.email,
      carbon: user.carbon,
      gender: user.gender,
      school: user.school,
      classId: user.class_id,
      level: user.level,
      exp: user.exp,
      achievements: user.achievements ? JSON.parse(user.achievements) : [],
      createTime: user.create_time
    }
  }
}

module.exports = UserService
