const {parseStr, parseDate} = require('../../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/products:MarketplaceId`, node),
  asin: parseStr(`${key}/products:ASIN`, node),
  itemCondition: parseStr(`${key}/products:ItemCondition`, node),
  timeOfOfferChange: parseDate(`${key}/products:TimeOfOfferChange`, node)
})
