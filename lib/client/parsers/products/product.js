const select = require('../select')
const nullable = require('../nullable')

const parseIdentifiers = require('./attributes/identifiers')
const parseAttributes = require('./attributes/attributes')
const parseRelationships = require('./attributes/relationships')
const parseOffer = require('./offer')
const parseSalesRank = require('./sales-rank')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/products:Identifiers`, node),
  attributes: nullable(
    parseAttributes,
    `${key}/products:AttributeSets/products2:ItemAttributes`,
    node,
  ),
  offers: select(`${key}/products:Offers/products:Offer`, node).map((n) => parseOffer('.', n)),
  relationships: parseRelationships(`${key}/products:Relationships`, node),
  salesRankings: select(`${key}/products:SalesRankings/products:SalesRank`, node).map((n) =>
    parseSalesRank('.', n),
  ),
})
