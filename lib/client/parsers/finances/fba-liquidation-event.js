const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/PostedDate`, node),
  originalRemovalOrderId: parseStr(`${key}/OriginalRemovalOrderId`, node),
  liquidationProceedsAmount: parseCurrencyAmount(`${key}/LiquidationProceedsAmount`, node),
  liquidationFeeAmount: parseCurrencyAmount(`${key}/LiquidationFeeAmount`, node)
})
