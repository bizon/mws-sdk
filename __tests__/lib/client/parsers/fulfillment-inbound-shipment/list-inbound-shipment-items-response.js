const parseXml = require('../../../../../lib/client/parsers')
const parseListInboundShipmentItemsResponse = require('../../../../../lib/client/parsers/fulfillment-inbound-shipment/list-inbound-shipment-items-response')

describe('lib.client.parsers.fulfillment-inbound-shipment.list-inbound-shipment-items-response', () => {
  it('should parse the ListInboundShipmentItems example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListInboundShipmentItemsResponse xmlns="http://mws.amazonaws.com/FulfillmentInboundShipment/2010-10-01/">
        <ListInboundShipmentItemsResult>
          <ItemData>
            <member>
              <ShipmentId>SSF85DGIZZ3OF1</ShipmentId>
              <SellerSKU>SampleSKU1</SellerSKU>
              <QuantityShipped>3</QuantityShipped>
              <QuantityInCase>0</QuantityInCase>
              <QuantityReceived>0</QuantityReceived>
              <FulfillmentNetworkSKU>B000FADVPQ</FulfillmentNetworkSKU>
              <ReleaseDate>2014-12-31</ReleaseDate>
            </member>
            <member>
              <ShipmentId>SSF85DGIZZ3OF1</ShipmentId>
              <SellerSKU>SampleSKU2</SellerSKU>
              <QuantityShipped>10</QuantityShipped>
              <QuantityInCase>0</QuantityInCase>
              <QuantityReceived>0</QuantityReceived>
              <FulfillmentNetworkSKU>B0011VECH4</FulfillmentNetworkSKU>
            </member>
          </ItemData>
        </ListInboundShipmentItemsResult>
        <ResponseMetadata>
          <RequestId>ffce8932-8e69-11df-8af1-5bf2881764d8</RequestId>
        </ResponseMetadata>
      </ListInboundShipmentItemsResponse>`,
    )

    const response = parseListInboundShipmentItemsResponse(
      '/fulfillmentInboundShipment:ListInboundShipmentItemsResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })
})
