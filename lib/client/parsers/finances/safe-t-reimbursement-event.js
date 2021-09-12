const select = require('../select')

const {parseStr, parseDate} = require('../base')

const parseCurrencyAmount = require('./currency-amount')
const parseSAFETReimbursementItem = require('./safe-t-reimbursement-item')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  safeTClaimId: parseStr(`${key}/finances:SAFETClaimId`, node),
  reimbursedAmount: parseCurrencyAmount(`${key}/finances:ReimbursedAmount`, node),
  safeTReimbursementItemList: select(`${key}/finances:SAFETReimbursementItemList/finances:SAFETReimbursementItem`, node).map(n => parseSAFETReimbursementItem('.', n)),
})
