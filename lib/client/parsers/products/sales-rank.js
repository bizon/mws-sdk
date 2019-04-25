const {parseStr, parseNumber} = require('../base')

module.exports = (key, node) => ({
  productCategoryId: parseStr(`${key}/products:ProductCategoryId`, node),
  rank: parseNumber(`${key}/products:Rank`, node)
})
