const {parseStr} = require('../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/MarketplaceId`, node),
  asin: parseStr(`${key}/ASIN`, node)
})
