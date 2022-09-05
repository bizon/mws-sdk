const {parseString, parseNumber} = require('../../../base')

module.exports = (key, node) => ({
  productCategoryId: parseString(`${key}/ProductCategoryId`, node),
  parseNumber: parseNumber(`${key}/Rank`, node),
})
