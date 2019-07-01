const nullable = require('../../../nullable')

const {parseDecimal, parseNumber} = require('../../../base')

module.exports = (key, node) => ({
  sellerPositiveFeedbackRating: nullable(parseDecimal, `${key}/SellerPositiveFeedbackRating`, node),
  FeedbackCount: parseNumber(`${key}/FeedbackCount`, node)
})
