const {parseString, parseNumber} = require('../base')

module.exports = (key, node) => ({
  productCategoryId: parseString(`${key}/products:ProductCategoryId`, node),
  rank: parseNumber(`${key}/products:Rank`, node),
})
