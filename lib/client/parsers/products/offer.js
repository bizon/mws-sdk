const {parseString} = require('../base')
const nullable = require('../nullable')

const parseMoney = require('./money')
const parsePriceType = require('./price-type')

module.exports = (key, node) => ({
  buyingPrice: nullable(parsePriceType, `${key}/products:BuyingPrice`, node),
  regularPrice: nullable(parseMoney, `${key}/products:RegularPrice`, node),
  fulfillmentChannel: parseString(`${key}/products:FulfillmentChannel`, node),
  itemCondition: parseString(`${key}/products:ItemCondition`, node),
  itemSubCondition: parseString(`${key}/products:ItemSubCondition`, node),
  sellerId: parseString(`${key}/products:SellerId`, node),
  sellerSku: parseString(`${key}/products:SellerSKU`, node),
})
