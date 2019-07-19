const select = require('../../select')

const {parseAttributeStr} = require('../../base/attributes')

const parseIdentifier = require('./identifier')
const parseSummary = require('./summary')
const parseOffer = require('./offer')

module.exports = (key, node) => ({
  marketplaceId: parseAttributeStr(key, node, 'MarketplaceID'),
  itemCondition: parseAttributeStr(key, node, 'ItemCondition'),
  asin: parseAttributeStr(key, node, 'ASIN'),
  status: parseAttributeStr(key, node, 'status'),
  identifier: parseIdentifier(`${key}/products:Identifier`, node),
  summary: parseSummary(`${key}/products:Summary`, node),
  offers: select(`${key}/products:Offers/products:Offer`, node).map(n => {
    return parseOffer('.', n)
  })
})