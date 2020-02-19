const nock = require('nock')
const MockDate = require('mockdate')

const MWSClient = require('../../../..')

const client = new MWSClient({
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_KEY',
  sellerId: 'SELLER_ID',
  mwsToken: 'MWS_TOKEN',
  mwsRegion: 'eu'
})

const apiUrl = `https://${client.settings.mwsDomain}`

describe('lib.client.models.fulfillment-inbound-shipment', () => {
  beforeAll(() => {
    MockDate.set('2020-01-10')
  })

  afterAll(() => {
    MockDate.reset()
    client.fulfillmentInboundShipment.clearRestores()
  })

  it('should call ListInboundShipments', async () => {
    const {pathname, data} = client.signData('GET', 'FulfillmentInboundShipment', '2010-10-01', {
      Action: 'ListInboundShipments',
      'ShipmentIdList.member.1': 'FBAN4QNH',
      'ShipmentIdList.member.2': 'FBA1123'
    })

    nock(apiUrl)
      .get(pathname)
      .query(data)
      .reply(
        200,
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
        </ListInboundShipmentsResponse>`
      )

    const result = await client.fulfillmentInboundShipment.listInboundShipments({
      shipmentIdList: [
        'FBAN4QNH',
        'FBA1123'
      ]
    })

    expect(result).toMatchSnapshot()
  })

  it('should call ListInboundShipmentItems', async () => {
    const {pathname, data} = client.signData('GET', 'FulfillmentInboundShipment', '2010-10-01', {
      Action: 'ListInboundShipmentItems',
      ShipmentId: 'SSF85DGIZZ3OF1'
    })

    nock(apiUrl)
      .get(pathname)
      .query(data)
      .reply(
        200,
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
        </ListInboundShipmentItemsResponse>`
      )

    const result = await client.fulfillmentInboundShipment.listInboundShipmentItems({
      shipmentId: 'SSF85DGIZZ3OF1'
    })

    expect(result).toMatchSnapshot()
  })
})
