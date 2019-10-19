const nullable = require('../../nullable')

const parseMarketplaceAsin = require('./marketplace-asin')
const parseSkuIdentifier = require('./sku-identifier')

module.exports = (key, node) => ({
  marketplaceAsin: parseMarketplaceAsin(`${key}/products:MarketplaceASIN`, node),
  skuIdentifier: nullable(parseSkuIdentifier, `${key}/products:SKUIdentifier`, node)
})
