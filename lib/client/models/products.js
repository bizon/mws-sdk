const {DOMParser} = require('xmldom')

const throttle = require('../throttle')
const {arrayToObject} = require('../utils')

const parseGetMatchingProductForIdResponse = require('../parsers/products/get-matching-product-for-id-response')

const RESOURCE = 'Products'
const VERSION = '2011-10-01'

const _getMatchingProductForId = Symbol('getMatchingProductForId')

class Products {
  constructor(client) {
    this.client = client

    this.getMatchingProductForId = throttle(this[_getMatchingProductForId].bind(this), 1, 20, {
      amount: 5,
      interval: 1 * 1000
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
      timeout: (1 + Math.random()) * 1000
    })

    const {getMatchingProductForIdResults} = parseGetMatchingProductForIdResponse(
      '/GetMatchingProductForIdResponse',
      new DOMParser().parseFromString(body),
    )

    return getMatchingProductForIdResults
  }

  clearRestores() {
    this.getMatchingProductForId.abort()
  }
}

module.exports = Products
