const {parseStr, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseStr(`${key}/products:CurrencyCode`, node),
  amount: parseDecimal(`${key}/products:Amount`, node),
})
