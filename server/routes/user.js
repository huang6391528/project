/**
 * 用户路由
 */
const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')
const { authMiddleware } = require('../middleware/auth')

// 登录
router.post('/login', UserController.login)

// 获取用户信息
router.get('/info', authMiddleware, UserController.getUserInfo)

// 更新用户信息
router.put('/info', authMiddleware, UserController.updateUserInfo)

// 获取用户碳积分
router.get('/carbon', authMiddleware, UserController.getUserCarbon)

module.exports = router
