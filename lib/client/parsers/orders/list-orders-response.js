const parseResponseMetadata = require('../base/response-metadata')

const parseListOrdersResult = require('./list-orders-result')

module.exports = (key, node, token = false) => ({
  listOrdersResult: parseListOrdersResult(
    token ? `${key}/ListOrdersByNextTokenResult` : `${key}/ListOrdersResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
