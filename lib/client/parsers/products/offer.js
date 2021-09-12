const {parseStr} = require('../base')

const nullable = require('../nullable')

const parseMoney = require('./money')
const parsePriceType = require('./price-type')

module.exports = (key, node) => ({
  buyingPrice: nullable(parsePriceType, `${key}/products:BuyingPrice`, node),
  regularPrice: nullable(parseMoney, `${key}/products:RegularPrice`, node),
  fulfillmentChannel: parseStr(`${key}/products:FulfillmentChannel`, node),
  itemCondition: parseStr(`${key}/products:ItemCondition`, node),
  itemSubCondition: parseStr(`${key}/products:ItemSubCondition`, node),
  sellerId: parseStr(`${key}/products:SellerId`, node),
  sellerSku: parseStr(`${key}/products:SellerSKU`, node),
})
