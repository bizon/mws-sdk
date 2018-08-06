const {parseStr, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/PostedDate`, node),
  enrollmentId: parseStr(`${key}/EnrollmentId`, node),
  parentASIN: parseStr(`${key}/ParentASIN`, node),
  feeComponent: parseFeeComponent(`${key}/FeeComponent`, node),
  chargeComponent: parseChargeComponent(`${key}/ChargeComponent`, node),
  totalAmount: parseCurrencyAmount(`${key}/TotalAmount`, node)
})
