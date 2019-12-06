const select = require('../select')

const parseResponseMetadata = require('../base/response-metadata')
const parseGetMyPriceForSkuResult = require('./get-my-price-for-sku-result')

module.exports = (key, node) => ({
  getMyPriceForSkuResult: select(`${key}/products:GetMyPriceForSKUResult`, node).map(n => {
    return parseGetMyPriceForSkuResult('.', n)
  }),

  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node)
})
