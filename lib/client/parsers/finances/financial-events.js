const select = require('../select')

const parseAdjustmentEvent = require('./adjustment-event')
const parseAffordabilityExpenseEvent = require('./affordability-expense-event')
const parseAffordabilityExpenseReversalEvent = require('./affordability-expense-reversal-event')
const parseCouponPaymentEvent = require('./coupon-payment-event')
const parseDebtRecoveryEvent = require('./debt-recovery-event')
const parseFBALiquidationEvent = require('./fba-liquidation-event')
const parseImagingServicesFeeEvent = require('./imaging-services-fee-event')
const parseLoanServicingEvent = require('./loan-servicing-event')
const parseNetworkComminglingTransactionEvent = require('./network-commingling-transaction-event')
const parsePayWithAmazonEvent = require('./pay-with-amazon-event')
const parsePerformanceBondRefundEvent = require('./performance-bond-refund-event')
const parseProductAdsPaymentEvent = require('./product-ads-payment-event')
const parseRentalTransactionEvent = require('./rental-transaction-event')
const parseRetrochargeEvent = require('./retrocharge-event')
const parseSAFETReimbursementEvent = require('./safe-t-reimbursement-event')
const parseSellerDealPaymentEvent = require('./seller-deal-payment-event')
const parseSellerReviewEnrollmentPaymentEvent = require('./seller-review-enrollment-payment-event')
const parseServiceFeeEvent = require('./service-fee-event')
const parseShipmentEvent = require('./shipment-event')
const parseSolutionProviderCreditEvent = require('./solution-provider-credit-event')
const parseTaxWithholdingEvent = require('./tax-withholding-event')
const parseTDSReimbursementEvent = require('./tds-reimbursement-event')

module.exports = (key, node) => ({
  shipmentEventList: select(`${key}/finances:ShipmentEventList/finances:ShipmentEvent`, node).map(
    (n) => parseShipmentEvent('.', n),
  ),
  refundEventList: select(`${key}/finances:RefundEventList/finances:ShipmentEvent`, node).map((n) =>
    parseShipmentEvent('.', n),
  ),
  guaranteeClaimEventList: select(
    `${key}/finances:GuaranteeClaimEventList/finances:ShipmentEvent`,
    node,
  ).map((n) => parseShipmentEvent('.', n)),
  chargebackEventList: select(
    `${key}/finances:ChargebackEventList/finances:ShipmentEvent`,
    node,
  ).map((n) => parseShipmentEvent('.', n)),
  payWithAmazonEventList: select(
    `${key}/finances:PayWithAmazonEventList/finances:PayWithAmazonEvent`,
    node,
  ).map((n) => parsePayWithAmazonEvent('.', n)),
  serviceProviderCreditEventList: select(
    `${key}/finances:ServiceProviderCreditEventList/finances:SolutionProviderCreditEvent`,
    node,
  ).map((n) => parseSolutionProviderCreditEvent('.', n)),
  retrochargeEventList: select(
    `${key}/finances:RetrochargeEventList/finances:RetrochargeEvent`,
    node,
  ).map((n) => parseRetrochargeEvent('.', n)),
  rentalTransactionEventList: select(
    `${key}/finances:RentalTransactionEventList/finances:RentalTransactionEvent`,
    node,
  ).map((n) => parseRentalTransactionEvent('.', n)),
  performanceBondRefundEventList: select(
    `${key}/finances:PerformanceBondRefundEventList/finances:PerformanceBondRefundEvent`,
    node,
  ).map((n) => parsePerformanceBondRefundEvent('.', n)),
  productAdsPaymentEventList: select(
    `${key}/finances:ProductAdsPaymentEventList/finances:ProductAdsPaymentEvent`,
    node,
  ).map((n) => parseProductAdsPaymentEvent('.', n)),
  serviceFeeEventList: select(
    `${key}/finances:ServiceFeeEventList/finances:ServiceFeeEvent`,
    node,
  ).map((n) => parseServiceFeeEvent('.', n)),

  // This isn’t documented anymore but still happens.
  sellerDealPaymentEventList: select(
    `${key}/finances:SellerDealPaymentEventList/finances:SellerDealPaymentEvent`,
    node,
  ).map((n) => parseSellerDealPaymentEvent('.', n)),

  debtRecoveryEventList: select(
    `${key}/finances:DebtRecoveryEventList/finances:DebtRecoveryEvent`,
    node,
  ).map((n) => parseDebtRecoveryEvent('.', n)),
  loanServicingEventList: select(
    `${key}/finances:LoanServicingEventList/finances:LoanServicingEvent`,
    node,
  ).map((n) => parseLoanServicingEvent('.', n)),
  adjustmentEventList: select(
    `${key}/finances:AdjustmentEventList/finances:AdjustmentEvent`,
    node,
  ).map((n) => parseAdjustmentEvent('.', n)),
  couponPaymentEventList: select(
    `${key}/finances:CouponPaymentEventList/finances:CouponPaymentEvent`,
    node,
  ).map((n) => parseCouponPaymentEvent('.', n)),
  safeTReimbursementEventList: select(
    `${key}/finances:SAFETReimbursementEventList/finances:SAFETReimbursementEvent`,
    node,
  ).map((n) => parseSAFETReimbursementEvent('.', n)),
  sellerReviewEnrollmentPaymentEventList: select(
    `${key}/finances:SellerReviewEnrollmentPaymentEventList/finances:SellerReviewEnrollmentPaymentEvent`,
    node,
  ).map((n) => parseSellerReviewEnrollmentPaymentEvent('.', n)),
  fbaLiquidationEventList: select(
    `${key}/finances:FBALiquidationEventList/finances:FBALiquidationEvent`,
    node,
  ).map((n) => parseFBALiquidationEvent('.', n)),
  imagingServicesFeeEventList: select(
    `${key}/finances:ImagingServicesFeeEventList/finances:ImagingServicesFeeEvent`,
    node,
  ).map((n) => parseImagingServicesFeeEvent('.', n)),
  affordabilityExpenseEventList: select(
    `${key}/finances:AffordabilityExpenseEventList/finances:AffordabilityExpenseEvent`,
    node,
  ).map((n) => parseAffordabilityExpenseEvent('.', n)),
  affordabilityExpenseReversalEventList: select(
    `${key}/finances:AffordabilityExpenseReversalEventList/finances:AffordabilityExpenseReversalEvent`,
    node,
  ).map((n) => parseAffordabilityExpenseReversalEvent('.', n)),
  networkComminglingTransactionEventList: select(
    `${key}/finances:NetworkComminglingTransactionEventList/finances:NetworkComminglingTransactionEvent`,
    node,
  ).map((n) => parseNetworkComminglingTransactionEvent('.', n)),
  tdsReimbursementEventList: select(
    `${key}/finances:TDSReimbursementEventList/finances:TDSReimbursementEvent`,
    node,
  ).map((n) => parseTDSReimbursementEvent('.', n)),
  taxWithholdingEventList: select(
    `${key}/finances:TaxWithholdingEventList/finances:TaxWithholdingEvent`,
    node,
  ).map((n) => parseTaxWithholdingEvent('.', n)),
})
