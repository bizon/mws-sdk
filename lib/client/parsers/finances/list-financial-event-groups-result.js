const {parseString} = require('../base')
const select = require('../select')

const parseFinancialEventGroup = require('./financial-event-group')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/finances:NextToken`, node),
  financialEventGroups: select(
    `${key}/finances:FinancialEventGroupList/finances:FinancialEventGroup`,
    node,
  ).map((n) => parseFinancialEventGroup('.', n)),
})
