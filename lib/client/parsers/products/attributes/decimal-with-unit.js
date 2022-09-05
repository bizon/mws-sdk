const {parseDecimal} = require('../../base')
const {parseAttributeString} = require('../../base/attributes')
const nullable = require('../../nullable')

module.exports = (key, node) =>
  nullable(
    (k, n) => ({
      value: parseDecimal(k, n),
      unit: parseAttributeString(k, n, 'Units'),
    }),
    key,
    node,
  )
