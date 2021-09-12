const select = require('../select')

const parseOrder = require('./order')

module.exports = (key, node) => ({
  orders: select(`${key}/orders:Orders/orders:Order`, node).map(n => parseOrder('.', n)),
})
