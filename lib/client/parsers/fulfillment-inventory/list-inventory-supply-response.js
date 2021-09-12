const parseResponseMetadata = require('../base/response-metadata')

const parseListInventorySupplyResult = require('./list-inventory-supply-result')

module.exports = (key, node, token = false) => ({
  listInventorySupplyResult: parseListInventorySupplyResult(
    token
      ? `${key}/fulfillmentInventory:ListInventorySupplyByNextTokenResult`
      : `${key}/fulfillmentInventory:ListInventorySupplyResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/fulfillmentInventory:ResponseMetadata`, node),
})
