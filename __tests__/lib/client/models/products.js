const nock = require('nock')
const MWSClient = require('../../../..')

const client = new MWSClient({
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_KEY',
  sellerId: 'SELLER_ID',
  mwsToken: 'MWS_TOKEN',
  sellerRegion: 'eu'
})

const apiUrl = `https://${client.settings.region.mwsDomain}`

describe('lib.client.models.products', () => {
  it('should call GetMyPriceForASIN', async () => {
    nock(apiUrl)
      .post('/Products/2011-10-01')
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

    const result = await client.products.getMyPriceForAsin({})
    expect(result).toMatchSnapshot()
  })

  it('should call GetMyPriceForSKU', async () => {
    nock(apiUrl)
      .post('/Products/2011-10-01')
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

    const result = await client.products.getMyPriceForSku({})
    expect(result).toMatchSnapshot()
  })
})
