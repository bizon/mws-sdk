const select = require('../select')
const {parseStr, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')
const parseDirectPayment = require('./direct-payment')
const parseShipmentItem = require('./shipment-item')

module.exports = (key, node) => ({
  amazonOrderId: parseStr(`${key}/finances:AmazonOrderId`, node),
  sellerOrderId: parseStr(`${key}/finances:SellerOrderId`, node),
  marketplaceName: parseStr(`${key}/finances:MarketplaceName`, node),
  orderChargeList: select(`${key}/finances:OrderChargeList/finances:ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  orderChargeAdjustmentList: select(`${key}/finances:OrderChargeAdjustmentList/finances:ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  shipmentFeeList: select(`${key}/finances:ShipmentFeeList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  shipmentFeeAdjustmentList: select(`${key}/finances:ShipmentFeeAdjustmentList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  orderFeeList: select(`${key}/finances:OrderFeeList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  orderFeeAdjustmentList: select(`${key}/finances:OrderFeeAdjustmentList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  directPaymentList: select(`${key}/finances:DirectPaymentList/finances:DirectPayment`, node).map(n => {
    return parseDirectPayment('.', n)
  }),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  shipmentItemList: select(`${key}/finances:ShipmentItemList/finances:ShipmentItem`, node).map(n => {
    return parseShipmentItem('.', n)
  }),
  shipmentItemAdjustmentList: select(`${key}/finances:ShipmentItemAdjustmentList/finances:ShipmentItem`, node).map(n => {
    return parseShipmentItem('.', n)
  })
})
