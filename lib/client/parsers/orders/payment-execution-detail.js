const {parseString} = require('../base')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  payment: parseMoney(`${key}/orders:Payment`, node),
  paymentMethod: parseString(`${key}/orders:PaymentMethod`, node),
})
