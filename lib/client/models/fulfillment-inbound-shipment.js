const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseListInboundShipmentsResponse = require('../parsers/fulfillment-inbound-shipment/list-inbound-shipments-response')
const parseListInboundShipmentItemsResponse = require('../parsers/fulfillment-inbound-shipment/list-inbound-shipment-items-response')

const RESOURCE = 'FulfillmentInboundShipment'
const VERSION = '2010-10-01'

const _listInboundShipments = Symbol('listInboundShipments')
const _listInboundShipmentItems = Symbol('listInboundShipmentItems')
const _getServiceStatus = Symbol('getServiceStatus')

class FulfillmentInboundShipment {
  constructor(client) {
    Object.defineProperty(this, 'client', {value: client})

    this.listInboundShipments = throttle(this[_listInboundShipments].bind(this), 1, 30, {
      amount: 2,
      interval: 1 * 1000
    })

    this.listInboundShipmentItems = throttle(this[_listInboundShipmentItems].bind(this), 1, 30, {
      amount: 2,
      interval: 1 * 1000
    })

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000
    })
  }

  async [_listInboundShipments]({
    shipmentStatusList,
    shipmentIdList,
    lastUpdatedAfter,
    lastUpdatedBefore,

    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListInboundShipmentsByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListInboundShipments',
      LastUpdatedAfter: lastUpdatedAfter,
      LastUpdatedBefore: lastUpdatedBefore,

      ...arrayToObject('ShipmentStatusList.member', shipmentStatusList),
      ...arrayToObject('ShipmentIdList.member', shipmentIdList)
    }, {
      retry: {
        retries: 30
      }
    })

    const {listInboundShipmentsResult} = parseListInboundShipmentsResponse(
      '/fulfillmentInboundShipment:ListInboundShipmentsResponse',
      parseXml(body),
      hasToken
    )

    return listInboundShipmentsResult
  }

  async [_listInboundShipmentItems]({
    shipmentId,
    lastUpdatedAfter,
    lastUpdatedBefore,

    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListInboundShipmentItemsByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListInboundShipmentItems',
      ShipmentId: shipmentId,
      LastUpdatedAfter: lastUpdatedAfter,
      LastUpdatedBefore: lastUpdatedBefore
    }, {
      retry: {
        retries: 30
      }
    })

    const {listInboundShipmentItemsResult} = parseListInboundShipmentItemsResponse(
      '/fulfillmentInboundShipment:ListInboundShipmentItemsResponse',
      parseXml(body),
      hasToken
    )

    return listInboundShipmentItemsResult
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
      '/fulfillmentInboundShipment:GetServiceStatusResponse',
      parseXml(body)
    )

    return getServiceStatusResult
  }

  clearRestores() {
    this.listInboundShipments.abort()
    this.listInboundShipmentItems.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = FulfillmentInboundShipment
