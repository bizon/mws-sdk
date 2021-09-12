const nullable = require('../../../nullable')

const {parseDecimal, parseNumber} = require('../../../base')

module.exports = (key, node) => ({
  sellerPositiveFeedbackRating: nullable(parseDecimal, `${key}/SellerPositiveFeedbackRating`, node),
  feedbackCount: parseNumber(`${key}/FeedbackCount`, node),
})
