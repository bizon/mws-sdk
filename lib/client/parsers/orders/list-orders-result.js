const {parseString, parseDate} = require('../base')
const select = require('../select')

const parseOrder = require('./order')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/orders:NextToken`, node),
  lastUpdatedBefore: parseDate(`${key}/orders:LastUpdatedBefore`, node),
  createdBefore: parseDate(`${key}/orders:CreatedBefore`, node),
  orders: select(`${key}/orders:Orders/orders:Order`, node).map((n) => parseOrder('.', n)),
})
