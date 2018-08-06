const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseChargeComponent = require('./charge-component')
const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  sellerOrderId: parseStr(`${key}/SellerOrderId`, node),
  transactionPostedDate: parseDate(`${key}/TransactionPostedDate`, node),
  businessObjectType: parseStr(`${key}/BusinessObjectType`, node),
  salesChannel: parseStr(`${key}/SalesChannel`, node),
  charge: parseChargeComponent(`${key}/Charge`, node),
  feeList: select(`${key}/FeeList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  }),
  paymentAmountType: parseStr(`${key}/PaymentAmountType`, node),
  amountDescription: parseStr(`${key}/AmountDescription`, node),
  fulfillmentChannel: parseStr(`${key}/FulfillmentChannel`, node),
  storeName: parseStr(`${key}/StoreName`, node)
})
