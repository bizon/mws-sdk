const select = require('../select')

const parseShipmentEvent = require('./shipment-event')
const parsePayWithAmazonEvent = require('./pay-with-amazon-event')
const parseSolutionProviderCreditEvent = require('./solution-provider-credit-event')
const parseRetrochargeEvent = require('./retrocharge-event')
const parseRentalTransactionEvent = require('./rental-transaction-event')
const parsePerformanceBondRefundEvent = require('./performance-bond-refund-event')
const parseProductAdsPaymentEvent = require('./product-ads-payment-event')
const parseServiceFeeEvent = require('./service-fee-event')
const parseDebtRecoveryEvent = require('./debt-recovery-event')
const parseLoanServicingEvent = require('./loan-servicing-event')
const parseAdjustmentEvent = require('./adjustment-event')
const parseCouponPaymentEvent = require('./coupon-payment-event')
const parseSAFETReimbursementEvent = require('./safe-t-reimbursement-event')
const parseSellerReviewEnrollmentPaymentEvent = require('./seller-review-enrollment-payment-event')
const parseFBALiquidationEvent = require('./fba-liquidation-event')
const parseImagingServicesFeeEvent = require('./imaging-services-fee-event')

module.exports = (key, node) => ({
  shipmentEventList: select(`${key}/ShipmentEventList/ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  refundEventList: select(`${key}/RefundEventList/ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  guaranteeClaimEventList: select(`${key}/GuaranteeClaimEventList/ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  chargebackEventList: select(`${key}/ChargebackEventList/ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  payWithAmazonEventList: select(`${key}/PayWithAmazonEventList/PayWithAmazonEvent`, node).map(n => {
    return parsePayWithAmazonEvent('.', n)
  }),
  serviceProviderCreditEventList: select(`${key}/ServiceProviderCreditEventList/SolutionProviderCreditEvent`, node).map(n => {
    return parseSolutionProviderCreditEvent('.', n)
  }),
  retrochargeEventList: select(`${key}/RetrochargeEventList/RetrochargeEvent`, node).map(n => {
    return parseRetrochargeEvent('.', n)
  }),
  rentalTransactionEventList: select(`${key}/RentalTransactionEventList/RentalTransactionEvent`, node).map(n => {
    return parseRentalTransactionEvent('.', n)
  }),
  performanceBondRefundEventList: select(`${key}/PerformanceBondRefundEventList/PerformanceBondRefundEvent`, node).map(n => {
    return parsePerformanceBondRefundEvent('.', n)
  }),
  productAdsPaymentEventList: select(`${key}/ProductAdsPaymentEventList/ProductAdsPaymentEvent`, node).map(n => {
    return parseProductAdsPaymentEvent('.', n)
  }),
  serviceFeeEventList: select(`${key}/ServiceFeeEventList/ServiceFeeEvent`, node).map(n => {
    return parseServiceFeeEvent('.', n)
  }),
  debtRecoveryEventList: select(`${key}/DebtRecoveryEventList/DebtRecoveryEvent`, node).map(n => {
    return parseDebtRecoveryEvent('.', n)
  }),
  loanServicingEventList: select(`${key}/LoanServicingEventList/LoanServicingEvent`, node).map(n => {
    return parseLoanServicingEvent('.', n)
  }),
  adjustmentEventList: select(`${key}/AdjustmentEventList/AdjustmentEvent`, node).map(n => {
    return parseAdjustmentEvent('.', n)
  }),
  couponPaymentEventList: select(`${key}/CouponPaymentEventList/CouponPaymentEvent`, node).map(n => {
    return parseCouponPaymentEvent('.', n)
  }),
  safeTReimbursementEventList: select(`${key}/SAFETReimbursementEventList/SAFETReimbursementEvent`, node).map(n => {
    return parseSAFETReimbursementEvent('.', n)
  }),
  sellerReviewEnrollmentPaymentEventList: select(`${key}/SellerReviewEnrollmentPaymentEventList/SellerReviewEnrollmentPaymentEvent`, node).map(n => {
    return parseSellerReviewEnrollmentPaymentEvent('.', n)
  }),
  fbaLiquidationEventList: select(`${key}/FBALiquidationEventList/FBALiquidationEvent`, node).map(n => {
    return parseFBALiquidationEvent('.', n)
  }),
  imagingServicesFeeEventList: select(`${key}/ImagingServicesFeeEventList/ImagingServicesFeeEvent`, node).map(n => {
    return parseImagingServicesFeeEvent('.', n)
  })
})
