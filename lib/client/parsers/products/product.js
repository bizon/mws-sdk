const select = require('../select')
const nullable = require('../nullable')

const parseIdentifiers = require('./identifiers')
const parseAttributes = require('./attributes')
const parseSalesRank = require('./sales-rank')
const parseOffer = require('./offer')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/products:Identifiers`, node),
  attributes: nullable(parseAttributes, `${key}/products:AttributeSets`, node),
  offers: select(`${key}/products:Offers/products:Offer`, node).map(n => {
    return parseOffer('.', n)
  }),
  salesRankings: select(`${key}/products:SalesRankings/products:SalesRank`, node).map(n => {
    return parseSalesRank('.', n)
  })
})
