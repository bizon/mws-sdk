const {parseString, parseDate} = require('../base')
const select = require('../select')

const parseChargeComponent = require('./charge-component')
const parseDirectPayment = require('./direct-payment')
const parseFeeComponent = require('./fee-component')
const parseShipmentItem = require('./shipment-item')

module.exports = (key, node) => ({
  amazonOrderId: parseString(`${key}/finances:AmazonOrderId`, node),
  sellerOrderId: parseString(`${key}/finances:SellerOrderId`, node),
  marketplaceName: parseString(`${key}/finances:MarketplaceName`, node),
  orderChargeList: select(`${key}/finances:OrderChargeList/finances:ChargeComponent`, node).map(
    (n) => parseChargeComponent('.', n),
  ),
  orderChargeAdjustmentList: select(
    `${key}/finances:OrderChargeAdjustmentList/finances:ChargeComponent`,
    node,
  ).map((n) => parseChargeComponent('.', n)),
  shipmentFeeList: select(`${key}/finances:ShipmentFeeList/finances:FeeComponent`, node).map((n) =>
    parseFeeComponent('.', n),
  ),
  shipmentFeeAdjustmentList: select(
    `${key}/finances:ShipmentFeeAdjustmentList/finances:FeeComponent`,
    node,
  ).map((n) => parseFeeComponent('.', n)),
  orderFeeList: select(`${key}/finances:OrderFeeList/finances:FeeComponent`, node).map((n) =>
    parseFeeComponent('.', n),
  ),
  orderFeeAdjustmentList: select(
    `${key}/finances:OrderFeeAdjustmentList/finances:FeeComponent`,
    node,
  ).map((n) => parseFeeComponent('.', n)),
  directPaymentList: select(`${key}/finances:DirectPaymentList/finances:DirectPayment`, node).map(
    (n) => parseDirectPayment('.', n),
  ),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  shipmentItemList: select(`${key}/finances:ShipmentItemList/finances:ShipmentItem`, node).map(
    (n) => parseShipmentItem('.', n),
  ),
  shipmentItemAdjustmentList: select(
    `${key}/finances:ShipmentItemAdjustmentList/finances:ShipmentItem`,
    node,
  ).map((n) => parseShipmentItem('.', n)),
})
