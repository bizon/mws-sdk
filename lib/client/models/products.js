const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseGetMatchingProductForIdResponse = require('../parsers/products/get-matching-product-for-id-response')
const parseGetMyPriceForAsinResponse = require('../parsers/products/get-my-price-for-asin-response')
const parseGetLowestPricedOffersForAsinResponse = require('../parsers/products/get-lowest-priced-offers-for-asin-response')

const RESOURCE = 'Products'
const VERSION = '2011-10-01'

const _getMatchingProductForId = Symbol('getMatchingProductForId')
const _getMyPriceForAsin = Symbol('getMyPriceForAsin')
const _getLowestPricedOffersForAsin = Symbol('getLowestPricedOffersForAsin')
const _getServiceStatus = Symbol('getServiceStatus')

class Products {
  constructor(client) {
    this.client = client

    this.getMatchingProductForId = throttle(this[_getMatchingProductForId].bind(this), 1, 20, {
      amount: 5,
      interval: 5 * 1000
    })

    this.getMyPriceForAsin = throttle(this[_getMyPriceForAsin].bind(this), 1, 20, {
      amount: 10,
      interval: 1 * 1000
    })

    this.getLowestPricedOffersForAsin = throttle(this[_getLowestPricedOffersForAsin].bind(this), 1, 10, {
      amount: 5,
      interval: 1 * 1000
    })

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000
    })
  }

  async [_getMatchingProductForId]({
    marketplaceId,
    idType,
    idList
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetMatchingProductForId',
      MarketplaceId: marketplaceId,
      IdType: idType,

      ...arrayToObject('IdList.Id', idList)
    }, {
      retry: {
        retries: 20
      },
      timeout: (5 + Math.random()) * 1000
    })

    const {getMatchingProductForIdResults} = parseGetMatchingProductForIdResponse(
      '/products:GetMatchingProductForIdResponse',
      parseXml(body)
    )

    return getMatchingProductForIdResults
  }

  async [_getMyPriceForAsin]({
    marketplaceId,
    asinList,
    itemCondition
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetMyPriceForASIN',
      MarketplaceId: marketplaceId,
      ItemCondition: itemCondition,

      ...arrayToObject('ASINList.ASIN', asinList)
    }, {
      retry: {
        retries: 20
      },
      timeout: (1 + Math.random()) * 1000
    })

    const {getMyPriceForAsinResult} = parseGetMyPriceForAsinResponse(
      '/products:GetMyPriceForASINResponse',
      parseXml(body)
    )

    return getMyPriceForAsinResult
  }

  async [_getLowestPricedOffersForAsin]({
    marketplaceId,
    asin,
    itemCondition
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetLowestPricedOffersForASIN',
      MarketplaceId: marketplaceId,
      ASIN: asin,
      ItemCondition: itemCondition
    }, {
      retry: {
        retries: 20
      },
      timeout: (1 + Math.random()) * 1000
    })

    return parseGetLowestPricedOffersForAsinResponse(
      '/products:GetLowestPricedOffersForASINResponse',
      parseXml(body)
    ).getLowestPricedOffersForAsinResult
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

    return parseGetServiceStatusResponse(
      '/products:GetServiceStatusResponse',
      parseXml(body),
    ).getServiceStatusResult
  }

  clearRestores() {
    this.getMatchingProductForId.abort()
    this.getMyPriceForAsin.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = Products
