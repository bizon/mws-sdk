const {parseDecimal, parseNumber} = require('../../base')
const nullable = require('../../nullable')

module.exports = (key, node) => ({
  sellerPositiveFeedbackRating: nullable(
    parseDecimal,
    `${key}/products:SellerPositiveFeedbackRating`,
    node,
  ),
  feedbackCount: parseNumber(`${key}/products:FeedbackCount`, node),
})
