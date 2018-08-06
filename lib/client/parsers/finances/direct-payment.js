const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  directPaymentType: parseStr(`${key}/DirectPaymentType`, node),
  directPaymentAmount: parseCurrencyAmount(`${key}/DirectPaymentAmount`, node)
})
