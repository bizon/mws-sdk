const select = require('../select')
const {parseStr, parseDate} = require('../base')

const parseOrder = require('./order')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/NextToken`, node),
  lastUpdatedBefore: parseDate(`${key}/LastUpdatedBefore`, node),
  createdBefore: parseDate(`${key}/CreatedBefore`, node),
  orders: select(`${key}/Orders/Order`, node).map(n => {
    return parseOrder('.', n)
  })
})
