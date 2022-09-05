const {parseString, parseDecimal} = require('../base')

module.exports = (key, node) => ({
  currencyCode: parseString(`${key}/fulfillmentInboundShipment:CurrencyCode`, node),
  value: parseDecimal(`${key}/fulfillmentInboundShipment:Value`, node),
})
