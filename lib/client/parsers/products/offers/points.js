const {parseNumber} = require('../../base')
const parseMoney = require('../money')

module.exports = (key, node) => ({
  pointsNumber: parseNumber(`${key}/products:PointsNumber`, node),
  pointsMonetaryValue: parseMoney(`${key}/products:PointsMonetaryValue`, node),
})
