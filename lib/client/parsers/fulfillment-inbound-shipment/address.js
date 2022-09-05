const {parseString} = require('../base')

module.exports = (key, node) => ({
  name: parseString(`${key}/fulfillmentInboundShipment:Name`, node),
  addressLine1: parseString(`${key}/fulfillmentInboundShipment:AddressLine1`, node),
  addressLine2: parseString(`${key}/fulfillmentInboundShipment:AddressLine2`, node),
  city: parseString(`${key}/fulfillmentInboundShipment:City`, node),
  districtOrCounty: parseString(`${key}/fulfillmentInboundShipment:DistrictOrCounty`, node),
  stateOrProvinceCode: parseString(`${key}/fulfillmentInboundShipment:StateOrProvinceCode`, node),
  countryCode: parseString(`${key}/fulfillmentInboundShipment:CountryCode`, node),
  postalCode: parseString(`${key}/fulfillmentInboundShipment:PostalCode`, node),
})
