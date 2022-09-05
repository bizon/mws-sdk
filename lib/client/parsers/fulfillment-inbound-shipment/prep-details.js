const {parseString} = require('../base')

module.exports = (key, node) => ({
  prepInstruction: parseString(`${key}/fulfillmentInboundShipment:PrepInstruction`, node),
  prepOwner: parseString(`${key}/fulfillmentInboundShipment:PrepOwner`, node),
})
