const select = require('../select')
const {parseStr} = require('../base')

const parseInboundShipmentItem = require('./inbound-shipment-item')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/fulfillmentInboundShipment:NextToken`, node),
  itemData: select(
    `${key}/fulfillmentInboundShipment:ItemData/fulfillmentInboundShipment:member`,
    node,
  ).map((n) => parseInboundShipmentItem('.', n)),
})
