const parseResponseMetadata = require('../base/response-metadata')
const select = require('../select')

const parseGetMatchingProductResult = require('./get-matching-product-result')

module.exports = (key, node) => ({
  getMatchingProductResults: select(`${key}/products:GetMatchingProductResult`, node).map((n) =>
    parseGetMatchingProductResult('.', n),
  ),

  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
