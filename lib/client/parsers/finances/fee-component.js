const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  feeType: parseStr(`${key}/FeeType`, node),
  feeAmount: parseCurrencyAmount(`${key}/FeeAmount`, node)
})
