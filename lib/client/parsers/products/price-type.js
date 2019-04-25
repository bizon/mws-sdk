const nullable = require('../nullable')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  landedPrice: nullable(parseMoney, `${key}/products:LandedPrice`, node),
  listingPrice: nullable(parseMoney, `${key}/products:ListingPrice`, node),
  shipping: nullable(parseMoney, `${key}/products:Shipping`, node)
})
