const {parseStr} = require('../base')

const nullable = require('../nullable')

const parseMoney = require('../orders/money')
const parsePriceType = require('./price-type')

module.exports = (key, node) => ({
  buyingPrice: nullable(parsePriceType, `${key}/BuyingPrice`, node),
  regularPrice: nullable(parseMoney, `${key}/RegularPrice`, node),
  fulfillmentChannel: parseStr(`${key}/FulfillmentChannel`, node),
  itemCondition: parseStr(`${key}/ItemCondition`, node),
  itemSubCondition: parseStr(`${key}/ItemSubCondition`, node),
  sellerId: parseStr(`${key}/SellerId`, node),
  sellerSku: parseStr(`${key}/SellerSKU`, node)
})
