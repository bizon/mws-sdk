const {parseString, parseNumber, parseDate} = require('../base')
const select = require('../select')

const parsePrepDetails = require('./prep-details')

module.exports = (key, node) => ({
  shipmentId: parseString(`${key}/fulfillmentInboundShipment:ShipmentId`, node),
  sellerSKU: parseString(`${key}/fulfillmentInboundShipment:SellerSKU`, node),
  fulfillmentNetworkSKU: parseString(
    `${key}/fulfillmentInboundShipment:FulfillmentNetworkSKU`,
    node,
  ),
  quantityShipped: parseNumber(`${key}/fulfillmentInboundShipment:QuantityShipped`, node),
  quantityReceived: parseNumber(`${key}/fulfillmentInboundShipment:QuantityReceived`, node),
  quantityInCase: parseNumber(`${key}/fulfillmentInboundShipment:QuantityInCase`, node),
  prepDetailsList: select(
    `${key}/fulfillmentInboundShipment:PrepDetailsList/fulfillmentInboundShipment:PrepDetails`,
    node,
  ).map((n) => parsePrepDetails('.', n)),
  releaseDate: parseDate(`${key}/fulfillmentInboundShipment:ReleaseDate`, node),
})
