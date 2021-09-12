const {parseStr, parseNumber, parseBool, parseDate} = require('../base')

const select = require('../select')
const nullable = require('../nullable')

const parseAddress = require('./adress')
const parseMoney = require('./money')
const parsePaymentExecutionDetail = require('./payment-execution-detail')
const parsePaymentMethodDetail = require('./payment-method-detail')
const parseBuyerTaxInfo = require('./buyer-tax-info')

module.exports = (key, node) => ({
  amazonOrderId: parseStr(`${key}/orders:AmazonOrderId`, node),
  sellerOrderId: parseStr(`${key}/orders:SellerOrderId`, node),
  purchaseDate: parseDate(`${key}/orders:PurchaseDate`, node),
  lastUpdateDate: parseDate(`${key}/orders:LastUpdateDate`, node),
  orderStatus: parseStr(`${key}/orders:OrderStatus`, node),
  fulfillmentChannel: parseStr(`${key}/orders:FulfillmentChannel`, node),
  salesChannel: parseStr(`${key}/orders:SalesChannel`, node),
  orderChannel: parseStr(`${key}/orders:OrderChannel`, node),
  shipServiceLevel: parseStr(`${key}/orders:ShipServiceLevel`, node),
  shippingAddress: nullable(parseAddress, `${key}/orders:ShippingAddress`, node),
  defaultShipFromLocationAddress: nullable(parseAddress, `${key}/orders:DefaultShipFromLocationAddress`, node),
  orderTotal: nullable(parseMoney, `${key}/orders:OrderTotal`, node),
  numberOfItemsShipped: parseNumber(`${key}/orders:NumberOfItemsShipped`, node),
  numberOfItemsUnshipped: parseNumber(`${key}/orders:NumberOfItemsUnshipped`, node),
  paymentExecutionDetail: select(`${key}/orders:PaymentExecutionDetail/orders:PaymentExecutionDetailItem`, node).map(n => parsePaymentExecutionDetail('.', n)),
  paymentMethod: parseStr(`${key}/orders:PaymentMethod`, node),
  paymentMethodDetails: select(`${key}/orders:PaymentMethodDetails/orders:PaymentMethodDetail`, node).map(n => parsePaymentMethodDetail('.', n)),
  isReplacementOrder: parseBool(`${key}/orders:IsReplacementOrder`, node),
  replacedOrderId: parseStr(`${key}/orders:ReplacedOrderId`, node),
  marketplaceId: parseStr(`${key}/orders:MarketplaceId`, node),
  buyerEmail: parseStr(`${key}/orders:BuyerEmail`, node),
  buyerName: parseStr(`${key}/orders:BuyerName`, node),
  buyerCounty: parseStr(`${key}/orders:BuyerCounty`, node),
  buyerTaxInfo: nullable(parseBuyerTaxInfo, `${key}/orders:BuyerTaxInfo`, node),
  shipmentServiceLevelCategory: parseStr(`${key}/orders:ShipmentServiceLevelCategory`, node),
  easyShipShipmentStatus: parseStr(`${key}/orders:EasyShipShipmentStatus`, node),
  orderType: parseStr(`${key}/orders:OrderType`, node),
  earliestShipDate: parseDate(`${key}/orders:EarliestShipDate`, node),
  latestShipDate: parseDate(`${key}/orders:LatestShipDate`, node),
  earliestDeliveryDate: parseDate(`${key}/orders:EarliestDeliveryDate`, node),
  latestDeliveryDate: parseDate(`${key}/orders:LatestDeliveryDate`, node),
  isBusinessOrder: parseBool(`${key}/orders:IsBusinessOrder`, node),
  isSoldByAB: parseBool(`${key}/orders:IsSoldByAB`, node),
  purchaseOrderNumber: parseStr(`${key}/orders:PurchaseOrderNumber`, node),
  isPrime: parseBool(`${key}/orders:IsPrime`, node),
  isPremiumOrder: parseBool(`${key}/orders:IsPremiumOrder`, node),
  isGlobalExpressEnabled: parseBool(`${key}/orders:IsGlobalExpressEnabled`, node),
  promiseResponseDueDate: parseDate(`${key}/orders:PromiseResponseDueDate`, node),
  isEstimatedShipDateSet: parseBool(`${key}/orders:IsEstimatedShipDateSet`, node),
})
