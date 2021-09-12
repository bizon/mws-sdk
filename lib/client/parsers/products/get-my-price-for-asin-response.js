const select = require('../select')

const parseResponseMetadata = require('../base/response-metadata')
const parseGetMyPriceForAsinResult = require('./get-my-price-for-asin-result')

module.exports = (key, node) => ({
  getMyPriceForAsinResult: select(`${key}/products:GetMyPriceForASINResult`, node).map(n => parseGetMyPriceForAsinResult('.', n)),

  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
