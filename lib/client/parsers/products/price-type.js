const nullable = require('../nullable')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  listingPrice: nullable(parseMoney, `${key}/products:ListingPrice`, node),
  shipping: nullable(parseMoney, `${key}/products:Shipping`, node),
  landedPrice: nullable(parseMoney, `${key}/products:LandedPrice`, node),
})
