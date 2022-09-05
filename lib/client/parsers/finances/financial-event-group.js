const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  financialEventGroupId: parseString(`${key}/finances:FinancialEventGroupId`, node),
  processingStatus: parseString(`${key}/finances:ProcessingStatus`, node),
  fundTransferStatus: parseString(`${key}/finances:FundTransferStatus`, node),
  originalTotal: nullable(parseCurrencyAmount, `${key}/finances:OriginalTotal`, node),
  convertedTotal: nullable(parseCurrencyAmount, `${key}/finances:ConvertedTotal`, node),
  fundTransferDate: parseDate(`${key}/finances:FundTransferDate`, node),
  traceId: parseString(`${key}/finances:TraceId`, node),
  accountTail: parseString(`${key}/finances:AccountTail`, node),
  beginningBalance: nullable(parseCurrencyAmount, `${key}/finances:BeginningBalance`, node),
  financialEventGroupStart: parseDate(`${key}/finances:FinancialEventGroupStart`, node),
  financialEventGroupEnd: parseDate(`${key}/finances:FinancialEventGroupEnd`, node),
})
