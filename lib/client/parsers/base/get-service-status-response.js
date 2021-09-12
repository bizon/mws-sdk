const parseResponseMetadata = require('./response-metadata')

const parseGetServiceStatusResult = require('./get-service-status-result')

module.exports = (key, node) => ({
  getServiceStatusResult: parseGetServiceStatusResult(`${key}/*[local-name() = 'GetServiceStatusResult']`, node),
  responseMetadata: parseResponseMetadata(`${key}/*[local-name() = 'ResponseMetadata']`, node),
})
