const nullable = require('../../nullable')

const {parseStr} = require('../../base')
const {parseAttributeStr} = require('../../base/attributes')

module.exports = (key, node) =>
  nullable(
    (k, n) => ({
      name: parseStr(k, n),
      role: parseAttributeStr(k, n, 'Role'),
    }),
    key,
    node,
  )
