const parseResponseMetadata = require('../base/response-metadata')

const parseGetOrderResult = require('./get-order-result')

module.exports = (key, node) => ({
  getOrderResult: parseGetOrderResult(`${key}/GetOrderResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
