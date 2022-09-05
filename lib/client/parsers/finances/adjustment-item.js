const {parseString, parseNumber} = require('../base')
const nullable = require('../nullable')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  quantity: parseNumber(`${key}/finances:Quantity`, node),
  perUnitAmount: nullable(parseCurrencyAmount, `${key}/finances:PerUnitAmount`, node),
  totalAmount: nullable(parseCurrencyAmount, `${key}/finances:TotalAmount`, node),
  sellerSKU: parseString(`${key}/finances:SellerSKU`, node),
  fnSKU: parseString(`${key}/finances:FnSKU`, node),
  productDescription: parseString(`${key}/finances:ProductDescription`, node),
  asin: parseString(`${key}/finances:ASIN`, node),
})
