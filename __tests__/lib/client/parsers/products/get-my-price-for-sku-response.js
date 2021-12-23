const parseXml = require('../../../../../lib/client/parsers')
const parseGetMyPriceForSkuResponse = require('../../../../../lib/client/parsers/products/get-my-price-for-sku-response')

describe('lib.client.parsers.products.get-my-price-for-sku-response', () => {
  it('should parse the GetMyPriceForSKUResponse example response from MWS doc', () => {
    const doc = parseXml(
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
      </GetMyPriceForSKUResponse>`,
    )

    const res = parseGetMyPriceForSkuResponse('/products:GetMyPriceForSKUResponse', doc)

    expect(res).toMatchSnapshot()
  })

  it('should parse GetMyPriceForSKUResponse errors', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetMyPriceForSKUResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetMyPriceForSKUResult SellerSKU="SKU2468" status="ClientError">
          <Error>
            <Type>Sender</Type>
            <Code>InvalidParameterValue</Code>
            <Message>SKU2468 is an invalid SellerSKU for marketplace ATVPDKIKX0DER</Message>
          </Error>
        </GetMyPriceForSKUResult>
        <ResponseMetadata>
          <RequestId>bc6e4601-3d74-4612-adcf-EXAMPLEf1796</RequestId>
        </ResponseMetadata>
      </GetMyPriceForSKUResponse>`,
    )

    const res = parseGetMyPriceForSkuResponse('/products:GetMyPriceForSKUResponse', doc)

    expect(res).toMatchSnapshot()
  })
})
