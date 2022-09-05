const {parseString, parseNumber} = require('../../base')
const nullable = require('../../nullable')
const pick = require('../../pick')

const parseDecimalWithUnit = require('./decimal-with-unit')
const parseDimensions = require('./dimensions')
const parseIdentifiers = require('./identifiers')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/products:Identifiers`, node),

  ...pick(
    {
      color: parseString(`${key}/products2:Color`, node),
      edition: parseString(`${key}/products2:Edition`, node),
      flavor: parseString(`${key}/products2:Flavor`, node),
      gemType: parseString(`${key}/products2:GemType`, node),
      golfClubFlex: parseString(`${key}/products2:GolfClubFlex`, node),
      golfClubLoft: parseDecimalWithUnit(`${key}/products2:GolfClubLoft`, node),
      handOrientation: parseString(`${key}/products2:HandOrientation`, node),
      hardwarePlatform: parseString(`${key}/products2:HardwarePlatform`, node),
      itemDimensions: nullable(parseDimensions, `${key}/products2:ItemDimensions`, node),
      materialType: parseString(`${key}/products2:MaterialType`, node),
      metalType: parseString(`${key}/products2:MetalType`, node),
      model: parseString(`${key}/products2:Model`, node),
      operatingSystem: parseString(`${key}/products2:OperatingSystem`, node),
      packageQuantity: parseNumber(`${key}/products2:PackageQuantity`, node),
      productTypeSubcategory: parseString(`${key}/products2:ProductTypeSubcategory`, node),
      ringSize: parseString(`${key}/products2:RingSize`, node),
      shaftMaterial: parseString(`${key}/products2:ShaftMaterial`, node),
      scent: parseString(`${key}/products2:Scent`, node),
      size: parseString(`${key}/products2:Size`, node),
      sizePerPearl: parseString(`${key}/products2:SizePerPearl`, node),
      totalDiamondWeight: parseDecimalWithUnit(`${key}/products2:TotalDiamondWeight`, node),
      totalGemWeight: parseDecimalWithUnit(`${key}/products2:TotalGemWeight`, node),
    },
    (variation) => variation !== null,
  ),
})
