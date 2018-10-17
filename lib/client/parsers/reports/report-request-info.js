const {parseStr, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  reportRequestId: parseStr(`${key}/ReportRequestId`, node),
  reportType: parseStr(`${key}/ReportType`, node),
  startDate: parseDate(`${key}/StartDate`, node),
  endDate: parseDate(`${key}/EndDate`, node),
  scheduled: parseBool(`${key}/Scheduled`, node),
  submittedDate: parseDate(`${key}/SubmittedDate`, node),
  reportProcessingStatus: parseStr(`${key}/ReportProcessingStatus`, node),
  generatedReportId: parseStr(`${key}/GeneratedReportId`, node),
  startedProcessingDate: parseDate(`${key}/StartedProcessingDate`, node),
  completedDate: parseDate(`${key}/CompletedDate`, node)
})
