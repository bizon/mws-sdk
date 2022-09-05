const {parseString} = require('../base')
const select = require('../select')

const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  amazonOrderId: parseString(`${key}/finances:AmazonOrderId`, node),
  feeReason: parseString(`${key}/finances:FeeReason`, node),

  feeList: select(
    [`${key}/finances:FeeList/finances:Fee`, `${key}/finances:FeeList/finances:FeeComponent`],
    node,
  ).map((n) => parseFeeComponent('.', n)),

  sellerSKU: parseString(`${key}/finances:SellerSKU`, node),
  fnSKU: parseString(`${key}/finances:FnSKU`, node),
  feeDescription: parseString(`${key}/finances:FeeDescription`, node),
  asin: parseString(`${key}/finances:ASIN`, node),
})
