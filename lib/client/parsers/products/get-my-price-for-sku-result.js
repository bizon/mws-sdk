const nullable = require('../nullable')

const {parseAttributeStr} = require('../base/attributes')
const parseError = require('../base/error')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  sellerSku: parseAttributeStr(key, node, 'SellerSKU'),
  status: parseAttributeStr(key, node, 'status'),
  product: nullable(parseProduct, `${key}/products:Product`, node),
  error: nullable(parseError, `${key}/products:Error`, node)
})
