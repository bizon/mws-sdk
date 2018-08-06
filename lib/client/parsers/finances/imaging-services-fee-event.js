const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  imagingRequestBillingItemID: parseStr(`${key}/ImagingRequestBillingItemID`, node),
  asin: parseStr(`${key}/ASIN`, node),
  postedDate: parseDate(`${key}/PostedDate`, node),
  feeList: select(`${key}/FeeList/FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  })
})
