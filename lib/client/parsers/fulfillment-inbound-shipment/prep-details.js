const {parseStr} = require('../base')

module.exports = (key, node) => ({
  prepInstruction: parseStr(`${key}/fulfillmentInboundShipment:PrepInstruction`, node),
  prepOwner: parseStr(`${key}/fulfillmentInboundShipment:PrepOwner`, node)
})
