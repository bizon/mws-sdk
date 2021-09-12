const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  chargeType: parseStr(`${key}/finances:ChargeType`, node),
  chargeAmount: parseCurrencyAmount(`${key}/finances:ChargeAmount`, node),
})
