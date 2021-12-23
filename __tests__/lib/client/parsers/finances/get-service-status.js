const parseXml = require('../../../../../lib/client/parsers')
const parseGetServiceStatusResponse = require('../../../../../lib/client/parsers/base/get-service-status-response')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse the GetServiceStatusResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetServiceStatusResponse xmlns="http://mws.amazonservices.com/Finances/2015-05-01">
        <GetServiceStatusResult>
          <Status>GREEN</Status>
          <Timestamp>2015-05-01T18:12:21.687Z</Timestamp>
        </GetServiceStatusResult>
        <ResponseMetadata>
          <RequestId>082c41fd-2f6b-4616-a518-7db14EXAMPLE</RequestId>
        </ResponseMetadata>
      </GetServiceStatusResponse>`,
    )

    const res = parseGetServiceStatusResponse('/finances:GetServiceStatusResponse', doc)

    expect(res).toMatchSnapshot()
  })
})
