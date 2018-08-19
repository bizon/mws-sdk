const {parseStr} = require('../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/MarketplaceId`, node),
  sellerId: parseStr(`${key}/SellerId`, node),
  sellerSKU: parseStr(`${key}/SellerSKU`, node)
})
