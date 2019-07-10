const {getMarketplaceByCode} = require('@bizon/amazon-ids')

module.exports = {
  eu: {
    mwsDomain: 'mws-eu.amazonservices.com',
    marketplaces: [
      getMarketplaceByCode('de'),
      getMarketplaceByCode('es'),
      getMarketplaceByCode('fr'),
      getMarketplaceByCode('it'),
      getMarketplaceByCode('uk')
    ]
  }
}
