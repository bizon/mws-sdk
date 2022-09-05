const {parseString, parseNumber} = require('../base')

const parseTimepoint = require('./timepoint')

module.exports = (key, node) => ({
  quantity: parseNumber(`${key}/fulfillmentInventory:Quantity`, node),
  supplyType: parseString(`${key}/fulfillmentInventory:SupplyType`, node),
  earliestAvailableToPick: parseTimepoint(
    `${key}/fulfillmentInventory:EarliestAvailableToPick`,
    node,
  ),
  latestAvailableToPick: parseTimepoint(`${key}/fulfillmentInventory:LatestAvailableToPick`, node),
})
