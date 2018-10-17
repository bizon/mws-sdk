const select = require('../select')
const nullable = require('../nullable')

const parseIdentifiers = require('./identifiers')
const parseAttributes = require('./attributes')
const parseSalesRank = require('./sales-rank')
const parseOffer = require('./offer')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/Identifiers`, node),
  attributes: nullable(parseAttributes, `${key}/AttributeSets`, node),
  offers: select(`${key}/Offers/Offer`, node).map(n => {
    return parseOffer('.', n)
  }),
  salesRankings: select(`${key}/SalesRankings/SalesRank`, node).map(n => {
    return parseSalesRank('.', n)
  })
})
