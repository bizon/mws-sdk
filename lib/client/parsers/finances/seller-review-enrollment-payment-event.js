const {parseString, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseCurrencyAmount = require('./currency-amount')
const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  enrollmentId: parseString(`${key}/finances:EnrollmentId`, node),
  parentASIN: parseString(`${key}/finances:ParentASIN`, node),
  feeComponent: parseFeeComponent(`${key}/finances:FeeComponent`, node),
  chargeComponent: parseChargeComponent(`${key}/finances:ChargeComponent`, node),
  totalAmount: parseCurrencyAmount(`${key}/finances:TotalAmount`, node),
})
