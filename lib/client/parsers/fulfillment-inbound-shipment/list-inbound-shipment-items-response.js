const parseResponseMetadata = require('../base/response-metadata')

const parseListInboundShipmentItemsResult = require('./list-inbound-shipment-items-result')

module.exports = (key, node, token = false) => ({
  listInboundShipmentItemsResult: parseListInboundShipmentItemsResult(
    token ?
      `${key}/fulfillmentInboundShipment:ListInboundShipmentItemsResultByNextToken` :
      `${key}/fulfillmentInboundShipment:ListInboundShipmentItemsResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/fulfillmentInboundShipment:ResponseMetadata`, node)
})
