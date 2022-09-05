const {parseAttributeString} = require('../base/attributes')
const select = require('../select')

const parseIdentifier = require('./offers/identifier')
const parseOffer = require('./offers/offer')
const parseSummary = require('./offers/summary')

module.exports = (key, node) => ({
  marketplaceId: parseAttributeString(key, node, 'MarketplaceID'),
  itemCondition: parseAttributeString(key, node, 'ItemCondition'),
  asin: parseAttributeString(key, node, 'ASIN'),
  status: parseAttributeString(key, node, 'status'),
  identifier: parseIdentifier(`${key}/products:Identifier`, node),
  summary: parseSummary(`${key}/products:Summary`, node),
  offers: select(`${key}/products:Offers/products:Offer`, node).map((n) => parseOffer('.', n)),
})
