const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  chargeType: parseStr(`${key}/ChargeType`, node),
  chargeAmount: parseCurrencyAmount(`${key}/ChargeAmount`, node)
})
