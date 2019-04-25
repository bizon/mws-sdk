const select = require('../select')

const {parseStr} = require('../base')

const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => {
  let feeList = select(`${key}/finances:FeeList/finances:FeeComponent`, node)
  if (feeList.length === 0) {
    feeList = select(`${key}/finances:FeeList/finances:Fee`, node)
  }

  return {
    amazonOrderId: parseStr(`${key}/finances:AmazonOrderId`, node),
    feeReason: parseStr(`${key}/finances:FeeReason`, node),
    feeList: feeList.map(n => {
      return parseFeeComponent('.', n)
    }),
    sellerSKU: parseStr(`${key}/finances:SellerSKU`, node),
    fnSKU: parseStr(`${key}/finances:FnSKU`, node),
    feeDescription: parseStr(`${key}/finances:FeeDescription`, node),
    asin: parseStr(`${key}/finances:ASIN`, node)
  }
}
