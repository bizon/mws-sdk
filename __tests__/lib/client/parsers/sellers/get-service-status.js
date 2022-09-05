const parseXml = require('../../../../../lib/client/parsers')
const parseGetServiceStatusResponse = require('../../../../../lib/client/parsers/base/get-service-status-response')

describe('lib.client.parsers.base.get-service-status-response', () => {
  it('should parse the GetServiceStatusResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetServiceStatusResponse xmlns="https://mws.amazonservices.com/Sellers/2011-07-01">
        <GetServiceStatusResult>
          <Status>GREEN</Status>
          <Timestamp>2010-09-24T21:38:09.676Z</Timestamp>
        </GetServiceStatusResult>
      </GetServiceStatusResponse>`,
    )

    const response = parseGetServiceStatusResponse('/sellers:GetServiceStatusResponse', doc)

    expect(response).toMatchSnapshot()
  })
})
