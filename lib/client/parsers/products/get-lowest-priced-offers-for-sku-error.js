const {parseAttributeStr} = require('../base/attributes')
const parseError = require('../base/error')

module.exports = (key, node) => ({
  ...parseError(key, node),

  marketplaceId: parseAttributeStr(key, node, 'MarketplaceID'),
  sku: parseAttributeStr(key, node, 'SKU'),
  itemCondition: parseAttributeStr(key, node, 'ItemCondition'),
  status: parseAttributeStr(key, node, 'status')
})
