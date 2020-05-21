const nock = require('nock')
const MockDate = require('mockdate')

const MWSClient = require('../../../lib/client')

describe('lib.client.index', () => {
  beforeAll(() => {
    MockDate.set('2020-04-03')
  })

  afterAll(() => {
    MockDate.reset()
  })

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
    ).toThrow('unknown is not a valid MWS region')
  })

  it('should fail when passing invalid marketplaces', () => {
    const tests = [
      [[], 'Specify one of mwsRegion or marketplaces'],
      [['332'], '332 is not a valid marketplace code, ID or domain'],
      [['fr', 'unknown'], 'unknown is not a valid marketplace code, ID or domain']
    ]

    for (const [marketplaces, error] of tests) {
      expect(
        () => new MWSClient({
          accessKeyId: 'foo',
          secretAccessKey: 'bar',
          sellerId: 'baz',
          mwsToken: 'token',
          marketplaces
        })
      ).toThrow(error)
    }
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

  it('should not enumerate secret properties', () => {
    const client = new MWSClient({
      accessKeyId: 'not enumerable',
      secretAccessKey: 'not enumerable',
      sellerId: 'seller identifier',
      mwsToken: 'not enumerable',
      mwsRegion: 'eu'
    })

    expect(Object.keys(client.settings)).toMatchSnapshot()
  })

  it('should export the MWSError constructor', () => {
    expect(MWSClient.MWSError).toBe(require('../../../lib/client/error'))
  })

  it('should throw default a MWSError when encountering an unhandled HTTPError on GET', async () => {
    const client = new MWSClient({
      accessKeyId: 'foo',
      secretAccessKey: 'bar',
      sellerId: 'baz',
      mwsToken: 'token',
      mwsRegion: 'eu'
    })

    const {pathname, data} = client.signData('GET', 'CustomResource', '1988-10-13', {
      Action: 'CustomGetAction'
    })

    nock(`https://${client.settings.mwsDomain}`)
      .get(pathname)
      .query(data)
      .reply(
        503,
        `<?xml version="1.0"?>
        <ErrorResponse xmlns="http://mws.amazonservices.com/schema/CustomResource/1988-10-13">
          <Error ThisAttribute="WillBeIgnored">
            <Code>QuotaExceeded</Code>
            <Type></Type>
            <Message>You exceeded your quota of 200.0 requests per 1 hour for operation CustomResource/1988-10-13/CustomAction.  Your quota will reset on Thu Apr 04 18:46:00 UTC 2020</Message>
          </Error>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </ErrorResponse>`
      )

    expect.assertions(3)

    try {
      await client.get('CustomResource', '1988-10-13', {
        Action: 'CustomGetAction'
      }, {
        retry: 0 // Disable retries so got doesn’t eat our expected 503
      })
    } catch (error) {
      expect(error).toBeInstanceOf(MWSClient.MWSError)
      expect(error.message).toBe('CustomResource.CustomGetAction error: Response code 503 (Service Unavailable)')
      expect(error.body).toMatchSnapshot()
    }
  })

  it('should throw default a MWSError when encountering an unhandled HTTPError on POST', async () => {
    const client = new MWSClient({
      accessKeyId: 'foo',
      secretAccessKey: 'bar',
      sellerId: 'baz',
      mwsToken: 'token',
      mwsRegion: 'eu'
    })

    const {pathname, data} = client.signData('POST', 'CustomResource', '1988-10-13', {
      Action: 'CustomPostAction',
      Foo: 'bar'
    })

    nock(`https://${client.settings.mwsDomain}`)
      .post(pathname, data)
      .reply(
        400,
        `<?xml version="1.0"?>
        <ErrorResponse xmlns="http://mws.amazonservices.com/schema/CustomResource/1988-10-13">
          <Error ThisAttribute="WillBeIgnored">
            <Code>ClientError</Code>
            <Message>bar is not valid for Foo</Message>
          </Error>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </ErrorResponse>`
      )

    expect.assertions(3)

    try {
      await client.post('CustomResource', '1988-10-13', {
        Action: 'CustomPostAction',
        Foo: 'bar'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(MWSClient.MWSError)
      expect(error.message).toBe('CustomResource.CustomPostAction error: Response code 400 (Bad Request)')
      expect(error.body).toMatchSnapshot()
    }
  })
})
