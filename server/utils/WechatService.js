/**
 * 微信服务工具类
 */
const axios = require('axios')
const crypto = require('crypto')
const config = require('../config')

class WechatService {
  constructor() {
    this.appId = config.wechat.appId
    this.appSecret = config.wechat.appSecret
    this.baseUrl = 'https://api.weixin.qq.com'
  }

  /**
   * 小程序 code 换取 session
   */
  async code2Session(code) {
    const url = `${this.baseUrl}/sns/jscode2session`
    const params = {
      appid: this.appId,
      secret: this.appSecret,
      js_code: code,
      grant_type: 'authorization_code'
    }

    const response = await axios.get(url, { params })
    const data = response.data

    if (data.errcode) {
      const error = new Error(data.errmsg || '微信登录失败')
      error.code = data.errcode
      throw error
    }

    return {
      openid: data.openid,
      session_key: data.session_key,
      unionid: data.unionid
    }
  }

  /**
   * 解密用户数据
   */
  decryptData(sessionKey, encryptedData, iv) {
    const decoded = Buffer.from(sessionKey, 'base64')
    const encrypted = Buffer.from(encryptedData, 'base64')
    const ivBuffer = Buffer.from(iv, 'base64')

    let decipher
    try {
      decipher = crypto.createDecipheriv('aes-128-cbc', decoded, ivBuffer)
    } catch (error) {
      throw new Error('解密失败')
    }

    decipher.setAutoPadding(true)
    let decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])

    decrypted = JSON.parse(decrypted.toString())

    if (decrypted.watermark.appid !== this.appId) {
      throw new Error('数据来源不正确')
    }

    return {
      nickname: decrypted.nickname,
      avatarUrl: decrypted.avatarUrl,
      gender: decrypted.gender
    }
  }
}

module.exports = { WechatService }
