const parseMeasurement = require('./measurement')

module.exports = (key, node) => ({
  height: parseMeasurement(`${key}/products2:Height`, node),
  length: parseMeasurement(`${key}/products2:Length`, node),
  width: parseMeasurement(`${key}/products2:Width`, node),
  weight: parseMeasurement(`${key}/products2:Weight`, node)
})
