const {parseString, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  reportId: parseString(`${key}/reports:ReportId`, node),
  reportType: parseString(`${key}/reports:ReportType`, node),
  reportRequestId: parseString(`${key}/reports:ReportRequestId`, node),
  availableDate: parseDate(`${key}/reports:AvailableDate`, node),
  acknowledged: parseBool(`${key}/reports:Acknowledged`, node),
  acknowledgedDate: parseDate(`${key}/reports:AcknowledgedDate`, node),
})
