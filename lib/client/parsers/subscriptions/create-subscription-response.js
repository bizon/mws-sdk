const parseResponseMetadata = require('../base/response-metadata')

const parseCreateSubscriptionResult = require('./create-subscription-result')

module.exports = (key, node) => ({
  createSubscriptionResult: parseCreateSubscriptionResult(
    `${key}/subscriptions:CreateSubscriptionResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/subscriptions:ResponseMetadata`, node),
})
