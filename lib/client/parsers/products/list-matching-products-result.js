const select = require('../select')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  products: select(`${key}/products:Products/products:Product`, node).map(n => parseProduct('.', n)),
})
