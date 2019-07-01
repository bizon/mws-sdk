const {parseNumber} = require('../../base')

module.exports = (key, node) => ({
  pointsNumber: parseNumber(`${key}/products:PointsNumber`, node)
})
