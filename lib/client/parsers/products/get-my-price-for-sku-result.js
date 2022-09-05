const {parseAttributeString} = require('../base/attributes')
const parseError = require('../base/error')
const nullable = require('../nullable')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  sellerSku: parseAttributeString(key, node, 'SellerSKU'),
  status: parseAttributeString(key, node, 'status'),
  product: nullable(parseProduct, `${key}/products:Product`, node),
  error: nullable(parseError, `${key}/products:Error`, node),
})
