const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  retrochargeEventType: parseStr(`${key}/finances:RetrochargeEventType`, node),
  amazonOrderId: parseStr(`${key}/finances:AmazonOrderId`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  baseTax: parseCurrencyAmount(`${key}/finances:BaseTax`, node),
  bhippingTax: parseCurrencyAmount(`${key}/finances:ShippingTax`, node),
  marketplaceName: parseStr(`${key}/finances:MarketplaceName`, node)
})
