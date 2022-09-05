const {parseAttributeString} = require('../../base/attributes')
const nullable = require('../../nullable')
const parseMoney = require('../money')

const parsePoints = require('./points')

module.exports = (key, node) => ({
  condition: parseAttributeString(key, node, 'condition'),
  landedPrice: parseMoney(`${key}/products:LandedPrice`, node),
  listingPrice: parseMoney(`${key}/products:ListingPrice`, node),
  shipping: parseMoney(`${key}/products:Shipping`, node),
  points: nullable(parsePoints, `${key}/products:Points`, node),
})
