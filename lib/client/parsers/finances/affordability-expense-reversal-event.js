const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  transactionType: parseString(`${key}/finances:TransactionType`, node),
  amazonOrderId: parseString(`${key}/finances:AmazonOrderId`, node),
  baseExpense: nullable(parseCurrencyAmount, `${key}/finances:BaseExpense`, node),
  totalExpense: nullable(parseCurrencyAmount, `${key}/finances:TotalExpense`, node),
  taxTypeIGST: nullable(parseCurrencyAmount, `${key}/finances:TaxTypeIGST`, node),
  taxTypeCGST: nullable(parseCurrencyAmount, `${key}/finances:TaxTypeCGST`, node),
  taxTypeSGST: nullable(parseCurrencyAmount, `${key}/finances:TaxTypeSGST`, node),
  marketplaceId: parseString(`${key}/finances:MarketplaceId`, node),
})
