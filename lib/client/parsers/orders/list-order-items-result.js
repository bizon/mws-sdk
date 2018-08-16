const select = require('../select')
const {parseStr, parseDate} = require('../base')

const parseOrderItem = require('./order-item')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/NextToken`, node),
  amazonOrderId: parseDate(`${key}/AmazonOrderId`, node),
  orderItems: select(`${key}/OrderItems/OrderItem`, node).map(n => {
    return parseOrderItem('.', n)
  })
})
