const {parseStr, parseNumber, parseBool, parseDate} = require('../base')

const select = require('../select')
const nullable = require('../nullable')

const parseBuyerCustomizedInfo = require('./buyer-customized-info')
const parsePointsGranted = require('./points-granted')
const parseProductInfo = require('./product-info')
const parseMoney = require('./money')
const parseTaxCollection = require('./tax-collection')

module.exports = (key, node) => ({
  asin: parseStr(`${key}/orders:ASIN`, node),
  orderItemId: parseStr(`${key}/orders:OrderItemId`, node),
  sellerSKU: parseStr(`${key}/orders:SellerSKU`, node),
  buyerCustomizedInfo: nullable(parseBuyerCustomizedInfo, `${key}/orders:BuyerCustomizedInfo`, node),
  title: parseStr(`${key}/orders:Title`, node),
  quantityOrdered: parseNumber(`${key}/orders:QuantityOrdered`, node),
  quantityShipped: parseNumber(`${key}/orders:QuantityShipped`, node),
  pointsGranted: nullable(parsePointsGranted, `${key}/orders:PointsGranted`, node),
  productInfo: nullable(parseProductInfo, `${key}/orders:ProductInfo`, node),
  itemPrice: nullable(parseMoney, `${key}/orders:ItemPrice`, node),
  shippingPrice: nullable(parseMoney, `${key}/orders:ShippingPrice`, node),
  giftWrapPrice: nullable(parseMoney, `${key}/orders:GiftWrapPrice`, node),
  taxCollection: nullable(parseTaxCollection, `${key}/orders:TaxCollection`, node),
  itemTax: nullable(parseMoney, `${key}/orders:ItemTax`, node),
  shippingTax: nullable(parseMoney, `${key}/orders:ShippingTax`, node),
  giftWrapTax: nullable(parseMoney, `${key}/orders:GiftWrapTax`, node),
  shippingDiscount: nullable(parseMoney, `${key}/orders:ShippingDiscount`, node),
  shippingDiscountTax: nullable(parseMoney, `${key}/orders:ShippingDiscountTax`, node),
  promotionDiscount: nullable(parseMoney, `${key}/orders:PromotionDiscount`, node),
  promotionDiscountTax: nullable(parseMoney, `${key}/orders:PromotionDiscountTax`, node),
  promotionIds: select(`${key}/orders:PromotionIds/orders:PromotionId`, node).map(n => {
    return parseStr('.', n)
  }),
  codFee: nullable(parseMoney, `${key}/orders:CODFee`, node),
  codFeeDiscount: nullable(parseMoney, `${key}/orders:CODFeeDiscount`, node),
  isGift: parseBool(`${key}/orders:IsGift`, node),
  giftMessageText: parseStr(`${key}/orders:GiftMessageText`, node),
  giftWrapLevel: parseStr(`${key}/orders:GiftWrapLevel`, node),
  conditionNote: parseStr(`${key}/orders:ConditionNote`, node),
  conditionId: parseStr(`${key}/orders:ConditionId`, node),
  conditionSubtypeId: parseStr(`${key}/orders:ConditionSubtypeId`, node),
  scheduledDeliveryStartDate: parseDate(`${key}/orders:ScheduledDeliveryStartDate`, node),
  scheduledDeliveryEndDate: parseDate(`${key}/orders:ScheduledDeliveryEndDate`, node),
  priceDesignation: parseStr(`${key}/orders:PriceDesignation`, node),
  isTransparency: parseBool(`${key}/orders:IsTransparency`, node),
  serialNumberRequired: parseBool(`${key}/orders:SerialNumberRequired`, node)
})
