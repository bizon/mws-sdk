const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  imagingRequestBillingItemID: parseStr(`${key}/finances:ImagingRequestBillingItemID`, node),
  asin: parseStr(`${key}/finances:ASIN`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  feeList: select(`${key}/finances:FeeList/finances:FeeComponent`, node).map(n => {
    return parseFeeComponent('.', n)
  })
})
