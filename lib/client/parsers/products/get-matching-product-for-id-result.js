const select = require('../select')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  id: node.getAttribute('Id'),
  idType: node.getAttribute('IdType'),
  status: node.getAttribute('status'),
  products: select(`${key}/Products/Product`, node).map(n => {
    return parseProduct('.', n)
  })
})
