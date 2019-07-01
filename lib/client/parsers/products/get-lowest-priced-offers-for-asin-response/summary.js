const nullable = require('../../nullable')
const select = require('../../select')

const {parseNumber, parseDate} = require('../../base')

const parseMoney = require('../money')
const parseOfferCount = require('./offer-count')
const parseLowestPrice = require('./lowest-price')
const parseBuyBoxPrice = require('./buybox-price')

module.exports = (key, node) => ({
  totalOfferCount: parseNumber(`${key}/products:TotalOfferCount`, node),
  numberOfOffers: select(`${key}/products:NumberOfOffers/products:OfferCount`, node).map(n => {
    return parseOfferCount('.', n)
  }),
  lowestPrices: select(`${key}/products:LowestPrices/products:LowestPrice`, node).map(n => {
    return parseLowestPrice('.', n)
  }),
  buyBoxPrices: select(`${key}/products:BuyBoxPrices/products:BuyBoxPrice`, node).map(n => {
    return parseBuyBoxPrice('.', n)
  }),
  listPrice: nullable(parseMoney, `${key}/products:ListPrice`, node),
  suggestedLowerPricePlusShipping: nullable(parseMoney, `${key}/products:SuggestedLowerPricePlusShipping`, node),
  buyBoxEligibleOffers: select(`${key}/products:BuyBoxEligibleOffers/products:OfferCount`, node).map(n => {
    return parseOfferCount('.', n)
  }),
  offersAvailableTime: nullable(parseDate, `${key}/products:OffersAvailableTime`, node)
})
