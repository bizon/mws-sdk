const {parseString, parseDate} = require('../base')
const select = require('../select')

const parseCurrencyAmount = require('./currency-amount')
const parseSAFETReimbursementItem = require('./safe-t-reimbursement-item')

module.exports = (key, node) => ({
  postedDate: parseDate(`${key}/finances:PostedDate`, node),
  safeTClaimId: parseString(`${key}/finances:SAFETClaimId`, node),
  reimbursedAmount: parseCurrencyAmount(`${key}/finances:ReimbursedAmount`, node),
  safeTReimbursementItemList: select(
    `${key}/finances:SAFETReimbursementItemList/finances:SAFETReimbursementItem`,
    node,
  ).map((n) => parseSAFETReimbursementItem('.', n)),
})
