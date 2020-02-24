const select = require('../select')

const {parseAttributeStr} = require('../base/attributes')

const parseIdentifier = require('./offers/identifier')
const parseSummary = require('./offers/summary')
const parseOffer = require('./offers/offer')

module.exports = (key, node) => ({
  marketplaceId: parseAttributeStr(key, node, 'MarketplaceID'),
  itemCondition: parseAttributeStr(key, node, 'ItemCondition'),
  sku: parseAttributeStr(key, node, 'SKU'),
  status: parseAttributeStr(key, node, 'status'),
  identifier: parseIdentifier(`${key}/products:Identifier`, node),
  summary: parseSummary(`${key}/products:Summary`, node),
  offers: select(`${key}/products:Offers/products:Offer`, node).map(n => {
    return parseOffer('.', n)
  })
})
