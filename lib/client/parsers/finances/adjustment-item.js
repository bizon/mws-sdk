const nullable = require('../nullable')
const {parseStr, parseNumber} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  quantity: parseNumber(`${key}/finances:Quantity`, node),
  perUnitAmount: nullable(parseCurrencyAmount, `${key}/finances:PerUnitAmount`, node),
  totalAmount: nullable(parseCurrencyAmount, `${key}/finances:TotalAmount`, node),
  sellerSKU: parseStr(`${key}/finances:SellerSKU`, node),
  fnSKU: parseStr(`${key}/finances:FnSKU`, node),
  productDescription: parseStr(`${key}/finances:ProductDescription`, node),
  asin: parseStr(`${key}/finances:ASIN`, node)
})
