const {parseAttributeStr} = require('../base/attributes')

const parseResponseMetadata = require('../base/response-metadata')
const parseBaseError = require('../base/error')

const parseError = (key, node) => ({
  ...parseBaseError(key, node),

  marketplaceId: parseAttributeStr(key, node, 'MarketplaceID'),
  asin: parseAttributeStr(key, node, 'ASIN'),
  itemCondition: parseAttributeStr(key, node, 'ItemCondition'),
  status: parseAttributeStr(key, node, 'status')
})

module.exports = (key, node) => ({
  error: parseError(`${key}/products:Error`, node),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node)
})
