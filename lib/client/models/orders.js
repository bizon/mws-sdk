const {DOMParser} = require('xmldom')

const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseGetOrderResponse = require('../parsers/orders/get-order-response')
const parseListOrdersResponse = require('../parsers/orders/list-orders-response')
const parseListOrderItemsResponse = require('../parsers/orders/list-order-items-response')

const RESOURCE = 'Orders'
const VERSION = '2013-09-01'

const _getOrders = Symbol('getOrders')
const _listOrders = Symbol('listOrders')
const _listOrderItems = Symbol('listOrderItems')

class Orders {
  constructor(client) {
    this.client = client

    this.getOrders = throttle(this[_getOrders].bind(this), 1, 6, {
      amount: 1,
      interval: 60 * 1000
    })

    this.listOrders = throttle(this[_listOrders].bind(this), 1, 6, {
      amount: 1,
      interval: 60 * 1000
    })

    this.listOrderItems = throttle(this[_listOrderItems].bind(this), 1, 6, {
      amount: 1,
      interval: 2 * 1000
    })
  }

  async [_getOrders]({amazonOrderIds}) {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetOrder',

      ...arrayToObject('AmazonOrderId.Id', amazonOrderIds)
    }, {
      retries: 6,
      statusCodes: [503],
      maxRetryAfter: 60 * 1000
    })

    const {getOrderResult} = parseGetOrderResponse(
      '/GetOrderResponse',
      new DOMParser().parseFromString(body),
    )

    return getOrderResult.orders
  }

  async [_listOrders]({
    createdAfter,
    createdBefore,
    lastUpdatedAfter,
    lastUpdatedBefore,
    orderStatus,
    fulfillmentChannel,
    paymentMethod,
    buyerEmail,
    sellerOrderId,
    maxResultsPerPage = 100,
    tfmShipmentStatus,

    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListOrdersByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListOrders',
      CreatedAfter: createdAfter,
      CreatedBefore: createdBefore,
      LastUpdatedAfter: lastUpdatedAfter,
      LastUpdatedBefore: lastUpdatedBefore,
      OrderStatus: orderStatus,
      FulfillmentChannel: fulfillmentChannel,
      PaymentMethod: paymentMethod,
      BuyerEmail: buyerEmail,
      SellerOrderId: sellerOrderId,
      MaxResultsPerPage: maxResultsPerPage,
      TFMShipmentStatus: tfmShipmentStatus
    }, {
      retries: 6,
      statusCodes: [503],
      maxRetryAfter: 60 * 1000
    })

    return parseListOrdersResponse(
      hasToken ? '/ListOrdersByNextTokenResponse' : '/ListOrdersResponse',
      new DOMParser().parseFromString(body),
      hasToken
    ).listOrdersResult
  }

  async [_listOrderItems]({amazonOrderId, nextToken}) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListOrderItemsByNextToken',
      NextToken: nextToken
    } : {
      Action: 'ListOrderItems',
      AmazonOrderId: amazonOrderId
    }, {
      retries: 30,
      statusCodes: [503],
      maxRetryAfter: 2 * 1000
    })

    return parseListOrderItemsResponse(
      hasToken ? '/ListOrderItemsByNextTokenResponse' : '/ListOrderItemsResponse',
      new DOMParser().parseFromString(body),
      hasToken
    ).listOrderItemsResult
  }

  clearRestores() {
    this.getOrders.abort()
    this.listOrders.abort()
    this.listOrderItems.abort()
  }
}

module.exports = Orders
