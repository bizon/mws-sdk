const {parseStr} = require('../base')

module.exports = (key, node) => ({
  providerTransactionType: parseStr(`${key}/ProviderTransactionType`, node),
  sellerOrderId: parseStr(`${key}/SellerOrderId`, node),
  marketplaceId: parseStr(`${key}/MarketplaceId`, node),
  marketplaceCountryCode: parseStr(`${key}/MarketplaceCountryCode`, node),
  sellerId: parseStr(`${key}/SellerId`, node),
  sellerStoreName: parseStr(`${key}/SellerStoreName`, node),
  providerId: parseStr(`${key}/ProviderId`, node),
  providerStoreName: parseStr(`${key}/ProviderStoreName`, node)
})
