const parseResponseMetadata = require('../base/response-metadata')

const parseListOrderItemsResult = require('./list-order-items-result')

module.exports = (key, node, token = false) => ({
  listOrderItemsResult: parseListOrderItemsResult(
    token ? `${key}/orders:ListOrderItemsByNextTokenResult` : `${key}/orders:ListOrderItemsResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/orders:ResponseMetadata`, node),
})
