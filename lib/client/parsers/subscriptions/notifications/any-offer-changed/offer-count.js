const {parseNumber} = require('../../../base')
const {parseAttributeStr} = require('../../../base/attributes')

module.exports = (key, node) => ({
  condition: parseAttributeStr(key, node, 'condition'),
  fulfillmentChannel: parseAttributeStr(key, node, 'fulfillmentChannel'),
  count: parseNumber(key, node)
})
