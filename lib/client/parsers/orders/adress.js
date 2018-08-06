const {parseStr} = require('../base')

module.exports = (key, node) => ({
  name: parseStr(`${key}/Name`, node),
  adressLine1: parseStr(`${key}/AddressLine1`, node),
  adressLine2: parseStr(`${key}/AddressLine2`, node),
  adressLine3: parseStr(`${key}/AddressLine3`, node),
  city: parseStr(`${key}/City`, node),
  county: parseStr(`${key}/County`, node),
  district: parseStr(`${key}/District`, node),
  stateOrRegion: parseStr(`${key}/StateOrRegion`, node),
  postalCode: parseStr(`${key}/PostalCode`, node),
  countryCode: parseStr(`${key}/CountryCode`, node),
  phone: parseStr(`${key}/Phone`, node),
  addressType: parseStr(`${key}/AddressType`, node)
})
