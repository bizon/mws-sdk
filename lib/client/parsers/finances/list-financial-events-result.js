const {parseStr} = require('../base')

const parseFinancialEvents = require('./financial-events')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/finances:NextToken`, node),
  financialEvents: parseFinancialEvents(`${key}/finances:FinancialEvents`, node),
})
