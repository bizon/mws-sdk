const {parseStr} = require('../base')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  payment: parseMoney(`${key}/Payment`, node),
  paymentMethod: parseStr(`${key}/PaymentMethod`, node)
})
