const {parseString} = require('../base')

module.exports = (key, node) => ({
  name: parseString(`${key}/orders:Name`, node),
  adressLine1: parseString(`${key}/orders:AddressLine1`, node),
  adressLine2: parseString(`${key}/orders:AddressLine2`, node),
  adressLine3: parseString(`${key}/orders:AddressLine3`, node),
  city: parseString(`${key}/orders:City`, node),
  county: parseString(`${key}/orders:County`, node),
  district: parseString(`${key}/orders:District`, node),
  stateOrRegion: parseString(`${key}/orders:StateOrRegion`, node),
  postalCode: parseString(`${key}/orders:PostalCode`, node),
  countryCode: parseString(`${key}/orders:CountryCode`, node),
  phone: parseString(`${key}/orders:Phone`, node),
  addressType: parseString(`${key}/orders:AddressType`, node),
})
