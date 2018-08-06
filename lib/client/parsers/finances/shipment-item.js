const select = require('../select')

const {parseStr, parseNumber} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseTaxWithheldComponent = require('./tax-withheld-component')
const parseFeeComponent = require('./fee-component')
const parsePromotion = require('./promotion')
const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  sellerSKU: parseStr(`${key}/SellerSKU`, node),
  orderItemId: parseStr(`${key}/OrderItemId`, node),
  orderAdjustmentItemId: parseStr(`${key}/OrderAdjustmentItemId`, node),
  quantityShipped: parseNumber(`${key}/QuantityShipped`, node),
  itemChargeList: select(`${key}/ItemChargeList/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  itemTaxWithheldList: select(`${key}/ItemTaxWithheldList/TaxWithheldComponent`, node).map(n => {
    return parseTaxWithheldComponent('.', n)
  }),
  itemChargeAdjustmentList: select(`${key}/ItemChargeAdjustmentList/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  itemFeeList: select(`${key}/ItemFeeList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  itemFeeAdjustmentList: select(`${key}/ItemFeeAdjustmentList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  promotionList: select(`${key}/PromotionList/Promotion`, node).map(n => {
    return parsePromotion('.', n)
  }),
  promotionAdjustmentList: select(`${key}/PromotionAdjustmentList/Promotion`, node).map(n => {
    return parsePromotion('.', n)
  }),
  costOfPointsGranted: parseCurrencyAmount(`${key}/CostOfPointsGranted`, node),
  costOfPointsReturned: parseCurrencyAmount(`${key}/CostOfPointsReturned`, node)
})
