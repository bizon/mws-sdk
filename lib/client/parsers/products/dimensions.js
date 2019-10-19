const parseDecimalWithUnit = require('./decimal-with-unit')

module.exports = (key, node) => ({
  height: parseDecimalWithUnit(`${key}/products2:Height`, node),
  length: parseDecimalWithUnit(`${key}/products2:Length`, node),
  width: parseDecimalWithUnit(`${key}/products2:Width`, node),
  weight: parseDecimalWithUnit(`${key}/products2:Weight`, node)
})
