/**
 * 表单验证工具
 */

/**
 * 验证规则
 */
const RULES = {
  required: (value) => {
    if (value === null || value === undefined || value === '') {
      return '此字段为必填项'
    }
    return true
  },
  phone: (value) => {
    const reg = /^1[3-9]\d{9}$/
    if (!reg.test(value)) {
      return '请输入正确的手机号码'
    }
    return true
  },
  email: (value) => {
    const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!reg.test(value)) {
      return '请输入正确的邮箱地址'
    }
    return true
  },
  url: (value) => {
    const reg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/
    if (!reg.test(value)) {
      return '请输入正确的网址'
    }
    return true
  },
  number: (value) => {
    if (isNaN(Number(value))) {
      return '请输入数字'
    }
    return true
  },
  integer: (value) => {
    const reg = /^-?\d+$/
    if (!reg.test(value)) {
      return '请输入整数'
    }
    return true
  },
  positiveInteger: (value) => {
    const reg = /^[1-9]\d*$/
    if (!reg.test(value)) {
      return '请输入正整数'
    }
    return true
  },
  decimal: (value, decimals = 2) => {
    const reg = new RegExp(`^-?\\d+(\\.\\d{1,${decimals}})?$`)
    if (!reg.test(value)) {
      return `请输入最多${decimals}位小数的数字`
    }
    return true
  },
  minLength: (value, length) => {
    if (value.length < length) {
      return `至少需要 ${length} 个字符`
    }
    return true
  },
  maxLength: (value, length) => {
    if (value.length > length) {
      return `最多只能输入 ${length} 个字符`
    }
    return true
  },
  rangeLength: (value, min, max) => {
    const len = value.length
    if (len < min || len > max) {
      return `字符长度应在 ${min} 到 ${max} 之间`
    }
    return true
  },
  min: (value, min) => {
    if (Number(value) < min) {
      return `值不能小于 ${min}`
    }
    return true
  },
  max: (value, max) => {
    if (Number(value) > max) {
      return `值不能大于 ${max}`
    }
    return true
  },
  range: (value, min, max) => {
    const num = Number(value)
    if (num < min || num > max) {
      return `值应在 ${min} 到 ${max} 之间`
    }
    return true
  },
  pattern: (value, reg, message = '格式不正确') => {
    if (!reg.test(value)) {
      return message
    }
    return true
  },
  idCard: (value) => {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!reg.test(value)) {
      return '请输入正确的身份证号码'
    }
    return true
  }
}

/**
 * 验证单个字段
 * @param {*} value - 字段值
 * @param {Array} rules - 验证规则
 * @returns {string|true} 错误信息或 true
 */
export function validateField(value, rules) {
  for (const rule of rules) {
    let ruleName, ruleParam

    if (typeof rule === 'string') {
      ruleName = rule
      ruleParam = undefined
    } else if (typeof rule === 'object') {
      ruleName = rule.name || rule.rule
      ruleParam = rule.param
    } else {
      continue
    }

    const validator = RULES[ruleName]
    if (!validator) {
      console.warn(`[Validate] Unknown rule: ${ruleName}`)
      continue
    }

    const result = ruleParam !== undefined
      ? validator(value, ruleParam)
      : validator(value)

    if (result !== true) {
      return result
    }
  }
  return true
}

/**
 * 验证表单
 * @param {Object} data - 表单数据
 * @param {Object} rules - 验证规则配置
 * @returns {Object} { isValid, errors }
 */
export function validate(data, rules) {
  const errors = {}

  for (const field in rules) {
    const value = data[field]
    const fieldRules = rules[field]

    const result = validateField(value, fieldRules)
    if (result !== true) {
      errors[field] = result
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * 异步验证表单
 * @param {Object} data - 表单数据
 * @param {Object} rules - 验证规则配置
 * @returns {Promise<boolean>}
 */
export async function validateAsync(data, rules) {
  const { isValid, errors } = validate(data, rules)

  if (!isValid) {
    const firstError = Object.values(errors)[0]
    uni.showToast({
      title: firstError,
      icon: 'none'
    })
    return false
  }

  return true
}

/**
 * 注册自定义验证规则
 * @param {string} name - 规则名称
 * @param {Function} validator - 验证函数
 */
export function registerRule(name, validator) {
  if (RULES[name]) {
    console.warn(`[Validate] Rule ${name} already exists, overwriting...`)
  }
  RULES[name] = validator
}

export default {
  validate,
  validateField,
  validateAsync,
  registerRule,
  RULES
}
