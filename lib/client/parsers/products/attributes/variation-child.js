const nullable = require('../../nullable')
const pick = require('../../pick')

const {parseStr, parseNumber} = require('../../base')

const parseDecimalWithUnit = require('./decimal-with-unit')
const parseDimensions = require('./dimensions')
const parseIdentifiers = require('./identifiers')

module.exports = (key, node) => ({
  identifiers: parseIdentifiers(`${key}/products:Identifiers`, node),

  ...pick({
    color: parseStr(`${key}/products2:Color`, node),
    edition: parseStr(`${key}/products2:Edition`, node),
    flavor: parseStr(`${key}/products2:Flavor`, node),
    gemType: parseStr(`${key}/products2:GemType`, node),
    golfClubFlex: parseStr(`${key}/products2:GolfClubFlex`, node),
    golfClubLoft: parseDecimalWithUnit(`${key}/products2:GolfClubLoft`, node),
    handOrientation: parseStr(`${key}/products2:HandOrientation`, node),
    hardwarePlatform: parseStr(`${key}/products2:HardwarePlatform`, node),
    itemDimensions: nullable(parseDimensions, `${key}/products2:ItemDimensions`, node),
    materialType: parseStr(`${key}/products2:MaterialType`, node),
    metalType: parseStr(`${key}/products2:MetalType`, node),
    model: parseStr(`${key}/products2:Model`, node),
    operatingSystem: parseStr(`${key}/products2:OperatingSystem`, node),
    packageQuantity: parseNumber(`${key}/products2:PackageQuantity`, node),
    productTypeSubcategory: parseStr(`${key}/products2:ProductTypeSubcategory`, node),
    ringSize: parseStr(`${key}/products2:RingSize`, node),
    shaftMaterial: parseStr(`${key}/products2:ShaftMaterial`, node),
    scent: parseStr(`${key}/products2:Scent`, node),
    size: parseStr(`${key}/products2:Size`, node),
    sizePerPearl: parseStr(`${key}/products2:SizePerPearl`, node),
    totalDiamondWeight: parseDecimalWithUnit(`${key}/products2:TotalDiamondWeight`, node),
    totalGemWeight: parseDecimalWithUnit(`${key}/products2:TotalGemWeight`, node)
  }, variation => variation !== null)
})
