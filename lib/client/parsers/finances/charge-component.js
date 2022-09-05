const {parseString} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  chargeType: parseString(`${key}/finances:ChargeType`, node),
  chargeAmount: parseCurrencyAmount(`${key}/finances:ChargeAmount`, node),
})
