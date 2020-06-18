const _ = require('lodash')
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
        throw new TypeError(`${s} is not a valid marketplace code, ID or domain`)
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
