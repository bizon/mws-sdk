const parseResponseMetadata = require('../base/response-metadata')

const parseGetOrderResult = require('./get-order-result')

module.exports = (key, node) => ({
  getOrderResult: parseGetOrderResult(`${key}/orders:GetOrderResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/orders:ResponseMetadata`, node)
})
