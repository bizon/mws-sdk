const nullable = require('../nullable')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  transactionType: parseStr(`${key}/finances:TransactionType`, node),
  amazonOrderId: parseStr(`${key}/finances:AmazonOrderId`, node),
  baseExpense: nullable(parseCurrencyAmount, `${key}/finances:BaseExpense`, node),
  totalExpense: nullable(parseCurrencyAmount, `${key}/finances:TotalExpense`, node),
  taxTypeIGST: nullable(parseCurrencyAmount, `${key}/finances:TaxTypeIGST`, node),
  taxTypeCGST: nullable(parseCurrencyAmount, `${key}/finances:TaxTypeCGST`, node),
  taxTypeSGST: nullable(parseCurrencyAmount, `${key}/finances:TaxTypeSGST`, node),
  marketplaceId: parseStr(`${key}/finances:MarketplaceId`, node),
})
