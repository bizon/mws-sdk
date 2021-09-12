const parseResponseMetadata = require('../base/response-metadata')

const parseListOrdersResult = require('./list-orders-result')

module.exports = (key, node, token = false) => ({
  listOrdersResult: parseListOrdersResult(
    token ? `${key}/orders:ListOrdersByNextTokenResult` : `${key}/orders:ListOrdersResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/orders:ResponseMetadata`, node),
})
