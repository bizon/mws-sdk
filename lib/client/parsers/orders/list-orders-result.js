const select = require('../select')
const {parseStr, parseDate} = require('../base')

const parseOrder = require('./order')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/orders:NextToken`, node),
  lastUpdatedBefore: parseDate(`${key}/orders:LastUpdatedBefore`, node),
  createdBefore: parseDate(`${key}/orders:CreatedBefore`, node),
  orders: select(`${key}/orders:Orders/orders:Order`, node).map(n => {
    return parseOrder('.', n)
  })
})
