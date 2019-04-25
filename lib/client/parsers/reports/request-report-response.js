const parseResponseMetadata = require('../base/response-metadata')

const parseRequestReportResult = require('./request-report-result')

module.exports = (key, node) => ({
  requestReportResult: parseRequestReportResult(`${key}/reports:RequestReportResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/reports:ResponseMetadata`, node)
})
