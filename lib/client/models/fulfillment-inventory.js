const throttle = require('../throttle')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')

const RESOURCE = 'FulfillmentInventory'
const VERSION = '2011-03-01'

const _getServiceStatus = Symbol('getServiceStatus')

class FulfillmentInventory {
  constructor(client) {
    this.client = client

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000
    })
  }

  async [_getServiceStatus]() {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetServiceStatus'
    }, {
      retry: {
        retries: 2
      },
      timeout: (5 + Math.random()) * 1000
    })

    const {getServiceStatusResult} = parseGetServiceStatusResponse(
      '/fulfillmentInventory:GetServiceStatusResponse',
      parseXml(body),
    )

    return getServiceStatusResult
  }

  clearRestores() {
    this.getServiceStatus.abort()
  }
}

module.exports = FulfillmentInventory
