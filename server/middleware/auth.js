/**
 * 认证中间件
 */
const jwt = require('jsonwebtoken')
const config = require('../config')

/**
 * 认证中间件
 */
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('未提供认证令牌')
      error.status = 401
      throw error
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, config.jwt.secret)

    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      error.message = '无效的认证令牌'
      error.status = 401
    } else if (error.name === 'TokenExpiredError') {
      error.message = '认证令牌已过期'
      error.status = 401
    }
    next(error)
  }
}

/**
 * 可选认证中间件
 */
function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const decoded = jwt.verify(token, config.jwt.secret)
      req.user = decoded
    }

    next()
  } catch (error) {
    // 忽略错误，继续处理
    next()
  }
}

module.exports = {
  authMiddleware,
  optionalAuth
}
