const select = require('../select')

const parseOrder = require('./order')

module.exports = (key, node) => ({
  orders: select(`${key}/Orders/Order`, node).map(n => {
    return parseOrder('.', n)
  })
})
