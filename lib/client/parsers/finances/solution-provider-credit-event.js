const {parseStr} = require('../base')

module.exports = (key, node) => ({
  providerTransactionType: parseStr(`${key}/finances:ProviderTransactionType`, node),
  sellerOrderId: parseStr(`${key}/finances:SellerOrderId`, node),
  marketplaceId: parseStr(`${key}/finances:MarketplaceId`, node),
  marketplaceCountryCode: parseStr(`${key}/finances:MarketplaceCountryCode`, node),
  sellerId: parseStr(`${key}/finances:SellerId`, node),
  sellerStoreName: parseStr(`${key}/finances:SellerStoreName`, node),
  providerId: parseStr(`${key}/finances:ProviderId`, node),
  providerStoreName: parseStr(`${key}/finances:ProviderStoreName`, node)
})
