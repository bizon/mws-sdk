const parseResponseMetadata = require('../base/response-metadata')

const parseRegisterDestinationResult = require('./register-destination-result')

module.exports = (key, node) => ({
  registerDestinationResult: parseRegisterDestinationResult(
    `${key}/subscriptions:RegisterDestinationResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/subscriptions:ResponseMetadata`, node),
})
