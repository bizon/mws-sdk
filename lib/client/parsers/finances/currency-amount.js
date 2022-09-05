const {parseString, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseString(`${key}/finances:CurrencyCode`, node),
  currencyAmount: parseDecimal([`${key}/finances:Amount`, `${key}/finances:CurrencyAmount`], node),
})
