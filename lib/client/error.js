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
  constructor(httpError, resource, action, parseErrorResponse = parseDefaultErrorResponse) {
    if (!(httpError instanceof HTTPError)) {
      throw httpError
    }

    if (!resource || !action) {
      throw new TypeError('The resource and action parameters are required')
    }

    super(`${resource}.${action} error: ${httpError.message}`)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'MWSError'

    Object.defineProperty(this, 'response', {
      value: httpError.response
    })

    Object.defineProperty(this, 'resource', {
      enumerable: true,
      value: resource
    })

    Object.defineProperty(this, 'action', {
      enumerable: true,
      value: action
    })

    if (httpError.response.body) {
      const body = parseErrorResponse(
        '/*[local-name() = \'ErrorResponse\']',
        parseXml(httpError.response.body)
      )

      Object.defineProperty(this, 'body', {
        enumerable: true,
        value: body
      })
    }
  }
}

module.exports = MWSError
