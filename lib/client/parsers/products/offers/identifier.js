const {parseString, parseDate} = require('../../base')

module.exports = (key, node) => ({
  marketplaceId: parseString(`${key}/products:MarketplaceId`, node),
  asin: parseString(`${key}/products:ASIN`, node),
  sellerSku: parseString(`${key}/products:SellerSKU`, node),
  itemCondition: parseString(`${key}/products:ItemCondition`, node),
  timeOfOfferChange: parseDate(`${key}/products:TimeOfOfferChange`, node),
})
