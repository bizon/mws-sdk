const select = require('../select')
const {parseStr} = require('../base')

const parseInventorySupply = require('./inventory-supply')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/fulfillmentInventory:NextToken`, node),
  inventorySupplyList: select(`${key}/fulfillmentInventory:InventorySupplyList/fulfillmentInventory:member`, node).map(n => {
    return parseInventorySupply('.', n)
  })
})
