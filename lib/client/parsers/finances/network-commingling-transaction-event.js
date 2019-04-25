const nullable = require('../nullable')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  netCoTransactionId: parseStr(`${key}/finances:NetCoTransactionID`, node),
  swapReason: parseStr(`${key}/finances:SwapReason`, node),
  transactionType: parseStr(`${key}/finances:TransactionType`, node),
  asin: parseStr(`${key}/finances:ASIN`, node),
  marketplaceId: parseStr(`${key}/finances:MarketplaceId`, node),
  taxExclusiveAmount: nullable(parseCurrencyAmount, `${key}/finances:TaxExclusiveAmount`, node),
  taxAmount: nullable(parseCurrencyAmount, `${key}/finances:TaxAmount`, node)
})
