const select = require('../select')
const nullable = require('../nullable')

const {parseAttributeStr} = require('../base/attributes')
const parseError = require('../base/error')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  id: parseAttributeStr(key, node, 'Id'),
  idType: parseAttributeStr(key, node, 'IdType'),
  status: parseAttributeStr(key, node, 'status'),
  products: select(`${key}/products:Products/products:Product`, node).map(n => {
    return parseProduct('.', n)
  }),
  error: nullable(parseError, `${key}/products:Error`, node)
})
