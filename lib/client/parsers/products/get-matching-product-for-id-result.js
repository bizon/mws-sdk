const select = require('../select')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  id: node.attr('Id').value(),
  idType: node.attr('IdType').value(),
  status: node.attr('status').value(),
  products: select(`${key}/products:Products/products:Product`, node).map(n => {
    return parseProduct('.', n)
  })
})
