const {parseStr} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseStr(`${key}/CurrencyCode`, node),
  amount: parseStr(`${key}/Amount`, node)
})
