const {parseString, parseNumber} = require('../base')
const nullable = require('../nullable')
const select = require('../select')

const parseInventorySupplyDetail = require('./inventory-supply-detail')
const parseTimepoint = require('./timepoint')

module.exports = (key, node) => ({
  sellerSKU: parseString(`${key}/fulfillmentInventory:SellerSKU`, node),
  fnSKU: parseString(`${key}/fulfillmentInventory:FNSKU`, node),
  asin: parseString(`${key}/fulfillmentInventory:ASIN`, node),
  condition: parseString(`${key}/fulfillmentInventory:Condition`, node),
  totalSupplyQuantity: parseNumber(`${key}/fulfillmentInventory:TotalSupplyQuantity`, node),
  inStockSupplyQuantity: parseNumber(`${key}/fulfillmentInventory:InStockSupplyQuantity`, node),
  earliestAvailability: nullable(
    parseTimepoint,
    `${key}/fulfillmentInventory:EarliestAvailability`,
    node,
  ),
  supplyDetail: select(
    `${key}/fulfillmentInventory:SupplyDetail/fulfillmentInventory:member`,
    node,
  ).map((n) => parseInventorySupplyDetail('.', n)),
})
