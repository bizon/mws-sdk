const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  description: parseStr(`${key}/Description`, node),
  tail: parseStr(`${key}/Tail`, node),
  amount: parseCurrencyAmount(`${key}/Amount`, node)
})
