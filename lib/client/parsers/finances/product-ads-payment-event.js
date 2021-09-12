const {parseStr, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:postedDate`, node),
  transactionType: parseStr(`${key}/finances:transactionType`, node),
  invoiceId: parseStr(`${key}/finances:invoiceId`, node),
  baseValue: nullable(parseCurrencyAmount, `${key}/finances:baseValue`, node),
  taxValue: nullable(parseCurrencyAmount, `${key}/finances:taxValue`, node),
  transactionValue: nullable(parseCurrencyAmount, `${key}/finances:transactionValue`, node),
})
