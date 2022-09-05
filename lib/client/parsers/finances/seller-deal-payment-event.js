const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate([`${key}/finances:postedDate`, `${key}/finances:PostedDate`], node),

  dealId: parseString([`${key}/finances:dealId`, `${key}/finances:DealId`], node),

  dealDescription: parseString(
    [`${key}/finances:dealDescription`, `${key}/finances:DealDescription`],
    node,
  ),

  eventType: parseString([`${key}/finances:eventType`, `${key}/finances:EventType`], node),

  feeType: parseString([`${key}/finances:feeType`, `${key}/finances:FeeType`], node),

  feeAmount: nullable(
    parseCurrencyAmount,
    [`${key}/finances:feeAmount`, `${key}/finances:FeeAmount`],
    node,
  ),

  taxAmount: nullable(
    parseCurrencyAmount,
    [`${key}/finances:taxAmount`, `${key}/finances:TaxAmount`],
    node,
  ),

  totalAmount: nullable(
    parseCurrencyAmount,
    [`${key}/finances:totalAmount`, `${key}/finances:TotalAmount`],
    node,
  ),
})
