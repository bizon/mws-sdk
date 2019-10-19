const nullable = require('../../nullable')

const {parseNumber} = require('../../base')
const {parseAttributeStr} = require('../../base/attributes')

module.exports = (key, node) => {
  return nullable((k, n) => ({
    value: parseNumber(k, n),
    unit: parseAttributeStr(k, n, 'Units')
  }), key, node)
}
