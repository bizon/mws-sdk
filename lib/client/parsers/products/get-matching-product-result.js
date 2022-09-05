const {parseAttributeString} = require('../base/attributes')
const nullable = require('../nullable')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  asin: parseAttributeString(key, node, 'ASIN'),
  status: parseAttributeString(key, node, 'status'),
  product: nullable(parseProduct, `${key}/products:Product`, node),
})
