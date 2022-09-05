const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  netCoTransactionId: parseString(`${key}/finances:NetCoTransactionID`, node),
  swapReason: parseString(`${key}/finances:SwapReason`, node),
  transactionType: parseString(`${key}/finances:TransactionType`, node),
  asin: parseString(`${key}/finances:ASIN`, node),
  marketplaceId: parseString(`${key}/finances:MarketplaceId`, node),
  taxExclusiveAmount: nullable(parseCurrencyAmount, `${key}/finances:TaxExclusiveAmount`, node),
  taxAmount: nullable(parseCurrencyAmount, `${key}/finances:TaxAmount`, node),
})
