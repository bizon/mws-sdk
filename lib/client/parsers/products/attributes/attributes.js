const select = require('../../select')
const nullable = require('../../nullable')
const pick = require('../../pick')

const {parseStr, parseBool, parseNumber, parseDate} = require('../../base')

const parseDecimalWithUnit = require('./decimal-with-unit')
const parseIntegerWithUnit = require('./integer-with-unit')
const parseCreator = require('./creator')
const parseDimensions = require('./dimensions')
const parseImage = require('./image')
const parseLanguage = require('./language')
const parsePrice = require('./price')

module.exports = (key, node) => pick({
  actors: select(`${key}/products2:Actor`, node).map(n => {
    return parseStr('.', n)
  }),
  artists: select(`${key}/products2:Artist`, node).map(n => {
    return parseStr('.', n)
  }),
  aspectRatio: parseStr(`${key}/products2:AspectRatio`, node),
  audienceRating: parseStr(`${key}/products2:AudienceRating`, node),
  authors: select(`${key}/products2:Author`, node).map(n => {
    return parseStr('.', n)
  }),
  backFinding: parseStr(`${key}/products2:BackFinding`, node),
  bandMaterialType: parseStr(`${key}/products2:BandMaterialType`, node),
  binding: parseStr(`${key}/products2:Binding`, node),
  blurayRegion: parseStr(`${key}/products2:BlurayRegion`, node),
  brand: parseStr(`${key}/products2:Brand`, node),
  ceroAgeRating: parseStr(`${key}/products2:CEROAgeRating`, node),
  chainType: parseStr(`${key}/products2:ChainType`, node),
  claspType: parseStr(`${key}/products2:ClaspType`, node),
  color: parseStr(`${key}/products2:Color`, node),
  cpuManufacturer: parseStr(`${key}/products2:CPUManufacturer`, node),
  cpuSpeed: parseStr(`${key}/products2:CPUSpeed`, node),
  cpuType: parseDecimalWithUnit(`${key}/products2:CPUType`, node),
  creators: select(`${key}/products2:Creator`, node).map(n => {
    return parseCreator('.', n)
  }),
  department: parseStr(`${key}/products2:Department`, node),
  directors: select(`${key}/products2:Director`, node).map(n => {
    return parseStr('.', n)
  }),
  displaySize: parseDecimalWithUnit(`${key}/products2:DisplaySize`, node),
  edition: parseStr(`${key}/products2:Edition`, node),
  episodeSequence: parseStr(`${key}/products2:EpisodeSequence`, node),
  esrbAgeRating: parseStr(`${key}/products2:ESRBAgeRating`, node),
  features: select(`${key}/products2:Feature`, node).map(n => {
    return parseStr('.', n)
  }),
  flavor: parseStr(`${key}/products2:Flavor`, node),
  formats: select(`${key}/products2:Format`, node).map(n => {
    return parseStr('.', n)
  }),
  gemTypes: select(`${key}/products2:GemType`, node).map(n => {
    return parseStr('.', n)
  }),
  genre: parseStr(`${key}/products2:Genre`, node),
  golfClubFlex: parseStr(`${key}/products2:GolfClubFlex`, node),
  golfClubLoft: parseDecimalWithUnit(`${key}/products2:GolfClubLoft`, node),
  handOrientation: parseStr(`${key}/products2:HandOrientation`, node),
  hardDiskInterface: parseStr(`${key}/products2:HardDiskInterface`, node),
  hardDiskSize: parseDecimalWithUnit(`${key}/products2:HardDiskSize`, node),
  hardwarePlatform: parseStr(`${key}/products2:HardwarePlatform`, node),
  hazardousMaterialType: parseStr(`${key}/products2:HazardousMaterialType`, node),
  itemDimensions: nullable(parseDimensions, `${key}/products2:ItemDimensions`, node),
  isAdultProduct: parseBool(`${key}/products2:IsAdultProduct`, node),
  isAutographed: parseBool(`${key}/products2:IsAutographed`, node),
  isEligibleForTradeIn: parseBool(`${key}/products2:IsEligibleForTradeIn`, node),
  isMemorabilia: parseBool(`${key}/products2:IsMemorabilia`, node),
  issuesPerYear: parseStr(`${key}/products2:IssuesPerYear`, node),
  itemPartNumber: parseStr(`${key}/products2:ItemPartNumber`, node),
  label: parseStr(`${key}/products2:Label`, node),
  languages: select(`${key}/products2:Languages/products2:Language`, node).map(n => {
    return parseLanguage('.', n)
  }),
  legalDisclaimer: parseStr(`${key}/products2:LegalDisclaimer`, node),
  listPrice: nullable(parsePrice, `${key}/products2:ListPrice`, node),
  manufacturer: parseStr(`${key}/products2:Manufacturer`, node),
  manufacturerMaximumAge: parseDecimalWithUnit(`${key}/products2:ManufacturerMaximumAge`, node),
  manufacturerMinimumAge: parseDecimalWithUnit(`${key}/products2:ManufacturerMinimumAge`, node),
  manufacturerPartsWarrantyDescription: parseStr(`${key}/products2:ManufacturerPartsWarrantyDescription`, node),
  materialTypes: select(`${key}/products2:MaterialType`, node).map(n => {
    return parseStr('.', n)
  }),
  maximumResolution: parseDecimalWithUnit(`${key}/products2:MaximumResolution`, node),
  mediaTypes: select(`${key}/products2:MediaType`, node).map(n => {
    return parseStr('.', n)
  }),
  metalStamp: parseStr(`${key}/products2:MetalStamp`, node),
  metalType: parseStr(`${key}/products2:MetalType`, node),
  model: parseStr(`${key}/products2:Model`, node),
  numberOfDiscs: parseNumber(`${key}/products2:NumberOfDiscs`, node),
  numberOfIssues: parseNumber(`${key}/products2:NumberOfIssues`, node),
  numberOfItems: parseNumber(`${key}/products2:NumberOfItems`, node),
  numberOfPages: parseNumber(`${key}/products2:NumberOfPages`, node),
  numberOfTracks: parseNumber(`${key}/products2:NumberOfTracks`, node),
  operatingSystems: select(`${key}/products2:OperatingSystem`, node).map(n => {
    return parseStr('.', n)
  }),
  opticalZoom: parseDecimalWithUnit(`${key}/products2:OpticalZoom`, node),
  packageDimensions: nullable(parseDimensions, `${key}/products2:PackageDimensions`, node),
  packageQuantity: parseNumber(`${key}/products2:PackageQuantity`, node),
  partNumber: parseStr(`${key}/products2:PartNumber`, node),
  pegiRating: parseStr(`${key}/products2:PegiRating`, node),
  platforms: select(`${key}/products2:Platform`, node).map(n => {
    return parseStr('.', n)
  }),
  processorCount: parseNumber(`${key}/products2:ProcessorCount`, node),
  productGroup: parseStr(`${key}/products2:ProductGroup`, node),
  productTypeName: parseStr(`${key}/products2:ProductTypeName`, node),
  productTypeSubcategory: parseStr(`${key}/products2:ProductTypeSubcategory`, node),
  publicationDate: parseDate(`${key}/products2:PublicationDate`, node),
  publisher: parseStr(`${key}/products2:Publisher`, node),
  regionCode: parseStr(`${key}/products2:RegionCode`, node),
  releaseDate: parseDate(`${key}/products2:ReleaseDate`, node),
  ringSize: parseStr(`${key}/products2:RingSize`, node),
  runningTime: parseDecimalWithUnit(`${key}/products2:RunningTime`, node),
  shaftMaterial: parseStr(`${key}/products2:ShaftMaterial`, node),
  scent: parseStr(`${key}/products2:Scent`, node),
  seasonSequence: parseStr(`${key}/products2:SeasonSequence`, node),
  seikodoProductCode: parseStr(`${key}/products2:SeikodoProductCode`, node),
  size: parseStr(`${key}/products2:Size`, node),
  sizePerPearl: parseStr(`${key}/products2:SizePerPearl`, node),
  smallImage: nullable(parseImage, `${key}/products2:SmallImage`, node),
  studio: parseStr(`${key}/products2:Studio`, node),
  subscriptionLength: parseIntegerWithUnit(`${key}/SubscriptionLength`, node),
  systemMemorySize: parseDecimalWithUnit(`${key}/products2:SystemMemorySize`, node),
  systemMemoryType: parseStr(`${key}/products2:SystemMemoryType`, node),
  theatricalReleaseDate: parseDate(`${key}/products2:TheatricalReleaseDate`, node),
  title: parseStr(`${key}/products2:Title`, node),
  totalDiamondWeight: parseDecimalWithUnit(`${key}/products2:TotalDiamondWeight`, node),
  totalGemWeight: parseDecimalWithUnit(`${key}/products2:TotalGemWeight`, node),
  warranty: parseStr(`${key}/products2:Warranty`, node),
  weeeTaxValue: nullable(parsePrice, `${key}/products2:WEEETaxValue`, node)
}, value => {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  return value !== null
})
