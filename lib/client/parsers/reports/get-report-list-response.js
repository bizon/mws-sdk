const parseResponseMetadata = require('../base/response-metadata')

const parseGetReportListResult = require('./get-report-list-result')

module.exports = (key, node, token = false) => ({
  getReportListResult: parseGetReportListResult(
    token ? `${key}/reports:GetReportListByNextTokenResult` : `${key}/reports:GetReportListResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/reports:ResponseMetadata`, node)
})
