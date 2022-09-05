const {parseNumber, parseDate} = require('../../base')
const nullable = require('../../nullable')
const select = require('../../select')
const parseMoney = require('../money')
const parseSalesRank = require('../sales-rank')

const parseBuyBoxPrice = require('./buybox-price')
const parseLowestPrice = require('./lowest-price')
const parseOfferCount = require('./offer-count')

module.exports = (key, node) => ({
  totalOfferCount: parseNumber(`${key}/products:TotalOfferCount`, node),
  numberOfOffers: select(`${key}/products:NumberOfOffers/products:OfferCount`, node).map((n) =>
    parseOfferCount('.', n),
  ),
  lowestPrices: select(`${key}/products:LowestPrices/products:LowestPrice`, node).map((n) =>
    parseLowestPrice('.', n),
  ),
  buyBoxPrices: select(`${key}/products:BuyBoxPrices/products:BuyBoxPrice`, node).map((n) =>
    parseBuyBoxPrice('.', n),
  ),
  listPrice: nullable(parseMoney, `${key}/products:ListPrice`, node),
  suggestedLowerPricePlusShipping: nullable(
    parseMoney,
    `${key}/products:SuggestedLowerPricePlusShipping`,
    node,
  ),
  salesRankings: select(`${key}/products:SalesRankings/products:SalesRank`, node).map((n) =>
    parseSalesRank('.', n),
  ),
  buyBoxEligibleOffers: select(
    `${key}/products:BuyBoxEligibleOffers/products:OfferCount`,
    node,
  ).map((n) => parseOfferCount('.', n)),
  competitivePriceThreshold: nullable(
    parseMoney,
    `${key}/products:CompetitivePriceThreshold`,
    node,
  ),
  offersAvailableTime: nullable(parseDate, `${key}/products:OffersAvailableTime`, node),
})
