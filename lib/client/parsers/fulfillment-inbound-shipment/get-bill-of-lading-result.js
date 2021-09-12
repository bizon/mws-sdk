const parseTransportDocument = require('./transport-document')

module.exports = (key, node) => ({
  transportDocument: parseTransportDocument(`${key}/fulfillmentInboundShipment:TransportDocument`, node),
})
