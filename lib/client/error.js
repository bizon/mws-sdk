const {HTTPError} = require('got')

const parseXml = require('./parsers')
const parseError = require('./parsers/base/error')
const parseResponseMetadata = require('./parsers/base/response-metadata')

function parseDefaultErrorResponse(key, node) {
  return {
    error: parseError(`${key}/*[local-name() = 'Error']`, node),
    responseMetadata: parseResponseMetadata(`${key}/*[local-name() = 'ResponseMetadata']`, node)
  }
}

class MWSError extends Error {
  constructor(httpError, resource, method, parseErrorResponse = parseDefaultErrorResponse) {
    if (!(httpError instanceof HTTPError)) {
      throw httpError
    }

    if (!resource || !method) {
      throw new TypeError('The resource and method parameters are required')
    }

    super(`${resource}.${method} error: ${httpError.message}`)

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.response = httpError.response

    if (this.response.body) {
      this.body = parseErrorResponse(
        '/*[local-name() = \'ErrorResponse\']',
        parseXml(httpError.response.body)
      )
    }
  }
}

module.exports = MWSError
