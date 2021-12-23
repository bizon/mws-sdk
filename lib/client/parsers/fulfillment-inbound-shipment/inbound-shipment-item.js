const select = require('../select')
const {parseStr, parseNumber, parseDate} = require('../base')

const parsePrepDetails = require('./prep-details')

module.exports = (key, node) => ({
  shipmentId: parseStr(`${key}/fulfillmentInboundShipment:ShipmentId`, node),
  sellerSKU: parseStr(`${key}/fulfillmentInboundShipment:SellerSKU`, node),
  fulfillmentNetworkSKU: parseStr(`${key}/fulfillmentInboundShipment:FulfillmentNetworkSKU`, node),
  quantityShipped: parseNumber(`${key}/fulfillmentInboundShipment:QuantityShipped`, node),
  quantityReceived: parseNumber(`${key}/fulfillmentInboundShipment:QuantityReceived`, node),
  quantityInCase: parseNumber(`${key}/fulfillmentInboundShipment:QuantityInCase`, node),
  prepDetailsList: select(
    `${key}/fulfillmentInboundShipment:PrepDetailsList/fulfillmentInboundShipment:PrepDetails`,
    node,
  ).map((n) => parsePrepDetails('.', n)),
  releaseDate: parseDate(`${key}/fulfillmentInboundShipment:ReleaseDate`, node),
})
