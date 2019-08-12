const {parseStr, parseDecimal} = require('../../../base')

const parseMoney = require('../money')

const parseFeesEstimate = require('./fees-estimate')

module.exports = (key, node) => ({
  feeType: parseStr(`${key}/FeeType`, node),
  feeDiscountType: parseStr(`${key}/FeeDiscountType`, node),
  priceThreshold: parseMoney(`${key}/PriceThreshold`, node),
  feeDiscountMonetaryAmount: parseMoney(`${key}/FeeDiscountMonetaryAmount`, node),
  feeDiscountValue: parseDecimal(`${key}/FeeDiscountValue`, node),
  feesEstimate: parseFeesEstimate(`${key}/FeesEstimate`, node)
})
