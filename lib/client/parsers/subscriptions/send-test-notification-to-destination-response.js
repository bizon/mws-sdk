const parseResponseMetadata = require('../base/response-metadata')

const parseSendTestNotificationToDestinationResult = require('./send-test-notification-to-destination-result')

module.exports = (key, node) => ({
  sendTestNotificationToDestinationResult: parseSendTestNotificationToDestinationResult(`${key}/subscriptions:SendTestNotificationToDestinationResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/subscriptions:ResponseMetadata`, node)
})
