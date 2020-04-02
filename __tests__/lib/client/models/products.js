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

describe('lib.client.models.products', () => {
  beforeAll(() => {
    MockDate.set('2019-12-04')
  })

  afterAll(() => {
    MockDate.reset()
    client.products.clearRestores()
  })

  it('should call GetMyPriceForASIN', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetMyPriceForASIN',
      MarketplaceId: 'ATVPDKIKX0DER',
      'ASINList.ASIN.1': '1933890517'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetMyPriceForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetMyPriceForASINResult ASIN="1933890517" status="Success">
            <Product xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
              xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>1933890517</ASIN>
                </MarketplaceASIN>
              </Identifiers>
              <Offers>
                <Offer>
                  <BuyingPrice>
                    <LandedPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>303.99</Amount>
                    </LandedPrice>
                    <ListingPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>300.00</Amount>
                    </ListingPrice>
                    <Shipping>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>3.99</Amount>
                    </Shipping>
                  </BuyingPrice>
                  <RegularPrice>
                    <CurrencyCode>USD</CurrencyCode>
                    <Amount>300.00</Amount>
                  </RegularPrice>
                  <FulfillmentChannel>MERCHANT</FulfillmentChannel>
                  <ItemCondition>Used</ItemCondition>
                  <ItemSubCondition>Acceptable</ItemSubCondition>
                  <SellerId>A1IMEXAMPLEWRC</SellerId>
                  <SellerSKU>SKU2468</SellerSKU>
                </Offer>
              </Offers>
            </Product>
          </GetMyPriceForASINResult>
          <ResponseMetadata>
            <RequestId>a3381684-87bd-416e-9b95-EXAMPLE9c236</RequestId>
          </ResponseMetadata>
        </GetMyPriceForASINResponse>`
      )

    const result = await client.products.getMyPriceForAsin({
      marketplaceId: 'ATVPDKIKX0DER',
      asinList: [
        '1933890517'
      ]
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetMyPriceForSKU', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetMyPriceForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      'SellerSKUList.SellerSKU.1': 'SKU2468'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0"?>
        <GetMyPriceForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetMyPriceForSKUResult SellerSKU="SKU2468" status="Success">
            <Product xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
              xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>1933890517</ASIN>
                </MarketplaceASIN>
                <SKUIdentifier>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <SellerId>A1IMEXAMPLEWRC</SellerId>
                  <SellerSKU>SKU2468</SellerSKU>
                </SKUIdentifier>
              </Identifiers>
              <Offers>
                <Offer>
                  <BuyingPrice>
                    <LandedPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>303.99</Amount>
                    </LandedPrice>
                    <ListingPrice>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>300.00</Amount>
                    </ListingPrice>
                    <Shipping>
                      <CurrencyCode>USD</CurrencyCode>
                      <Amount>3.99</Amount>
                    </Shipping>
                  </BuyingPrice>
                  <RegularPrice>
                    <CurrencyCode>USD</CurrencyCode>
                    <Amount>300.00</Amount>
                  </RegularPrice>
                  <FulfillmentChannel>MERCHANT</FulfillmentChannel>
                  <ItemCondition>Used</ItemCondition>
                  <ItemSubCondition>Acceptable</ItemSubCondition>
                  <SellerId>A1IMEXAMPLEWRC</SellerId>
                  <SellerSKU>SKU2468</SellerSKU>
                </Offer>
              </Offers>
            </Product>
          </GetMyPriceForSKUResult>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </GetMyPriceForSKUResponse>`
      )

    const result = await client.products.getMyPriceForSku({
      marketplaceId: 'ATVPDKIKX0DER',
      sellerSkuList: [
        'SKU2468'
      ]
    })

    expect(result).toMatchSnapshot()
  })

  it('should call GetLowestPricedOffersForSKU', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetLowestPricedOffersForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      SellerSKU: 'SKU2468',
      ItemCondition: 'new'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        200,
        `<?xml version="1.0" encoding="UTF-8"?>
        <GetLowestPricedOffersForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <GetLowestPricedOffersForSKUResult MarketplaceID="ATVPDKIKX0DER" SKU="SKU2468" ItemCondition="new"
            status="NoOfferDueToMissingShippingCharge">
            <Identifier>
              <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
              <SellerSKU>SKU2468</SellerSKU>
              <ItemCondition>New</ItemCondition>
            </Identifier>
            <Summary>
              <TotalOfferCount>0</TotalOfferCount>
            </Summary>
            <Offers />
          </GetLowestPricedOffersForSKUResult>
          <ResponseMetadata>
            <RequestId>75621aa7-9c8b-40be-9bf9-3ac1efdcdb87</RequestId>
          </ResponseMetadata>
        </GetLowestPricedOffersForSKUResponse>`
      )

    const result = await client.products.getLowestPricedOffersForSku({
      marketplaceId: 'ATVPDKIKX0DER',
      sellerSku: 'SKU2468',
      itemCondition: 'new'
    })

    expect(result).toMatchSnapshot()
  })

  it('should handle GetLowestPricedOffersForSKU errors', async () => {
    const {pathname, data} = client.signData('POST', 'Products', '2011-10-01', {
      Action: 'GetLowestPricedOffersForSKU',
      MarketplaceId: 'ATVPDKIKX0DER',
      SellerSKU: 'SKU2468',
      ItemCondition: 'new'
    })

    nock(apiUrl)
      .post(pathname, data)
      .reply(
        400,
        `<?xml version="1.0"?>
        <ErrorResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
          <Error MarketplaceID="ATVPDKIKX0DER" SKU="SKU2468" ItemCondition="new" status="ClientError">
            <Code>InvalidParameterValue</Code>
            <Type>Sender</Type>
            <Message>SKU2468 is an invalid SKU for marketplace ATVPDKIKX0DER</Message>
          </Error>
          <ResponseMetadata>
            <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
          </ResponseMetadata>
        </ErrorResponse>`
      )

    expect.assertions(2)

    try {
      await client.products.getLowestPricedOffersForSku({
        marketplaceId: 'ATVPDKIKX0DER',
        sellerSku: 'SKU2468',
        itemCondition: 'new'
      })
    } catch (error) {
      expect(error.message).toBe('Products.GetLowestPricedOffersForSKU error: Response code 400 (Bad Request)')
      expect(error.body).toMatchSnapshot()
    }
  })
})
