const {parseStr} = require('../base')

const parseMeasurement = require('./measurement')

module.exports = (key, node) => ({
  url: parseStr(`${key}/ns2:URL`, node),
  height: parseMeasurement(`${key}/ns2:Height`, node),
  width: parseMeasurement(`${key}/ns2:Width`, node)
})
