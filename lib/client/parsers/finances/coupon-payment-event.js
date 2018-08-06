const {parseStr, parseNumber, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/PostedDate`, node),
  couponId: parseStr(`${key}/CouponId`, node),
  sellerCouponDescription: parseStr(`${key}/SellerCouponDescription`, node),
  clipOrRedemptionCount: parseNumber(`${key}/ClipOrRedemptionCount`, node),
  paymentEventId: parseStr(`${key}/PaymentEventId`, node),
  feeComponent: parseFeeComponent(`${key}/FeeComponent`, node),
  chargeComponent: parseChargeComponent(`${key}/ChargeComponent`, node),
  totalAmount: parseCurrencyAmount(`${key}/TotalAmount`, node)
})
