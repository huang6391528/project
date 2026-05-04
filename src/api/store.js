/**
 * 商城相关 API
 */
import request from '../utils/request'

/**
 * 获取商品分类列表
 */
export function getGoodsCategories() {
  return request({
    url: '/api/store/categories',
    method: 'GET'
  })
}

/**
 * 获取商品列表
 * @param {Object} params - 查询参数 { category, page, limit }
 */
export function getGoodsList(params) {
  return request({
    url: '/api/store/goods',
    method: 'GET',
    data: params
  })
}

/**
 * 获取商品详情
 * @param {string} id - 商品ID
 */
export function getGoodsDetail(id) {
  return request({
    url: `/api/store/goods/${id}`,
    method: 'GET'
  })
}

/**
 * 获取秒杀商品列表
 */
export function getFlashSaleGoods() {
  return request({
    url: '/api/store/flash/list',
    method: 'GET'
  })
}

/**
 * 获取秒杀活动信息
 */
export function getFlashSaleInfo() {
  return request({
    url: '/api/store/flash/info',
    method: 'GET'
  })
}

/**
 * 兑换商品
 * @param {Object} data - 兑换数据 { goodsId, quantity, addressId }
 */
export function exchangeGoods(data) {
  return request({
    url: '/api/store/exchange',
    method: 'POST',
    data
  })
}

/**
 * 获取兑换记录
 * @param {Object} params - 查询参数 { page, limit, status }
 */
export function getExchangeRecords(params) {
  return request({
    url: '/api/store/exchange/records',
    method: 'GET',
    data: params
  })
}

/**
 * 获取用户积分
 */
export function getUserPoints() {
  return request({
    url: '/api/store/points',
    method: 'GET'
  })
}

/**
 * 获取积分记录
 * @param {Object} params - 查询参数 { page, limit, type }
 */
export function getPointsRecords(params) {
  return request({
    url: '/api/store/points/records',
    method: 'GET',
    data: params
  })
}

/**
 * 获取校园服务列表
 */
export function getCampusServices() {
  return request({
    url: '/api/store/campus/services',
    method: 'GET'
  })
}

/**
 * 获取虚拟商品列表
 */
export function getVirtualGoods() {
  return request({
    url: '/api/store/virtual',
    method: 'GET'
  })
}

/**
 * 领取虚拟商品
 * @param {string} goodsId - 商品ID
 */
export function claimVirtualGoods(goodsId) {
  return request({
    url: '/api/store/virtual/claim',
    method: 'POST',
    data: { goodsId }
  })
}

/**
 * 获取环保证书列表
 */
export function getCertificates() {
  return request({
    url: '/api/store/certificates',
    method: 'GET'
  })
}

/**
 * 领取环保证书
 * @param {Object} data - 领取数据 { type, level }
 */
export function claimCertificate(data) {
  return request({
    url: '/api/store/certificates/claim',
    method: 'POST',
    data
  })
}
