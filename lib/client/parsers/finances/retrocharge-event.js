const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  retrochargeEventType: parseStr(`${key}/finances:RetrochargeEventType`, node),
  amazonOrderId: parseDate(`${key}/finances:AmazonOrderId`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  BaseTax: parseCurrencyAmount(`${key}/finances:BaseTax`, node),
  ShippingTax: parseCurrencyAmount(`${key}/finances:ShippingTax`, node),
  MarketplaceName: parseStr(`${key}/finances:MarketplaceName`, node)
})
