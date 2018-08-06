const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseSAFETReimbursementItem = require('./safe-t-reimbursement-item')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/PostedDate`, node),
  safeTClaimId: parseStr(`${key}/SAFETClaimId`, node),
  reimbursedAmount: parseCurrencyAmount(`${key}/ReimbursedAmount`, node),
  safeTReimbursementItemList: select(`${key}/SAFETReimbursementItemList/SAFETReimbursementItem`, node).map(n => {
    return parseSAFETReimbursementItem('.', n)
  })
})
