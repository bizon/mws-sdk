const nullable = require('../nullable')
const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  description: parseStr(`${key}/finances:Description`, node),
  tail: parseStr(`${key}/finances:Tail`, node),
  amount: nullable(parseCurrencyAmount, `${key}/finances:Amount`, node),
})
