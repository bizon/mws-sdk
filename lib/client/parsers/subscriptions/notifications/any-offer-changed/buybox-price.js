const nullable = require('../../../nullable')

const {parseAttributeStr} = require('../../../base/attributes')

const parseMoney = require('./money')
const parsePoints = require('./points')

module.exports = (key, node) => ({
  condition: parseAttributeStr(key, node, 'condition'),
  landedPrice: parseMoney(`${key}/LandedPrice`, node),
  listingPrice: parseMoney(`${key}/ListingPrice`, node),
  shipping: parseMoney(`${key}/Shipping`, node),
  points: nullable(parsePoints, `${key}/Points`, node),
})
