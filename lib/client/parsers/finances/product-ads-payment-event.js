const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:postedDate`, node),
  transactionType: parseString(`${key}/finances:transactionType`, node),
  invoiceId: parseString(`${key}/finances:invoiceId`, node),
  baseValue: nullable(parseCurrencyAmount, `${key}/finances:baseValue`, node),
  taxValue: nullable(parseCurrencyAmount, `${key}/finances:taxValue`, node),
  transactionValue: nullable(parseCurrencyAmount, `${key}/finances:transactionValue`, node),
})
