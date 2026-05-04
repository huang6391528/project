/**
 * 数据库工具类
 */
const mysql = require('mysql2/promise')
const config = require('../config')

let pool = null

/**
 * 获取数据库连接池
 */
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })
  }
  return pool
}

/**
 * 执行查询
 */
async function query(sql, params = []) {
  const pool = getPool()
  const [rows] = await pool.execute(sql, params)
  return rows
}

/**
 * 执行事务
 */
async function transaction(callback) {
  const pool = getPool()
  const connection = await pool.getConnection()

  try {
    await connection.beginTransaction()
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

/**
 * 关闭连接池
 */
async function close() {
  if (pool) {
    await pool.end()
    pool = null
  }
}

module.exports = {
  query,
  transaction,
  close,
  getPool
}
