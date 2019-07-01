const parseResponseMetadata = require('../../base/response-metadata')
const parseGetLowestPricedOffersForAsinResult = require('./get-lowest-priced-offers-for-asin-result')

module.exports = (key, node) => ({
  getLowestPricedOffersForAsinResult: parseGetLowestPricedOffersForAsinResult(`${key}/products:GetLowestPricedOffersForASINResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node)
})
