const select = require('../../../select')

const {parseDate} = require('../../../base')

const parseMoney = require('../money')

const parseFeeDetail = require('./fee-detail')

module.exports = (key, node) => ({
  timeOfFeesEstimated: parseDate(`${key}/TimeOfFeesEstimated`, node),
  totalFeesEstimate: parseMoney(`${key}/TotalFeesEstimate`, node),
  feeDetailList: select(`${key}/FeeDetailList`, node).map(n => {
    return parseFeeDetail('.', n)
  })
})
