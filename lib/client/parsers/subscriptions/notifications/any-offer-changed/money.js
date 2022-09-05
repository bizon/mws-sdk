const {parseString, parseDecimal} = require('../../../base')

module.exports = (key, node) => ({
  currencyCode: parseString(`${key}/CurrencyCode`, node),
  amount: parseDecimal(`${key}/Amount`, node),
})
