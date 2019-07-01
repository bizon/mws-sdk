const {parseStr, parseNumber} = require('../../../base')

module.exports = (key, node) => ({
  productCategoryId: parseStr(`${key}/ProductCategoryId`, node),
  parseNumber: parseNumber(`${key}/Rank`, node)
})
