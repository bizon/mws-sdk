const {parseStr} = require('../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/sellers:MarketplaceId`, node),
  name: parseStr(`${key}/sellers:Name`, node),
  defaultCountryCode: parseStr(`${key}/sellers:DefaultCountryCode`, node),
  defaultCurrencyCode: parseStr(`${key}/sellers:DefaultCurrencyCode`, node),
  defaultLanguageCode: parseStr(`${key}/sellers:DefaultLanguageCode`, node),
  domainName: parseStr(`${key}/sellers:DomainName`, node)
})
