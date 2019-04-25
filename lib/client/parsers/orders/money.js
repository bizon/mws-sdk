const {parseStr, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseStr(`${key}/orders:CurrencyCode`, node),
  amount: parseDecimal(`${key}/orders:Amount`, node)
})
