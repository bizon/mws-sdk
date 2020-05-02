const parseResponseMetadata = require('../base/response-metadata')
const parseGetProductCategoriesForAsinResult = require('./get-product-categories-for-asin-result')

module.exports = (key, node) => ({
  getProductCategoriesForAsinResult: parseGetProductCategoriesForAsinResult(`${key}/products:GetProductCategoriesForASINResult`, node),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node)
})
