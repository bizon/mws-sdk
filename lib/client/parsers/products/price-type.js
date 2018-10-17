const nullable = require('../nullable')

const parseMoney = require('../orders/money')

module.exports = (key, node) => ({
  landedPrice: nullable(parseMoney, `${key}/LandedPrice`, node),
  listingPrice: nullable(parseMoney, `${key}/ListingPrice`, node),
  shipping: nullable(parseMoney, `${key}/Shipping`, node)
})
