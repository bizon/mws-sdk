const parseResponseMetadata = require('../base/response-metadata')

const parseGetProductCategoriesForSkuResult = require('./get-product-categories-for-sku-result')

module.exports = (key, node) => ({
  getProductCategoriesForSkuResult: parseGetProductCategoriesForSkuResult(
    `${key}/products:GetProductCategoriesForSKUResult`,
    node,
  ),
  responseMetadata: parseResponseMetadata(`${key}/products:ResponseMetadata`, node),
})
