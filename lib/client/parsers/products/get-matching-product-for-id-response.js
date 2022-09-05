const parseResponseMetadata = require('../base/response-metadata')
const select = require('../select')

const parseGetMatchingProductForIdResult = require('./get-matching-product-for-id-result')

module.exports = (key, node) => ({
  getMatchingProductForIdResults: select(`${key}/products:GetMatchingProductForIdResult`, node).map(
    (n) => parseGetMatchingProductForIdResult('.', n),
  ),

  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
