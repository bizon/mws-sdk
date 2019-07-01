const {parseStr, parseDate} = require('../../../base')

module.exports = (key, node) => ({
  marketplaceId: parseStr(`${key}/MarketplaceId`, node),
  asin: parseStr(`${key}/ASIN`, node),
  itemCondition: parseStr(`${key}/ItemCondition`, node),
  timeOfOfferChange: parseDate(`${key}/TimeOfOfferChange`, node)
})
