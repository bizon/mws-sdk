const {parseString} = require('../base')
const select = require('../select')

const parseInventorySupply = require('./inventory-supply')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/fulfillmentInventory:MarketplaceId`, node),
  nextToken: parseString(`${key}/fulfillmentInventory:NextToken`, node),
  inventorySupplyList: select(
    `${key}/fulfillmentInventory:InventorySupplyList/fulfillmentInventory:member`,
    node,
  ).map((n) => parseInventorySupply('.', n)),
})
