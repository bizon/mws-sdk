const {parseStr, parseDecimal} = require('../../base')

module.exports = (key, node) => ({
  amount: parseDecimal(`${key}/products2:Amount`, node),
  currencyCode: parseStr(`${key}/products2:CurrencyCode`, node)
})
