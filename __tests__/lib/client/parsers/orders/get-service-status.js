const parseXml = require('../../../../../lib/client/parsers')
const parseGetServiceStatusResponse = require('../../../../../lib/client/parsers/base/get-service-status-response')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse the GetServiceStatusResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetServiceStatusResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
        <GetServiceStatusResult>
          <Status>GREEN</Status>
          <Timestamp>2013-09-05T18%3A12%3A21</Timestamp>
        </GetServiceStatusResult>
        <ResponseMetadata>
          <RequestId>d80c6c7b-f7c7-4fa7-bdd7-854711cb3bcc</RequestId>
        </ResponseMetadata>
      </GetServiceStatusResponse>`,
    )

    const res = parseGetServiceStatusResponse('/orders:GetServiceStatusResponse', doc)

    expect(res).toMatchSnapshot()
  })
})
