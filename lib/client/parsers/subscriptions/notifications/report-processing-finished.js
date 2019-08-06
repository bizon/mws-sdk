const {parseStr} = require('../../base')

module.exports = (key, node) => ({
  sellerId: parseStr(`${key}/SellerId`, node),
  reportRequestId: parseStr(`${key}/ReportRequestId`, node),
  reportId: parseStr(`${key}/ReportId`, node),
  reportType: parseStr(`${key}/ReportType`, node),
  reportProcessingStatus: parseStr(`${key}/ReportProcessingStatus`, node)
})
