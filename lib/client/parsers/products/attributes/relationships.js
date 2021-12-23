const select = require('../../select')
const nullable = require('../../nullable')

const parseVariationChild = require('./variation-child')
const parseVariationParent = require('./variation-parent')

module.exports = (key, node) => ({
  variationParent: nullable(parseVariationParent, `${key}/products:VariationParent`, node),
  variationChildren: select(`${key}/products2:VariationChild`, node).map((n) =>
    parseVariationChild('.', n),
  ),
})
