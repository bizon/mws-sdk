const {parseString} = require('../../base')

module.exports = (key, node) => ({
  sellerId: parseString(`${key}/SellerId`, node),
  reportRequestId: parseString(`${key}/ReportRequestId`, node),
  reportId: parseString(`${key}/ReportId`, node),
  reportType: parseString(`${key}/ReportType`, node),
  reportProcessingStatus: parseString(`${key}/ReportProcessingStatus`, node),
})
