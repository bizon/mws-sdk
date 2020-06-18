const {
  getMarketplaces,
  getMarketplacesFromRegion
} = require('../../../lib/client/marketplaces')

describe('lib.client.marketplaces', () => {
  describe('getMarketplacesFromRegion', () => {
    it('should throw if the provided region is unknown', () => {
      expect(
        () => getMarketplacesFromRegion('what')
      ).toThrow('what is not a valid MWS region')
    })

    it('should return a list of marketplaces for MWS regions', () => {
      const tests = ['eu', 'na', 'fe', 'ca', 'in', 'jp']

      for (const mwsRegion of tests) {
        const marketplaces = getMarketplacesFromRegion(mwsRegion)

        expect(marketplaces).toMatchSnapshot()
      }
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
      ).toThrow('what is not a valid marketplace code, ID or domain')
    })

    it('should deduplicate marketplaces', () => {
      expect(getMarketplaces([
        'fr',
        'amazon.fr',
        'A13V1IB3VIYZZH' // France
      ])).toHaveLength(1)
    })

    it('should ignore marketplaces without an API endpoint', () => {
      expect(getMarketplaces([
        'A13V1IB3VIYZZH',
        'A1805IZSGTT6HS',
        'A1F83G8C2ARO7P',
        'A1PA6795UKMFR9',
        'A1RKKUPIHCS9HS',
        'A1ZFFQZ3HTUKT9',
        'A38D8NSA03LJTC',
        'A62U237T8HV6N',
        'AFQLKURYRPEL8',
        'APJ6JRA9NG5V4',
        'AZMDEXL2RVFNN'
      ])).toMatchSnapshot()
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
