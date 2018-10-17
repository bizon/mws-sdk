const parseResponseMetadata = require('../base/response-metadata')

const parseGetReportListResult = require('./get-report-list-result')

module.exports = (key, node, token = false) => ({
  getReportListResult: parseGetReportListResult(
    token ? `${key}/GetReportListByNextTokenResult` : `${key}/GetReportListResult`,
    node
  ),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
