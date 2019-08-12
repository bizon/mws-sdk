const select = require('../../../select')

const {parseStr} = require('../../../base')

const parseMoney = require('../money')

const parseFeeDetail = (key, node) => ({
  feeType: parseStr(`${key}/FeeType`, node),
  feeAmount: parseMoney(`${key}/FeeAmount`, node),
  feePromotion: parseMoney(`${key}/FeePromotion`, node),
  taxAmount: parseMoney(`${key}/TaxAmount`, node),
  finalFee: parseMoney(`${key}/FinalFee`, node),
  includedFeeDetailList: select(`${key}/IncludedFeeDetailList`, node).map(n => {
    return parseFeeDetail('.', n)
  })
})

module.exports = parseFeeDetail
