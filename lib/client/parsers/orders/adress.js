const {parseStr} = require('../base')

module.exports = (key, node) => ({
  name: parseStr(`${key}/orders:Name`, node),
  adressLine1: parseStr(`${key}/orders:AddressLine1`, node),
  adressLine2: parseStr(`${key}/orders:AddressLine2`, node),
  adressLine3: parseStr(`${key}/orders:AddressLine3`, node),
  city: parseStr(`${key}/orders:City`, node),
  county: parseStr(`${key}/orders:County`, node),
  district: parseStr(`${key}/orders:District`, node),
  stateOrRegion: parseStr(`${key}/orders:StateOrRegion`, node),
  postalCode: parseStr(`${key}/orders:PostalCode`, node),
  countryCode: parseStr(`${key}/orders:CountryCode`, node),
  phone: parseStr(`${key}/orders:Phone`, node),
  addressType: parseStr(`${key}/orders:AddressType`, node)
})
