const parseResponseMetadata = require('../base/response-metadata')

const parseGetBillOfLadingResult = require('./get-bill-of-lading-result')

module.exports = (key, node) => ({
  getBillOfLadingResult: parseGetBillOfLadingResult(`${key}/fulfillmentInboundShipment:GetBillOfLadingResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/fulfillmentInboundShipment:ResponseMetadata`, node),
})
