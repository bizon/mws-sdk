const nullable = require('../nullable')
const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  originalRemovalOrderId: parseStr(`${key}/finances:OriginalRemovalOrderId`, node),
  liquidationProceedsAmount: nullable(parseCurrencyAmount, `${key}/finances:LiquidationProceedsAmount`, node),
  liquidationFeeAmount: nullable(parseCurrencyAmount, `${key}/finances:LiquidationFeeAmount`, node)
})
