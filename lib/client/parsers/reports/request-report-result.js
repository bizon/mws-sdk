const nullable = require('../nullable')

const parseReportRequestInfo = require('./report-request-info')

module.exports = (key, node) => ({
  reportRequestInfo: nullable(parseReportRequestInfo, `${key}/reports:ReportRequestInfo`, node)
})
