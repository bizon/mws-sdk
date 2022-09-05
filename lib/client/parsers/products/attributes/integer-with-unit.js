const {parseNumber} = require('../../base')
const {parseAttributeString} = require('../../base/attributes')
const nullable = require('../../nullable')

module.exports = (key, node) =>
  nullable(
    (k, n) => ({
      value: parseNumber(k, n),
      unit: parseAttributeString(k, n, 'Units'),
    }),
    key,
    node,
  )
