const {parseStr, parseBool} = require('../base')

const select = require('../select')

const parseReportInfo = require('./report-info')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/reports:NextToken`, node),
  hasNext: parseBool(`${key}/reports:hasNext`, node),
  reportInfos: select(`${key}/reports:ReportInfo`, node).map(n => {
    return parseReportInfo('.', n)
  })
})
