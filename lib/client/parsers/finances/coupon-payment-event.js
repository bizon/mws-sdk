const nullable = require('../nullable')
const {parseStr, parseNumber, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  couponId: parseStr(`${key}/finances:CouponId`, node),
  sellerCouponDescription: parseStr(`${key}/finances:SellerCouponDescription`, node),
  clipOrRedemptionCount: parseNumber(`${key}/finances:ClipOrRedemptionCount`, node),
  paymentEventId: parseStr(`${key}/finances:PaymentEventId`, node),
  feeComponent: nullable(parseFeeComponent, `${key}/finances:FeeComponent`, node),
  chargeComponent: nullable(parseChargeComponent, `${key}/finances:ChargeComponent`, node),
  totalAmount: nullable(parseCurrencyAmount, `${key}/finances:TotalAmount`, node),
})
