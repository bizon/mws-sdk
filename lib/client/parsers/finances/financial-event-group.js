const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  financialEventGroupId: parseStr(`${key}/FinancialEventGroupId`, node),
  processingStatus: parseStr(`${key}/ProcessingStatus`, node),
  fundTransferStatus: parseStr(`${key}/FundTransferStatus`, node),
  originalTotal: parseCurrencyAmount(`${key}/OriginalTotal`, node),
  convertedTotal: parseCurrencyAmount(`${key}/ConvertedTotal`, node),
  fundTransferDate: parseDate(`${key}/FundTransferDate`, node),
  traceId: parseStr(`${key}/TraceId`, node),
  accountTail: parseStr(`${key}/AccountTail`, node),
  beginningBalance: parseCurrencyAmount(`${key}/BeginningBalance`, node),
  financialEventGroupStart: parseDate(`${key}/FinancialEventGroupStart`, node),
  financialEventGroupEnd: parseDate(`${key}/FinancialEventGroupEnd`, node)
})
