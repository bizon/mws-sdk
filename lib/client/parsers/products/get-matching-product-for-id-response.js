const select = require('../select')

const parseResponseMetadata = require('../base/response-metadata')
const parseGetMatchingProductForIdResult = require('./get-matching-product-for-id-result')

module.exports = (key, node) => ({
  getMatchingProductForIdResults: select(`${key}/products:GetMatchingProductForIdResult`, node).map(n => {
    return parseGetMatchingProductForIdResult('.', n)
  }),

  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node)
})
