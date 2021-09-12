const throttle = require('../throttle')
const {dateToISOString, arrayToObject} = require('../utils')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseListOrdersResponse = require('../parsers/orders/list-orders-response')
const parseGetOrderResponse = require('../parsers/orders/get-order-response')
const parseListOrderItemsResponse = require('../parsers/orders/list-order-items-response')

const RESOURCE = 'Orders'
const VERSION = '2013-09-01'

const _listOrders = Symbol('listOrders')
const _getOrder = Symbol('getOrder')
const _listOrderItems = Symbol('listOrderItems')
const _getServiceStatus = Symbol('getServiceStatus')

class Orders {
  constructor(client) {
    Object.defineProperty(this, 'client', {value: client})

    this.listOrders = throttle(this[_listOrders].bind(this), 1, 6, {
      amount: 1,
      interval: 60 * 1000,
    })

    this.getOrder = throttle(this[_getOrder].bind(this), 1, 6, {
      amount: 1,
      interval: 60 * 1000,
    })

    this.listOrderItems = throttle(this[_listOrderItems].bind(this), 1, 30, {
      amount: 1,
      interval: 2 * 1000,
    })

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000,
    })
  }

  async [_listOrders]({
    createdAfter,
    createdBefore,
    lastUpdatedAfter,
    lastUpdatedBefore,
    orderStatus,
    marketplaceId,
    fulfillmentChannel,
    paymentMethod,
    buyerEmail,
    sellerOrderId,
    maxResultsPerPage = 100,
    easyShipShipmentStatus,

    nextToken,
  }) {
    const hasToken = Boolean(nextToken)

    if (!marketplaceId) {
      marketplaceId = this.client.settings.marketplaces.map(m => m.id)
    }

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListOrdersByNextToken',
      NextToken: nextToken,
    } : {
      Action: 'ListOrders',
      CreatedAfter: dateToISOString(createdAfter),
      CreatedBefore: dateToISOString(createdBefore),
      LastUpdatedAfter: dateToISOString(lastUpdatedAfter),
      LastUpdatedBefore: dateToISOString(lastUpdatedBefore),
      BuyerEmail: buyerEmail,
      SellerOrderId: sellerOrderId,
      MaxResultsPerPage: maxResultsPerPage,

      ...arrayToObject('OrderStatus.Status', orderStatus),
      ...arrayToObject('MarketplaceId.Id', marketplaceId),
      ...arrayToObject('FulfillmentChannel.Channel', fulfillmentChannel),
      ...arrayToObject('PaymentMethod.Method', paymentMethod),
      ...arrayToObject('EasyShipShipmentStatus.Status', easyShipShipmentStatus),
    }, {
      retry: {
        retries: 6,
      },
    })

    return parseListOrdersResponse(
      hasToken ? '/orders:ListOrdersByNextTokenResponse' : '/orders:ListOrdersResponse',
      parseXml(body),
      hasToken,
    ).listOrdersResult
  }

  async [_getOrder]({amazonOrderId}) {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetOrder',

      ...arrayToObject('AmazonOrderId.Id', amazonOrderId),
    }, {
      retry: {
        retries: 6,
      },
    })

    const {getOrderResult} = parseGetOrderResponse(
      '/orders:GetOrderResponse',
      parseXml(body),
    )

    return getOrderResult.orders
  }

  async [_listOrderItems]({amazonOrderId, nextToken}) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListOrderItemsByNextToken',
      NextToken: nextToken,
    } : {
      Action: 'ListOrderItems',
      AmazonOrderId: amazonOrderId,
    }, {
      retry: {
        retries: 30,
      },
    })

    return parseListOrderItemsResponse(
      hasToken ? '/orders:ListOrderItemsByNextTokenResponse' : '/orders:ListOrderItemsResponse',
      parseXml(body),
      hasToken,
    ).listOrderItemsResult
  }

  async [_getServiceStatus]() {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetServiceStatus',
    }, {
      retry: {
        retries: 2,
      },
    })

    return parseGetServiceStatusResponse(
      '/orders:GetServiceStatusResponse',
      parseXml(body),
    ).getServiceStatusResult
  }

  clearRestores() {
    this.listOrders.abort()
    this.getOrder.abort()
    this.listOrderItems.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = Orders
