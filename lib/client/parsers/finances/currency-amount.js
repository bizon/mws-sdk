const {parseStr, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseStr(`${key}/finances:CurrencyCode`, node),
  currencyAmount: parseDecimal([`${key}/finances:Amount`, `${key}/finances:CurrencyAmount`], node),
})
