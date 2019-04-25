const nullable = require('../nullable')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  asin: node.attr('ASIN').value(),
  status: node.attr('status').value(),
  product: nullable(parseProduct, `${key}/products:Product`, node)
})
