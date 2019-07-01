const nullable = require('../../nullable')

const {parseDecimal, parseNumber} = require('../../base')

module.exports = (key, node) => ({
  sellerPositiveFeedbackRating: nullable(parseDecimal, `${key}/products:SellerPositiveFeedbackRating`, node),
  feedbackCount: parseNumber(`${key}/products:FeedbackCount`, node)
})
