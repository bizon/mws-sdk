const {parseNumber} = require('../base')

module.exports = (key, node) => ({
  numberOfItems: parseNumber(`${key}/NumberOfItems`, node)
})
