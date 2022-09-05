const {parseString} = require('../../base')
const {parseAttributeString} = require('../../base/attributes')
const nullable = require('../../nullable')

module.exports = (key, node) =>
  nullable(
    (k, n) => ({
      name: parseString(k, n),
      role: parseAttributeString(k, n, 'Role'),
    }),
    key,
    node,
  )
