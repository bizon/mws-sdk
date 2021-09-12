const parseResponseMetadata = require('../base/response-metadata')

const parseListInboundShipmentsResult = require('./list-inbound-shipments-result')

module.exports = (key, node, token = false) => ({
  listInboundShipmentsResult: parseListInboundShipmentsResult(
    token
      ? `${key}/fulfillmentInboundShipment:ListInboundShipmentsResultByNextToken`
      : `${key}/fulfillmentInboundShipment:ListInboundShipmentsResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/fulfillmentInboundShipment:ResponseMetadata`, node),
})
