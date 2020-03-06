const parseXml = require('../../../../../lib/client/parsers')
const parseListOrdersResponse = require('../../../../../lib/client/parsers/orders/list-orders-response')

describe('lib.client.parsers.orders.list-orders-response', () => {
  it('should parse the ListOrdersResponse example response from MWS doc', () => {
    const doc = parseXml(
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
      </ListOrdersResponse>`
    )

    const res = parseListOrdersResponse(
      '/orders:ListOrdersResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })

  it('should parse the ListOrdersByNextTokenResult example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListOrdersByNextTokenResponse xmlns="https://mws.amazonservices.com/Orders/2013-09-01">
        <ListOrdersByNextTokenResult>
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
              <MarketplaceId>A21TJRUUN4KGV</MarketplaceId>
              <ShipmentServiceLevelCategory>Standard
              </ShipmentServiceLevelCategory>
              <OrderType>StandardOrder</OrderType>
              <EarliestShipDate>2017-01-20T19:51:16Z</EarliestShipDate>
              <LatestShipDate>2017-01-25T19:49:35Z</LatestShipDate>
              <IsBusinessOrder>false</IsBusinessOrder>
              <IsPrime>false</IsPrime>
              <IsPremiumOrder>false</IsPremiumOrder>
            </Order>
          </Orders>
        </ListOrdersByNextTokenResult>
        <ResponseMetadata>
          <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
        </ResponseMetadata>
      </ListOrdersByNextTokenResponse>`
    )

    const res = parseListOrdersResponse(
      '/orders:ListOrdersByNextTokenResponse',
      doc,
      true
    )

    expect(res).toMatchSnapshot()
  })
})
