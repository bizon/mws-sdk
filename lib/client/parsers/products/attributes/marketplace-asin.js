const {parseString} = require('../../base')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/products:MarketplaceId`, node),
  asin: parseString(`${key}/products:ASIN`, node),
})
