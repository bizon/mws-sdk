const parseMeasurement = require('./measurement')

module.exports = (key, node) => ({
  height: parseMeasurement(`${key}/ns2:Height`, node),
  length: parseMeasurement(`${key}/ns2:Length`, node),
  width: parseMeasurement(`${key}/ns2:Width`, node),
  weight: parseMeasurement(`${key}/ns2:Weight`, node)
})
