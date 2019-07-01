const nullable = require('../../../nullable')
const select = require('../../../select')

const parseMoney = require('./money')
const parseOfferCount = require('./offer-count')
const parseLowestPrice = require('./lowest-price')
const parseBuyBoxPrice = require('./buybox-price')
const parseSalesRank = require('./sales-rank')

module.exports = (key, node) => ({
  numberOfOffers: select(`${key}/NumberOfOffers/OfferCount`, node).map(n => {
    return parseOfferCount('.', n)
  }),
  lowestPrices: select(`${key}/LowestPrices/LowestPrice`, node).map(n => {
    return parseLowestPrice('.', n)
  }),
  buyBoxPrices: select(`${key}/BuyBoxPrices/BuyBoxPrice`, node).map(n => {
    return parseBuyBoxPrice('.', n)
  }),
  listPrice: nullable(parseMoney, `${key}/ListPrice`, node),
  suggestedLowerPricePlusShipping: nullable(parseMoney, `${key}/SuggestedLowerPricePlusShipping`, node),
  minimumAdvertisedPrice: nullable(parseMoney, `${key}/MinimumAdvertisedPrice`, node),
  salesRankings: select(`${key}/SalesRankings/SalesRank`, node).map(n => {
    return parseSalesRank('.', n)
  }),
  buyBoxEligibleOffers: select(`${key}/BuyBoxEligibleOffers/OfferCount`, node).map(n => {
    return parseOfferCount('.', n)
  }),
  competitivePriceThreshold: nullable(parseMoney, `${key}/CompetitivePriceThreshold`, node)
})
