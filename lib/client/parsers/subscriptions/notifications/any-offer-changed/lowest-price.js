const {parseAttributeString} = require('../../../base/attributes')
const nullable = require('../../../nullable')

const parseMoney = require('./money')
const parsePoints = require('./points')

module.exports = (key, node) => ({
  condition: parseAttributeString(key, node, 'condition'),
  fulfillmentChannel: parseAttributeString(key, node, 'fulfillmentChannel'),
  landedPrice: parseMoney(`${key}/LandedPrice`, node),
  listingPrice: parseMoney(`${key}/ListingPrice`, node),
  shipping: parseMoney(`${key}/Shipping`, node),
  points: nullable(parsePoints, `${key}/Points`, node),
})
