/**
 * 用户数据模型
 */
const db = require('../utils/db')

class UserModel {
  /**
   * 根据 ID 查找用户
   */
  async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?'
    const results = await db.query(sql, [id])
    return results[0] || null
  }

  /**
   * 根据 OpenID 查找用户
   */
  async findByOpenid(openid) {
    const sql = 'SELECT * FROM users WHERE openid = ?'
    const results = await db.query(sql, [openid])
    return results[0] || null
  }

  /**
   * 创建用户
   */
  async create(data) {
    const sql = `
      INSERT INTO users (openid, nickname, avatar, gender, create_time)
      VALUES (?, ?, ?, ?, NOW())
    `
    const result = await db.query(sql, [
      data.openid,
      data.nickname || '',
      data.avatar || '',
      data.gender || 0
    ])
    return this.findById(result.insertId)
  }

  /**
   * 更新用户信息
   */
  async update(id, data) {
    const fields = []
    const values = []

    const allowedFields = ['nickname', 'avatar', 'phone', 'email', 'gender', 'birthday', 'school', 'class_id']
    for (const field of allowedFields) {
      const camelField = field.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
      if (data[camelField] !== undefined) {
        fields.push(`${field} = ?`)
        values.push(data[camelField])
      }
    }

    if (fields.length === 0) return this.findById(id)

    values.push(id)
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
    await db.query(sql, values)
    return this.findById(id)
  }

  /**
   * 获取用户碳积分
   */
  async getCarbon(id) {
    const sql = 'SELECT carbon FROM users WHERE id = ?'
    const results = await db.query(sql, [id])
    return results[0]?.carbon || 0
  }

  /**
   * 更新用户碳积分
   */
  async updateCarbon(id, carbon) {
    const sql = 'UPDATE users SET carbon = carbon + ? WHERE id = ?'
    await db.query(sql, [carbon, id])
    return this.getCarbon(id)
  }
}

module.exports = UserModel
