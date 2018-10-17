const select = require('../select')

const parseProduct = require('./product')

module.exports = (key, node) => ({
  asin: node.getAttribute('ASIN'),
  status: node.getAttribute('status'),
  products: select(`${key}/Products/Product`, node).map(n => {
    return parseProduct('.', n)
  })
})
