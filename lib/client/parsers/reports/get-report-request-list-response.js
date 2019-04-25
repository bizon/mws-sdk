const parseResponseMetadata = require('../base/response-metadata')

const parseGetReportRequestListResult = require('./get-report-request-list-result')

module.exports = (key, node, token = false) => ({
  getReportRequestListResult: parseGetReportRequestListResult(
    token ? `${key}/reports:GetReportRequestLisByNextTokentResult` : `${key}/reports:GetReportRequestListResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/reports:ResponseMetadata`, node)
})
