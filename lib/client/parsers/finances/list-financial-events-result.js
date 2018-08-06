const {parseStr} = require('../base')

const parseFinancialEvents = require('./financial-events')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/NextToken`, node),
  financialEvents: parseFinancialEvents(`${key}/FinancialEvents`, node)
})
