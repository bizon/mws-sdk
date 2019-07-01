const nullable = require('../../../nullable')

const {parseStr, parseBool} = require('../../../base')

const parseSellerFeedbackRating = require('./seller-feedback-rating')
const parseShippingTime = require('./shipping-time')
const parseMoney = require('./money')
const parsePoints = require('./points')
const parseShipsFrom = require('./ships-from')
const parsePrimeInformation = require('./prime-information')

module.exports = (key, node) => ({
  sellerId: parseStr(`${key}/SellerId`, node),
  subCondition: parseStr(`${key}/SubCondition`, node),
  sellerFeedbackRating: nullable(parseSellerFeedbackRating, `${key}/SellerFeedbackRating`, node),
  shippingTime: parseShippingTime(`${key}/ShippingTime`, node),
  listingPrice: parseMoney(`${key}/ListingPrice`, node),
  points: nullable(parsePoints, `${key}/Points`, node),
  shipping: parseMoney(`${key}/Shipping`, node),
  shipsFrom: nullable(parseShipsFrom, `${key}/ShipsFrom`, node),
  isFulfilledByAmazon: parseBool(`${key}/IsFulfilledByAmazon`, node),
  isBuyBoxWinner: nullable(parseBool, `${key}/IsBuyBoxWinner`, node),
  conditionNotes: parseStr(`${key}/ConditionNotes`, node),
  primeInformation: nullable(parsePrimeInformation, `${key}/PrimeInformation`, node),
  isExpeditedShippingAvailable: nullable(parseBool, `${key}/IsExpeditedShippingAvailable`, node),
  isFeaturedMerchant: nullable(parseBool, `${key}/IsFeaturedMerchant`, node),
  shipsDomestically: nullable(parseBool, `${key}/ShipsDomestically`, node),
  shipsInternationally: nullable(parseBool, `${key}/ShipsInternationally`, node)
})
