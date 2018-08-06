const {parseStr, parseDecimal} = require('../base')

module.exports = (key, node) => {
  let currencyAmount = parseDecimal(`${key}/CurrencyAmount`, node)
  if (currencyAmount === null) {
    currencyAmount = parseDecimal(`${key}/Amount`, node)
  }

  return {
    currencyCode: parseStr(`${key}/CurrencyCode`, node),
    currencyAmount
  }
}
