const {parseString} = require('../base')
const select = require('../select')

const parseOrderItem = require('./order-item')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/orders:NextToken`, node),
  amazonOrderId: parseString(`${key}/orders:AmazonOrderId`, node),
  orderItems: select(`${key}/orders:OrderItems/orders:OrderItem`, node).map((n) =>
    parseOrderItem('.', n),
  ),
})
