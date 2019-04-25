const nullable = require('../nullable')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  dealId: parseStr(`${key}/finances:DealId`, node),
  dealDescription: parseStr(`${key}/finances:DealDescription`, node),
  eventType: parseStr(`${key}/finances:EventType`, node),
  feeType: parseStr(`${key}/finances:FeeType`, node),
  feeAmount: nullable(parseCurrencyAmount, `${key}/finances:FeeAmount`, node),
  taxAmount: nullable(parseCurrencyAmount, `${key}/finances:TaxAmount`, node),
  totalAmount: nullable(parseCurrencyAmount, `${key}/finances:TotalAmount`, node)
})
