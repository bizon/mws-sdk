const nullable = require('../nullable')

const {parseDecimal} = require('../base')

module.exports = (key, node) => {
  return nullable((k, n) => ({
    value: parseDecimal(k, n),
    unit: n.getAttribute('Units')
  }), key, node)
}
