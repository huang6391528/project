/**
 * 后端入口文件
 */
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('./config')

const app = express()

// 中间件
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由
app.use('/api/user', require('./routes/user'))
app.use('/api/run', require('./routes/run'))
app.use('/api/action', require('./routes/action'))
app.use('/api/store', require('./routes/store'))
app.use('/api/message', require('./routes/message'))
app.use('/api/social', require('./routes/social'))

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

// 错误处理
app.use((err, req, res, next) => {
  console.error('[Error]', err)
  res.status(err.status || 500).json({
    code: err.code || 500,
    message: err.message || '服务器内部错误'
  })
})

// 启动服务器
const PORT = config.port || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app
