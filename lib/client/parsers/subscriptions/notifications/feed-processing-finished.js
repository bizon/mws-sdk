const {parseStr} = require('../../base')

module.exports = (key, node) => ({
  sellerId: parseStr(`${key}/SellerId`, node),
  feedSubmissionId: parseStr(`${key}/FeedSubmissionId`, node),
  feedType: parseStr(`${key}/FeedType`, node),
  feedProcessingStatus: parseStr(`${key}/FeedProcessingStatus`, node),
})
