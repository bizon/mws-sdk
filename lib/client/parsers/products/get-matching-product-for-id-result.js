const {parseAttributeString} = require('../base/attributes')
const parseError = require('../base/error')
const nullable = require('../nullable')
const select = require('../select')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  id: parseAttributeString(key, node, 'Id'),
  idType: parseAttributeString(key, node, 'IdType'),
  status: parseAttributeString(key, node, 'status'),
  products: select(`${key}/products:Products/products:Product`, node).map((n) =>
    parseProduct('.', n),
  ),
  error: nullable(parseError, `${key}/products:Error`, node),
})
