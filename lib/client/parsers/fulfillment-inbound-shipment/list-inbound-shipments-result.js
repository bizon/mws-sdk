const {parseString} = require('../base')
const select = require('../select')

const parseInboundShipmentInfo = require('./inbound-shipment-info')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/fulfillmentInboundShipment:NextToken`, node),
  shipmentData: select(
    `${key}/fulfillmentInboundShipment:ShipmentData/fulfillmentInboundShipment:member`,
    node,
  ).map((n) => parseInboundShipmentInfo('.', n)),
})
