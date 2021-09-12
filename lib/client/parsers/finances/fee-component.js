const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  feeType: parseStr(`${key}/finances:FeeType`, node),
  feeAmount: parseCurrencyAmount(`${key}/finances:FeeAmount`, node),
})
