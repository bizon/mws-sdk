const parseResponseMetadata = require('../base/response-metadata')

const parseRequestReportResult = require('./request-report-result')

module.exports = (key, node) => ({
  requestReportResult: parseRequestReportResult(`${key}/RequestReportResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
