const {parseStr, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  reportId: parseStr(`${key}/ReportId`, node),
  reportType: parseStr(`${key}/ReportType`, node),
  reportRequestId: parseStr(`${key}/ReportRequestId`, node),
  availableDate: parseDate(`${key}/AvailableDate`, node),
  acknowledged: parseBool(`${key}/Acknowledged`, node),
  acknowledgedDate: parseDate(`${key}/AcknowledgedDate`, node)
})
