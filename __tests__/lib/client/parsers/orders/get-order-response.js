const parseXml = require('../../../../../lib/client/parsers')
const parseGetOrderResponse = require('../../../../../lib/client/parsers/orders/get-order-response')

describe('lib.client.parsers.orders.get-order-response', () => {
  it('should parse the GetOrderResponse example response from MWS doc', () => {
    const doc = parseXml(
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

    const response = parseGetOrderResponse('/orders:GetOrderResponse', doc)

    expect(response).toMatchSnapshot()
  })
})
