const {parseString} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  feeType: parseString(`${key}/finances:FeeType`, node),
  feeAmount: parseCurrencyAmount(`${key}/finances:FeeAmount`, node),
})
