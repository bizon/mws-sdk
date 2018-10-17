const select = require('../select')

const parseResponseMetadata = require('../base/response-metadata')
const parseGetMyPriceForAsinResult = require('./get-my-price-for-asin-result')

module.exports = (key, node) => ({
  getMyPriceForAsinResult: select(`${key}/GetMyPriceForASINResponse`, node).map(n => {
    return parseGetMyPriceForAsinResult('.', n)
  }),

  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
