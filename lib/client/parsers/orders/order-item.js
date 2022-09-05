const {parseString, parseNumber, parseBool, parseDate} = require('../base')
const nullable = require('../nullable')
const select = require('../select')

const parseBuyerCustomizedInfo = require('./buyer-customized-info')
const parseMoney = require('./money')
const parsePointsGranted = require('./points-granted')
const parseProductInfo = require('./product-info')
const parseTaxCollection = require('./tax-collection')

module.exports = (key, node) => ({
  asin: parseString(`${key}/orders:ASIN`, node),
  orderItemId: parseString(`${key}/orders:OrderItemId`, node),
  sellerSKU: parseString(`${key}/orders:SellerSKU`, node),
  buyerCustomizedInfo: nullable(
    parseBuyerCustomizedInfo,
    `${key}/orders:BuyerCustomizedInfo`,
    node,
  ),
  title: parseString(`${key}/orders:Title`, node),
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
  promotionIds: select(`${key}/orders:PromotionIds/orders:PromotionId`, node).map((n) =>
    parseString('.', n),
  ),
  codFee: nullable(parseMoney, `${key}/orders:CODFee`, node),
  codFeeDiscount: nullable(parseMoney, `${key}/orders:CODFeeDiscount`, node),
  isGift: parseBool(`${key}/orders:IsGift`, node),
  giftMessageText: parseString(`${key}/orders:GiftMessageText`, node),
  giftWrapLevel: parseString(`${key}/orders:GiftWrapLevel`, node),
  conditionNote: parseString(`${key}/orders:ConditionNote`, node),
  conditionId: parseString(`${key}/orders:ConditionId`, node),
  conditionSubtypeId: parseString(`${key}/orders:ConditionSubtypeId`, node),
  scheduledDeliveryStartDate: parseDate(`${key}/orders:ScheduledDeliveryStartDate`, node),
  scheduledDeliveryEndDate: parseDate(`${key}/orders:ScheduledDeliveryEndDate`, node),
  priceDesignation: parseString(`${key}/orders:PriceDesignation`, node),
  isTransparency: parseBool(`${key}/orders:IsTransparency`, node),
  serialNumberRequired: parseBool(`${key}/orders:SerialNumberRequired`, node),
})
