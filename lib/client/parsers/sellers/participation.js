const {parseString} = require('../base')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/sellers:MarketplaceId`, node),
  sellerId: parseString(`${key}/sellers:SellerId`, node),
  hasSellerSuspendedListings:
    parseString(`${key}/sellers:HasSellerSuspendedListings`, node) === 'Yes',
})
