const parseXml = require('../../../../../lib/client/parsers')
const parseGetServiceStatusResponse = require('../../../../../lib/client/parsers/base/get-service-status-response')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse the GetServiceStatusResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetServiceStatusResponse xmlns="http://mws.amazonaws.com/FulfillmentInboundShipment/2010-10-01/">
        <GetServiceStatusResult>
          <Status>GREEN</Status>
          <Timestamp>2010-11-01T21:38:09.676Z</Timestamp>
        </GetServiceStatusResult>
        <ResponseMetadata>
          <RequestId>d80c6c7b-f7c7-4fa7-bdd7-854711cb3bcc</RequestId>
        </ResponseMetadata>
      </GetServiceStatusResponse>`
    )

    const res = parseGetServiceStatusResponse(
      '/fulfillmentInboundShipment:GetServiceStatusResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
