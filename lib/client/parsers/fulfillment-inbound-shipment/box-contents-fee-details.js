const nullable = require('../nullable')
const {parseNumber} = require('../base')

const parseAmount = require('./amount')

module.exports = (key, node) => ({
  totalUnits: parseNumber(`${key}/fulfillmentInboundShipment:TotalUnits`, node),
  feePerUnit: nullable(parseAmount, `${key}/fulfillmentInboundShipment:FeePerUnit`, node),
  totalFee: nullable(parseAmount, `${key}/fulfillmentInboundShipment:TotalFee`, node)
})
