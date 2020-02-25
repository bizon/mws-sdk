const nullable = require('../nullable')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  tdsOrderId: parseStr(`${key}/finances:TdsOrderId`, node),
  reimbursedAmount: nullable(parseCurrencyAmount, `${key}/finances:ReimbursedAmount`, node)
})
