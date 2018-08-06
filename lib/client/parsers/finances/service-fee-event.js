const select = require('../select')

const {parseStr} = require('../base')

const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => {
  let feeList = select(`${key}/FeeList/FeeComponent`, node)
  if (feeList.length === 0) {
    feeList = select(`${key}/FeeList/Fee`, node)
  }

  return {
    amazonOrderId: parseStr(`${key}/AmazonOrderId`, node),
    feeReason: parseStr(`${key}/FeeReason`, node),
    feeList: feeList.map(n => {
      return parseFeeComponent('.', n)
    }),
    sellerSKU: parseStr(`${key}/SellerSKU`, node),
    fnSKU: parseStr(`${key}/FnSKU`, node),
    feeDescription: parseStr(`${key}/FeeDescription`, node),
    asin: parseStr(`${key}/ASIN`, node)
  }
}
