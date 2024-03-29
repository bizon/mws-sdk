const {parseString, parseBool} = require('../base')
const select = require('../select')

const parseReportRequestInfo = require('./report-request-info')

module.exports = (key, node) => ({
  nextToken: parseString(`${key}/reports:NextToken`, node),
  hasNext: parseBool(`${key}/reports:hasNext`, node),
  reportRequestInfos: select(`${key}/reports:ReportRequestInfo`, node).map((n) =>
    parseReportRequestInfo('.', n),
  ),
})
