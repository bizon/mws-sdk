const nullable = require('../nullable')
const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  directPaymentType: parseStr(`${key}/finances:DirectPaymentType`, node),
  directPaymentAmount: nullable(parseCurrencyAmount, `${key}/finances:DirectPaymentAmount`, node)
})
