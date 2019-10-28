const {parseStr} = require('../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/sellers:MarketplaceId`, node),
  sellerId: parseStr(`${key}/sellers:SellerId`, node),
  hasSellerSuspendedListings: parseStr(`${key}/sellers:HasSellerSuspendedListings`, node) === 'Yes'
})
