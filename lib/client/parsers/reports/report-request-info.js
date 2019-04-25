const {parseStr, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  reportRequestId: parseStr(`${key}/reports:ReportRequestId`, node),
  reportType: parseStr(`${key}/reports:ReportType`, node),
  startDate: parseDate(`${key}/reports:StartDate`, node),
  endDate: parseDate(`${key}/reports:EndDate`, node),
  scheduled: parseBool(`${key}/reports:Scheduled`, node),
  submittedDate: parseDate(`${key}/reports:SubmittedDate`, node),
  reportProcessingStatus: parseStr(`${key}/reports:ReportProcessingStatus`, node),
  generatedReportId: parseStr(`${key}/reports:GeneratedReportId`, node),
  startedProcessingDate: parseDate(`${key}/reports:StartedProcessingDate`, node),
  completedDate: parseDate(`${key}/reports:CompletedDate`, node)
})
