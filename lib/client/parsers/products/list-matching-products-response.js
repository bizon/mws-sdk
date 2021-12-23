const parseResponseMetadata = require('../base/response-metadata')
const parseListMatchingProductsResult = require('./list-matching-products-result')

module.exports = (key, node) => ({
  listMatchingProductsResult: parseListMatchingProductsResult(
    `${key}/products:ListMatchingProductsResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
