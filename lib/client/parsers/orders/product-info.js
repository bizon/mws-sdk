const {parseNumber} = require('../base')

module.exports = (key, node) => ({
  numberOfItems: parseNumber(`${key}/orders:NumberOfItems`, node),
})
