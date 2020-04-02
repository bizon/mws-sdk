const {HTTPError} = require('got')

const MWSError = require('../../../lib/client/error')

const {parseStr} = require('../../../lib/client/parsers/base')

describe('lib.client.error', () => {
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

  it('should fail if resource or method is not defined', () => {
    const tests = [
      () => new MWSError(new HTTPError({})),
      () => new MWSError(new HTTPError({}), 'Order')
    ]

    for (const test of tests) {
      expect(test).toThrow('The resource and method parameters are required')
    }
  })

  it('should create a MWSError and parse the response body', () => {
    const error = new MWSError(
      new HTTPError({
        statusCode: 400,
        statusMessage: 'Something wrong happened',
        body: `<ErrorResponse>
          <Error>
            <Type>Foo</Type>
            <Code>Bar</Code>
            <Message>This is a message</Message>
          </Error>
          <ResponseMetadata>
            <RequestId>some_request_id</RequestId>
          </ResponseMetadata>
        </ErrorResponse>`
      }),
      'ResourceName',
      'Function'
    )

    expect(error.message).toBe('ResourceName.Function error: Response code 400 (Something wrong happened)')
    expect(error.body).toMatchSnapshot()
  })

  it('should create a MWSError and parse the response body using a custom error response parser', () => {
    const error = new MWSError(
      new HTTPError({
        statusCode: 400,
        statusMessage: 'Something wrong happened',
        body: `<ErrorResponse xmlns="https://mws.amazonservices.com/Sellers/2011-07-01">
          <Foo>Hello</Foo>
          <Bar>World!</Bar>
        </ErrorResponse>`
      }),
      'Sellers',
      'GetSomething',
      (key, node) => ({
        foo: parseStr(`${key}/sellers:Foo`, node),
        bar: parseStr(`${key}/sellers:Bar`, node)
      })
    )

    expect(error.message).toBe('Sellers.GetSomething error: Response code 400 (Something wrong happened)')
    expect(error.body).toMatchSnapshot()
  })
})
