const {parseStr, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseStr(`${key}/fulfillmentInboundShipment:CurrencyCode`, node),
  value: parseDecimal(`${key}/fulfillmentInboundShipment:Value`, node),
})
