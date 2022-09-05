const parseResponseMetadata = require('../base/response-metadata')

const parseGetLowestPricedOffersForSkuResult = require('./get-lowest-priced-offers-for-sku-result')

module.exports = (key, node) => ({
  getLowestPricedOffersForSkuResult: parseGetLowestPricedOffersForSkuResult(
    `${key}/products:GetLowestPricedOffersForSKUResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
