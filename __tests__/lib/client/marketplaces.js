const {getMarketplaces, getMarketplacesFromRegion} = require('../../../lib/client/marketplaces')

describe('lib.client.marketplaces', () => {
  describe('getMarketplacesFromRegion', () => {
    it('should throw if the provided region is unknown', () => {
      expect(
        () => getMarketplacesFromRegion('what')
      ).toThrow('what is not a valid MWS region, use one of eu,na,fe,ca,mx,ae,in,jp,au')
    })

    it('should return a list of eu marketplaces', () => {
      expect(
        getMarketplacesFromRegion('eu')
      ).toMatchSnapshot()
    })
  })

  describe('getMarketplaces', () => {
    it('should throw if one of the requested marketplaces does not exist', () => {
      expect(
        () => getMarketplaces([
          'fr',
          'what',
          'A1PA6795UKMFR9'
        ])
      ).toThrow('what is not a valid marketplace code or ID')
    })

    it('should deduplicate marketplaces', () => {
      expect(getMarketplaces([
        'fr',
        'A13V1IB3VIYZZH' // France
      ])).toHaveLength(1)
    })

    it('should throw if the specified marketplaces are on multiple mws domains', () => {
      expect(
        () => getMarketplaces([
          'fr',
          'ae'
        ])
      ).toThrow('The specified marketplaces should all be on the same MWS domain, found mws-eu.amazonservices.com,mws.amazonservices.ae')
    })
  })
})
