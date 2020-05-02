const throttle = require('../throttle')
const {arrayToObject} = require('../utils')
const MWSError = require('../error')

const parseXml = require('../parsers')
const parseGetServiceStatusResponse = require('../parsers/base/get-service-status-response')
const parseListMatchingProductsResponse = require('../parsers/products/list-matching-products-response')
const parseGetMatchingProductResponse = require('../parsers/products/get-matching-product-response')
const parseGetMatchingProductForIdResponse = require('../parsers/products/get-matching-product-for-id-response')
const parseGetLowestPricedOffersForAsinResponse = require('../parsers/products/get-lowest-priced-offers-for-asin-response')
const parseGetLowestPricedOffersForAsinErrorResponse = require('../parsers/products/get-lowest-priced-offers-for-asin-error-response')
const parseGetLowestPricedOffersForSkuResponse = require('../parsers/products/get-lowest-priced-offers-for-sku-response')
const parseGetLowestPricedOffersForSkuErrorResponse = require('../parsers/products/get-lowest-priced-offers-for-sku-error-response')
const parseGetMyPriceForAsinResponse = require('../parsers/products/get-my-price-for-asin-response')
const parseGetMyPriceForSkuResponse = require('../parsers/products/get-my-price-for-sku-response')

const RESOURCE = 'Products'
const VERSION = '2011-10-01'

const _listMatchingProducts = Symbol('listMatchingProducts')
const _getMatchingProduct = Symbol('getMatchingProduct')
const _getMatchingProductForId = Symbol('getMatchingProductForId')
const _getLowestPricedOffersForAsin = Symbol('getLowestPricedOffersForAsin')
const _getLowestPricedOffersForSku = Symbol('getLowestPricedOffersForSku')
const _getMyPriceForAsin = Symbol('getMyPriceForAsin')
const _getMyPriceForSku = Symbol('getMyPriceForSku')
const _getServiceStatus = Symbol('getServiceStatus')

class Products {
  constructor(client) {
    Object.defineProperty(this, 'client', {value: client})

    this.listMatchingProducts = throttle(this[_listMatchingProducts].bind(this), 1, 20, {
      amount: 1,
      interval: 5 * 1000
    })

    this.getMatchingProduct = throttle(this[_getMatchingProduct].bind(this), 1, 20, {
      amount: 2,
      interval: 1 * 1000
    })

    this.getMatchingProductForId = throttle(this[_getMatchingProductForId].bind(this), 1, 20, {
      amount: 5,
      interval: 5 * 1000
    })

    this.getLowestPricedOffersForAsin = throttle(this[_getLowestPricedOffersForAsin].bind(this), 1, 10, {
      amount: 5,
      interval: 1 * 1000
    })

    this.getLowestPricedOffersForSku = throttle(this[_getLowestPricedOffersForSku].bind(this), 1, 10, {
      amount: 5,
      interval: 1 * 1000
    })

    this.getMyPriceForAsin = throttle(this[_getMyPriceForAsin].bind(this), 1, 20, {
      amount: 10,
      interval: 1 * 1000
    })

    this.getMyPriceForSku = throttle(this[_getMyPriceForSku].bind(this), 1, 20, {
      amount: 10,
      interval: 1 * 1000
    })

    this.getServiceStatus = throttle(this[_getServiceStatus].bind(this), 1, 2, {
      amount: 1,
      interval: 5 * 1000
    })
  }

  async [_listMatchingProducts]({
    marketplaceId,
    query,
    queryContextId
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'ListMatchingProducts',
      MarketplaceId: marketplaceId,
      Query: query,
      QueryContextId: queryContextId
    }, {
      retry: {
        retries: 20
      }
    })

    const {listMatchingProductsResult} = parseListMatchingProductsResponse(
      '/products:ListMatchingProductsResponse',
      parseXml(body)
    )

    return listMatchingProductsResult
  }

  async [_getMatchingProduct]({
    marketplaceId,
    asinList
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetMatchingProduct',
      MarketplaceId: marketplaceId,

      ...arrayToObject('ASINList.ASIN', asinList)
    }, {
      retry: {
        retries: 20
      }
    })

    const {getMatchingProductResults} = parseGetMatchingProductResponse(
      '/products:GetMatchingProductResponse',
      parseXml(body)
    )

    return getMatchingProductResults
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
      }
    })

    const {getMatchingProductForIdResults} = parseGetMatchingProductForIdResponse(
      '/products:GetMatchingProductForIdResponse',
      parseXml(body)
    )

    return getMatchingProductForIdResults
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
      hooks: {
        beforeError: [error => {
          if (error.response && error.response.statusCode === 400) {
            return new MWSError(
              error,
              RESOURCE,
              'GetLowestPricedOffersForASIN',
              parseGetLowestPricedOffersForAsinErrorResponse
            )
          }

          return error
        }]
      }
    })

    const {getLowestPricedOffersForAsinResult} = parseGetLowestPricedOffersForAsinResponse(
      '/products:GetLowestPricedOffersForASINResponse',
      parseXml(body)
    )

    return getLowestPricedOffersForAsinResult
  }

  async [_getLowestPricedOffersForSku]({
    marketplaceId,
    sellerSku,
    itemCondition
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetLowestPricedOffersForSKU',
      MarketplaceId: marketplaceId,
      SellerSKU: sellerSku,
      ItemCondition: itemCondition
    }, {
      retry: {
        retries: 20
      },
      hooks: {
        beforeError: [error => {
          if (error.response && error.response.statusCode === 400) {
            return new MWSError(
              error,
              RESOURCE,
              'GetLowestPricedOffersForSKU',
              parseGetLowestPricedOffersForSkuErrorResponse
            )
          }

          return error
        }]
      }
    })

    const {getLowestPricedOffersForSkuResult} = parseGetLowestPricedOffersForSkuResponse(
      '/products:GetLowestPricedOffersForSKUResponse',
      parseXml(body)
    )

    return getLowestPricedOffersForSkuResult
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
      }
    })

    const {getMyPriceForAsinResult} = parseGetMyPriceForAsinResponse(
      '/products:GetMyPriceForASINResponse',
      parseXml(body)
    )

    return getMyPriceForAsinResult
  }

  async [_getMyPriceForSku]({
    marketplaceId,
    sellerSkuList,
    itemCondition
  }) {
    const {body} = await this.client.post(RESOURCE, VERSION, {
      Action: 'GetMyPriceForSKU',
      MarketplaceId: marketplaceId,
      ItemCondition: itemCondition,

      ...arrayToObject('SellerSKUList.SellerSKU', sellerSkuList)
    }, {
      retry: {
        retries: 20
      }
    })

    const {getMyPriceForSkuResult} = parseGetMyPriceForSkuResponse(
      '/products:GetMyPriceForSKUResponse',
      parseXml(body)
    )

    return getMyPriceForSkuResult
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
      '/products:GetServiceStatusResponse',
      parseXml(body)
    )

    return getServiceStatusResult
  }

  clearRestores() {
    this.listMatchingProducts.abort()
    this.getMatchingProduct.abort()
    this.getMatchingProductForId.abort()
    this.getLowestPricedOffersForAsin.abort()
    this.getLowestPricedOffersForSku.abort()
    this.getMyPriceForAsin.abort()
    this.getMyPriceForSku.abort()
    this.getServiceStatus.abort()
  }
}

module.exports = Products
