const {parseString, parseNumber, parseDate} = require('../base')
const nullable = require('../nullable')

const parseChargeComponent = require('./charge-component')
const parseCurrencyAmount = require('./currency-amount')
const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  couponId: parseString(`${key}/finances:CouponId`, node),
  sellerCouponDescription: parseString(`${key}/finances:SellerCouponDescription`, node),
  clipOrRedemptionCount: parseNumber(`${key}/finances:ClipOrRedemptionCount`, node),
  paymentEventId: parseString(`${key}/finances:PaymentEventId`, node),
  feeComponent: nullable(parseFeeComponent, `${key}/finances:FeeComponent`, node),
  chargeComponent: nullable(parseChargeComponent, `${key}/finances:ChargeComponent`, node),
  totalAmount: nullable(parseCurrencyAmount, `${key}/finances:TotalAmount`, node),
})
