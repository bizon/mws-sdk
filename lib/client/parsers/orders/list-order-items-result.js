const select = require('../select')
const {parseStr} = require('../base')

const parseOrderItem = require('./order-item')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/orders:NextToken`, node),
  amazonOrderId: parseStr(`${key}/orders:AmazonOrderId`, node),
  orderItems: select(`${key}/orders:OrderItems/orders:OrderItem`, node).map(n => parseOrderItem('.', n)),
})
