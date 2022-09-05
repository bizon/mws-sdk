const {parseString, parseDate} = require('../../../base')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/MarketplaceId`, node),
  asin: parseString(`${key}/ASIN`, node),
  itemCondition: parseString(`${key}/ItemCondition`, node),
  timeOfOfferChange: parseDate(`${key}/TimeOfOfferChange`, node),
})
