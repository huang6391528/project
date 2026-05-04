/**
 * 用户控制器
 */
const UserService = require('../service/UserService')

const userService = new UserService()

/**
 * 用户登录
 */
async function login(req, res, next) {
  try {
    const { code, encryptedData, iv } = req.body
    const result = await userService.login({ code, encryptedData, iv })
    res.json({
      code: 200,
      message: '登录成功',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

/**
 * 获取用户信息
 */
async function getUserInfo(req, res, next) {
  try {
    const userId = req.user.id
    const result = await userService.getUserInfo(userId)
    res.json({
      code: 200,
      message: '获取成功',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

/**
 * 更新用户信息
 */
async function updateUserInfo(req, res, next) {
  try {
    const userId = req.user.id
    const data = req.body
    const result = await userService.updateUserInfo(userId, data)
    res.json({
      code: 200,
      message: '更新成功',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

/**
 * 获取用户碳积分
 */
async function getUserCarbon(req, res, next) {
  try {
    const userId = req.user.id
    const result = await userService.getUserCarbon(userId)
    res.json({
      code: 200,
      message: '获取成功',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  getUserInfo,
  updateUserInfo,
  getUserCarbon
}
