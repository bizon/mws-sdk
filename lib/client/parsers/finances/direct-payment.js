const {parseString} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  directPaymentType: parseString(`${key}/finances:DirectPaymentType`, node),
  directPaymentAmount: nullable(parseCurrencyAmount, `${key}/finances:DirectPaymentAmount`, node),
})
