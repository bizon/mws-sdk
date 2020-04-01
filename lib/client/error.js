const {HTTPError} = require('got')

const parseXml = require('./parsers')
const parseBaseError = require('./parsers/base/error')
const parseResponseMetadata = require('./parsers/base/response-metadata')

class MWSError extends Error {
  constructor(httpError, resource, method, parseError = parseBaseError) {
    if (!(httpError instanceof HTTPError)) {
      throw httpError
    }

    if (!resource || !method) {
      throw new TypeError('The resource and method parameters are required')
    }

    super(`${resource}.${method} error: ${httpError.message}`)
    this.name = this.constructor.name
    this.httpError = httpError

    if (httpError.response.body) {
      const xml = parseXml(httpError.response.body)

      this.body = {
        error: parseError(
          '/*[local-name() = \'ErrorResponse\']/*[local-name() = \'Error\']',
          xml
        ),
        responseMetadata: parseResponseMetadata(
          '/*[local-name() = \'ErrorResponse\']/*[local-name() = \'ResponseMetadata\']',
          xml
        )
      }
    }

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = MWSError
