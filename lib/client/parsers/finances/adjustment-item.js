const {parseStr} = require('../base')

const parseCurrencyAmount = require('./currency-amount')

module.exports = (key, node) => ({
  quantity: parseStr(`${key}/Quantity`, node),
  perUnitAmount: parseCurrencyAmount(`${key}/PerUnitAmount`, node),
  totalAmount: parseCurrencyAmount(`${key}/TotalAmount`, node),
  sellerSKU: parseStr(`${key}/SellerSKU`, node),
  fnSKU: parseStr(`${key}/FnSKU`, node),
  productDescription: parseStr(`${key}/ProductDescription`, node),
  asin: parseStr(`${key}/ASIN`, node)
})
