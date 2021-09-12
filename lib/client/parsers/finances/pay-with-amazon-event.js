const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  sellerOrderId: parseStr(`${key}/finances:SellerOrderId`, node),
  transactionPostedDate: parseDate(`${key}/finances:TransactionPostedDate`, node),
  businessObjectType: parseStr(`${key}/finances:BusinessObjectType`, node),
  salesChannel: parseStr(`${key}/finances:SalesChannel`, node),
  charge: parseChargeComponent(`${key}/finances:Charge`, node),
  feeList: select(`${key}/finances:FeeList/finances:FeeComponent`, node).map(n => parseFeeComponent('.', n)),
  paymentAmountType: parseStr(`${key}/finances:PaymentAmountType`, node),
  amountDescription: parseStr(`${key}/finances:AmountDescription`, node),
  fulfillmentChannel: parseStr(`${key}/finances:FulfillmentChannel`, node),
  storeName: parseStr(`${key}/finances:StoreName`, node),
})
