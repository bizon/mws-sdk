const {parseStr} = require('../../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/products:MarketplaceId`, node),
  asin: parseStr(`${key}/products:ASIN`, node)
})
