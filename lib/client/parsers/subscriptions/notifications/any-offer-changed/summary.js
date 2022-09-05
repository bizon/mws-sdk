const nullable = require('../../../nullable')
const select = require('../../../select')

const parseBuyBoxPrice = require('./buybox-price')
const parseLowestPrice = require('./lowest-price')
const parseMoney = require('./money')
const parseOfferCount = require('./offer-count')
const parseSalesRank = require('./sales-rank')

module.exports = (key, node) => ({
  numberOfOffers: select(`${key}/NumberOfOffers/OfferCount`, node).map((n) =>
    parseOfferCount('.', n),
  ),
  lowestPrices: select(`${key}/LowestPrices/LowestPrice`, node).map((n) =>
    parseLowestPrice('.', n),
  ),
  buyBoxPrices: select(`${key}/BuyBoxPrices/BuyBoxPrice`, node).map((n) =>
    parseBuyBoxPrice('.', n),
  ),
  listPrice: nullable(parseMoney, `${key}/ListPrice`, node),
  suggestedLowerPricePlusShipping: nullable(
    parseMoney,
    `${key}/SuggestedLowerPricePlusShipping`,
    node,
  ),
  minimumAdvertisedPrice: nullable(parseMoney, `${key}/MinimumAdvertisedPrice`, node),
  salesRankings: select(`${key}/SalesRankings/SalesRank`, node).map((n) => parseSalesRank('.', n)),
  buyBoxEligibleOffers: select(`${key}/BuyBoxEligibleOffers/OfferCount`, node).map((n) =>
    parseOfferCount('.', n),
  ),
  competitivePriceThreshold: nullable(parseMoney, `${key}/CompetitivePriceThreshold`, node),
})
