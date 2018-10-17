const {parseStr, parseBool} = require('../base')

const select = require('../select')

const parseReportInfo = require('./report-info')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/NextToken`, node),
  hasNext: parseBool(`${key}/hasNext`, node),
  reportInfos: select(`${key}/ReportInfo`, node).map(n => {
    return parseReportInfo('.', n)
  })
})
