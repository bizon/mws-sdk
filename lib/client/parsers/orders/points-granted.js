const {parseNumber} = require('../base')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  pointsNumber: parseNumber(`${key}/PointsNumber`, node),
  pointsMonetaryValue: parseMoney(`${key}/PointsMonetaryValue`, node)
})
