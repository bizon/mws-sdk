const {parseString} = require('../base')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/sellers:MarketplaceId`, node),
  name: parseString(`${key}/sellers:Name`, node),
  defaultCountryCode: parseString(`${key}/sellers:DefaultCountryCode`, node),
  defaultCurrencyCode: parseString(`${key}/sellers:DefaultCurrencyCode`, node),
  defaultLanguageCode: parseString(`${key}/sellers:DefaultLanguageCode`, node),
  domainName: parseString(`${key}/sellers:DomainName`, node),
})
