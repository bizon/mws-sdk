const {getMarketplaceByCode, getMarketplaceById, getMarketplacesByMwsDomain} = require('@bizon/amazon-ids')
const _ = require('lodash')

const mwsRegionDomains = {
  eu: 'mws-eu.amazonservices.com',
  na: 'mws.amazonservices.com',
  fe: 'mws-fe.amazonservices.com',

  // Country specific domains:
  ca: 'mws.amazonservices.ca',
  mx: 'mws.amazonservices.com.mx',
  ae: 'mws.amazonservices.ae',
  in: 'mws.amazonservices.in',
  jp: 'mws.amazonservices.jp',
  au: 'mws.amazonservices.com.au'
}

function getMarketplacesFromRegion(region) {
  const mwsDomain = mwsRegionDomains[region]

  if (!mwsDomain) {
    throw new TypeError(`${region} is not a valid MWS region, use one of ${Object.keys(mwsRegionDomains)}`)
  }

  return getMarketplacesByMwsDomain(mwsDomain)
}

function getMarketplaces(source) {
  const marketplaces = _(source)
    .map(s => {
      const marketplace = getMarketplaceById(s) || getMarketplaceByCode(s)

      if (!marketplace) {
        throw new TypeError(`${s} is not a valid marketplace code or ID`)
      }

      return marketplace
    })
    .filter(m => m.mwsDomain)
    .uniqBy(m => m.id)
    .value()

  const mwsDomains = _(marketplaces)
    .map(m => m.mwsDomain)
    .uniq()
    .value()

  if (mwsDomains.length !== 1) {
    throw new TypeError(`The specified marketplaces should all be on the same MWS domain, found ${mwsDomains}`)
  }

  return marketplaces
}

module.exports = {
  getMarketplaces,
  getMarketplacesFromRegion
}
