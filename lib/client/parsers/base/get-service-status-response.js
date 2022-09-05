const parseGetServiceStatusResult = require('./get-service-status-result')
const parseResponseMetadata = require('./response-metadata')

module.exports = (key, node) => ({
  getServiceStatusResult: parseGetServiceStatusResult(
    `${key}/*[local-name() = 'GetServiceStatusResult']`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/*[local-name() = 'ResponseMetadata']`, node),
})
