const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/postedDate`, node),
  transactionType: parseStr(`${key}/transactionType`, node),
  invoiceId: parseStr(`${key}/invoiceId`, node),
  baseValue: parseCurrencyAmount(`${key}/baseValue`, node),
  taxValue: parseCurrencyAmount(`${key}/taxValue`, node),
  transactionValue: parseCurrencyAmount(`${key}/transactionValue`, node)
})
