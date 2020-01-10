const {parseStr} = require('../base')

module.exports = (key, node) => ({
  name: parseStr(`${key}/fulfillmentInboundShipment:Name`, node),
  addressLine1: parseStr(`${key}/fulfillmentInboundShipment:AddressLine1`, node),
  addressLine2: parseStr(`${key}/fulfillmentInboundShipment:AddressLine2`, node),
  city: parseStr(`${key}/fulfillmentInboundShipment:City`, node),
  districtOrCounty: parseStr(`${key}/fulfillmentInboundShipment:DistrictOrCounty`, node),
  stateOrProvinceCode: parseStr(`${key}/fulfillmentInboundShipment:StateOrProvinceCode`, node),
  countryCode: parseStr(`${key}/fulfillmentInboundShipment:CountryCode`, node),
  postalCode: parseStr(`${key}/fulfillmentInboundShipment:PostalCode`, node)
})
