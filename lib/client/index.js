const got = require('got')

const marketplaces = require('./marketplaces')
const sign = require('./sign')
const {cleanData, arrayToObject} = require('./utils')

const Orders = require('./models/orders')

const _signData = Symbol('signData')

class Client {
  constructor(accessKey, secretKey, mwsToken, marketplace) {
    if (!accessKey || !secretKey || !mwsToken) {
      throw new TypeError('accessKey, secretKey and mwsToken are required')
    }

    const mp = marketplaces[marketplace]
    if (!mp) {
      throw new TypeError(`Unknown marketplace ${marketplace}`)
    }

    this.settings = {
      accessKey,
      secretKey,
      mwsToken,
      marketplace: mp
    }

    this.orders = new Orders(this)
  }

  [_signData](method, resource, version, data) {
    const {accessKey, secretKey, mwsToken, marketplace} = this.settings
    const pathname = `/${resource}/${version}`

    data = {
      AWSAccessKeyId: accessKey,
      MWSAuthToken: mwsToken,
      Timestamp: new Date().toISOString(),
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Version: version,

      ...arrayToObject('MarketplaceId.Id', marketplace.id),
      ...cleanData(data)
    }

    data.Signature = sign(secretKey, {
      method,
      domain: marketplace.domain,
      path: pathname,
      data
    })

    return {pathname, data}
  }

  get(resource, version, query) {
    const {marketplace} = this.settings
    const {pathname, data} = this[_signData]('GET', resource, version, query)

    return got.get(`https://${marketplace.domain}${pathname}`, {
      query: data
    })
  }

  post(resource, version, body) {
    const {marketplace} = this.settings
    const {pathname, data} = this[_signData]('POST', resource, version, body)

    return got.post(`https://${marketplace.domain}${pathname}`, {
      body: data,
      form: true
    })
  }
}

module.exports = Client
