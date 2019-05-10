const parseXml = require('../../../../../lib/client/parsers')
const parseGetServiceStatusResponse = require('../../../../../lib/client/parsers/base/get-service-status-response')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse the GetServiceStatusResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetServiceStatusResponse
          xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetServiceStatusResult>
              <Status>GREEN</Status>
              <Timestamp>2012-12-04T22:53:58.830Z</Timestamp>
          </GetServiceStatusResult>
          <ResponseMetadata>
              <RequestId>0a51dc17-20bf-4e0d-8ac5-5d53bd1129cf</RequestId>
          </ResponseMetadata>
      </GetServiceStatusResponse>`
    )

    const res = parseGetServiceStatusResponse(
      '/products:GetServiceStatusResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
