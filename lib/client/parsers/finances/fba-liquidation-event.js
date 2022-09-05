const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  originalRemovalOrderId: parseString(`${key}/finances:OriginalRemovalOrderId`, node),
  liquidationProceedsAmount: nullable(
    parseCurrencyAmount,
    `${key}/finances:LiquidationProceedsAmount`,
    node,
  ),
  liquidationFeeAmount: nullable(parseCurrencyAmount, `${key}/finances:LiquidationFeeAmount`, node),
})
