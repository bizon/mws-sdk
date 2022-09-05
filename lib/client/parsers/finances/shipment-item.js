const {parseString, parseNumber} = require('../base')
const nullable = require('../nullable')
const select = require('../select')

const parseChargeComponent = require('./charge-component')
const parseCurrencyAmount = require('./currency-amount')
const parseFeeComponent = require('./fee-component')
const parsePromotion = require('./promotion')
const parseTaxWithheldComponent = require('./tax-withheld-component')

module.exports = (key, node) => ({
  sellerSKU: parseString(`${key}/finances:SellerSKU`, node),
  orderItemId: parseString(`${key}/finances:OrderItemId`, node),
  orderAdjustmentItemId: parseString(`${key}/finances:OrderAdjustmentItemId`, node),
  quantityShipped: parseNumber(`${key}/finances:QuantityShipped`, node),
  itemChargeList: select(`${key}/finances:ItemChargeList/finances:ChargeComponent`, node).map((n) =>
    parseChargeComponent('.', n),
  ),
  itemTaxWithheldList: select(
    `${key}/finances:ItemTaxWithheldList/finances:TaxWithheldComponent`,
    node,
  ).map((n) => parseTaxWithheldComponent('.', n)),
  itemChargeAdjustmentList: select(
    `${key}/finances:ItemChargeAdjustmentList/finances:ChargeComponent`,
    node,
  ).map((n) => parseChargeComponent('.', n)),
  itemFeeList: select(`${key}/finances:ItemFeeList/finances:FeeComponent`, node).map((n) =>
    parseFeeComponent('.', n),
  ),
  itemFeeAdjustmentList: select(
    `${key}/finances:ItemFeeAdjustmentList/finances:FeeComponent`,
    node,
  ).map((n) => parseFeeComponent('.', n)),
  promotionList: select(`${key}/finances:PromotionList/finances:Promotion`, node).map((n) =>
    parsePromotion('.', n),
  ),
  promotionAdjustmentList: select(
    `${key}/finances:PromotionAdjustmentList/finances:Promotion`,
    node,
  ).map((n) => parsePromotion('.', n)),
  costOfPointsGranted: nullable(parseCurrencyAmount, `${key}/finances:CostOfPointsGranted`, node),
  costOfPointsReturned: nullable(parseCurrencyAmount, `${key}/finances:CostOfPointsReturned`, node),
})
