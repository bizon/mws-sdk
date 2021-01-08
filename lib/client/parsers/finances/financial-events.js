const select = require('../select')

const parseShipmentEvent = require('./shipment-event')
const parsePayWithAmazonEvent = require('./pay-with-amazon-event')
const parseSolutionProviderCreditEvent = require('./solution-provider-credit-event')
const parseRetrochargeEvent = require('./retrocharge-event')
const parseRentalTransactionEvent = require('./rental-transaction-event')
const parsePerformanceBondRefundEvent = require('./performance-bond-refund-event')
const parseProductAdsPaymentEvent = require('./product-ads-payment-event')
const parseServiceFeeEvent = require('./service-fee-event')
const parseSellerDealPaymentEvent = require('./seller-deal-payment-event')
const parseDebtRecoveryEvent = require('./debt-recovery-event')
const parseLoanServicingEvent = require('./loan-servicing-event')
const parseAdjustmentEvent = require('./adjustment-event')
const parseCouponPaymentEvent = require('./coupon-payment-event')
const parseSAFETReimbursementEvent = require('./safe-t-reimbursement-event')
const parseSellerReviewEnrollmentPaymentEvent = require('./seller-review-enrollment-payment-event')
const parseFBALiquidationEvent = require('./fba-liquidation-event')
const parseImagingServicesFeeEvent = require('./imaging-services-fee-event')
const parseAffordabilityExpenseEvent = require('./affordability-expense-event')
const parseAffordabilityExpenseReversalEvent = require('./affordability-expense-reversal-event')
const parseNetworkComminglingTransactionEvent = require('./network-commingling-transaction-event')
const parseTDSReimbursementEvent = require('./tds-reimbursement-event')
const parseTaxWithholdingEvent = require('./tax-withholding-event')

module.exports = (key, node) => ({
  shipmentEventList: select(`${key}/finances:ShipmentEventList/finances:ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  refundEventList: select(`${key}/finances:RefundEventList/finances:ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  guaranteeClaimEventList: select(`${key}/finances:GuaranteeClaimEventList/finances:ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  chargebackEventList: select(`${key}/finances:ChargebackEventList/finances:ShipmentEvent`, node).map(n => {
    return parseShipmentEvent('.', n)
  }),
  payWithAmazonEventList: select(`${key}/finances:PayWithAmazonEventList/finances:PayWithAmazonEvent`, node).map(n => {
    return parsePayWithAmazonEvent('.', n)
  }),
  serviceProviderCreditEventList: select(`${key}/finances:ServiceProviderCreditEventList/finances:SolutionProviderCreditEvent`, node).map(n => {
    return parseSolutionProviderCreditEvent('.', n)
  }),
  retrochargeEventList: select(`${key}/finances:RetrochargeEventList/finances:RetrochargeEvent`, node).map(n => {
    return parseRetrochargeEvent('.', n)
  }),
  rentalTransactionEventList: select(`${key}/finances:RentalTransactionEventList/finances:RentalTransactionEvent`, node).map(n => {
    return parseRentalTransactionEvent('.', n)
  }),
  performanceBondRefundEventList: select(`${key}/finances:PerformanceBondRefundEventList/finances:PerformanceBondRefundEvent`, node).map(n => {
    return parsePerformanceBondRefundEvent('.', n)
  }),
  productAdsPaymentEventList: select(`${key}/finances:ProductAdsPaymentEventList/finances:ProductAdsPaymentEvent`, node).map(n => {
    return parseProductAdsPaymentEvent('.', n)
  }),
  serviceFeeEventList: select(`${key}/finances:ServiceFeeEventList/finances:ServiceFeeEvent`, node).map(n => {
    return parseServiceFeeEvent('.', n)
  }),
  // What
  sellerDealPaymentEventList: select(`${key}/finances:SellerDealPaymentEventList/finances:SellerDealPaymentEvent`, node).map(n => {
    return parseSellerDealPaymentEvent('.', n)
  }),
  debtRecoveryEventList: select(`${key}/finances:DebtRecoveryEventList/finances:DebtRecoveryEvent`, node).map(n => {
    return parseDebtRecoveryEvent('.', n)
  }),
  loanServicingEventList: select(`${key}/finances:LoanServicingEventList/finances:LoanServicingEvent`, node).map(n => {
    return parseLoanServicingEvent('.', n)
  }),
  adjustmentEventList: select(`${key}/finances:AdjustmentEventList/finances:AdjustmentEvent`, node).map(n => {
    return parseAdjustmentEvent('.', n)
  }),
  couponPaymentEventList: select(`${key}/finances:CouponPaymentEventList/finances:CouponPaymentEvent`, node).map(n => {
    return parseCouponPaymentEvent('.', n)
  }),
  safeTReimbursementEventList: select(`${key}/finances:SAFETReimbursementEventList/finances:SAFETReimbursementEvent`, node).map(n => {
    return parseSAFETReimbursementEvent('.', n)
  }),
  sellerReviewEnrollmentPaymentEventList: select(`${key}/finances:SellerReviewEnrollmentPaymentEventList/finances:SellerReviewEnrollmentPaymentEvent`, node).map(n => {
    return parseSellerReviewEnrollmentPaymentEvent('.', n)
  }),
  fbaLiquidationEventList: select(`${key}/finances:FBALiquidationEventList/finances:FBALiquidationEvent`, node).map(n => {
    return parseFBALiquidationEvent('.', n)
  }),
  imagingServicesFeeEventList: select(`${key}/finances:ImagingServicesFeeEventList/finances:ImagingServicesFeeEvent`, node).map(n => {
    return parseImagingServicesFeeEvent('.', n)
  }),
  affordabilityExpenseEventList: select(`${key}/finances:AffordabilityExpenseEventList/finances:AffordabilityExpenseEvent`, node).map(n => {
    return parseAffordabilityExpenseEvent('.', n)
  }),
  affordabilityExpenseReversalEventList: select(`${key}/finances:AffordabilityExpenseReversalEventList/finances:AffordabilityExpenseReversalEvent`, node).map(n => {
    return parseAffordabilityExpenseReversalEvent('.', n)
  }),
  networkComminglingTransactionEventList: select(`${key}/finances:NetworkComminglingTransactionEventList/finances:NetworkComminglingTransactionEvent`, node).map(n => {
    return parseNetworkComminglingTransactionEvent('.', n)
  }),
  tdsReimbursementEventList: select(`${key}/finances:TDSReimbursementEventList/finances:TDSReimbursementEvent`, node).map(n => {
    return parseTDSReimbursementEvent('.', n)
  }),
  taxWithholdingEventList: select(`${key}/finances:TaxWithholdingEventList/finances:TaxWithholdingEvent`, node).map(n => {
    return parseTaxWithholdingEvent('.', n)
  })
})
