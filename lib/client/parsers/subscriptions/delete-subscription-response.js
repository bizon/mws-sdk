const parseResponseMetadata = require('../base/response-metadata')

const parseDeleteSubscriptionResult = require('./delete-subscription-result')

module.exports = (key, node) => ({
  deleteSubscriptionResult: parseDeleteSubscriptionResult(`${key}/subscriptions:DeleteSubscriptionResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/subscriptions:ResponseMetadata`, node)
})
