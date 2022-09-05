const {parseString, parseNumber, parseBool, parseDate} = require('../base')
const nullable = require('../nullable')
const select = require('../select')

const parseAddress = require('./adress')
const parseAutomatedShippingSettings = require('./automated-shipping-settings')
const parseBuyerTaxInfo = require('./buyer-tax-info')
const parseMoney = require('./money')
const parsePaymentExecutionDetail = require('./payment-execution-detail')
const parsePaymentMethodDetail = require('./payment-method-detail')

module.exports = (key, node) => ({
  amazonOrderId: parseString(`${key}/orders:AmazonOrderId`, node),
  sellerOrderId: parseString(`${key}/orders:SellerOrderId`, node),
  purchaseDate: parseDate(`${key}/orders:PurchaseDate`, node),
  lastUpdateDate: parseDate(`${key}/orders:LastUpdateDate`, node),
  orderStatus: parseString(`${key}/orders:OrderStatus`, node),
  fulfillmentChannel: parseString(`${key}/orders:FulfillmentChannel`, node),
  salesChannel: parseString(`${key}/orders:SalesChannel`, node),
  orderChannel: parseString(`${key}/orders:OrderChannel`, node),
  shipServiceLevel: parseString(`${key}/orders:ShipServiceLevel`, node),
  shippingAddress: nullable(parseAddress, `${key}/orders:ShippingAddress`, node),
  defaultShipFromLocationAddress: nullable(
    parseAddress,
    `${key}/orders:DefaultShipFromLocationAddress`,
    node,
  ),
  orderTotal: nullable(parseMoney, `${key}/orders:OrderTotal`, node),
  numberOfItemsShipped: parseNumber(`${key}/orders:NumberOfItemsShipped`, node),
  numberOfItemsUnshipped: parseNumber(`${key}/orders:NumberOfItemsUnshipped`, node),
  paymentExecutionDetail: select(
    `${key}/orders:PaymentExecutionDetail/orders:PaymentExecutionDetailItem`,
    node,
  ).map((n) => parsePaymentExecutionDetail('.', n)),
  paymentMethod: parseString(`${key}/orders:PaymentMethod`, node),
  paymentMethodDetails: select(
    `${key}/orders:PaymentMethodDetails/orders:PaymentMethodDetail`,
    node,
  ).map((n) => parsePaymentMethodDetail('.', n)),
  isReplacementOrder: parseBool(`${key}/orders:IsReplacementOrder`, node),
  replacedOrderId: parseString(`${key}/orders:ReplacedOrderId`, node),
  marketplaceId: parseString(`${key}/orders:MarketplaceId`, node),
  buyerEmail: parseString(`${key}/orders:BuyerEmail`, node),
  buyerName: parseString(`${key}/orders:BuyerName`, node),
  buyerCounty: parseString(`${key}/orders:BuyerCounty`, node),
  buyerTaxInfo: nullable(parseBuyerTaxInfo, `${key}/orders:BuyerTaxInfo`, node),
  shipmentServiceLevelCategory: parseString(`${key}/orders:ShipmentServiceLevelCategory`, node),
  easyShipShipmentStatus: parseString(`${key}/orders:EasyShipShipmentStatus`, node),
  orderType: parseString(`${key}/orders:OrderType`, node),
  earliestShipDate: parseDate(`${key}/orders:EarliestShipDate`, node),
  latestShipDate: parseDate(`${key}/orders:LatestShipDate`, node),
  earliestDeliveryDate: parseDate(`${key}/orders:EarliestDeliveryDate`, node),
  latestDeliveryDate: parseDate(`${key}/orders:LatestDeliveryDate`, node),
  isBusinessOrder: parseBool(`${key}/orders:IsBusinessOrder`, node),
  isSoldByAB: parseBool(`${key}/orders:IsSoldByAB`, node),
  purchaseOrderNumber: parseString(`${key}/orders:PurchaseOrderNumber`, node),
  isPrime: parseBool(`${key}/orders:IsPrime`, node),
  isPremiumOrder: parseBool(`${key}/orders:IsPremiumOrder`, node),
  isGlobalExpressEnabled: parseBool(`${key}/orders:IsGlobalExpressEnabled`, node),
  promiseResponseDueDate: parseDate(`${key}/orders:PromiseResponseDueDate`, node),
  isEstimatedShipDateSet: parseBool(`${key}/orders:IsEstimatedShipDateSet`, node),
  automatedShippingSettings: nullable(
    parseAutomatedShippingSettings,
    `${key}/orders:AutomatedShippingSettings`,
    node,
  ),
})
