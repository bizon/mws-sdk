const parseResponseMetadata = require('./response-metadata')

const parseGetServiceStatusResult = require('./get-service-status-result')

module.exports = (key, node) => ({
  getServiceStatusResult: parseGetServiceStatusResult(`${key}/GetServiceStatusResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/ResponseMetadata`, node)
})
