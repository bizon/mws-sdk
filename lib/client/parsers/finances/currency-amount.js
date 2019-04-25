const {parseStr, parseDecimal} = require('../base')

module.exports = (key, node) => {
  let currencyAmount = parseDecimal(`${key}/finances:CurrencyAmount`, node)
  if (currencyAmount === null) {
    currencyAmount = parseDecimal(`${key}/finances:Amount`, node)
  }

  return {
    currencyCode: parseStr(`${key}/finances:CurrencyCode`, node),
    currencyAmount
  }
}
