const {parseString, parseDate} = require('../base')
const select = require('../select')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  sellerOrderId: parseString(`${key}/finances:SellerOrderId`, node),
  transactionPostedDate: parseDate(`${key}/finances:TransactionPostedDate`, node),
  businessObjectType: parseString(`${key}/finances:BusinessObjectType`, node),
  salesChannel: parseString(`${key}/finances:SalesChannel`, node),
  charge: parseChargeComponent(`${key}/finances:Charge`, node),
  feeList: select(`${key}/finances:FeeList/finances:FeeComponent`, node).map((n) =>
    parseFeeComponent('.', n),
  ),
  paymentAmountType: parseString(`${key}/finances:PaymentAmountType`, node),
  amountDescription: parseString(`${key}/finances:AmountDescription`, node),
  fulfillmentChannel: parseString(`${key}/finances:FulfillmentChannel`, node),
  storeName: parseString(`${key}/finances:StoreName`, node),
})
