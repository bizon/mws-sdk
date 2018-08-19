const select = require('../select')
const nullable = require('../nullable')

const {parseStr, parseBool, parseNumber} = require('../base')

const parseDimensions = require('./dimensions')
const parseImage = require('./image')

module.exports = (key, node) => ({
  binding: parseStr(`${key}/ns2:ItemAttributes/ns2:Binding`, node),
  brand: parseStr(`${key}/ns2:ItemAttributes/ns2:Brand`, node),
  color: parseStr(`${key}/ns2:ItemAttributes/ns2:Color`, node),
  isAutographed: parseBool(`${key}/ns2:ItemAttributes/ns2:IsAutographed`, node),
  itemDimensions: nullable(parseDimensions, `${key}/ns2:ItemAttributes/ns2:ItemDimensions`, node),
  label: parseStr(`${key}/ns2:ItemAttributes/ns2:Label`, node),
  manufacturer: parseStr(`${key}/ns2:ItemAttributes/ns2:Manufacturer`, node),
  materialType: select(`${key}/ns2:ItemAttributes/ns2:MaterialType`, node).map(n => {
    return parseStr('.', n)
  }),
  model: parseStr(`${key}/ns2:ItemAttributes/ns2:Model`, node),
  numberOfItems: parseNumber(`${key}/ns2:ItemAttributes/ns2:NumberOfItems`, node),
  packageDimensions: nullable(parseDimensions, `${key}/ns2:ItemAttributes/ns2:PackageDimensions`, node),
  packageQuantity: parseNumber(`${key}/ns2:ItemAttributes/ns2:PackageQuantity`, node),
  partNumber: parseStr(`${key}/ns2:ItemAttributes/ns2:partNumber`, node),
  productGroup: parseStr(`${key}/ns2:ItemAttributes/ns2:ProductGroup`, node),
  productTypeName: parseStr(`${key}/ns2:ItemAttributes/ns2:ProductTypeName`, node),
  publisher: parseStr(`${key}/ns2:ItemAttributes/ns2:Publisher`, node),
  size: parseStr(`${key}/ns2:ItemAttributes/ns2:Size`, node),
  smallImage: parseImage(`${key}/ns2:ItemAttributes/ns2:SmallImage`, node),
  studio: parseStr(`${key}/ns2:ItemAttributes/ns2:Studio`, node),
  title: parseStr(`${key}/ns2:ItemAttributes/ns2:Title`, node),
  warranty: parseStr(`${key}/ns2:ItemAttributes/ns2:Warranty`, node)
})
