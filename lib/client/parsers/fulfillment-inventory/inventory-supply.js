const select = require('../select')
const nullable = require('../nullable')
const {parseStr, parseNumber} = require('../base')

const parseTimepoint = require('./timepoint')
const parseInventorySupplyDetail = require('./inventory-supply-detail')

module.exports = (key, node) => ({
  sellerSKU: parseStr(`${key}/fulfillmentInventory:SellerSKU`, node),
  fnSKU: parseStr(`${key}/fulfillmentInventory:FNSKU`, node),
  asin: parseStr(`${key}/fulfillmentInventory:ASIN`, node),
  condition: parseStr(`${key}/fulfillmentInventory:Condition`, node),
  totalSupplyQuantity: parseNumber(`${key}/fulfillmentInventory:TotalSupplyQuantity`, node),
  inStockSupplyQuantity: parseNumber(`${key}/fulfillmentInventory:InStockSupplyQuantity`, node),
  earliestAvailability: nullable(parseTimepoint, `${key}/fulfillmentInventory:EarliestAvailability`, node),
  supplyDetail: select(`${key}/fulfillmentInventory:SupplyDetail/fulfillmentInventory:member`, node).map(n => parseInventorySupplyDetail('.', n)),
})
