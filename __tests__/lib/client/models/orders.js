const nock = require('nock')
const MockDate = require('mockdate')

const MWSClient = require('../../../..')

const client = new MWSClient({
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_KEY',
  sellerId: 'SELLER_ID',
  mwsToken: 'MWS_TOKEN',
  sellerRegion: 'eu'
})

const apiUrl = `https://${client.settings.region.mwsDomain}`

describe('lib.client.models.orders', () => {
  beforeAll(() => {
    MockDate.set('2019-11-22')
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call GetOrder', async () => {
    const {pathname, data} = client.signData('GET', 'Orders', '2013-09-01', {
      Action: 'GetOrder',
      'AmazonOrderId.Id.1': '902-3159896-1390916'
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
              </Order>
            </Orders>
          </GetOrderResult>
          <ResponseMetadata>
            <RequestId>88faca76-b600-46d2-b53c-0c8c4533e43a</RequestId>
          </ResponseMetadata>
        </GetOrderResponse>`
      )

    const result = await client.orders.getOrders({
      amazonOrderIds: [
        '902-3159896-1390916'
      ]
    })

    expect(result).toMatchSnapshot()
  })
})
