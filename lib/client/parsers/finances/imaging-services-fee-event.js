const {parseString, parseDate} = require('../base')
const select = require('../select')

const parseFeeComponent = require('./fee-component')

module.exports = (key, node) => ({
  imagingRequestBillingItemId: parseString(`${key}/finances:ImagingRequestBillingItemID`, node),
  asin: parseString(`${key}/finances:ASIN`, node),
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  feeList: select(`${key}/finances:FeeList/finances:FeeComponent`, node).map((n) =>
    parseFeeComponent('.', n),
  ),
})
