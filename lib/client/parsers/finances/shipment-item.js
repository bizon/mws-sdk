const select = require('../select')
const nullable = require('../nullable')

const {parseStr, parseNumber} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseTaxWithheldComponent = require('./tax-withheld-component')
const parseFeeComponent = require('./fee-component')
const parsePromotion = require('./promotion')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  sellerSKU: parseStr(`${key}/finances:SellerSKU`, node),
  orderItemId: parseStr(`${key}/finances:OrderItemId`, node),
  orderAdjustmentItemId: parseStr(`${key}/finances:OrderAdjustmentItemId`, node),
  quantityShipped: parseNumber(`${key}/finances:QuantityShipped`, node),
  itemChargeList: select(`${key}/finances:ItemChargeList/finances:ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  itemTaxWithheldList: select(`${key}/finances:ItemTaxWithheldList/finances:TaxWithheldComponent`, node).map(n => {
    return parseTaxWithheldComponent('.', n)
  }),
  itemChargeAdjustmentList: select(`${key}/finances:ItemChargeAdjustmentList/finances:ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  itemFeeList: select(`${key}/finances:ItemFeeList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  itemFeeAdjustmentList: select(`${key}/finances:ItemFeeAdjustmentList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  promotionList: select(`${key}/finances:PromotionList/finances:Promotion`, node).map(n => {
    return parsePromotion('.', n)
  }),
  promotionAdjustmentList: select(`${key}/finances:PromotionAdjustmentList/finances:Promotion`, node).map(n => {
    return parsePromotion('.', n)
  }),
  costOfPointsGranted: nullable(parseCurrencyAmount, `${key}/finances:CostOfPointsGranted`, node),
  costOfPointsReturned: nullable(parseCurrencyAmount, `${key}/finances:CostOfPointsReturned`, node)
})
