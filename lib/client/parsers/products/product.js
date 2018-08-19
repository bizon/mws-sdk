const select = require('../select')

const parseIdentifiers = require('./identifiers')
const parseAttributes = require('./attributes')
const parseSalesRank = require('./sales-rank')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/Identifiers`, node),
  attributes: parseAttributes(`${key}/AttributeSets`, node),
  salesRankings: select(`${key}/SalesRankings/SalesRank`, node).map(n => {
    return parseSalesRank('.', n)
  })
})
