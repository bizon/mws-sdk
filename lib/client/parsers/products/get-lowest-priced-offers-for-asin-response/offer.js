const nullable = require('../../nullable')

const {parseStr, parseBool} = require('../../base')

const parseMoney = require('../money')
const parseSellerFeedbackRating = require('./seller-feedback-rating')
const parseDetailedShippingTime = require('./detailed-shipping-time')
const parsePoints = require('./points')
const parseShipsFrom = require('./ships-from')

module.exports = (key, node) => ({
  subcondition: parseStr(`${key}/products:SubCondition`, node),
  sellerFeedbackRating: nullable(parseSellerFeedbackRating, `${key}/products:SellerFeedbackRating`, node),
  shippingTime: parseDetailedShippingTime(`${key}/products:ShippingTime`, node),
  listingPrice: parseMoney(`${key}/products:ListingPrice`, node),
  points: nullable(parsePoints, `${key}/products:Points`, node),
  shipping: parseMoney(`${key}/products:Shipping`, node),
  shipsFrom: nullable(parseShipsFrom, `${key}/products:ShipsFrom`, node),
  isFulfilledByAmazon: parseBool(`${key}/products:IsFulfilledByAmazon`, node),
  isBuyBoxWinner: nullable(parseBool, `${key}/products:IsBuyBoxWinner`, node),
  isFeaturedMerchant: nullable(parseBool, `${key}/products:IsFeaturedMerchant`, node)
})
