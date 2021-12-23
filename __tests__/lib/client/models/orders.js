const nock = require('nock')
const MockDate = require('mockdate')

const MWSClient = require('../../../..')
const {arrayToObject} = require('../../../../lib/client/utils')

const client = new MWSClient({
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_KEY',
  sellerId: 'SELLER_ID',
  mwsToken: 'MWS_TOKEN',
  mwsRegion: 'eu',
})

const apiUrl = `https://${client.settings.mwsDomain}`

describe('lib.client.models.orders', () => {
  beforeAll(() => {
    MockDate.set('2019-11-22')
  })

  afterAll(() => {
    MockDate.reset()
    client.orders.clearRestores()
  })

  it('should call ListOrders without marketplaceIds', async () => {
    const {pathname, data} = client.signData('GET', 'Orders', '2013-09-01', {
      Action: 'ListOrders',
      MaxResultsPerPage: 100,
      ...arrayToObject(
        'MarketplaceId.Id',
        client.settings.marketplaces.map((m) => m.id),
      ),
    })

    nock(apiUrl)
      .get(pathname)
      .query(data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <ListOrdersResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
          <ListOrdersResult>
            <NextToken>2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=</NextToken>
            <LastUpdatedBefore>2017-02-25T18%3A10%3A21.687Z</LastUpdatedBefore>
            <Orders>
              <Order>
                <AmazonOrderId>902-3159896-1390916</AmazonOrderId>
                <PurchaseDate>2017-02-20T19:49:35Z</PurchaseDate>
                <LastUpdateDate>2017-02-20T19:49:35Z</LastUpdateDate>
                <OrderStatus>Unshipped</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <SalesChannel>Amazon.com</SalesChannel>
                <ShippingAddress>
                  <Name>Buyer name</Name>
                  <AddressLine1>1234 Any St.</AddressLine1>
                  <City>Seattle</City>
                  <StateOrRegion>WA</StateOrRegion>
                  <PostalCode>98103</PostalCode>
                  <CountryCode>US</CountryCode>
                  <AddressType>Commercial</AddressType>
                </ShippingAddress>
                <DefaultShipFromLocationAddress>
                  <Name>Seller name</Name>
                  <AddressLine1>15606 NE Any street</AddressLine1>
                  <AddressLine2>Suite 2</AddressLine2>
                  <City>Redmond</City>
                  <StateOrRegion>WA</StateOrRegion>
                  <PostalCode>98052</PostalCode>
                  <CountryCode>US</CountryCode>
                  <Phone>555 555-5555</Phone>
                  <isAddressSharingConfidential>false</isAddressSharingConfidential>
                </DefaultShipFromLocationAddress>
                <OrderTotal>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>25.00</Amount>
                </OrderTotal>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>1</NumberOfItemsUnshipped>
                <PaymentMethod>Other</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>CreditCard</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                <BuyerEmail>5vlhEXAMPLEh9h5@marketplace.amazon.com</BuyerEmail>
                <BuyerName>Buyer name</BuyerName>
                <BuyerTaxInfo>
                  <CompanyLegalName>Company Name</CompanyLegalName>
                  <TaxingRegion>US</TaxingRegion>
                  <TaxClassifications>
                    <TaxClassification>
                      <Name>VATNumber</Name>
                      <Value>XXX123</Value>
                    </TaxClassification>
                  </TaxClassifications>
                </BuyerTaxInfo>
                <OrderType>StandardOrder</OrderType>
                <EarliestShipDate>2017-02-20T19:51:16Z</EarliestShipDate>
                <LatestShipDate>2017-02-25T19:49:35Z</LatestShipDate>
                <IsBusinessOrder>true</IsBusinessOrder>
                <PurchaseOrderNumber>PO12345678</PurchaseOrderNumber>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
              </Order>
              <Order>
                <AmazonOrderId>483-3488972-0896720</AmazonOrderId>
                <PurchaseDate>20178-02-20T19:49:35Z</PurchaseDate>
                <LastUpdateDate>2017-02-20T19:49:35Z</LastUpdateDate>
                <OrderStatus>Unshipped</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <ShippingAddress>
                  <Name>Buyer name</Name>
                  <AddressLine1>1234 Avenida Qualquer</AddressLine1>
                  <City>Sao Paulo</City>
                  <PostalCode>08474-130</PostalCode>
                  <CountryCode>BR</CountryCode>
                  <AddressType>Residential</AddressType>
                </ShippingAddress>
                <OrderTotal>
                  <CurrencyCode>BRL</CurrencyCode>
                  <Amount>100.00</Amount>
                </OrderTotal>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>1</NumberOfItemsUnshipped>
                <PaymentMethod>Other</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>CreditCard</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>A2Q3Y263D00KWC</MarketplaceId>
                <BuyerEmail>5vlhEXAMPLEh9h5@marketplace.amazon.com.br</BuyerEmail>
                <BuyerName>John Jones</BuyerName>
                <BuyerCounty>Vila Olimpia</BuyerCounty>
                <BuyerTaxInfo>
                  <TaxingRegion>BR</TaxingRegion>
                  <TaxClassifications>
                    <TaxClassification>
                      <Name>CSTNumber</Name>
                      <Value>XXX123</Value>
                    </TaxClassification>
                  </TaxClassifications>
                </BuyerTaxInfo>
                <EarliestShipDate>2017-02-20T19:51:16Z</EarliestShipDate>
                <LatestShipDate>2017-02-25T19:49:35Z</LatestShipDate>
                <IsBusinessOrder>false</IsBusinessOrder>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
              </Order>
              <Order>
                <AmazonOrderId>058-1233752-8214740</AmazonOrderId>
                <PurchaseDate>2017-02-05T00%3A06%3A07.000Z</PurchaseDate>
                <LastUpdateDate>2017-02-07T12%3A43%3A16.000Z</LastUpdateDate>
                <OrderStatus>Unshipped</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <ShipServiceLevel>Std JP Kanto8</ShipServiceLevel>
                <ShippingAddress>
                  <Name>Jane Smith</Name>
                  <AddressLine1>1-2-10 Akasaka</AddressLine1>
                  <City>Tokyo</City>
                  <PostalCode>107-0053</PostalCode>
                  <CountryCode>JP</CountryCode>
                </ShippingAddress>
                <OrderTotal>
                  <CurrencyCode>JPY</CurrencyCode>
                  <Amount>1507.00</Amount>
                </OrderTotal>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>1</NumberOfItemsUnshipped>
                <PaymentExecutionDetail>
                  <PaymentExecutionDetailItem>
                    <Payment>
                      <Amount>10.00</Amount>
                      <CurrencyCode>JPY</CurrencyCode>
                    </Payment>
                    <PaymentMethod>PointsAccount</PaymentMethod>
                  </PaymentExecutionDetailItem>
                  <PaymentExecutionDetailItem>
                    <Payment>
                      <Amount>317.00</Amount>
                      <CurrencyCode>JPY</CurrencyCode>
                    </Payment>
                    <PaymentMethod>GC</PaymentMethod>
                  </PaymentExecutionDetailItem>
                  <PaymentExecutionDetailItem>
                    <Payment>
                      <Amount>1180.00</Amount>
                      <CurrencyCode>JPY</CurrencyCode>
                    </Payment>
                    <PaymentMethod>COD</PaymentMethod>
                  </PaymentExecutionDetailItem>
                </PaymentExecutionDetail>
                <PaymentMethod>COD</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>COD</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>A1VC38T7YXB528</MarketplaceId>
                <BuyerEmail>5vlhEXAMPLEh9h5@marketplace.amazon.co.jp</BuyerEmail>
                <BuyerName>Jane Smith</BuyerName>
                <ShipmentServiceLevelCategory>Standard </ShipmentServiceLevelCategory>
                <OrderType>SourcingOnDemandOrder</OrderType>
                <IsBusinessOrder>false</IsBusinessOrder>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
                <PromiseResponseDueDate>2017-08-31T23:58:44Z</PromiseResponseDueDate>
                <IsEstimatedShipDateSet>true</IsEstimatedShipDateSet>
              </Order>
            </Orders>
          </ListOrdersResult>
          <ResponseMetadata>
            <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
          </ResponseMetadata>
        </ListOrdersResponse>`,
      )

    const result = await client.orders.listOrders({})

    expect(result).toMatchSnapshot()
  })

  it('should call ListOrders with marketplaceIds', async () => {
    const {pathname, data} = client.signData('GET', 'Orders', '2013-09-01', {
      Action: 'ListOrders',
      LastUpdatedAfter: '2017-02-01T18:12:21.000Z',
      MaxResultsPerPage: 100,
      'MarketplaceId.Id.1': 'ATVPDKIKX0DER',
      'MarketplaceId.Id.2': 'A2Q3Y263D00KWC',
      'MarketplaceId.Id.3': 'A1VC38T7YXB528',
      'FulfillmentChannel.Channel.1': 'MFN',
      'PaymentMethod.Method.1': 'COD',
      'PaymentMethod.Method.2': 'Other',
      'OrderStatus.Status.1': 'Unshipped',
      'OrderStatus.Status.2': 'PendingAvailability',
    })

    nock(apiUrl)
      .get(pathname)
      .query(data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <ListOrdersResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
          <ListOrdersResult>
            <NextToken>2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=</NextToken>
            <LastUpdatedBefore>2017-02-25T18%3A10%3A21.687Z</LastUpdatedBefore>
            <Orders>
              <Order>
                <AmazonOrderId>902-3159896-1390916</AmazonOrderId>
                <PurchaseDate>2017-02-20T19:49:35Z</PurchaseDate>
                <LastUpdateDate>2017-02-20T19:49:35Z</LastUpdateDate>
                <OrderStatus>Unshipped</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <SalesChannel>Amazon.com</SalesChannel>
                <ShippingAddress>
                  <Name>Buyer name</Name>
                  <AddressLine1>1234 Any St.</AddressLine1>
                  <City>Seattle</City>
                  <PostalCode>98103</PostalCode>
                  <CountryCode>US</CountryCode>
                  <AddressType>Commercial</AddressType>
                </ShippingAddress>
                <OrderTotal>
                  <CurrencyCode>USD</CurrencyCode>
                  <Amount>25.00</Amount>
                </OrderTotal>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>1</NumberOfItemsUnshipped>
                <PaymentMethod>Other</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>CreditCard</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                <BuyerEmail>5vlhEXAMPLEh9h5@marketplace.amazon.com</BuyerEmail>
                <BuyerName>Buyer name</BuyerName>
                <BuyerTaxInfo>
                  <CompanyLegalName>Company Name</CompanyLegalName>
                  <TaxingRegion>US</TaxingRegion>
                  <TaxClassifications>
                    <TaxClassification>
                      <Name>VATNumber</Name>
                      <Value>XXX123</Value>
                    </TaxClassification>
                  </TaxClassifications>
                </BuyerTaxInfo>
                <OrderType>StandardOrder</OrderType>
                <EarliestShipDate>2017-02-20T19:51:16Z</EarliestShipDate>
                <LatestShipDate>2017-02-25T19:49:35Z</LatestShipDate>
                <IsBusinessOrder>true</IsBusinessOrder>
                <PurchaseOrderNumber>PO12345678</PurchaseOrderNumber>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
              </Order>
              <Order>
                <AmazonOrderId>483-3488972-0896720</AmazonOrderId>
                <PurchaseDate>20178-02-20T19:49:35Z</PurchaseDate>
                <LastUpdateDate>2017-02-20T19:49:35Z</LastUpdateDate>
                <OrderStatus>Unshipped</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <ShippingAddress>
                  <Name>Buyer name</Name>
                  <AddressLine1>1234 Avenida Qualquer</AddressLine1>
                  <City>Sao Paulo</City>
                  <PostalCode>08474-130</PostalCode>
                  <CountryCode>BR</CountryCode>
                  <AddressType>Residential</AddressType>
                </ShippingAddress>
                <OrderTotal>
                  <CurrencyCode>BRL</CurrencyCode>
                  <Amount>100.00</Amount>
                </OrderTotal>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>1</NumberOfItemsUnshipped>
                <PaymentMethod>Other</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>CreditCard</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>A2Q3Y263D00KWC</MarketplaceId>
                <BuyerEmail>5vlhEXAMPLEh9h5@marketplace.amazon.com.br</BuyerEmail>
                <BuyerName>John Jones</BuyerName>
                <BuyerCounty>Vila Olimpia</BuyerCounty>
                <BuyerTaxInfo>
                  <TaxingRegion>BR</TaxingRegion>
                  <TaxClassifications>
                    <TaxClassification>
                      <Name>CSTNumber</Name>
                      <Value>XXX123</Value>
                    </TaxClassification>
                  </TaxClassifications>
                </BuyerTaxInfo>
                <EarliestShipDate>2017-02-20T19:51:16Z</EarliestShipDate>
                <LatestShipDate>2017-02-25T19:49:35Z</LatestShipDate>
                <IsBusinessOrder>false</IsBusinessOrder>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
              </Order>
              <Order>
                <AmazonOrderId>058-1233752-8214740</AmazonOrderId>
                <PurchaseDate>2017-02-05T00%3A06%3A07.000Z</PurchaseDate>
                <LastUpdateDate>2017-02-07T12%3A43%3A16.000Z</LastUpdateDate>
                <OrderStatus>Unshipped</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <ShipServiceLevel>Std JP Kanto8</ShipServiceLevel>
                <ShippingAddress>
                  <Name>Jane Smith</Name>
                  <AddressLine1>1-2-10 Akasaka</AddressLine1>
                  <City>Tokyo</City>
                  <PostalCode>107-0053</PostalCode>
                  <CountryCode>JP</CountryCode>
                </ShippingAddress>
                <OrderTotal>
                  <CurrencyCode>JPY</CurrencyCode>
                  <Amount>1507.00</Amount>
                </OrderTotal>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>1</NumberOfItemsUnshipped>
                <PaymentExecutionDetail>
                  <PaymentExecutionDetailItem>
                    <Payment>
                      <Amount>10.00</Amount>
                      <CurrencyCode>JPY</CurrencyCode>
                    </Payment>
                    <PaymentMethod>PointsAccount</PaymentMethod>
                  </PaymentExecutionDetailItem>
                  <PaymentExecutionDetailItem>
                    <Payment>
                      <Amount>317.00</Amount>
                      <CurrencyCode>JPY</CurrencyCode>
                    </Payment>
                    <PaymentMethod>GC</PaymentMethod>
                  </PaymentExecutionDetailItem>
                  <PaymentExecutionDetailItem>
                    <Payment>
                      <Amount>1180.00</Amount>
                      <CurrencyCode>JPY</CurrencyCode>
                    </Payment>
                    <PaymentMethod>COD</PaymentMethod>
                  </PaymentExecutionDetailItem>
                </PaymentExecutionDetail>
                <PaymentMethod>COD</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>COD</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>A1VC38T7YXB528</MarketplaceId>
                <BuyerEmail>5vlhEXAMPLEh9h5@marketplace.amazon.co.jp</BuyerEmail>
                <BuyerName>Jane Smith</BuyerName>
                <ShipmentServiceLevelCategory>Standard </ShipmentServiceLevelCategory>
                <OrderType>SourcingOnDemandOrder</OrderType>
                <IsBusinessOrder>false</IsBusinessOrder>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
                <PromiseResponseDueDate>2017-08-31T23:58:44Z</PromiseResponseDueDate>
                <IsEstimatedShipDateSet>true</IsEstimatedShipDateSet>
              </Order>
            </Orders>
          </ListOrdersResult>
          <ResponseMetadata>
            <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
          </ResponseMetadata>
        </ListOrdersResponse>`,
      )

    const result = await client.orders.listOrders({
      lastUpdatedAfter: '2017-02-01T18:12:21',
      marketplaceId: ['ATVPDKIKX0DER', 'A2Q3Y263D00KWC', 'A1VC38T7YXB528'],
      fulfillmentChannel: ['MFN'],
      paymentMethod: ['COD', 'Other'],
      orderStatus: ['Unshipped', 'PendingAvailability'],
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetOrder', async () => {
    const {pathname, data} = client.signData('GET', 'Orders', '2013-09-01', {
      Action: 'GetOrder',
      'AmazonOrderId.Id.1': '902-3159896-1390916',
    })

    nock(apiUrl)
      .get(pathname)
      .query(data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetOrderResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
          <GetOrderResult>
            <Orders>
              <Order>
                <AmazonOrderId>902-3159896-1390916</AmazonOrderId>
                <PurchaseDate>2017-01-20T19:49:35Z</PurchaseDate>
                <LastUpdateDate>2017-01-20T19:49:35Z</LastUpdateDate>
                <OrderStatus>Pending</OrderStatus>
                <FulfillmentChannel>MFN</FulfillmentChannel>
                <NumberOfItemsShipped>0</NumberOfItemsShipped>
                <NumberOfItemsUnshipped>0</NumberOfItemsUnshipped>
                <PaymentMethod>Other</PaymentMethod>
                <PaymentMethodDetails>
                  <PaymentMethodDetail>CreditCard</PaymentMethodDetail>
                  <PaymentMethodDetail>GiftCerificate</PaymentMethodDetail>
                </PaymentMethodDetails>
                <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>>
                <ShipmentServiceLevelCategory>Standard
                </ShipmentServiceLevelCategory>
                <OrderType>StandardOrder</OrderType>
                <EarliestShipDate>2017-01-20T19:51:16Z</EarliestShipDate>
                <LatestShipDate>2017-01-25T19:49:35Z</LatestShipDate>
                <IsBusinessOrder>false</IsBusinessOrder>
                <IsPrime>false</IsPrime>
                <IsPremiumOrder>false</IsPremiumOrder>
                <IsGlobalExpressEnabled>false</IsGlobalExpressEnabled>
              </Order>
            </Orders>
          </GetOrderResult>
          <ResponseMetadata>
            <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
          </ResponseMetadata>
        </GetOrderResponse>`,
      )

    const result = await client.orders.getOrder({
      amazonOrderId: ['902-3159896-1390916'],
    })

    expect(result).toMatchSnapshot()
  })
})
