const select = require('../select')

const {parseAttributeStr} = require('../base/attributes')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  id: parseAttributeStr(key, node, 'Id'),
  idType: parseAttributeStr(key, node, 'IdType'),
  status: parseAttributeStr(key, node, 'status'),
  products: select(`${key}/products:Products/products:Product`, node).map(n => {
    return parseProduct('.', n)
  })
})
