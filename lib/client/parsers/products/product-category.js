const {parseStr} = require('../base')

const nullable = require('../nullable')

function parseProductCategory(key, node, depth = 0) {
  if (depth === 10) {
    throw new Error('Failed parsing product category: more than 10 levels of depth')
  }

  return {
    productCategoryId: parseStr(`${key}/products:ProductCategoryId`, node),
    productCategoryName: parseStr(`${key}/products:ProductCategoryName`, node),

    parent: nullable(
      (k, n) => parseProductCategory(k, n, depth + 1),
      `${key}/products:Parent`,
      node,
    ),
  }
}

module.exports = parseProductCategory
