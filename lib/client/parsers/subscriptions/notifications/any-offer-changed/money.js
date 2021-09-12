const {parseStr, parseDecimal} = require('../../../base')

module.exports = (key, node) => ({
  currencyCode: parseStr(`${key}/CurrencyCode`, node),
  amount: parseDecimal(`${key}/Amount`, node),
})
