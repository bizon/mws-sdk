const {parseString, parseDate} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  tdsOrderId: parseString(`${key}/finances:TdsOrderId`, node),
  reimbursedAmount: nullable(parseCurrencyAmount, `${key}/finances:ReimbursedAmount`, node),
})
