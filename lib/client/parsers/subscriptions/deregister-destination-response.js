const parseResponseMetadata = require('../base/response-metadata')

const parseDeregisterDestinationResult = require('./deregister-destination-result')

module.exports = (key, node) => ({
  deregisterDestinationResult: parseDeregisterDestinationResult(`${key}/subscriptions:DeregisterDestinationResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/subscriptions:ResponseMetadata`, node),
})
