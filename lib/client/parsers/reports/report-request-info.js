const {parseStr, parseDate, parseBool} = require('../base')

module.exports = (key, node) => ({
  ReportRequestId: parseStr(`${key}/ReportRequestId`, node),
  ReportType: parseStr(`${key}/ReportType`, node),
  StartDate: parseDate(`${key}/StartDate`, node),
  EndDate: parseDate(`${key}/EndDate`, node),
  Scheduled: parseBool(`${key}/Scheduled`, node),
  SubmittedDate: parseDate(`${key}/SubmittedDate`, node),
  ReportProcessingStatus: parseStr(`${key}/ReportProcessingStatus`, node),
  GeneratedReportId: parseStr(`${key}/GeneratedReportId`, node),
  StartedProcessingDate: parseDate(`${key}/StartedProcessingDate`, node),
  CompletedDate: parseDate(`${key}/CompletedDate`, node)
})
