const nock = require('nock')
const got = require('got')

const {inspectError} = require('../../__helpers__/inspect')

const MWSClient = require('../../../lib/client')
const MWSError = require('../../../lib/client/error')

const {parseStr} = require('../../../lib/client/parsers/base')

describe('lib.client.error', () => {
  const client = new MWSClient({
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
    sellerId: 'sellerId',
    mwsToken: 'mwsToken',
    mwsRegion: 'eu'
  })

  it('should rethrow if httpError is not a valid got HTTPError', () => {
    const errors = [
      new Error(),
      new TypeError()
    ]

    for (const error of errors) {
      expect(
        () => new MWSError(error)
      ).toThrow(error)
    }
  })

  it('should fail if client, resource or action is not defined', () => {
    const httpError = new got.HTTPError({})

    const tests = [
      () => new MWSError(httpError),
      () => new MWSError(httpError, {
        client
      }),
      () => new MWSError(httpError, {
        client,
        resource: 'Orders'
      })
    ]

    for (const test of tests) {
      expect(test).toThrow('The client, resource and action parameters are required')
    }
  })

  it('should not allow updating error properties', async () => {
    nock('http://example.org').get('/').reply(
      400,
      `<ErrorResponse>
        <Error>
          <Message>This is a message</Message>
        </Error>
      </ErrorResponse>`
    )

    const response = await got.get('http://example.org', {
      retry: 0,
      throwHttpErrors: false
    })

    const error = new MWSError(new got.HTTPError(response), {
      client,
      resource: 'ResourceName',
      action: 'Function'
    })

    const properties = [
      'response',
      'sellerId',
      'mwsDomain',
      'marketplaces',
      'resource',
      'action',
      'body'
    ]

    for (const property of properties) {
      error[property] = 'override'
      expect(error[property]).not.toEqual('override')

      delete error[property]
      expect(error[property]).toBeDefined()
    }

    expect(inspectError(error)).toMatchSnapshot({
      timings: expect.any(Object)
    })
  })

  it('should create a MWSError and parse the response body', async () => {
    nock('http://example.org').get('/').reply(
      400,
      `<ErrorResponse>
        <Error>
          <Type>Foo</Type>
          <Code>Bar</Code>
          <Message>This is a message</Message>
        </Error>
        <ResponseMetadata>
          <RequestId>some_request_id</RequestId>
        </ResponseMetadata>
      </ErrorResponse>`
    )

    const response = await got.get('http://example.org', {
      retry: 0,
      throwHttpErrors: false
    })

    const error = new MWSError(new got.HTTPError(response), {
      client,
      resource: 'ResourceName',
      action: 'Function'
    })

    expect(error.message).toBe('ResourceName.Function error: Response code 400 (Bad Request)')
    expect(error.body).toMatchSnapshot()
  })

  it('should create a MWSError and parse the response body using a custom error response parser', async () => {
    nock('http://example.org').get('/').reply(
      401,
      `<ErrorResponse xmlns="https://mws.amazonservices.com/Sellers/2011-07-01">
        <Foo>Hello</Foo>
        <Bar>World!</Bar>
      </ErrorResponse>`
    )

    const response = await got.get('http://example.org', {
      retry: 0,
      throwHttpErrors: false
    })

    const error = new MWSError(new got.HTTPError(response), {
      client,
      resource: 'Sellers',
      action: 'GetSomething',
      parseErrorResponse: (key, node) => ({
        foo: parseStr(`${key}/sellers:Foo`, node),
        bar: parseStr(`${key}/sellers:Bar`, node)
      })
    })

    expect(error.message).toBe('Sellers.GetSomething error: Response code 401 (Unauthorized)')
    expect(error.body).toMatchSnapshot()
    expect(error.response.statusCode).toBe(401)
  })
})
