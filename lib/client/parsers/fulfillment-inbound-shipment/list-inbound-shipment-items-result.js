const {parseString} = require('../base')
const select = require('../select')

const parseInboundShipmentItem = require('./inbound-shipment-item')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/fulfillmentInboundShipment:NextToken`, node),
  itemData: select(
    `${key}/fulfillmentInboundShipment:ItemData/fulfillmentInboundShipment:member`,
    node,
  ).map((n) => parseInboundShipmentItem('.', n)),
})
