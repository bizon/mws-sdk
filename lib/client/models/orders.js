const {DOMParser} = require('xmldom')

const Throttler = require('../throttler')
const {arrayToObject} = require('../utils')

const parseGetOrderResponse = require('../parsers/orders/get-order-response')
const parseListOrdersResponse = require('../parsers/orders/list-orders-response')

const RESOURCE = 'Orders'
const VERSION = '2013-09-01'

const _getOrder = Symbol('getOrder')
const _getOrders = Symbol('getOrders')
const _listOrders = Symbol('listOrders')

class Orders {
  constructor(client) {
    this.client = client

    const throttler = new Throttler(6, {
      amount: 1,
      interval: 60
    })

    this.getOrders = throttler.proxy(this[_getOrders].bind(this))
    this.getOrder = throttler.proxy(this[_getOrder].bind(this))
    this.listOrders = throttler.proxy(this[_listOrders].bind(this))
  }

  async [_getOrders]({
    sellerId,
    amazonOrderIds
  }) {
    const {body} = await this.client.get(RESOURCE, VERSION, {
      Action: 'GetOrder',
      SellerId: sellerId,

      ...arrayToObject('AmazonOrderId.Id', amazonOrderIds)
    })

    const {getOrderResult} = parseGetOrderResponse(
      '/GetOrderResponse',
      new DOMParser().parseFromString(body),
    )

    return getOrderResult.orders
  }

  async [_getOrder]({
    sellerId,
    amazonOrderId
  }) {
    const [order] = await this[_getOrders]({
      sellerId,
      amazonOrderIds: amazonOrderId
    })

    return order || null
  }

  async [_listOrders]({
    // Common
    sellerId,

    // ListOrders
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

    // ListOrdersByNextToken
    nextToken
  }) {
    const hasToken = Boolean(nextToken)

    const {body} = await this.client.get(RESOURCE, VERSION, hasToken ? {
      Action: 'ListOrdersByNextToken',
      NextToken: nextToken,
      SellerId: sellerId
    } : {
      Action: 'ListOrders',
      SellerId: sellerId,
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
    })

    return parseListOrdersResponse(
      hasToken ? '/ListOrdersByNextTokenResponse' : '/ListOrdersResponse',
      new DOMParser().parseFromString(body),
      hasToken
    ).listOrdersResult
  }
}

module.exports = Orders
