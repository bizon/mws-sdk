const {parseStr, parseNumber, parseBool, parseDate} = require('../base')

const select = require('../select')
const nullable = require('../nullable')

const parseBuyerCustomizedInfo = require('./buyer-customized-info')
const parsePointsGranted = require('./points-granted')
const parseProductInfo = require('./product-info')
const parseMoney = require('./money')
const parseTaxCollection = require('./tax-collection')
const parseInvoiceData = require('./invoice-data')

module.exports = (key, node) => ({
  asin: parseStr(`${key}/ASIN`, node),
  orderItemId: parseStr(`${key}/OrderItemId`, node),
  sellerSKU: parseStr(`${key}/SellerSKU`, node),
  buyerCustomizedInfo: parseBuyerCustomizedInfo(`${key}/BuyerCustomizedInfo`, node),
  title: parseStr(`${key}/Title`, node),
  quantityOrdered: parseNumber(`${key}/QuantityOrdered`, node),
  quantityShipped: parseNumber(`${key}/QuantityShipped`, node),
  pointsGranted: nullable(parsePointsGranted, `${key}/PointsGranted`, node),
  productInfo: nullable(parseProductInfo, `${key}/ProductInfo`, node),
  itemPrice: nullable(parseMoney, `${key}/ItemPrice`, node),
  shippingPrice: nullable(parseMoney, `${key}/ShippingPrice`, node),
  giftWrapPrice: nullable(parseMoney, `${key}/GiftWrapPrice`, node),
  taxCollection: nullable(parseTaxCollection, `${key}/TaxCollection`, node),
  itemTax: nullable(parseMoney, `${key}/ItemTax`, node),
  shippingTax: nullable(parseMoney, `${key}/ShippingTax`, node),
  giftWrapTax: nullable(parseMoney, `${key}/GiftWrapTax`, node),
  shippingDiscount: nullable(parseMoney, `${key}/ShippingDiscount`, node),
  promotionDiscount: nullable(parseMoney, `${key}/PromotionDiscount`, node),
  promotionIds: select(`${key}/PromotionIds/PromotionId`, node).map(n => {
    return parseStr('.', n)
  }),
  codFee: nullable(parseMoney, `${key}/CODFee`, node),
  codFeeDiscount: nullable(parseMoney, `${key}/CODFeeDiscount`, node),
  isGift: parseBool(`${key}/IsGift`, node),
  giftMessageText: parseStr(`${key}/GiftMessageText`, node),
  giftWrapLevel: parseStr(`${key}/GiftWrapLevel`, node),
  invoiceData: nullable(parseInvoiceData, `${key}/InvoiceData`, node),
  conditionNote: parseStr(`${key}/ConditionNote`, node),
  conditionId: parseStr(`${key}/ConditionId`, node),
  conditionSubtypeId: parseStr(`${key}/ConditionSubtypeId`, node),
  scheduledDeliveryStartDate: parseDate(`${key}/ScheduledDeliveryStartDate`, node),
  scheduledDeliveryEndDate: parseDate(`${key}/ScheduledDeliveryEndDate`, node),
  priceDesignation: parseStr(`${key}/PriceDesignation`, node)
})
