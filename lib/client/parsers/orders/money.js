const {parseString, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseString(`${key}/orders:CurrencyCode`, node),
  amount: parseDecimal(`${key}/orders:Amount`, node),
})
