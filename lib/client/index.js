const got = require('got')

const {regions} = require('./marketplaces')
const sign = require('./sign')
const {cleanData, arrayToObject} = require('./utils')

const Finances = require('./models/finances')
const Orders = require('./models/orders')

const _signData = Symbol('signData')

class Client {
  constructor(accessKey, secretKey, sellerId, mwsToken, sellerRegion) {
    if (!accessKey || !secretKey || !sellerId || !mwsToken) {
      throw new TypeError('accessKey, secretKey, sellerId and mwsToken are required')
    }

    const region = regions[sellerRegion]
    if (!region) {
      throw new TypeError(`Unknown region ${sellerRegion}`)
    }

    this.settings = {
      accessKey,
      secretKey,
      sellerId,
      mwsToken,
      region
    }

    this.finances = new Finances(this)
    this.orders = new Orders(this)
  }

  [_signData](method, resource, version, data) {
    const {accessKey, secretKey, sellerId, mwsToken, region} = this.settings
    const pathname = `/${resource}/${version}`

    data = {
      AWSAccessKeyId: accessKey,
      MWSAuthToken: mwsToken,
      Timestamp: new Date().toISOString(),
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Version: version,
      SellerId: sellerId,

      ...arrayToObject('MarketplaceId.Id', region.marketplaces.map(m => m.id)),
      ...cleanData(data)
    }

    data.Signature = sign(secretKey, {
      method,
      domain: region.domain,
      path: pathname,
      data
    })

    return {pathname, data}
  }

  get(resource, version, query, options) {
    const {region} = this.settings
    const {pathname, data} = this[_signData]('GET', resource, version, query)

    return got.get(`https://${region.domain}${pathname}`, {
      ...options,
      query: data
    }).catch(err => console.log(err))
  }

  post(resource, version, body, options) {
    const {region} = this.settings
    const {pathname, data} = this[_signData]('POST', resource, version, body)

    return got.post(`https://${region.domain}${pathname}`, {
      ...options,
      body: data,
      form: true
    })
  }
}

module.exports = Client
