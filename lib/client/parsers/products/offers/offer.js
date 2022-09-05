const {parseString, parseBool} = require('../../base')
const nullable = require('../../nullable')
const parseMoney = require('../money')

const parseDetailedShippingTime = require('./detailed-shipping-time')
const parsePoints = require('./points')
const parsePrimeInformation = require('./prime-information')
const parseSellerFeedbackRating = require('./seller-feedback-rating')
const parseShipsFrom = require('./ships-from')

module.exports = (key, node) => ({
  sellerId: parseString(`${key}/products:SellerId`, node),
  myOffer: nullable(parseBool, `${key}/products:MyOffer`, node),
  subCondition: parseString(`${key}/products:SubCondition`, node),
  sellerFeedbackRating: nullable(
    parseSellerFeedbackRating,
    `${key}/products:SellerFeedbackRating`,
    node,
  ),
  shippingTime: parseDetailedShippingTime(`${key}/products:ShippingTime`, node),
  listingPrice: parseMoney(`${key}/products:ListingPrice`, node),
  points: nullable(parsePoints, `${key}/products:Points`, node),
  shipping: parseMoney(`${key}/products:Shipping`, node),
  shipsFrom: nullable(parseShipsFrom, `${key}/products:ShipsFrom`, node),
  isFulfilledByAmazon: parseBool(`${key}/products:IsFulfilledByAmazon`, node),
  isBuyBoxWinner: nullable(parseBool, `${key}/products:IsBuyBoxWinner`, node),
  isFeaturedMerchant: nullable(parseBool, `${key}/products:IsFeaturedMerchant`, node),
  conditionNotes: parseString(`${key}/products:ConditionNotes`, node),
  primeInformation: nullable(parsePrimeInformation, `${key}/products:PrimeInformation`, node),
})
