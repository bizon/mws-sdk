const select = require('../select')
const {parseStr} = require('../base')

const parseInboundShipmentInfo = require('./inbound-shipment-info')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/fulfillmentInboundShipment:NextToken`, node),
  shipmentData: select(`${key}/fulfillmentInboundShipment:ShipmentData/fulfillmentInboundShipment:member`, node).map(n => parseInboundShipmentInfo('.', n)),
})
