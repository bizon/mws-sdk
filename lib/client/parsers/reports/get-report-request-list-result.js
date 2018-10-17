const {parseStr, parseBool} = require('../base')

const select = require('../select')

const parseReportRequestInfo = require('./report-request-info')

module.exports = (key, node) => ({
  nextToken: parseStr(`${key}/NextToken`, node),
  hasNext: parseBool(`${key}/hasNext`, node),
  reportRequestInfos: select(`${key}/ReportRequestInfo`, node).map(n => {
    return parseReportRequestInfo('.', n)
  })
})
