const {parseStr} = require('../base')

const select = require('../select')

const parseFinancialEventGroup = require('./financial-event-group')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/NextToken`, node),
  financialEventGroups: select(`${key}/FinancialEventGroupList/FinancialEventGroup`, node).map(n => {
    return parseFinancialEventGroup('.', n)
  })
})
