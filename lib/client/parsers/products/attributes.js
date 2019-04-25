const select = require('../select')
const nullable = require('../nullable')

const {parseStr, parseBool, parseNumber} = require('../base')

const parseDimensions = require('./dimensions')
const parseImage = require('./image')

module.exports = (key, node) => ({
  binding: parseStr(`${key}/products2:ItemAttributes/products2:Binding`, node),
  brand: parseStr(`${key}/products2:ItemAttributes/products2:Brand`, node),
  color: parseStr(`${key}/products2:ItemAttributes/products2:Color`, node),
  isAutographed: parseBool(`${key}/products2:ItemAttributes/products2:IsAutographed`, node),
  itemDimensions: nullable(parseDimensions, `${key}/products2:ItemAttributes/products2:ItemDimensions`, node),
  label: parseStr(`${key}/products2:ItemAttributes/products2:Label`, node),
  manufacturer: parseStr(`${key}/products2:ItemAttributes/products2:Manufacturer`, node),
  materialType: select(`${key}/products2:ItemAttributes/products2:MaterialType`, node).map(n => {
    return parseStr('.', n)
  }),
  model: parseStr(`${key}/products2:ItemAttributes/products2:Model`, node),
  numberOfItems: parseNumber(`${key}/products2:ItemAttributes/products2:NumberOfItems`, node),
  packageDimensions: nullable(parseDimensions, `${key}/products2:ItemAttributes/products2:PackageDimensions`, node),
  packageQuantity: parseNumber(`${key}/products2:ItemAttributes/products2:PackageQuantity`, node),
  partNumber: parseStr(`${key}/products2:ItemAttributes/products2:partNumber`, node),
  productGroup: parseStr(`${key}/products2:ItemAttributes/products2:ProductGroup`, node),
  productTypeName: parseStr(`${key}/products2:ItemAttributes/products2:ProductTypeName`, node),
  publisher: parseStr(`${key}/products2:ItemAttributes/products2:Publisher`, node),
  size: parseStr(`${key}/products2:ItemAttributes/products2:Size`, node),
  smallImage: parseImage(`${key}/products2:ItemAttributes/products2:SmallImage`, node),
  studio: parseStr(`${key}/products2:ItemAttributes/products2:Studio`, node),
  title: parseStr(`${key}/products2:ItemAttributes/products2:Title`, node),
  warranty: parseStr(`${key}/products2:ItemAttributes/products2:Warranty`, node)
})
