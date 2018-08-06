const select = require('../select')
const {parseStr, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')
const parseDirectPayment = require('./direct-payment')
const parseShipmentItem = require('./shipment-item')

module.exports = (key, node) => ({
  amazonOrderId: parseStr(`${key}/AmazonOrderId`, node),
  sellerOrderId: parseStr(`${key}/SellerOrderId`, node),
  marketplaceName: parseStr(`${key}/MarketplaceName`, node),
  orderChargeList: select(`${key}/OrderChargeList/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  orderChargeAdjustmentList: select(`${key}/OrderChargeAdjustmentList/ChargeComponent`, node).map(n => {
    return parseChargeComponent('.', n)
  }),
  shipmentFeeList: select(`${key}/ShipmentFeeList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  shipmentFeeAdjustmentList: select(`${key}/ShipmentFeeAdjustmentList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  orderFeeList: select(`${key}/OrderFeeList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  orderFeeAdjustmentList: select(`${key}/OrderFeeAdjustmentList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  directPaymentList: select(`${key}/DirectPaymentList/DirectPayment`, node).map(n => {
    return parseDirectPayment('.', n)
  }),
  postedDate: parseDate(`${key}/PostedDate`, node),
  shipmentItemList: select(`${key}/ShipmentItemList/ShipmentItem`, node).map(n => {
    return parseShipmentItem('.', n)
  }),
  shipmentItemAdjustmentList: select(`${key}/ShipmentItemAdjustmentList/ShipmentItem`, node).map(n => {
    return parseShipmentItem('.', n)
  })
})
