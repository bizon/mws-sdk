const {parseString, parseDecimal} = require('../../base')

module.exports = (key, node) => ({
  amount: parseDecimal(`${key}/products2:Amount`, node),
  currencyCode: parseString(`${key}/products2:CurrencyCode`, node),
})
