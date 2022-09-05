const {parseString} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  providerTransactionType: parseString(`${key}/finances:ProviderTransactionType`, node),
  sellerOrderId: parseString(`${key}/finances:SellerOrderId`, node),
  marketplaceId: parseString(`${key}/finances:MarketplaceId`, node),
  marketplaceCountryCode: parseString(`${key}/finances:MarketplaceCountryCode`, node),
  sellerId: parseString(`${key}/finances:SellerId`, node),
  sellerStoreName: parseString(`${key}/finances:SellerStoreName`, node),
  providerId: parseString(`${key}/finances:ProviderId`, node),
  providerStoreName: parseString(`${key}/finances:ProviderStoreName`, node),
  transactionAmount: parseCurrencyAmount(`${key}/finances:TransactionAmount`, node),

  // We’re renaming TransactionCreationDate to PostedDate for consistency
  postedDate: parseString(`${key}/finances:TransactionCreationDate`, node),
})
