const {parseDecimal, parseNumber} = require('../../../base')
const nullable = require('../../../nullable')

module.exports = (key, node) => ({
  sellerPositiveFeedbackRating: nullable(parseDecimal, `${key}/SellerPositiveFeedbackRating`, node),
  feedbackCount: parseNumber(`${key}/FeedbackCount`, node),
})
