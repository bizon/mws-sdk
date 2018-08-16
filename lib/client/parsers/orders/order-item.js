const {parseStr, parseNumber, parseBool, parseDate} = require('../base')

const select = require('../select')

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
  pointsGranted: parsePointsGranted(`${key}/PointsGranted`, node),
  productInfo: parseProductInfo(`${key}/ProductInfo`, node),
  itemPrice: parseMoney(`${key}/ItemPrice`, node),
  shippingPrice: parseMoney(`${key}/ShippingPrice`, node),
  giftWrapPrice: parseMoney(`${key}/GiftWrapPrice`, node),
  taxCollection: parseTaxCollection(`${key}/TaxCollection`, node),
  itemTax: parseMoney(`${key}/ItemTax`, node),
  shippingTax: parseMoney(`${key}/ShippingTax`, node),
  giftWrapTax: parseMoney(`${key}/GiftWrapTax`, node),
  shippingDiscount: parseMoney(`${key}/ShippingDiscount`, node),
  promotionDiscount: parseMoney(`${key}/PromotionDiscount`, node),
  promotionIds: select(`${key}/PromotionIds/PromotionId`, node).map(n => {
    return parseStr('.', n)
  }),
  codFee: parseMoney(`${key}/CODFee`, node),
  codFeeDiscount: parseMoney(`${key}/CODFeeDiscount`, node),
  isGift: parseBool(`${key}/IsGift`, node),
  giftMessageText: parseStr(`${key}/GiftMessageText`, node),
  giftWrapLevel: parseStr(`${key}/GiftWrapLevel`, node),
  invoiceData: parseInvoiceData(`${key}/InvoiceData`, node),
  conditionNote: parseStr(`${key}/ConditionNote`, node),
  conditionId: parseStr(`${key}/ConditionId`, node),
  conditionSubtypeId: parseStr(`${key}/ConditionSubtypeId`, node),
  scheduledDeliveryStartDate: parseDate(`${key}/ScheduledDeliveryStartDate`, node),
  scheduledDeliveryEndDate: parseDate(`${key}/ScheduledDeliveryEndDate`, node),
  priceDesignation: parseStr(`${key}/PriceDesignation`, node)
})
