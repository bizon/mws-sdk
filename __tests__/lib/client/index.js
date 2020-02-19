const MWSClient = require('../../../lib/client')

describe('lib.client.index', () => {
  it('should fail if accessKeyId, secretAccessKey, sellerId or mwsToken is not specified', () => {
    const tests = [
      () => new MWSClient(),
      () => new MWSClient({
        accessKeyId: 'foo'
      }),
      () => new MWSClient({
        accessKeyId: 'foo',
        secretAccessKey: 'bar'
      }),
      () => new MWSClient({
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
        sellerId: 'baz'
      })
    ]

    for (const test of tests) {
      expect(test).toThrow('accessKeyId, secretAccessKey, sellerId and mwsToken are required')
    }
  })

  it('should fail if one of marketplaces or mwsRegion is not defined ', () => {
    expect(
      () => new MWSClient({
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
        sellerId: 'baz',
        mwsToken: 'token'
      })
    ).toThrow('Specify one of mwsRegion or marketplaces')
  })

  it('should fail if the region is unknown', () => {
    expect(
      () => new MWSClient({
        accessKeyId: 'foo',
        secretAccessKey: 'bar',
        sellerId: 'baz',
        mwsToken: 'token',
        mwsRegion: 'unknown'
      })
    ).toThrow('unknown is not a valid MWS region, use one of eu,na,fe,ca,mx,ae,in,jp,au')
  })

  it('should grab accessKeyId and secretAccessKey from the environment', () => {
    process.env.MWS_ACCESS_KEY_ID = 'foo'
    process.env.MWS_SECRET_ACCESS_KEY = 'bar'

    const client = new MWSClient({
      sellerId: 'baz',
      mwsToken: 'token',
      mwsRegion: 'eu'
    })

    expect(client.settings.accessKeyId).toBe(process.env.MWS_ACCESS_KEY_ID)
    expect(client.settings.secretAccessKey).toBe(process.env.MWS_SECRET_ACCESS_KEY)

    delete process.env.MWS_ACCESS_KEY_ID
    delete process.env.MWS_SECRET_ACCESS_KEY
  })
})
