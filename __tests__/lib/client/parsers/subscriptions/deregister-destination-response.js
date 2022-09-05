const parseXml = require('../../../../../lib/client/parsers')
const parseDeregisterDestinationResponse = require('../../../../../lib/client/parsers/subscriptions/deregister-destination-response')

describe('lib.client.parsers.subscriptions.deregister-destination-response', () => {
  it('should parse the DeregisterDestinationResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <DeregisterDestinationResponse xmlns="http://mws.amazonservices.com/schema/Subscriptions/2013-07-01">
        <DeregisterDestinationResult />
        <ResponseMetadata>
          <RequestId>b120e610-9cf0-48d7-b615-ca869EXAMPLE</RequestId>
        </ResponseMetadata>
      </DeregisterDestinationResponse>`,
    )

    const response = parseDeregisterDestinationResponse(
      '/subscriptions:DeregisterDestinationResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })
})
