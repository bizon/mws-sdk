const parseXml = require('../../../../../lib/client/parsers')
const parseGetBillOfLadingResponse = require('../../../../../lib/client/parsers/fulfillment-inbound-shipment/get-bill-of-lading-response')

describe('lib.client.parsers.fulfillment-inbound-shipment.get-bill-of-lading-response', () => {
  it('should parse the GetBillOfLadingResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetBillOfLadingResponse xmlns="http://mws.amazonaws.com/FulfillmentInboundShipment/2010-10-01/">
        <GetBillOfLadingResult>
          <TransportDocument>
            <PdfDocument>ABEAAAAAAlbHMucGRmUEsFBgAAAAABAAEAPwAAALQXAQAAAA==
            </PdfDocument>
            <Checksum>WGQwqA+NlzMVL1plHc/7ZA==</Checksum>
          </TransportDocument>
        </GetBillOfLadingResult>
        <ResponseMetadata>
          <RequestId>985a3fa9-3ce2-46fb-a1c7-321439269d2b</RequestId>
        </ResponseMetadata>
      </GetBillOfLadingResponse>`,
    )

    const res = parseGetBillOfLadingResponse(
      '/fulfillmentInboundShipment:GetBillOfLadingResponse',
      doc,
    )

    expect(res).toMatchSnapshot()
  })
})
