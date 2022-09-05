const {parseString, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseString(`${key}/products:CurrencyCode`, node),
  amount: parseDecimal(`${key}/products:Amount`, node),
})
