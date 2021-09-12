const {parseStr} = require('../base')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  payment: parseMoney(`${key}/orders:Payment`, node),
  paymentMethod: parseStr(`${key}/orders:PaymentMethod`, node),
})
