const {parseAttributeString} = require('../base/attributes')
const parseBaseError = require('../base/error')
const parseResponseMetadata = require('../base/response-metadata')

const parseError = (key, node) => ({
  ...parseBaseError(key, node),

  marketplaceId: parseAttributeString(key, node, 'MarketplaceID'),
  asin: parseAttributeString(key, node, 'ASIN'),
  itemCondition: parseAttributeString(key, node, 'ItemCondition'),
  status: parseAttributeString(key, node, 'status'),
})

module.exports = (key, node) => ({
  error: parseError(`${key}/products:Error`, node),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
