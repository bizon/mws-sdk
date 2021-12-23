const select = require('../select')

const parseProductCategory = require('./product-category')

module.exports = (key, node) => ({
  categories: select(`${key}/products:Self`, node).map((n) => parseProductCategory('.', n)),
})
