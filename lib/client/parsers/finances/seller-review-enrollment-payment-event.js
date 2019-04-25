const {parseStr, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  enrollmentId: parseStr(`${key}/finances:EnrollmentId`, node),
  parentASIN: parseStr(`${key}/finances:ParentASIN`, node),
  feeComponent: parseFeeComponent(`${key}/finances:FeeComponent`, node),
  chargeComponent: parseChargeComponent(`${key}/finances:ChargeComponent`, node),
  totalAmount: parseCurrencyAmount(`${key}/finances:TotalAmount`, node)
})
