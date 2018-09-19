const {parseStr, parseNumber, parseBool, parseDate} = require('../base')

const select = require('../select')
const nullable = require('../nullable')

const parseAddress = require('./adress')
const parseMoney = require('./money')
const parsePaymentExecutionDetail = require('./payment-execution-detail')
const parsePaymentMethodDetail = require('./payment-method-detail')
const parseBuyerTaxInfo = require('./buyer-tax-info')

module.exports = (key, node) => ({
  amazonOrderId: parseStr(`${key}/AmazonOrderId`, node),
  sellerOrderId: parseStr(`${key}/SellerOrderId`, node),
  purchaseDate: parseDate(`${key}/PurchaseDate`, node),
  lastUpdateDate: parseDate(`${key}/LastUpdateDate`, node),
  orderStatus: parseStr(`${key}/OrderStatus`, node),
  fulfillmentChannel: parseStr(`${key}/FulfillmentChannel`, node),
  salesChannel: parseStr(`${key}/SalesChannel`, node),
  orderChannel: parseStr(`${key}/OrderChannel`, node),
  shipServiceLevel: parseStr(`${key}/ShipServiceLevel`, node),
  shippingAddress: nullable(parseAddress, `${key}/ShippingAddress`, node),
  orderTotal: nullable(parseMoney, `${key}/OrderTotal`, node),
  numberOfItemsShipped: parseNumber(`${key}/NumberOfItemsShipped`, node),
  numberOfItemsUnshipped: parseNumber(`${key}/NumberOfItemsUnshipped`, node),
  paymentExecutionDetail: select(`${key}/PaymentExecutionDetail/PaymentExecutionDetailItem`, node).map(n => {
    return parsePaymentExecutionDetail('.', n)
  }),
  paymentMethod: parseStr(`${key}/PaymentMethod`, node),
  paymentMethodDetails: select(`${key}/PaymentMethodDetails/PaymentMethodDetail`, node).map(n => {
    return parsePaymentMethodDetail('.', n)
  }),
  isReplacementOrder: parseBool(`${key}/IsReplacementOrder`, node),
  replacedOrderId: parseStr(`${key}/ReplacedOrderId`, node),
  marketplaceId: parseStr(`${key}/MarketplaceId`, node),
  buyerEmail: parseStr(`${key}/BuyerEmail`, node),
  buyerName: parseStr(`${key}/BuyerName`, node),
  buyerCounty: parseStr(`${key}/BuyerCounty`, node),
  buyerTaxInfo: parseBuyerTaxInfo(`${key}/BuyerTaxInfo`, node),
  shipmentServiceLevelCategory: parseStr(`${key}/ShipmentServiceLevelCategory`, node),
  shippedByAmazonTfm: parseBool(`${key}/ShippedByAmazonTFM`, node),
  tfmShipmentStatus: parseStr(`${key}/TFMShipmentStatus`, node),
  cbaDisplayableShippingLabel: parseStr(`${key}/CbaDisplayableShippingLabel`, node),
  orderType: parseStr(`${key}/OrderType`, node),
  earliestShipDate: parseDate(`${key}/EarliestShipDate`, node),
  latestShipDate: parseDate(`${key}/LatestShipDate`, node),
  earliestDeliveryDate: parseDate(`${key}/LatestShipDate`, node),
  latestDeliveryDate: parseDate(`${key}/LatestShipDate`, node),
  isBusinessOrder: parseBool(`${key}/IsBusinessOrder`, node),
  purchaseOrderNumber: parseStr(`${key}/PurchaseOrderNumber`, node),
  isPrime: parseBool(`${key}/IsPrime`, node),
  isPremiumOrder: parseBool(`${key}/IsPremiumOrder`, node),
  promiseResponseDueDate: parseDate(`${key}/PromiseResponseDueDate`, node),
  isEstimatedShipDateSet: parseBool(`${key}/IsEstimatedShipDateSet`, node)
})
