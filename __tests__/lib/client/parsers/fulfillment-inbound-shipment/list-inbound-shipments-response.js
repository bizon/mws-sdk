const parseXml = require('../../../../../lib/client/parsers')
const parseListInboundShipmentsResponse = require('../../../../../lib/client/parsers/fulfillment-inbound-shipment/list-inbound-shipments-response')

describe('lib.client.parsers.fulfillment-inbound-shipment.list-inbound-shipments-response', () => {
  it('should parse the ListInboundShipments example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListInboundShipmentsResponse xmlns="http://mws.amazonaws.com/FulfillmentInboundShipment/2010-10-01/">
        <ListInboundShipmentsResult>
          <ShipmentData>
            <member>
              <ShipFromAddress>
                <PostalCode>V5V 1A1</PostalCode>
                <Name>jsowprni Devo CA20</Name>
                <CountryCode>CA</CountryCode>
                <StateOrProvinceCode>BC</StateOrProvinceCode>
                <AddressLine1>Address Line 1</AddressLine1>
                <City>Vancouver</City>
              </ShipFromAddress>
              <ShipmentId>FBAN4QNH</ShipmentId>
              <ShipmentName>FBA (8/27/12 1:55 PM)</ShipmentName>
              <ShipmentStatus>WORKING</ShipmentStatus>
              <LabelPrepType>NO_LABEL</LabelPrepType>
              <DestinationFulfillmentCenterId>YYZ1</DestinationFulfillmentCenterId>
              <AreCasesRequired>true</AreCasesRequired>
            </member>
            <member>
              <ShipFromAddress>
                <PostalCode>V5V 1A1</PostalCode>
                <Name>Janani Arvind FBA QA</Name>
                <CountryCode>CA</CountryCode>
                <StateOrProvinceCode>BC</StateOrProvinceCode>
                <AddressLine1>Address 1</AddressLine1>
                <City>Vancouver</City>
              </ShipFromAddress>
              <ShipmentId>FBA1123</ShipmentId>
              <ShipmentName>Test MWS CA Shipment 1</ShipmentName>
              <ShipmentStatus>WORKING</ShipmentStatus>
              <LabelPrepType>NO_LABEL</LabelPrepType>
              <DestinationFulfillmentCenterId>RIC2</DestinationFulfillmentCenterId>
              <BoxContentsSource>NONE</BoxContentsSource>
              <EstimatedBoxContentsFee>
                <TotalUnits>10</TotalUnits>
                <FeePerUnit>
                  <CurrencyCode>USD</CurrencyCode>
                  <Value>0.10</Value>
                </FeePerUnit>
                <TotalFee>
                  <CurrencyCode>USD</CurrencyCode>
                  <Value>10.0</Value>
                </TotalFee>
              </EstimatedBoxContentsFee>
            </member>
          </ShipmentData>
        </ListInboundShipmentsResult>
      </ListInboundShipmentsResponse>`,
    )

    const response = parseListInboundShipmentsResponse(
      '/fulfillmentInboundShipment:ListInboundShipmentsResponse',
      doc,
    )

    expect(response).toMatchSnapshot()
  })
})
