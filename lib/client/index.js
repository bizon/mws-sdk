const got = require('got')

const pkg = require('../../package.json')

const sign = require('./sign')
const {cleanData} = require('./utils')
const {getMarketplaces, getMarketplacesFromRegion} = require('./marketplaces')

const Finances = require('./models/finances')
const FulfillmentInboundShipment = require('./models/fulfillment-inbound-shipment')
const FulfillmentInventory = require('./models/fulfillment-inventory')
const Orders = require('./models/orders')
const Products = require('./models/products')
const Reports = require('./models/reports')
const Sellers = require('./models/sellers')
const Subscriptions = require('./models/subscriptions')

const apiClient = got.extend({
  headers: {
    'user-agent': `bizon/mws-sdk/${pkg.version} (https://bizon.solutions)`
  }
})

class Client {
  constructor({
    accessKeyId,
    secretAccessKey,
    sellerId,
    mwsToken,
    mwsRegion,
    marketplaces
  } = {}) {
    accessKeyId = accessKeyId || process.env.MWS_ACCESS_KEY_ID
    secretAccessKey = secretAccessKey || process.env.MWS_SECRET_ACCESS_KEY

    if (!accessKeyId || !secretAccessKey || !sellerId || !mwsToken) {
      throw new TypeError('accessKeyId, secretAccessKey, sellerId and mwsToken are required')
    }

    if ((!mwsRegion && !marketplaces) || (mwsRegion && marketplaces)) {
      throw new TypeError('Specify one of mwsRegion or marketplaces')
    }

    const sellerMarketplaces = marketplaces ?
      getMarketplaces(marketplaces) :
      getMarketplacesFromRegion(mwsRegion)

    this.settings = {
      accessKeyId,
      secretAccessKey,
      sellerId,
      mwsToken,
      mwsDomain: sellerMarketplaces[0].mwsDomain,
      marketplaces: sellerMarketplaces
    }

    this.finances = new Finances(this)
    this.fulfillmentInboundShipment = new FulfillmentInboundShipment(this)
    this.fulfillmentInventory = new FulfillmentInventory(this)
    this.orders = new Orders(this)
    this.products = new Products(this)
    this.reports = new Reports(this)
    this.sellers = new Sellers(this)
    this.subscriptions = new Subscriptions(this)
  }

  signData(method, resource, version, data) {
    const {accessKeyId, secretAccessKey, sellerId, mwsToken, mwsDomain} = this.settings
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

    data.Signature = sign(secretAccessKey, {
      method,
      domain: mwsDomain,
      path: pathname,
      data
    })

    return {pathname, data}
  }

  get(resource, version, query, options) {
    const {mwsDomain} = this.settings
    const {pathname, data} = this.signData('GET', resource, version, query)

    return apiClient.get(`https://${mwsDomain}${pathname}`, {
      ...options,
      searchParams: data
    })
  }

  post(resource, version, body, options) {
    const {mwsDomain} = this.settings
    const {pathname, data} = this.signData('POST', resource, version, body)

    return apiClient.post(`https://${mwsDomain}${pathname}`, {
      ...options,
      form: data
    })
  }
}

module.exports = Client
