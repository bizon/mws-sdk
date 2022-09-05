const {parseString, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  reportRequestId: parseString(`${key}/reports:ReportRequestId`, node),
  reportType: parseString(`${key}/reports:ReportType`, node),
  startDate: parseDate(`${key}/reports:StartDate`, node),
  endDate: parseDate(`${key}/reports:EndDate`, node),
  scheduled: parseBool(`${key}/reports:Scheduled`, node),
  submittedDate: parseDate(`${key}/reports:SubmittedDate`, node),
  reportProcessingStatus: parseString(`${key}/reports:ReportProcessingStatus`, node),
  generatedReportId: parseString(`${key}/reports:GeneratedReportId`, node),
  startedProcessingDate: parseDate(`${key}/reports:StartedProcessingDate`, node),
  completedDate: parseDate(`${key}/reports:CompletedDate`, node),
})
