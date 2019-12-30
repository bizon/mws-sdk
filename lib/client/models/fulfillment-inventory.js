const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseListInventorySupplyResponse = require('../parsers/fulfillment-inventory/list-inventory-supply-response')

const RESOURCE = 'FulfillmentInventory'
const VERSION = '2010-10-01'

const _listInventorySupply = Symbol('listInventorySupply')
const _getServiceStatus = Symbol('getServiceStatus')

class FulfillmentInventory {
  constructor(client) {
    this.client = client

    this.listInventorySupply = throttle(this[_listInventorySupply].bind(this), 1, 30, {
      amount: 2,
      interval: 1000
    })

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000
    })
  }

  async [_listInventorySupply]({
    sellerSkus,
    queryStartDateTime,
    responseGroup,
    marketplaceId,

    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListInventorySupplyByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListInventorySupply',
      ...arrayToObject('SellerSkus.member', sellerSkus),
      QueryStartDateTime: queryStartDateTime,
      ResponseGroup: responseGroup,
      MarketplaceId: marketplaceId
    }, {
      retry: {
        retries: 30
      }
    })

    const {listInventorySupplyResult} = parseListInventorySupplyResponse(
      hasToken ?
        '/fulfillmentInventory:ListInventorySupplyResponseByNextTokenResponse' :
        '/fulfillmentInventory:ListInventorySupplyResponse',
      parseXml(body),
      hasToken
    )

    return listInventorySupplyResult
  }

  async [_getServiceStatus]() {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetServiceStatus'
    }, {
      retry: {
        retries: 2
      }
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
