const _ = require('lodash')
const debug = require('debug')('bizon:mws-sdk:marketplaces')
const {
  getMarketplaceByCode,
  getMarketplaceByDomain,
  getMarketplaceById,
  getMarketplacesByMwsRegion
} = require('@bizon/amazon-ids')

function getMarketplacesFromRegion(region) {
  const marketplaces = getMarketplacesByMwsRegion(region)

  if (marketplaces.length === 0) {
    throw new TypeError(`${region} is not a valid MWS region`)
  }

  return marketplaces
}

function getMarketplaces(source) {
  const marketplaces = _(source)
    .map(s => {
      const marketplace = getMarketplaceById(s) || getMarketplaceByCode(s) || getMarketplaceByDomain(s)

      if (!marketplace) {
        debug(`'${s}' is not a valid marketplace code, ID or domain`)
      }

      return marketplace
    })
    .filter(m => m && m.mwsDomain)
    .uniqBy(m => m.id)
    .value()

  const mwsDomains = _(marketplaces)
    .map(m => m.mwsDomain)
    .uniq()
    .value()

  if (mwsDomains.length === 0) {
    throw new TypeError('None of the specified marketplaces define a MWS domain')
  }

  if (mwsDomains.length > 1) {
    throw new TypeError(`The specified marketplaces should all be on the same MWS domain, found ${mwsDomains}`)
  }

  return marketplaces
}

module.exports = {
  getMarketplaces,
  getMarketplacesFromRegion
}
