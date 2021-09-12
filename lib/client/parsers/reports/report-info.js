const {parseStr, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  reportId: parseStr(`${key}/reports:ReportId`, node),
  reportType: parseStr(`${key}/reports:ReportType`, node),
  reportRequestId: parseStr(`${key}/reports:ReportRequestId`, node),
  availableDate: parseDate(`${key}/reports:AvailableDate`, node),
  acknowledged: parseBool(`${key}/reports:Acknowledged`, node),
  acknowledgedDate: parseDate(`${key}/reports:AcknowledgedDate`, node),
})
