const parseXml = require('../../../../../lib/client/parsers')
const parseGetServiceStatusResponse = require('../../../../../lib/client/parsers/base/get-service-status-response')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse the GetServiceStatusResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetServiceStatusResponse xmlns="http://mws.amazonservices.com/schema/Subscriptions/2013-07-01">
        <GetServiceStatusResult>
          <Status>GREEN</Status>
          <Timestamp>2013-07-25T18:17:45.167Z</Timestamp>
        </GetServiceStatusResult>
        <ResponseMetadata>
          <RequestId>082c41fd-2f6b-4616-a518-7db14EXAMPLE</RequestId>
        </ResponseMetadata>
      </GetServiceStatusResponse>`,
    )

    const res = parseGetServiceStatusResponse(
      '/subscriptions:GetServiceStatusResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })
})
