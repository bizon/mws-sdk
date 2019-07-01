const parseXml = require('../../../../../lib/client/parsers')
const parseRegisterDestinationResponse = require('../../../../../lib/client/parsers/subscriptions/register-destination-response')

describe('lib.client.parsers.subscriptions.register-destination-response', () => {
  it('should parse the RegisterDestinationResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <RegisterDestinationResponse xmlns="http://mws.amazonservices.com/schema/Subscriptions/2013-07-01">
        <RegisterDestinationResult />
        <ResponseMetadata>
          <RequestId>b120e610-9cf0-48d7-b615-ca869EXAMPLE</RequestId>
        </ResponseMetadata>
      </RegisterDestinationResponse>`
    )

    const res = parseRegisterDestinationResponse(
      '/subscriptions:RegisterDestinationResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
