const {parseBool, parseStr} = require('../base')

module.exports = (key, node) => ({
  hasAutomatedShippingSettings: parseBool(`${key}/orders:hasAutomatedShippingSettings`, node),
  automatedCarrier: parseStr(`${key}/orders:automatedCarrier`, node),
  automatedShipMethod: parseStr(`${key}/orders:automatedShipMethod`, node),
})
