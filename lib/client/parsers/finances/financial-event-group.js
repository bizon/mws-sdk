const {parseStr, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  financialEventGroupId: parseStr(`${key}/finances:FinancialEventGroupId`, node),
  processingStatus: parseStr(`${key}/finances:ProcessingStatus`, node),
  fundTransferStatus: parseStr(`${key}/finances:FundTransferStatus`, node),
  originalTotal: nullable(parseCurrencyAmount, `${key}/finances:OriginalTotal`, node),
  convertedTotal: nullable(parseCurrencyAmount, `${key}/finances:ConvertedTotal`, node),
  fundTransferDate: parseDate(`${key}/finances:FundTransferDate`, node),
  traceId: parseStr(`${key}/finances:TraceId`, node),
  accountTail: parseStr(`${key}/finances:AccountTail`, node),
  beginningBalance: nullable(parseCurrencyAmount, `${key}/finances:BeginningBalance`, node),
  financialEventGroupStart: parseDate(`${key}/finances:FinancialEventGroupStart`, node),
  financialEventGroupEnd: parseDate(`${key}/finances:FinancialEventGroupEnd`, node)
})
