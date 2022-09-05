const {parseNumber} = require('../../base')
const {parseAttributeString} = require('../../base/attributes')

module.exports = (key, node) => ({
  condition: parseAttributeString(key, node, 'condition'),
  fulfillmentChannel: parseAttributeString(key, node, 'fulfillmentChannel'),
  count: parseNumber(key, node),
})
