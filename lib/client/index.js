const got = require('got')

const pkg = require('../../package.json')

const regions = require('./regions')
const sign = require('./sign')
const {cleanData, arrayToObject} = require('./utils')

const Finances = require('./models/finances')
const Subscriptions = require('./models/subscriptions')
const Orders = require('./models/orders')
const Products = require('./models/products')
const Reports = require('./models/reports')
const Sellers = require('./models/sellers')
const FulfillmentInventory = require('./models/fulfillment-inventory')

const _signData = Symbol('signData')

const USER_AGENT = `bizon/mws-sdk/${pkg.version} (https://bizon.solutions)`

class Client {
  constructor({
    accessKeyId,
    secretAccessKey,
    sellerId,
    mwsToken,
    sellerRegion
  } = {}) {
    accessKeyId = accessKeyId || process.env.MWS_ACCESS_KEY_ID
    secretAccessKey = secretAccessKey || process.env.MWS_SECRET_ACCESS_KEY

    if (!accessKeyId || !secretAccessKey || !sellerId || !mwsToken) {
      throw new TypeError('accessKeyId, secretAccessKey, sellerId and mwsToken are required')
    }

    const region = regions[sellerRegion]
    if (!region) {
      throw new TypeError(`Unknown region ${sellerRegion}`)
    }

    this.settings = {
      accessKeyId,
      secretAccessKey,
      sellerId,
      mwsToken,
      region
    }

    this.finances = new Finances(this)
    this.fulfillmentInventory = new FulfillmentInventory(this)
    this.orders = new Orders(this)
    this.products = new Products(this)
    this.reports = new Reports(this)
    this.sellers = new Sellers(this)
    this.subscriptions = new Subscriptions(this)
  }

  [_signData](method, resource, version, data) {
    const {accessKeyId, secretAccessKey, sellerId, mwsToken, region} = this.settings
    const pathname = `/${resource}/${version}`

    data = {
      AWSAccessKeyId: accessKeyId,
      MWSAuthToken: mwsToken,
      Timestamp: new Date().toISOString(),
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2',
      Version: version,
      SellerId: sellerId,

      ...cleanData(data)
    }

    if (!('MarketplaceId' in data) && !('MarketplaceIdList.Id.1' in data)) {
      data = {
        ...data,
        ...arrayToObject('MarketplaceId.Id', region.marketplaces.map(m => m.id))
      }
    }

    data.Signature = sign(secretAccessKey, {
      method,
      domain: region.mwsDomain,
      path: pathname,
      data
    })

    return {pathname, data}
  }

  get(resource, version, query, options) {
    const {region} = this.settings
    const {pathname, data} = this[_signData]('GET', resource, version, query)

    return got.get(`https://${region.mwsDomain}${pathname}`, {
      headers: {
        'user-agent': USER_AGENT
      },
      ...options,
      query: data
    })
  }

  post(resource, version, body, options) {
    const {region} = this.settings
    const {pathname, data} = this[_signData]('POST', resource, version, body)

    return got.post(`https://${region.mwsDomain}${pathname}`, {
      headers: {
        'user-agent': USER_AGENT
      },
      ...options,
      body: data,
      form: true
    })
  }
}

module.exports = Client
