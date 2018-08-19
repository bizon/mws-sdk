const {parseStr, parseNumber} = require('../base')

module.exports = (key, node) => ({
  productCategoryId: parseStr(`${key}/ProductCategoryId`, node),
  rank: parseNumber(`${key}/Rank`, node)
})
