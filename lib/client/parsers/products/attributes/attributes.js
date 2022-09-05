const {parseString, parseBool, parseNumber, parseDate} = require('../../base')
const nullable = require('../../nullable')
const pick = require('../../pick')
const select = require('../../select')

const parseCreator = require('./creator')
const parseDecimalWithUnit = require('./decimal-with-unit')
const parseDimensions = require('./dimensions')
const parseImage = require('./image')
const parseIntegerWithUnit = require('./integer-with-unit')
const parseLanguage = require('./language')
const parsePrice = require('./price')

module.exports = (key, node) =>
  pick(
    {
      actors: select(`${key}/products2:Actor`, node).map((n) => parseString('.', n)),
      artists: select(`${key}/products2:Artist`, node).map((n) => parseString('.', n)),
      aspectRatio: parseString(`${key}/products2:AspectRatio`, node),
      audienceRating: parseString(`${key}/products2:AudienceRating`, node),
      authors: select(`${key}/products2:Author`, node).map((n) => parseString('.', n)),
      backFinding: parseString(`${key}/products2:BackFinding`, node),
      bandMaterialType: parseString(`${key}/products2:BandMaterialType`, node),
      binding: parseString(`${key}/products2:Binding`, node),
      blurayRegion: parseString(`${key}/products2:BlurayRegion`, node),
      brand: parseString(`${key}/products2:Brand`, node),
      ceroAgeRating: parseString(`${key}/products2:CEROAgeRating`, node),
      chainType: parseString(`${key}/products2:ChainType`, node),
      claspType: parseString(`${key}/products2:ClaspType`, node),
      color: parseString(`${key}/products2:Color`, node),
      cpuManufacturer: parseString(`${key}/products2:CPUManufacturer`, node),
      cpuSpeed: parseString(`${key}/products2:CPUSpeed`, node),
      cpuType: parseDecimalWithUnit(`${key}/products2:CPUType`, node),
      creators: select(`${key}/products2:Creator`, node).map((n) => parseCreator('.', n)),
      department: parseString(`${key}/products2:Department`, node),
      directors: select(`${key}/products2:Director`, node).map((n) => parseString('.', n)),
      displaySize: parseDecimalWithUnit(`${key}/products2:DisplaySize`, node),
      edition: parseString(`${key}/products2:Edition`, node),
      episodeSequence: parseString(`${key}/products2:EpisodeSequence`, node),
      esrbAgeRating: parseString(`${key}/products2:ESRBAgeRating`, node),
      features: select(`${key}/products2:Feature`, node).map((n) => parseString('.', n)),
      flavor: parseString(`${key}/products2:Flavor`, node),
      formats: select(`${key}/products2:Format`, node).map((n) => parseString('.', n)),
      gemTypes: select(`${key}/products2:GemType`, node).map((n) => parseString('.', n)),
      genre: parseString(`${key}/products2:Genre`, node),
      golfClubFlex: parseString(`${key}/products2:GolfClubFlex`, node),
      golfClubLoft: parseDecimalWithUnit(`${key}/products2:GolfClubLoft`, node),
      handOrientation: parseString(`${key}/products2:HandOrientation`, node),
      hardDiskInterface: parseString(`${key}/products2:HardDiskInterface`, node),
      hardDiskSize: parseDecimalWithUnit(`${key}/products2:HardDiskSize`, node),
      hardwarePlatform: parseString(`${key}/products2:HardwarePlatform`, node),
      hazardousMaterialType: parseString(`${key}/products2:HazardousMaterialType`, node),
      itemDimensions: nullable(parseDimensions, `${key}/products2:ItemDimensions`, node),
      isAdultProduct: parseBool(`${key}/products2:IsAdultProduct`, node),
      isAutographed: parseBool(`${key}/products2:IsAutographed`, node),
      isEligibleForTradeIn: parseBool(`${key}/products2:IsEligibleForTradeIn`, node),
      isMemorabilia: parseBool(`${key}/products2:IsMemorabilia`, node),
      issuesPerYear: parseString(`${key}/products2:IssuesPerYear`, node),
      itemPartNumber: parseString(`${key}/products2:ItemPartNumber`, node),
      label: parseString(`${key}/products2:Label`, node),
      languages: select(`${key}/products2:Languages/products2:Language`, node).map((n) =>
        parseLanguage('.', n),
      ),
      legalDisclaimer: parseString(`${key}/products2:LegalDisclaimer`, node),
      listPrice: nullable(parsePrice, `${key}/products2:ListPrice`, node),
      manufacturer: parseString(`${key}/products2:Manufacturer`, node),
      manufacturerMaximumAge: parseDecimalWithUnit(`${key}/products2:ManufacturerMaximumAge`, node),
      manufacturerMinimumAge: parseDecimalWithUnit(`${key}/products2:ManufacturerMinimumAge`, node),
      manufacturerPartsWarrantyDescription: parseString(
        `${key}/products2:ManufacturerPartsWarrantyDescription`,
        node,
      ),
      materialTypes: select(`${key}/products2:MaterialType`, node).map((n) => parseString('.', n)),
      maximumResolution: parseDecimalWithUnit(`${key}/products2:MaximumResolution`, node),
      mediaTypes: select(`${key}/products2:MediaType`, node).map((n) => parseString('.', n)),
      metalStamp: parseString(`${key}/products2:MetalStamp`, node),
      metalType: parseString(`${key}/products2:MetalType`, node),
      model: parseString(`${key}/products2:Model`, node),
      numberOfDiscs: parseNumber(`${key}/products2:NumberOfDiscs`, node),
      numberOfIssues: parseNumber(`${key}/products2:NumberOfIssues`, node),
      numberOfItems: parseNumber(`${key}/products2:NumberOfItems`, node),
      numberOfPages: parseNumber(`${key}/products2:NumberOfPages`, node),
      numberOfTracks: parseNumber(`${key}/products2:NumberOfTracks`, node),
      operatingSystems: select(`${key}/products2:OperatingSystem`, node).map((n) =>
        parseString('.', n),
      ),
      opticalZoom: parseDecimalWithUnit(`${key}/products2:OpticalZoom`, node),
      packageDimensions: nullable(parseDimensions, `${key}/products2:PackageDimensions`, node),
      packageQuantity: parseNumber(`${key}/products2:PackageQuantity`, node),
      partNumber: parseString(`${key}/products2:PartNumber`, node),
      pegiRating: parseString(`${key}/products2:PegiRating`, node),
      platforms: select(`${key}/products2:Platform`, node).map((n) => parseString('.', n)),
      processorCount: parseNumber(`${key}/products2:ProcessorCount`, node),
      productGroup: parseString(`${key}/products2:ProductGroup`, node),
      productTypeName: parseString(`${key}/products2:ProductTypeName`, node),
      productTypeSubcategory: parseString(`${key}/products2:ProductTypeSubcategory`, node),
      publicationDate: parseDate(`${key}/products2:PublicationDate`, node),
      publisher: parseString(`${key}/products2:Publisher`, node),
      regionCode: parseString(`${key}/products2:RegionCode`, node),
      releaseDate: parseDate(`${key}/products2:ReleaseDate`, node),
      ringSize: parseString(`${key}/products2:RingSize`, node),
      runningTime: parseDecimalWithUnit(`${key}/products2:RunningTime`, node),
      shaftMaterial: parseString(`${key}/products2:ShaftMaterial`, node),
      scent: parseString(`${key}/products2:Scent`, node),
      seasonSequence: parseString(`${key}/products2:SeasonSequence`, node),
      seikodoProductCode: parseString(`${key}/products2:SeikodoProductCode`, node),
      size: parseString(`${key}/products2:Size`, node),
      sizePerPearl: parseString(`${key}/products2:SizePerPearl`, node),
      smallImage: nullable(parseImage, `${key}/products2:SmallImage`, node),
      studio: parseString(`${key}/products2:Studio`, node),
      subscriptionLength: parseIntegerWithUnit(`${key}/SubscriptionLength`, node),
      systemMemorySize: parseDecimalWithUnit(`${key}/products2:SystemMemorySize`, node),
      systemMemoryType: parseString(`${key}/products2:SystemMemoryType`, node),
      theatricalReleaseDate: parseDate(`${key}/products2:TheatricalReleaseDate`, node),
      title: parseString(`${key}/products2:Title`, node),
      totalDiamondWeight: parseDecimalWithUnit(`${key}/products2:TotalDiamondWeight`, node),
      totalGemWeight: parseDecimalWithUnit(`${key}/products2:TotalGemWeight`, node),
      warranty: parseString(`${key}/products2:Warranty`, node),
      weeeTaxValue: nullable(parsePrice, `${key}/products2:WEEETaxValue`, node),
    },
    (value) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }

      return value !== null
    },
  )
