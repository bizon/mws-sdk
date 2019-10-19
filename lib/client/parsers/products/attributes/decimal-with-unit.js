const nullable = require('../../nullable')

const {parseDecimal} = require('../../base')
const {parseAttributeStr} = require('../../base/attributes')

module.exports = (key, node) => {
  return nullable((k, n) => ({
    value: parseDecimal(k, n),
    unit: parseAttributeStr(k, n, 'Units')
  }), key, node)
}
