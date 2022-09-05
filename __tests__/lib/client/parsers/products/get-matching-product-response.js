const parseXml = require('../../../../../lib/client/parsers')
const parseGetMatchingProductResponse = require('../../../../../lib/client/parsers/products/get-matching-product-response')

describe('lib.client.parsers.products.get-matching-product-response', () => {
  it('should parse the GetMatchingProductResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <GetMatchingProductResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <GetMatchingProductResult ASIN="B002KT3XRQ" status="Success">
          <Product xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
            xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
            <Identifiers>
              <MarketplaceASIN>
                <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                <ASIN>B002KT3XRQ</ASIN>
              </MarketplaceASIN>
            </Identifiers>
            <AttributeSets>
              <ns2:ItemAttributes xml:lang="en-US">
                <ns2:Binding>Apparel</ns2:Binding>
                <ns2:Brand>Pearl iZUMi</ns2:Brand>
                <ns2:Department>mens</ns2:Department>
                <ns2:Feature>
                  Select transfer fabric sets the benchmark for moisture transfer and
                  four-way performance stretch
                </ns2:Feature>
                <ns2:Feature>
                  6-Panel anatomic design for superior, chafe-free comfort, UPF 50+ sun
                  protection
                </ns2:Feature>
                <ns2:Feature>
                  Comfortable silicone leg grippers keep shorts in place,
                  moisture-wicking, antimicrobial properties
                </ns2:Feature>
                <ns2:Feature>
                  Tour 3D Chamois is male-specific and non-chafing with padding in
                  key areas
                </ns2:Feature>
                <ns2:Feature>86 percent nylon, 14% spandex, 9-Inch inseam</ns2:Feature>
                <ns2:ItemDimensions>
                  <ns2:Height Units="inches">2.00</ns2:Height>
                  <ns2:Length Units="inches">9.00</ns2:Length>
                  <ns2:Width Units="inches">9.00</ns2:Width>
                </ns2:ItemDimensions>
                <ns2:Label>Pearl iZUMi</ns2:Label>
                <ns2:ListPrice>
                  <ns2:Amount>50.00</ns2:Amount>
                  <ns2:CurrencyCode>USD</ns2:CurrencyCode>
                </ns2:ListPrice>
                <ns2:Manufacturer>Pearl iZUMi</ns2:Manufacturer>
                <ns2:Model>0275</ns2:Model>
                <ns2:PackageDimensions>
                  <ns2:Height Units="inches">2.80</ns2:Height>
                  <ns2:Length Units="inches">9.75</ns2:Length>
                  <ns2:Width Units="inches">8.40</ns2:Width>
                  <ns2:Weight Units="pounds">0.40</ns2:Weight>
                </ns2:PackageDimensions>
                <ns2:PackageQuantity>1</ns2:PackageQuantity>
                <ns2:PartNumber>0275</ns2:PartNumber>
                <ns2:ProductGroup>Apparel</ns2:ProductGroup>
                <ns2:ProductTypeName>SHORTS</ns2:ProductTypeName>
                <ns2:Publisher>Pearl iZUMi</ns2:Publisher>
                <ns2:SmallImage>
                  <ns2:URL>
                    http://ecx.images-amazon.com/images/I/41ty3Sn%2BU8L._SL75_.jpg
                  </ns2:URL>
                  <ns2:Height Units="pixels">75</ns2:Height>
                  <ns2:Width Units="pixels">58</ns2:Width>
                </ns2:SmallImage>
                <ns2:Studio>Pearl iZUMi</ns2:Studio>
                <ns2:Title>Pearl iZUMi Men's Quest Cycling Short</ns2:Title>
              </ns2:ItemAttributes>
            </AttributeSets>
            <Relationships>
              <ns2:VariationChild>
                <Identifiers>
                  <MarketplaceASIN>
                    <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                    <ASIN>B002KT3XQC</ASIN>
                  </MarketplaceASIN>
                </Identifiers>
                <ns2:Color>Black</ns2:Color>
                <ns2:Size>Small</ns2:Size>
              </ns2:VariationChild>
              <ns2:VariationChild>
                <Identifiers>
                  <MarketplaceASIN>
                    <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                    <ASIN>B002KT3XQW</ASIN>
                  </MarketplaceASIN>
                </Identifiers>
                <ns2:Color>Black</ns2:Color>
                <ns2:Size>Medium</ns2:Size>
              </ns2:VariationChild>
              <ns2:VariationChild>
                <Identifiers>
                  <MarketplaceASIN>
                    <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                    <ASIN>B002KT3XQM</ASIN>
                  </MarketplaceASIN>
                </Identifiers>
                <ns2:Color>Black</ns2:Color>
                <ns2:Size>Large</ns2:Size>
              </ns2:VariationChild>
              <ns2:VariationChild>
                <Identifiers>
                  <MarketplaceASIN>
                    <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                    <ASIN>B002KT3XR6</ASIN>
                  </MarketplaceASIN>
                </Identifiers>
                <ns2:Color>Black</ns2:Color>
                <ns2:Size>X-Large</ns2:Size>
              </ns2:VariationChild>
              <ns2:VariationChild>
                <Identifiers>
                  <MarketplaceASIN>
                    <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                    <ASIN>B002KT3XRG</ASIN>
                  </MarketplaceASIN>
                </Identifiers>
                <ns2:Color>Black</ns2:Color>
                <ns2:Size>XX-Large</ns2:Size>
              </ns2:VariationChild>
            </Relationships>
            <SalesRankings>
              <SalesRank>
                <ProductCategoryId>apparel_display_on_website</ProductCategoryId>
                <Rank>159</Rank>
              </SalesRank>
              <SalesRank>
                <ProductCategoryId>2420095011</ProductCategoryId>
                <Rank>1</Rank>
              </SalesRank>
              <SalesRank>
                <ProductCategoryId>2611189011</ProductCategoryId>
                <Rank>4</Rank>
              </SalesRank>
            </SalesRankings>
          </Product>
        </GetMatchingProductResult>
        <ResponseMetadata>
          <RequestId>b12caada-d330-4d87-a789-EXAMPLE35872</RequestId>
        </ResponseMetadata>
      </GetMatchingProductResponse>`,
    )

    const response = parseGetMatchingProductResponse('/products:GetMatchingProductResponse', doc)

    expect(response).toMatchSnapshot()
  })
})
