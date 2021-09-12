const {parseStr} = require('../../base')

const parseDecimalWithUnit = require('./decimal-with-unit')

module.exports = (key, node) => ({
  url: parseStr(`${key}/products2:URL`, node),
  height: parseDecimalWithUnit(`${key}/products2:Height`, node),
  width: parseDecimalWithUnit(`${key}/products2:Width`, node),
})
