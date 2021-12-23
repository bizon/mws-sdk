const parseXml = require('../../../../../lib/client/parsers')
const parseGetMyPriceForAsinResponse = require('../../../../../lib/client/parsers/products/get-my-price-for-asin-response')

describe('lib.client.parsers.products.get-my-price-for-asin-response', () => {
  it('should parse the GetMyPriceForASINResponse example response from MWS doc', () => {
    const doc = parseXml(
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
      </GetMyPriceForASINResponse>`,
    )

    const res = parseGetMyPriceForAsinResponse('/products:GetMyPriceForASINResponse', doc)

    expect(res).toMatchSnapshot()
  })

  it('should parse GetMyPriceForASINResponse errors', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetMyPriceForASINResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetMyPriceForASINResult ASIN="1933890517" status="Success">
          <Error>
            <Type>Sender</Type>
            <Code>InvalidParameterValue</Code>
            <Message>1933890517 is an invalid ASIN for marketplace ATVPDKIKX0DER</Message>
          </Error>
        </GetMyPriceForASINResult>
        <ResponseMetadata>
          <RequestId>a3381684-87bd-416e-9b95-EXAMPLE9c236</RequestId>
        </ResponseMetadata>
      </GetMyPriceForASINResponse>`,
    )

    const res = parseGetMyPriceForAsinResponse('/products:GetMyPriceForASINResponse', doc)

    expect(res).toMatchSnapshot()
  })
})
