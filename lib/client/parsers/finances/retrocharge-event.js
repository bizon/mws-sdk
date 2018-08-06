const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  retrochargeEventType: parseStr(`${key}/RetrochargeEventType`, node),
  amazonOrderId: parseDate(`${key}/AmazonOrderId`, node),
  postedDate: parseDate(`${key}/PostedDate`, node),
  BaseTax: parseCurrencyAmount(`${key}/BaseTax`, node),
  ShippingTax: parseCurrencyAmount(`${key}/ShippingTax`, node),
  MarketplaceName: parseStr(`${key}/MarketplaceName`, node)
})
