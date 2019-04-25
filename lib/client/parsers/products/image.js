const {parseStr} = require('../base')

const parseMeasurement = require('./measurement')

module.exports = (key, node) => ({
  url: parseStr(`${key}/products2:URL`, node),
  height: parseMeasurement(`${key}/products2:Height`, node),
  width: parseMeasurement(`${key}/products2:Width`, node)
})
