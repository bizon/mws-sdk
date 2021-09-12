const {parseStr} = require('../../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/products:MarketplaceId`, node),
  sellerId: parseStr(`${key}/products:SellerId`, node),
  sellerSKU: parseStr(`${key}/products:SellerSKU`, node),
})
