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
  constructor(httpError, {
    client,
    resource,
    action,
    parseErrorResponse = parseDefaultErrorResponse
  } = {}) {
    if (!(httpError instanceof HTTPError)) {
      throw httpError
    }

    if (!client || !resource || !action) {
      throw new TypeError('The client, resource and action parameters are required')
    }

    super(`${resource}.${action} error: ${httpError.message}`)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'MWSError'

    Object.defineProperties(this, {
      response: {
        value: httpError.response
      },
      sellerId: {
        enumerable: true,
        value: client.settings.sellerId
      },
      mwsDomain: {
        enumerable: true,
        value: client.settings.mwsDomain
      },
      marketplaces: {
        enumerable: true,
        value: client.settings.marketplaces
      },
      resource: {
        enumerable: true,
        value: resource
      },
      action: {
        enumerable: true,
        value: action
      }
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
