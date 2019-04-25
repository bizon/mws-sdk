const {parseNumber} = require('../base')

const parseMoney = require('./money')

module.exports = (key, node) => ({
  pointsNumber: parseNumber(`${key}/orders:PointsNumber`, node),
  pointsMonetaryValue: parseMoney(`${key}/orders:PointsMonetaryValue`, node)
})
