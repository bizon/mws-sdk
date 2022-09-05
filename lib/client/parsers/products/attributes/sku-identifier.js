const {parseString} = require('../../base')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/products:MarketplaceId`, node),
  sellerId: parseString(`${key}/products:SellerId`, node),
  sellerSKU: parseString(`${key}/products:SellerSKU`, node),
})
