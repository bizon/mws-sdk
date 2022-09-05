const {parseBool, parseString} = require('../base')

module.exports = (key, node) => ({
  hasAutomatedShippingSettings: parseBool(`${key}/orders:hasAutomatedShippingSettings`, node),
  automatedCarrier: parseString(`${key}/orders:automatedCarrier`, node),
  automatedShipMethod: parseString(`${key}/orders:automatedShipMethod`, node),
})
