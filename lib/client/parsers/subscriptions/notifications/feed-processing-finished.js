const {parseString} = require('../../base')

module.exports = (key, node) => ({
  sellerId: parseString(`${key}/SellerId`, node),
  feedSubmissionId: parseString(`${key}/FeedSubmissionId`, node),
  feedType: parseString(`${key}/FeedType`, node),
  feedProcessingStatus: parseString(`${key}/FeedProcessingStatus`, node),
})
