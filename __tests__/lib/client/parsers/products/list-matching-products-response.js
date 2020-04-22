const parseXml = require('../../../../../lib/client/parsers')
const parseListMatchingProductsResponse = require('../../../../../lib/client/parsers/products/list-matching-products-response')

describe('lib.client.parsers.products.list-matching-products-response', () => {
  it('should parse the ListMatchingProductsResponse example response from MWS doc', () => {
    const doc = parseXml(
      `<?xml version="1.0"?>
      <ListMatchingProductsResponse xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01">
        <ListMatchingProductsResult>
          <Products xmlns="http://mws.amazonservices.com/schema/Products/2011-10-01"
            xmlns:ns2="http://mws.amazonservices.com/schema/Products/2011-10-01/default.xsd">
            <Product>
              <Identifiers>
                <MarketplaceASIN>
                  <MarketplaceId>ATVPDKIKX0DER</MarketplaceId>
                  <ASIN>059035342X</ASIN>
                </MarketplaceASIN>
              </Identifiers>
              <AttributeSets>
                <ns2:ItemAttributes xml:lang="en-US">
                  <ns2:Author>Rowling, J.K.</ns2:Author>
                  <ns2:Binding>Paperback</ns2:Binding>
                  <ns2:Brand>Scholastic Press</ns2:Brand>
                  <ns2:Creator Role="Illustrator">GrandPrÃ©, Mary</ns2:Creator>
                  <ns2:Edition>1st</ns2:Edition>
                  <ns2:Feature>Recommended Age: 9 years and up</ns2:Feature>
                  <ns2:ItemDimensions>
                    <ns2:Height Units="inches">0.80</ns2:Height>
                    <ns2:Length Units="inches">7.50</ns2:Length>
                    <ns2:Width Units="inches">5.20</ns2:Width>
                    <ns2:Weight Units="pounds">0.50</ns2:Weight>
                  </ns2:ItemDimensions>
                  <ns2:IsAutographed>false</ns2:IsAutographed>
                  <ns2:IsMemorabilia>false</ns2:IsMemorabilia>
                  <ns2:Label>Scholastic Paperbacks</ns2:Label>
                  <ns2:Languages>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Unknown</ns2:Type>
                    </ns2:Language>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Original Language</ns2:Type>
                    </ns2:Language>
                    <ns2:Language>
                      <ns2:Name>english</ns2:Name>
                      <ns2:Type>Published</ns2:Type>
                    </ns2:Language>
                  </ns2:Languages>
                  <ns2:ListPrice>
                    <ns2:Amount>10.99</ns2:Amount>
                    <ns2:CurrencyCode>USD</ns2:CurrencyCode>
                  </ns2:ListPrice>
                  <ns2:Manufacturer>Scholastic Paperbacks</ns2:Manufacturer>
                  <ns2:NumberOfItems>1</ns2:NumberOfItems>
                  <ns2:NumberOfPages>320</ns2:NumberOfPages>
                  <ns2:PackageDimensions>
                    <ns2:Height Units="inches">1.00</ns2:Height>
                    <ns2:Length Units="inches">7.50</ns2:Length>
                    <ns2:Width Units="inches">5.20</ns2:Width>
                    <ns2:Weight Units="pounds">0.50</ns2:Weight>
                  </ns2:PackageDimensions>
                  <ns2:PackageQuantity>1</ns2:PackageQuantity>
                  <ns2:PartNumber>9780590353427</ns2:PartNumber>
                  <ns2:ProductGroup>Book</ns2:ProductGroup>
                  <ns2:ProductTypeName>ABIS_BOOK</ns2:ProductTypeName>
                  <ns2:PublicationDate>1999-10-01</ns2:PublicationDate>
                  <ns2:Publisher>Scholastic Paperbacks</ns2:Publisher>
                  <ns2:ReleaseDate>1999-09-08</ns2:ReleaseDate>
                  <ns2:SmallImage>
                    <ns2:URL>
                      http://ecx.images-amazon.com/images/I/51MU5VilKpL._SL75_.jpg
                    </ns2:URL>
                    <ns2:Height Units="pixels">75</ns2:Height>
                    <ns2:Width Units="pixels">51</ns2:Width>
                  </ns2:SmallImage>
                  <ns2:Studio>Scholastic Paperbacks</ns2:Studio>
                  <ns2:Title>Harry Potter and the Sorcerer's Stone (Book 1)</ns2:Title>
                </ns2:ItemAttributes>
              </AttributeSets>
              <Relationships />
              <SalesRankings>
                <SalesRank>
                  <ProductCategoryId>book_display_on_website</ProductCategoryId>
                  <Rank>401</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>15356791</ProductCategoryId>
                  <Rank>5</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>3153</ProductCategoryId>
                  <Rank>8</Rank>
                </SalesRank>
                <SalesRank>
                  <ProductCategoryId>17468</ProductCategoryId>
                  <Rank>16</Rank>
                </SalesRank>
              </SalesRankings>
            </Product>
          </Products>
        </ListMatchingProductsResult>
        <ResponseMetadata>
          <RequestId>3b805a12-689a-4367-ba86-EXAMPLE91c0b</RequestId>
        </ResponseMetadata>
      </ListMatchingProductsResponse>`
    )

    const res = parseListMatchingProductsResponse(
      '/products:ListMatchingProductsResponse',
      doc
    )

    expect(res).toMatchSnapshot()
  })
})
