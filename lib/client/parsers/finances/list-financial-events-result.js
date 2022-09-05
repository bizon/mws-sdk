const {parseString} = require('../base')

const parseFinancialEvents = require('./financial-events')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/finances:NextToken`, node),
  financialEvents: parseFinancialEvents(`${key}/finances:FinancialEvents`, node),
})
